import frontmatter
from slugify import slugify
from coolname import generate_slug

import datetime as dt
from pathlib import Path


def _grab_title(post):
    if "title" in post.keys():
        title = post["title"]
    else:
        post_lines = post.content.split("\n")
        headers = [
            line.replace("#", "").strip() for line in post_lines if line.startswith("#")
        ]
        if headers:
            title = headers[0]
        else:
            title = generate_slug(3).replace("-", " ")

    post["title"] = title.title()
    return title


def _slugify_title(post):
    replacemente_strs = [["|", "or"], ["%", "percent"], ["'", ""]]
    post_title = _grab_title(post)
    return slugify(post_title, replacements=replacemente_strs)


def _clean_date(post: frontmatter.Post):
    post_date = post.get("date", dt.datetime.today())
    if isinstance(post_date, dt.datetime):
        post_date = post_date.date()
    post["date"] = post_date
    return post


def clean_post(post_path: Path):
    ## use fronmatter parse in v2
    post = frontmatter.load(post_path)
    post = _clean_date(post)
    slug = _slugify_title(post)
    date = post["date"]

    if "tags" in post.keys():
        post["categories"] = post["tags"]
        del post["tags"]

    frontmatter.dump(post, post_path)
    return f"{date.year}/{slug}"


def move_post(post: Path) -> Path:
    """Move markdown, quarto, and jupyter notebook files to
    their own directory and rename them as 'index.{suffix}'

    Parameters
    ----------
    post : Path
        Original post filepath

    Returns
    -------
    Path
        New post filepath
    """
    new_dir = clean_post(post)
    old_dir = post.parent
    suffix = post.suffix
    new_path = Path(f"{old_dir}/{new_dir}/index.qmd").with_suffix(suffix)

    # create intermediate dirs if needed
    new_path.parent.mkdir(parents=True, exist_ok=True)

    # move
    post.rename(new_path)

    return new_path


if __name__ == "__main__":
    extentions = [".md", ".qmd"]
    for extention in extentions:
        posts_dir = Path(__file__).parent.parent.joinpath("posts").resolve()
        posts = posts_dir.glob(f"*{extention}")
        for post in posts:
            print(post)
            new_path = move_post(post)

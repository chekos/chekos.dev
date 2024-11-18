---
categories:
  - til
date: 2024-11-14
tags:
  - python
  - uv
  - micro-packages
title: using typer and uv to run a script with inline dependencies
---

# using typer and uv to run a script with inline dependencies

## what i learned

because `uv` supports running scripts with dependencies declared in inline metadata and `typer` can turn any function into a cli you can put both of them together and build some really powerful small utilities. all you need is to define a function and wrap it in `typer.run()` in a script with `typer` as a dependency in the inline metadata.

after some iterations, this is the final script (so far):

```python title="issue-to-md.py"
# /// script
# dependencies = [
#   "typer",
#   "rich",
#   "pyyaml",
# ]
# ///

import json
import re
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import typer
import yaml
from rich import print
from typing_extensions import Annotated


def generate_post_from_issue(
    issue_title: Annotated[str, typer.Option("--title", "-t")],
    issue_body: Annotated[str, typer.Option("--body", "-b")],
    issue_labels: Annotated[str, typer.Option("--labels", "-l")],
    issue_created_at: Annotated[str, typer.Option("--created-at", "-c")],
    base_dir: Annotated[str, typer.Option("--base-dir", "-d")] = "blog/posts",
):
    # Convert labels to a list of tags
    tags = [label["name"] for label in json.loads(issue_labels)]

    # Convert ISSUE_CREATED_AT to PST and format as YYYY-MM-DD
    utc_time = datetime.strptime(issue_created_at, "%Y-%m-%dT%H:%M:%SZ")
    pst_time = utc_time.astimezone(ZoneInfo("America/Los_Angeles"))
    created_at_pst = pst_time.date()

    # Extract the category from the part of the title before the first colon, default to "project" if none
    category = (
        issue_title.split(":")[0].strip().lower() if ":" in issue_title else "project"
    )

    # Extract the title content after the first colon
    title = (
        issue_title.split(":", 1)[1].strip()
        if ":" in issue_title
        else issue_title.strip()
    )

    # Determine directory based on category
    dir_path = Path(base_dir) / ("til" if category == "til" else "")
    dir_path.mkdir(parents=True, exist_ok=True)

    # Generate a slugified version of the title for the filename
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")

    # Create the front matter dictionary
    front_matter = {
        "title": title,
        "date": created_at_pst,
        "categories": [category],
        "tags": tags,
    }

    # Prepare YAML front matter and issue body
    yaml_front_matter = yaml.dump(front_matter, default_flow_style=False)
    content = f"---\n{yaml_front_matter}---\n\n{issue_body}"

    # Define filename
    filename = dir_path / f"{slug}.md"

    # Write content to file
    filename.write_text(content, encoding="utf-8")

    print(f"Markdown file created: {filename}")


if __name__ == "__main__":
    typer.run(generate_post_from_issue)
```

feels like a micro-package.

## how i learned

in another [til](./creating-til-posts-from-github-issues-using-github-actions.md) i described a github action that when triggered (by the creation of a new issue in a github repo) creates a markdown file using the title, created at, and labels of the issue for front-matter metadata. the action then also creates a new branch and a pull request but that's not important right now.

the logic for that first part is encapsulated here:

```yaml title=".github/workflows/issue-to-md.yml"
- name: Generate Post from Issue
    env:
      ISSUE_NUMBER: ${{ github.event.issue.number }}
      ISSUE_TITLE: ${{ github.event.issue.title }}
      ISSUE_BODY: ${{ github.event.issue.body }}
      ISSUE_LABELS: ${{ toJson(github.event.issue.labels) }}
      ISSUE_CREATED_AT: ${{ github.event.issue.created_at }}
    run: |
      # Convert labels to a list of tags
      TAGS=$(echo $ISSUE_LABELS | jq -r '.[] | .name' | paste -sd, -)

      # Convert ISSUE_CREATED_AT to PST and format as YYYY-MM-DD
      CREATED_AT_PST=$(TZ="America/Los_Angeles" date -d "${ISSUE_CREATED_AT}" +"%Y-%m-%d")

      # Extract the category from the part of the title before the first colon, default to "project" if none
      CATEGORY=$(echo "$ISSUE_TITLE" | awk -F: '{print $1}' | tr -d '[:space:]' | tr '[:upper:]' '[:lower:]')
      if [ -z "$CATEGORY" ]; then
        CATEGORY="project"
      fi

      # Extract the title content after the first colon
      TITLE=$(echo "$ISSUE_TITLE" | sed 's/^[^:]*: *//')

      # Determine directory based on category
      if [ "$CATEGORY" = "til" ]; then
        DIR="blog/posts/til"
      else
        DIR="blog/posts"
      fi
      echo $DIR >> $GITHUB_STEP_SUMMARY
      echo $CATEGORY >> $GITHUB_STEP_SUMMARY

      # Generate a slugified version of the title for the filename
      SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr -cs '[:alnum:]' '-' | sed 's/^-//;s/-$//')

      echo $SLUG >> $GITHUB_STEP_SUMMARY

      # Create the front matter with category, tags, and formatted date
      FRONT_MATTER="---\ntitle: \"$TITLE\"\ndate: ${CREATED_AT_PST}\ncategories: [${CATEGORY}]\ntags: [${TAGS}]\n---"

      # Prepare content for markdown file
      CONTENT="$FRONT_MATTER\n\n$ISSUE_BODY"

      # Save the content to a markdown file
      FILENAME="${DIR}/${SLUG}.md"
      echo $FILENAME >> $GITHUB_STEP_SUMMARY
      echo -e "$CONTENT" > "$FILENAME"
```

it's not super complicated but i don't know write many bash scripts so i was depending on chatgpt to get this right. any modifications or additions would need me to ask chatgpt as well. the logic itself is kind of straight forward:

1. grab the title, if there's a ':' split it, the first half is the category the second is the title.
2. grab the labels object, grab only the label names, those are the tags in the front matter.
3. grab the issue body and use that as the post.
4. grab the created at string, make it a date, move it to PST instead of UTC, grab the date, add that to the front matter.

i'm using material for mkdocs for these and i saw that it's suggested to have a date.created and a date.updated metadata rather than just date. sounds easy enough but honestly, the idea of messing with this bash script to create that nested thing was not my favorite despite of how easy it may actually be.

so i figured it'd be better to just move this to python and ideally still run it as a command / cli type thing but i also didn't want to create a new package. i just wanted a small script to include in my blog repo.

python comes with `argparse` so that could have been the end of it but i also don't use much `argparse` and the idea was to create something small and quick but also something i can build and iterate on myself without much extra help (ai or not). so `typer` it is. i also didn't necessarily want to add `typer` and any other dependencies to the blog repo since those are not needed for the blog itself. i recently heard an episode of `python bytes` where they mention that `uv` supports dev dependencies and they talked a bit about how some dependency groups are building upon the base one and others are just completely independent. that sounded promising but when i went to the `uv` docs i was reminded that it can run scripts and use inline metadata so that just solved it right there and then.

it took me longer to write this til than write that script.

## reference

- uv docs: https://docs.astral.sh/uv/guides/scripts/#running-a-script-with-dependencies
- python docs: https://packaging.python.org/en/latest/specifications/inline-script-metadata/#inline-script-metadata
- python bytes episodes discussing dependency groups:
  - [#407: Back to the future, destination 3.14](https://pythonbytes.fm/episodes/show/407/back-to-the-future-destination-3.14)
  - [#406: What's on Django TV tonight?](https://pythonbytes.fm/episodes/show/406/whats-on-django-tv-tonight)

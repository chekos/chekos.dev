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

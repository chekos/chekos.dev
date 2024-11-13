---
title: "til: creating til posts from github issues using github actions"
date: 2024-11-13T04:59:58Z
categories: [til]
tags: []
---

# creating til posts from github issues using github actions

## what i learned
you can automate creating a new markdown file in a directory in your repo with front matter metadata from github issues. you can then create a pull request to deploy those changes to your main branch. my plan is to use this to capture more ideas on the go (on my phone).


```bash
name: Create Post from Issue

permissions:
  contents: write
  pull-requests: write

on:
  issues:
    types: [opened]

jobs:
  create-post:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

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

          # Extract the category from the part of the title before the first colon, default to "project" if none
          CATEGORY=$(echo "$ISSUE_TITLE" | awk -F: '{print $1}' | tr -d '[:space:]' | tr '[:upper:]' '[:lower:]')
          if [ -z "$CATEGORY" ]; then
            CATEGORY="project"
          fi
          
          # Determine directory based on category
          if [ "$CATEGORY" = "til" ]; then
            DIR="blog/posts/til"
          else
            DIR="blog/posts"
          fi
          echo $DIR >> $GITHUB_STEP_SUMMARY
          echo $CATEGORY >> $GITHUB_STEP_SUMMARY

          # Generate a slugified version of the title for the filename
          SLUG=$(echo "$ISSUE_TITLE" | tr '[:upper:]' '[:lower:]' | tr -cs '[:alnum:]' '-' | sed 's/^-//;s/-$//')

          echo $SLUG >> $GITHUB_STEP_SUMMARY
          
          # Create the front matter with category and tags, ensuring date is not quoted
          FRONT_MATTER="---
title: \"$ISSUE_TITLE\"
date: ${ISSUE_CREATED_AT}
categories: [${CATEGORY}]
tags: [${TAGS}]
---"

          # Prepare content for markdown file
          CONTENT="$FRONT_MATTER

$ISSUE_BODY"

          # Save the content to a markdown file
          FILENAME="${DIR}/${SLUG}.md"
          echo $FILENAME >> $GITHUB_STEP_SUMMARY
          echo -e "$CONTENT" > "$FILENAME"

      - name: Commit and push changes
        env: 
          ISSUE_TITLE: ${{ github.event.issue.title }}
          ISSUE_NUMBER: ${{ github.event.issue.number }}
          GH_TOKEN: ${{ github.token }}
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git checkout -b add-post-$ISSUE_NUMBER
          git add .
          git commit -m "Add post for Issue: $ISSUE_TITLE"
          git push -u origin add-post-$ISSUE_NUMBER
          gh pr create --title "#$ISSUE_NUMBER - $ISSUE_TITLE" --body "Adding new post. Closes #$ISSUE_NUMBER"
```

## how i learned
i was trying to set up a new blog using `quarto` and i wanted a way to minimize friction to write more. i try to keep my _til_s pretty standard with three sections: what i learned, how i learned, and reference. because they also live in a blog published in github pages using (currently using [mkdocs-material blog plugin](https://squidfunk.github.io/mkdocs-material/plugins/blog/)) they all have to have the `categories` front matter metadata `til`. so, it’s really templated. i just need an easy way to write something quick in markdown and put it in the repo but going to the repo’s url, clicking new file, naming it, adding front matter by hand, etc. is just not great. I also don’t want to break git history if I had already started something locally on my laptop so i needed a way to add a new post in a new PR. this also gives me the opportunity to edit further if needed. 

i asked chatgpt for the github action yaml with those specifications and iterated a bit. now, i use ulysses on my iphone to write a post and just export to markdown, copy and paste it to a new issue. 

## reference
- chatgpt conversation: [https://chatgpt.com/share/67341db2-fec8-8004-bbfa-70fb1cffe8d2](https://chatgpt.com/share/67341db2-fec8-8004-bbfa-70fb1cffe8d2)

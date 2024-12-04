---
categories:
- til
date: 2024-11-17
tags:
- gh-actions
- devops
title: how to trigger a gh-action only if the issue is created by the repo owner
bsky_post_uri: https://bsky.app/profile/soyserg.io/post/3lb6zbyyf7k2t
---

## what i learned
you can add an `if` key to a job to conditionally run jobs. you also have a lot of metadata available in github actions regarding the event that triggered it and the repo it is on. 

put together you can add a condition like:
```yaml title=".github/workflows/issue-to-md.yml"
...
job:
  job_name:
    runs_on: ubuntu
    if: ${{ github.event.issue.user.login == github.repository_owner }}
...
```

## how i learned
i have my `issue-to-md.yml` workflow to create til posts from issues on my repo but i realized that _technically_ anyone could open an issue which would trigger the action and create a pull request. adding this condition ensures it'll only run _if_ i am the one writing the issue. using the available metadata makes it reusable (i don't have to hardcode my own username). 

## reference
* gh actions docs: https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/using-conditions-to-control-job-execution
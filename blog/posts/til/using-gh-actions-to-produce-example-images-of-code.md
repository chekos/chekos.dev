---
categories:
  - til
tags:
  - python
  - gh-actions
  - quarto
  - notion
date: 2022-08-14
title: Using Github Actions To Produce Example Images Of Code
---

# how to use gh-actions to produce example images of code

## what i learned

I learned to chain a lot of small tools using GitHub Actions to produce ready-to-share images of code examples for social media (namely, instagram and twitter) from my phone. The steps, generally speaking, go as follows:

1. Create a new page on a Notion Database. Probably will create a specific template for this, like I do with TIL’s but it’s not necessary.
1. GitHub Action: Use my `markdownify-notion` python package to write the markdown version of this page and save it on a “quarto project” folder. This let’s me use one general front-matter yaml file for all files rather than automate adding front matter to each file. I can still add specific front matter to files if I want to. (this TIL is an example of how this works - I’m writing it on Notion on my phone.)
1. GitHub Action: Use Quarto to render this markdown file `--to html` and save it on an “output” directory. This will execute the code in the code cells and save the output inline.
1. GitHub Action: Use `shot-scraper` to produce two files: a png screenshot and a pdf file. I’m using `shot-scraper` for the PDF as well rather than using quarto because it’s easier and I am not in need of customizing this pdf file at all just yet. I’m creating it and saving it essentially just because I can, it’s easy, and might find use for it later.
1. GitHub Action: Once there are new png or pdf files in the “output” directory, I then use `s3-credentials` to _put_ those _objects_ on a S3 bucket I also created using `s3-credentials` . This tool is fantastic s3-credentials.readthedocs.io

This is how the final image looks like

![9EB00936-09DE-4836-93B6-8504E7E036A8](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/04380cef-2bfc-43f9-a2af-5feed89f0ac4/9EB00936-09DE-4836-93B6-8504E7E036A8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221216T205710Z&X-Amz-Expires=3600&X-Amz-Signature=fa6ba352215a639f6a8d3c89cb72397e0d310da5ef891c439e528def853f20dc&X-Amz-SignedHeaders=host&x-id=GetObject)

## how i learned

I wanted to checkout quarto for a while and in the last rstudio conference they announced it was finally at version 1.0 so I gave it a try. It’s fairly straightforward but the documentation is clearly aimed at helping beginners and people that may not have any programming experience so a lot of the guides and tutorials and examples are for using Quarto within an editor like Rstudio or VS Code. It was hard to find examples of how to use it programmatically _on your own_ - even the automating examples are using their GitHub Actions and services like Quarto publishing. This is actually great in general but if you need to do something custom they may not offer yet you need to figure it out on your own.

## reference

- Quarto:
  [quarto.org](https://quarto.org)

- shot-scraper:
  [shot-scraper.datasette.io/en/stable/](http://shot-scraper.datasette.io/en/stable/)

- s3-credentials:
  [s3-credentials.readthedocs.io/en/stable/](http://s3-credentials.readthedocs.io/en/stable/)

- markdownify-notion:
  [github.com/chekos/markdownify-notion](http://github.com/chekos/markdownify-notion)

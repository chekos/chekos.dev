---
categories:
  - til
tags:
  - jekyll
date: 2020-05-22
title: About Jekyll-Archives
---

# about `jekyll-archives`

## what i learned

there's a jekyll-plugin named `jekyll-archives` that lets you create archives of your posts based on metadata/front matter.

i used it for [socialtech.us](https://socialtech.us/) to create a `category/${category}` page for each of the categories in the site (created dynamically).

<!-- more -->
## how i learned

the social tech collaborative website has a `/categories/` page where each category has a header so you can get to each category via url like `socialtech.us/categories#${category}`. for example, you could go to `socialtech.us/categories#texting` if you wanted to see the plays with the tag `texting`. however, because each play can have multiple categories, plays would appear multiple times in the `/categories` page. we wanted a page per category.

at first i thought i was going to have to some wild logic in a page to "fill" in each category and maybe use the page's query params but that would not be done through jekyll since jekyll creates the static website only - you can't use jekyll or liquid tags to play around with the query params.

the answer was found here: [github.com/jekyll/jekyll/issues/5672](https://github.com/jekyll/jekyll/issues/5672)

all that was needed was

1. to add `jekyll-archives` to the list of plug-ins
2.

```ruby
# Archives
jekyll-archives:
  enabled: ['categories']
  layout: archive
  permalinks:
    category: '/category/:name/'
```

3. add an `archive.html` to `_layouts/`

### visit

https://github.com/jekyll/jekyll-archives

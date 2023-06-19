---
categories:
  - til
tags:
  - jekyll
  - liquid tags
date: 2020-06-15
title: About Liquid Tags
---

# about liquid tags

## what i learned

shopify has a github pages site documenting liquid tags which is very useful and easy to use.

## how i learned

{% raw %}
i am moving soyserg.io from a hugo site to jekyll and i couldn't figure out how to have nested `{{}}` as in `{{ category/{{category | downcase }} | relative_url }}` which just doesn't work. so i moved to `{{ 'category/' | append: category | downcase | relative_url }}`
{% endraw %}

the answer was found here: [shopify.github.io/liquid](https://shopify.github.io/liquid/)

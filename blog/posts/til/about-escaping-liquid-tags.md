---
categories:
  - til
tags:
  - jekyll
  - liquid tags
date: 2020-06-18
title: Escaping Liquid Tags With {% Raw %}
---

# about escaping liquid tags with `{% Raw %}`

## what i learned

you can use the tags `raw` and `endraw` to escape liquid tags.

<!-- more -->
## how i learned

in the [previous TIL](./about-liquid-tags.md) i tried to write the following

{% raw %}
i am moving soyserg.io from a hugo site to jekyll and i couldn't figure out how to have nested `{{}}` as in `{{ category/{{category | downcase }} | relative_url }}` which just doesn't work. so i moved to `{{ 'category/' | append: category | downcase | relative_url }}`
{% endraw %}

but it was not possible off the bat because of the double `{}`. at first i tried to escape them as `\{\{\}\}` but that did not work.

{% raw %}
turns out the answer is the `{% raw %}` tag.
{% endraw %}

the paragraph then looks like this in the markdown file

{% raw %}

```markdown
`{% raw %}`
i am moving soyserg.io from a hugo site to jekyll and i couldn't figure out how to have nested `{{}}` as in `{{ category/{{category | downcase }} | relative_url }}` which just doesn't work. so i moved to `{{ 'category/' | append: category | downcase | relative_url }}`
`% endraw %`
```

{% endraw %}

### visit

https://stackoverflow.com/questions/24102498/escaping-double-curly-braces-inside-a-markdown-code-block-in-jekyll

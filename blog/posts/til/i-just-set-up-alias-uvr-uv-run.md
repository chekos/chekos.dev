---
categories:
- til
date: 2024-11-15
tags:
- uv
- python
title: i just set up `alias uvr = "uv run"`
---

## what i learned
i just set up a new alias to save some time when using `uv`

```bash title="~/.oh-my-zsh/custom/uv.zsh"
alias uvr = "uv run"
```

## how i learned
i use streamlit a lot and i was playing around with `reflex` today and both tools have a `<tool> run` command. `marimo` does too. it's common enough in my workflow that it's becoming annoying to use `uv run` before these commands :face_exhaling:.

## reference
none really. checkout `reflex` though: https://reflex.dev
---
categories:
  - til
tags:
  - jq
  - shell
date: 2022-12-31
title: How To Copy Json Straight To Clipboard From The Terminal
---

# how to copy json to clipboard from the terminal

## what i learned

Piping output to `pbcopy` to copy and paste output from the terminal

Here's how I can grab the last 10 elements of a JSON array and copy them to my clipboard.

```shell
jq '.[-10:]' mydata.json | pbcopy
```

## how i learned

I've been working with my spotify streaming history data and it's a lot of nested data so I've been using `jq` a lot.

I'm working on restructuring a complicated nested JSON so I went to <jqplay.org> and I needed some sample data. I remember reading a tweet or maybe a tip on a Medium article about piping to `pbcopy` so I figured I'd try it and document it.

The final code looked more like

```shell
jq '.[-5:]' interim/streaming_history.json | pbcopy
```

## reference

- `jq` play sandbox environment online: <jqplay.org>
  - what i ended up using jqplay for: <https://jqplay.org/s/AMl-8okc7or>

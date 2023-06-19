---
categories:
  - til
tags:
  - jq
  - shell
date: 2022-01-25
title: Jq [] Syntax
---

# about jq `[ ]` syntax

## what i learned

If you want to dump a list of objects you’re constructing from some other json you need to wrap your entire `jq` string in square brackets ( `[]` ). Otherwise you’ll be writing each object one at a time and that’s not valid JSON.
For example, running something like

```shell
jq '.[] | {id: .id, title: .title, created: .created }'
```

returns →

```json
{
	id: "123",
	title: "page 1",
	created: "2022-01-25T23:15:00.000Z"
}
{
	id: "124",
	title: "page 2",
	created: "2022-01-26T13:18:15.000Z"
}
{
	id: "125",
	title: "page 3",
	created: "2022-01-27T18:37:05.000Z"
}
```

This file is not valid JSON. However, if you wrap your entire expression in square brackets `[]` `jq` will group these all as a list of objects instead of appending each object at a time.

```shell
jq '[.[] | { id: .id, title: .title, created: .created }]'
```

returns →

```json
[
  {
    "id": "123",
    "title": "page 1",
    "created": "2022-01-25T23:15:00.000Z"
  },
  {
    "id": "124",
    "title": "page 2",
    "created": "2022-01-26T13:18:15.000Z"
  },
  {
    "id": "125",
    "title": "page 3",
    "created": "2022-01-27T18:37:05.000Z"
  }
]
```

<!-- more -->
## how i learned

Testing the `til-notion-integration` and `markdownify-notion` I tried reading a list of TILs I had saved in a JSON file. However, each object was separated by a new line - not a comma.

## reference

The solution (after many failed google searches) was found on a GitHub issue answered by the creator of `jq` →
[github.com/stedolan/jq/issues/124](https://github.com/stedolan/jq/issues/124#issuecomment-17875972)

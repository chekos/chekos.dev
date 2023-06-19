---
categories:
  - til
tags:
  - gh
  - automation
date: 2022-12-28
title: How To Create An Alias In The gh-cli
---

# how to create an alias in the `gh` CLI

## what i learned

you can create aliases in the GitHub CLI. i'm not super familiar with aliases. i've used them in the past to automate long commands.
currently i'm using a couple at work to shorten `dbt` commmands ever so slightly (from `dbt run --target prod --select <models>` to `prod-run <selection query>`).

however, i had only seen these as aliases one sets up at the _profile_ level/scope. as in, we'd go to `~/.bash_profile` or `~/.zsh_profile` and add a new alias that's set every time we open a new terminal.

this is the first time i see a cli offer that _within_ the tool itself. i wonder if this is a common practice i've missed until now.

in the GitHub cli you can use the command `alias set` to set an alias ([docs](https://cli.github.com/manual/gh_alias_set)).

i usually have to google the full list of flags i would like to run when creating a repo via the `gh-cli` so i figured i'd save it as an alias now. this is why i ~~wish i remembered~~ would like to run most times:

```shell
gh repo create <name> \
--public \
--add-readme \
--clone \
--gitignore Python \
--license bsd-3-clause-clear
```

simply _create a public repo named <name> include a ReadME, a license and a gitignore file and finally clone it to the local directory._

i might add the `--disable-wiki` simply because i don't use the wikis.

from the docs:

> _The expansion may specify additional arguments and flags. If the expansion includes positional placeholders such as "$1", extra arguments that follow the alias will be inserted appropriately. Otherwise, extra arguments will be appended to the expanded command._

so what i did was run

```shell
gh alias set pyrepo 'repo create "$1" --public --add-readme --clone --gitignore=Python --license=bsd-3-clause-clear'
```

and if i choose to i can add a description by adding `-d "my repos description"` right after `gh pyrepo <name>`

<!-- more -->
## how i learned

i've been creating lots of small project repos lately and this feels like a small automation that could solve some frustrations.

## reference

- GitHub CLI manual: <https://cli.github.com/manual/>
  - [`gh alias set`](https://cli.github.com/manual/gh_alias_set)
  - [`gh repo create`](https://cli.github.com/manual/gh_repo_create)
- GitHub Docs about licenses: <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository#searching-github-by-license-type>

---
categories:
  - til
tags:
  - shell
date: 2021-09-09
title: How To Execute A Shell Script In The Current Shell
---

# how to execute a shell script in the current shell

## what i learned

when you execute a shell script, it defaults to creating a new shell, executing the script in that shell and closing it. if you want to, for example, set environmental variables you would need to run the script in the current shell.
let's say you want to have a short shell script that sets the database url as an environmental variable called `env_vars.sh`.

```shell
#!/bin/bash
export DATABASE_URL="super_secret_url"
```

if you run

```shell
sh env_vars.sh
```

in your terminal, it would run said script in a new shell and therefore those environmental variables would not be set in your current shell and would then be unavailable to your other scripts.

to run that in your current shell you use the following syntax

```shell
. ./env_vars.sh
```

this way your environmental variables are set in your current shell and you can use them as expected.

<!-- more -->
## how i learned

i'm testing `SQLModel` and wanted to test access to snowflake. instead of setting the environmental variables manually i thought i'd just run a script that had `export snowflake_username="xyz"` etc, etc.
however, when i ran the script and tried to use `os.environ['snowflake_username']` i'd get an error.

finding the solution was surprisingly fast.

### visit

https://stackoverflow.com/questions/496702/can-a-shell-script-set-environment-variables-of-the-calling-shell

---
categories:
  - til
tags:
  - docker
  - airflow
  - python
date: 2022-01-27
title: How To Solve Permission Error From Airflow Official Docker Image
---

# how to solve permission error from airflow official docker image

## what i learned

tl;dr: when you use the Airflow official docker image you need to make sure that the variable `AIRFLOW_UID` is set to match **your** UID (and `AIRFLOW_GID=0` aka `root` ) or you’re going to get permission errors.
i was working on deploying Airflow on a VM at work this week and I got a permission error (Errno 13) regarding the containers’ python’s logging config. When I first started working with this `docker-compose.yml` i used the suggested `echo -e "AIRFLOW_UID=$(id -u)" > .env` command which provided my user id (let’s say it’s **506** ) from my local machine and assigned it to the `AIRFLOW_UID` key. Now that i am working in the VM and have extended my `.env` file to include other information i figured i could just use a copy of the same file. Everything else works fine except airflow cannot write logs because the user in this virtual machine with user id **506** does not have permission to write to this `./logs/` directory.
If you google this error i found — among a sea of _almost_ right answers — that most of the solutions online are variations of “change the logs folder’s permissions to 777” meaning anyone can read, write, and execute the contents of the logs. That works. However, you don’t really need _everyone_ to be able to read and write — just this airflow user.
Updating the UID on the VM’s `.env` file worked perfectly without having to mess with the permissions.

## how i learned

i kept getting permissions errors so i changed the `./logs/` directories permissions to 777 and ran `docker-compose up airflow-init` . Now that airflow was able to write logs i could run `ls -l logs/` and see that the owner of these logs was some user with id **506** which i recognized from the `.env` file.
From there all i had to do was run `id -u` to find the correct user id (the id of the user i’m logged in as in this VM) and update the `.env` file to match.

## reference

the airflow documentation →
[airflow.apache.org/docs/apache-airflow/stable/start/docker.html](https://airflow.apache.org/docs/apache-airflow/stable/start/docker.html#setting-the-right-airflow-user)

this stackoverflow answer →
[stackoverflow.com/questions/67698656/cant-init-db-for-airflow-docker-compose-permission-denied/67704988](https://stackoverflow.com/questions/67698656/cant-init-db-for-airflow-docker-compose-permission-denied/67704988#67704988)

this **fantastic** explanation of user and groups permissions →
[unix.stackexchange.com/questions/116070/granting-write-permissions-to-a-group-to-a-folder](https://unix.stackexchange.com/questions/116070/granting-write-permissions-to-a-group-to-a-folder)

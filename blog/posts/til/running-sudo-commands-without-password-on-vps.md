---
title: "Running sudo commands without password on VPS"
date: "2024-11-12"
categories: 
  - til
tags:
  - shell
  - vps
---

# running sudo commands without password on VPS

## what i learned
you can configure your VPS / server to be able to run `sudo` commands without being asked for your password. you just need to create a sudoers file. 

* first you have to create sudoers file
```bash
sudo visudo -f /etc/sudoers.d/$USER
```
> when i asked chatgpt for this i found you can just run `sudo visudo` and it’ll open the sudoers file. 

* now, let’s say you have a user `app` that you want to be able to run `apt update` and `apt upgrade` without asking for `sudo` password. you need to add this line to your sudoers file
```bash
app ALL=(ALL) NOPASSWD:/usr/bin/apt update, /usr/bin/apt upgrade
```

### how it works
1. `app` - the username on the system 
2. `ALL=(ALL)` - this means this rule to all hosts and allows acting as any user
3. `NOPASSWD` - no password
4. `/usr/bin/apt update` - you must pass the full path for the commands you want to run without a password. 

## how i learned
i recently found a tweet explaining all of this but i learned about it when setting a github action to push some code to my raspberry pi 5 running a FastAPI app and restarting the service. i needed to restart it using sudo but the github action would fail if prompted for it, i needed to run it without being asked for my password. 


## reference
- the tweet in question: [https://x.com/kkyrio/status/1856299320720363690](https://x.com/kkyrio/status/1856299320720363690?s=46&t=FbNY5tk_j1lpZ7HSxe6fJQ)
- chatgpt conversation: [https://chatgpt.com/share/673366e9-aed8-8004-93e0-d72289fd3686](https://chatgpt.com/share/673366e9-aed8-8004-93e0-d72289fd3686)

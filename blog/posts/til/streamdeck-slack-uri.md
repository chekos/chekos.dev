---
categories:
  - til
tags:
  - streamdeck
  - automation
date: 2023-06-24
---
# how to open specific channel in Slack app using Stream Deck

## what i learned
you can open a specific channel/DM conversation on the slack app using the open website action on stream deck but pointing ot to `slack://channel?team=<Workspace ID>&id=<Channel / teammate ID>`. 
<!-- more -->
finding the workspace's ID wasn't super straigh-forward but if you right click your own profile picture on slack and copy it's link you'll find 3 IDs. the first one is the workspace's ID. the second one is yours, if you use those two IDs you could open a direct message on slack directly from stream deck. 

once you have your workspace's ID all you need to do is `copy link` to the channels you're interested in having quick access to. these links do not include the workspace ID which is why you need to get it via a profile pic link.

## how i learned
from adam.ac/blog

## Reference
- adam.ac/blog: 
  [Stream Deck for Developers](https://adam.ac/blog/stream-deck-for-developers/)
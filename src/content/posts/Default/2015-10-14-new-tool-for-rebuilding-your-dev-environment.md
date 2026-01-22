---
title: New Tool For Rebuilding Your Dev Environment
description: superlumic-logo
published: 2015-10-14
image: images/posts/new_tool_for_rebuilding_your_dev_environment.webp
imageAlt: superlumic-logo
category: Default
tags: [ansible, automation, envioronment, geekery, kitchenplan, superlumic, tools]
---

My new MacBook Pro is here and the first step is to get all the tools up and running! I've mentioned before using [KitchenPlan](/rebuilding-your-dev-environment-quick-and-easy-on-osx-with-kitchenplan), but now there's a new kid on the block: [SuperLumic](https://github.com/superlumic/superlumic).

<!--more-->

![superlumic-logo](@assets/images/posts/2015-10-superlumic-logo.jpg)

SuperLumic was created by the same person that created [KitchenPlan](https://github.com/kitchenplan/kitchenplan), so there's a lot of similar things working for it. However, this is built on top of Ansible, so it provides [more speed and maintainability](http://vanderveer.be/2015/09/27/using-ansible-to-automate-osx-installs-via-superlumic.html). SuperLumic allows you to "rerun" your scripts as much as you want, and it will simply bypass (or update if necessary) the apps you have installed, making it easy to change your configuration as you need.

That said, I was able to fork the same configuration, make a few tweaks to add some additional programs from my KitchenPlan configuration, and I was up and running in no time!

Between GitHub for code, OneDrive for personal photos/files, and SuperLumic for development tools, you can have a new machine up and running in a few hours, instead of a full day. It's pretty amazing.

Give it a whirl! I think you'll like it. Let me know what you think.
---
title: Rebuilding Your Dev Environment Quick And Easy On Windows With Boxstarter
description: Rebuilding Your Dev Environment Quick And Easy On Windows With Boxstarter
published: 2014-05-20
image: images/posts/rebuilding_your_dev_environment_quick_and_easy_on_windows_with_boxstarter.webp
imageAlt: Rebuilding Your Dev Environment Quick And Easy On Windows With Boxstarter
category: Default
tags: [boxstarter, chocolatey, configuration, deployment, geekery, installation, windows]
---

_Note: Have a Mac? You can do the same thing with [KitchenPlan](/rebuilding-your-dev-environment-quick-and-easy-on-osx-with-kitchenplan)..._

After being completely enamored and giddy [with the discovery of KitchenPlan](/rebuilding-your-dev-environment-quick-and-easy-on-osx-with-kitchenplan) to automate my OSX rebuild, I started thinking, “Man, it would be truly amazing if I could do the same thing with my Windows VMs!” After a little bit of digging around, to my wonderful surprise there IS a tool that does the same thing thanks to [Boxstarter](http://boxstarter.org).

<!--more-->

[Boxstarter](http://boxstarter.org) is a fabulous tool that automates the installation and configuration of apps on your machine. The authors of the tool say it far more eloquently:

Repeatable, reboot resilient windows environment installations made easy using [Chocolatey](http://chocolatey.org/) packages. When its time to repave either bare metal or virtualized instances, locally or on a remote machine, Boxstarter can automate both trivial and highly complex installations. Compatible with all Windows versions from Windows 7/2008 R2 forward.

As mentioned above, Boxstarter depends on Chocolatey, the “homebrew” of Winodws that has made life a lot easier for developers. Nearly everything you need out there for your dev environment exists now as a chocolatey package, which means you can install (and script) from Powershell. There are tons of packages available.

Boxstarter comes in a small package, that allows you to easily expand upon. You can create custom packages based on your needs and even run them against Hyper-V and Azure VMs to really build out your infrastructure easily.

The thing that impressed me most was the web installer that allows you to get up and running in moments.

To start, you simply create your package file as a series of chocolatey config/install commands. You can even host this as a gist on GitHub. Here’s what mine looks looks like:

Here you can see I have a couple quick config changes for the File Explorer, and then install by tools and browsers. The best part is at the end I have Visual Studio and SQL Server Express available for install as well.

Once you create your gist, you want to click the “raw view” icon so that you get the URL of the gist file in question. Boxstarter provides a WebInstaller at the following URL

```
http://boxstarter.org/package
```

You add your Gist file to the URL in the following manner:

```
http://boxstarter.org/package/nr/url?https://gist.githubusercontent.com/Dillie-O/3451887b858e44e710f6/raw/e5ea225437587494215ef1f75433702c3ad5ff56/dillieo-boxstarter.config
```

_Note: This will only work in Internet Explorer unless you have installed a “Click-Once” extension for Firefox/Chrome._

In the URL above, the “nr” option tells Boxstarter not to reboot the machine (since some packages want you to when it isn’t required. If you’re doing some large package or system update installs through this, it is recommended that you take the parameter off. If so, Boxstarter will prompt you for your password, verify it, then manage the restart/login/continue process of the package installs for you.

Now sit back, relax, and enjoy! It took about an hour for my fresh Win8 dev environment to come online (not counting the OS install) and I let it run while brewing my coffee and enjoying a quiet morning. How amazing is that?! Give Boxstarter a try next time you’re setting up your development machine, you’ll love it!

###### _...Proudly published using [Desk PM](http://desk.pm)_
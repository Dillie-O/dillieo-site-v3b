---
title: Rebuilding Your Dev Environment Quick And Easy On Osx With Kitchenplan
description: Rebuilding Your Dev Environment Quick And Easy On Osx With Kitchenplan
published: 2014-05-19
image: images/posts/rebuilding_your_dev_environment_quick_and_easy_on_osx_with_kitchenplan.webp
imageAlt: Rebuilding Your Dev Environment Quick And Easy On Osx With Kitchenplan
category: Default
tags: [applications, automation, chef, deployment, development, geekery, homebrew, install, osx, rebuild]
---

_Note: Have a PC? You can do the same thing with [BoxStarter](/rebuilding-your-dev-environment-quick-and-easy-on-windows-with-boxstarter)..._

This weekend I had one of those dreaded “rebuild your machine” weekends. It was my kids’ birthday too! While I like the “fresh smell” of a new machine, free of clutter and running fast, the time it takes to get everything in place makes it a little tedious. However, all of that changed when I stumbled upon a great little tool from an [old bookmarked post](http://vanderveer.be/setting-up-my-perfect-dev-environment-on-osx-10-9-using-chef-kitchenplan/) called [KitchenPlan](http://kitchenplan.github.io/kitchenplan/).

<!--more-->

[KitchenPlan](http://kitchenplan.github.io/kitchenplan/) is a GREAT tool that helps automate the installation and configuration of your machine. Here’s how they describe it on their site:

Kitchenplan is a small tool to fully automate the installation and configuration of an OSX workstation (or server for that matter) using Chef. But while doing so manually is not a trivial undertaking, Kitchenplan has abstracted away all the hard parts.

After doing a fresh install of Mavericks on my MacBook Pro (thanks to [DiskMaker X](http://diskmakerx.com)), I simply fired up terminal prompt and ran the following command:

```gem install kitchenplan```

After a few minutes, I had a copy of KitchenPlan installed locally from their repository.

The next step was to run the setup tool and get a configuration file:

```kitchenplan setup```

When prompted, I answered “No” that I didn’t have a repository with my configuration file (more on this later). KitchenPlan went ahead and created a few default configuration files for me within the /opt/kitchenplan/config folder.

You can view my configuration files [here](https://github.com/Dillie-O/kitchenplan-config), which are largely copied from the authors.

From here, I simply opened up the configuration file and modified them. KitchenPlan uses .yml files that are easy to read and parse. In addition, it uses a default/group/person layout so that you can use KitchenPlan within an organization to designate rules/configurations at a larger scale. For example, all of your machines may have Sublime Text installed, but only your devs will need to get the latest version of php/mysql/postresql installed. In addition, you can update settings as well with the configuration file.

Here’s an example of the “developer” configuration configuration file:

This configuration puts a whole lot of development libraries on my machine, including latest versions of PHP/MySQL/PostgreSQL on my mache. NodeJS and a handful of typical applications (Grunt / Bower) that go with it are also installed. Notice how in addition to applications that are installed I can do handy things like set my terminal profile colors and display the full path to a folder in finder. There are lots of other things you can add to this configuration by checking out the KitchenPlan [configuration cookbook](https://github.com/kitchenplan/chef-osxdefaults) or [application cookbook](https://github.com/kitchenplan/chef-applications) sections. KitchenPlan supports even more than your basic “dev” tools. Apps like Adium and Spotify are also available for installation.

Once your configuration is set, the final step is to simply run

```kitchenplan provision```

You’ll be prompted for your admin password and KitchenPlan will be off cooking up your amazing new system! My system took about 30 minutes to 45 minutes to run (I don’t have an exact count) which is much better than the 3 to 4 hours it has taken me previously. Even better, the installation was unattended, so I could take care of more important things, like having fun with my family. Once KitchenPlan was complete, I went back in later that night and copied over some backup files and installed some other programs that weren’t in the cookbook (like Pomodoro, Office, etc.)

One of the beautiful features about KitchenPlan is that is runs using popular and stable tools homebrew and chef to make everything work. This means that if you run into a few issues, you should be able to search online for solutions (though I never ran into anything). KitchenPlan is also “rerunnable” since homebrew checks to see if a given library has already been installed or not. The first couple of times I ran KitchenPlan, I had a copule of recipes in there that didn’t exist or were broken, which killed the process. After updating my config files, I simply reran “kitchenplan provision” and the process ran again. All previous items were flagged as “up to date” and moved on to the next. If you decide to add new items (or versions) to your configuration down the road, you can rerun the provisionn tool and everything will run without a hitch.

This leads me to the mention of a repository that I moved passed earlier. If you keep your configuration files in a repository, KitchenPlan will simply download them and place them in the proper configuration location. By doing this, you can have a standard configuration in place, and then let the user modify their personal configuration for any final tools they may need before provisioning.

Next time you need to rebuild your OSX machine (or plan our a global deployment plan), give KitchenPlan a try. I think you’ll be pleasantly surprised. I definitely was!!!!

###### _...Proudly published using [Desk PM](http://desk.pm)_
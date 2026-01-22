---
title: Be A Vagrant Its Better Than You Think
description: vagrant-logo
published: 2016-04-06
image: images/posts/2016-04-vagrant-logo.png
imageAlt: vagrant-logo
category: Development
tags: [apache, coding, development, git, laravel, node, tools, vagrant]
---

Yesterday I built my first [Vagrant](https://www.vagrantup.com) machine, with some help form some existing resources, and now I'm officially hooked. No more XAMPP, MAMP, WAMP, or anything else. Here's why I think you'll enjoy it too.

<!--more-->

![vagrant-logo](@assets/images/posts/2016-04-vagrant-logo.png)

If you haven't heard of it before, [Vagrant](https://www.vagrantup.com) is a tool that allows you easily build a development environment from a script file and then run it through [VirtualBox](https://www.virtualbox.org), [VMWare](https://www.vagrantup.com/vmware/), or other platforms. Vagrant allows you to create a fully configured machine, not just configuring a subset of platforms or libraries that you need.

I'm no Linux expert, so setting up a full Linux environment would be a little daunting (and time consuming) for me. Fortunately, Vagrant has an entire [atlas library](https://atlas.hashicorp.com/boxes/search) of images preconfigured and updated by the community at your disposal. Grab one and go. Once you have the box you need, you can update your Vagrant scripts to run additional tasks upon the initial provisioning of the machine. Maybe you need to install an additional package using apt-get. Maybe you need to install an initial database. Maybe you want to run a diagnostic script. All of this can be setup in the Vagrant file to run for you.

While Vagrant provides a isolated development environment, it doesn't mean that your code has to live in that isolated environment as well. You can easily setup linked paths from your "root" machine to your "box" so that any changes you make are immediately reflected on the box. No need to SSH into your machine (oh yeah, that is included 8^D), install PHPStorm, and do your develop there. You can develop on your root machine, save your changes, and see the updates reflected immediately on your box.

So what's the "real world" example of how this all plays out? For an existing client, we have four different "systems" that their platform is built on. We have a Web API built using Laravel. We have a web app built using AngularJS, but hosted from a "static" AWS S3 bucket. We have a WordPress install setup to contain the news/blog/pages that we want SEO optimization with, as well as serve up a "shell" for the AngularJS web app. Finally we have another "common" set of images and stylesheets that sits in a separate S3 bucket. We need to easily replicate this environment for local development, and make it easy for anybody on our team to get up and running with.

To handle this we have two separate Vagrant boxes. The first box hosts the API. Upon running "vagrant up" for the first time, a fresh Ubuntu server, preconfigured to have PHP, MySQL, Nginx, and a bunch of our other dev tools (git, node, bower) in place. The box then links to our local git repository of the API site itself and serves things up. The second box does something similar, but for our WordPress instance. We also setup a couple of other "websites" that serve our static resources and our web app, similar to how we would see them served up through S3.

To wrap all of this up in a pretty little bow, we use the [Hosts Updater](https://github.com/cogitatio/vagrant-hostsupdater) plugin so to automatically map our apps to the following URLs:

- api.myapp.dev
- www.myapp.dev
- app.myapp.dev
- cdn.myapp.dev

When I close down the boxes, the domains go away. Finally, we took the extra time to generate self signed SSL certificates and map them to the domains, so we can better code and test against the SSL environment on our servers. I also use a handy tool called [Vagrant Manager](http://www.vagrantmanager.com/) to easily see what machines are running and to manage them accordingly.

There you have it! A complex dev environment can be made "development ready" for a member of our team in roughly 20 minutes, or however long it takes the initial boxes to be downloaded for the first time. All subsequent builds are much faster, since a copy of the base box is saved elsewhere for reuse.

I've been a long time user of MAMP, and while it may be quicker to map up a new version, you still have to make sure you're using the version of PHP that is going to map to your app instance, and some of the more advanced Apache configurations start to get convoluted. I think the biggest help is getting SSL support through the Vagrant machine, since that can add to headache as well. You also don't have to worry about which version of Apache or PHP is running after you update your version of OSX (for Mac folks). The vagrant machine is locked down to what you want it to be.

Oh yeah, and all of this is available for Windows too...

If you haven't done so, give Vagrant a try. Let me know what clever tricks you have setup and anything else you have done to streamline your development experience.

Enjoy!

Yesterday I built my first [Vagrant](https://www.vagrantup.com) machine, with some help form some existing resources, and now I'm officially hooked. No more XAMPP, MAMP, WAMP, or anything else. Here's why I think you'll enjoy it too.

<!--more-->

![vagrant-logo](@assets/images/posts/2016-04-vagrant-logo.png)

If you haven't heard of it before, [Vagrant](https://www.vagrantup.com) is a tool that allows you easily build a development environment from a script file and then run it through [VirtualBox](https://www.virtualbox.org), [VMWare](https://www.vagrantup.com/vmware/), or other platforms. Vagrant allows you to create a fully configured machine, not just configuring a subset of platforms or libraries that you need.

I'm no Linux expert, so setting up a full Linux environment would be a little daunting (and time consuming) for me. Fortunately, Vagrant has an entire [atlas library](https://atlas.hashicorp.com/boxes/search) of images preconfigured and updated by the community at your disposal. Grab one and go. Once you have the box you need, you can update your Vagrant scripts to run additional tasks upon the initial provisioning of the machine. Maybe you need to install an additional package using apt-get. Maybe you need to install an initial database. Maybe you want to run a diagnostic script. All of this can be setup in the Vagrant file to run for you.

While Vagrant provides a isolated development environment, it doesn't mean that your code has to live in that isolated environment as well. You can easily setup linked paths from your "root" machine to your "box" so that any changes you make are immediately reflected on the box. No need to SSH into your machine (oh yeah, that is included 8^D), install PHPStorm, and do your develop there. You can develop on your root machine, save your changes, and see the updates reflected immediately on your box.

So what's the "real world" example of how this all plays out? For an existing client, we have four different "systems" that their platform is built on. We have a Web API built using Laravel. We have a web app built using AngularJS, but hosted from a "static" AWS S3 bucket. We have a WordPress install setup to contain the news/blog/pages that we want SEO optimization with, as well as serve up a "shell" for the AngularJS web app. Finally we have another "common" set of images and stylesheets that sits in a separate S3 bucket. We need to easily replicate this environment for local development, and make it easy for anybody on our team to get up and running with.

To handle this we have two separate Vagrant boxes. The first box hosts the API. Upon running "vagrant up" for the first time, a fresh Ubuntu server, preconfigured to have PHP, MySQL, Nginx, and a bunch of our other dev tools (git, node, bower) in place. The box then links to our local git repository of the API site itself and serves things up. The second box does something similar, but for our WordPress instance. We also setup a couple of other "websites" that serve our static resources and our web app, similar to how we would see them served up through S3.

To wrap all of this up in a pretty little bow, we use the [Hosts Updater](https://github.com/cogitatio/vagrant-hostsupdater) plugin so to automatically map our apps to the following URLs:

- api.myapp.dev
- www.myapp.dev
- app.myapp.dev
- cdn.myapp.dev

When I close down the boxes, the domains go away. Finally, we took the extra time to generate self signed SSL certificates and map them to the domains, so we can better code and test against the SSL environment on our servers. I also use a handy tool called [Vagrant Manager](http://www.vagrantmanager.com/) to easily see what machines are running and to manage them accordingly.

There you have it! A complex dev environment can be made "development ready" for a member of our team in roughly 20 minutes, or however long it takes the initial boxes to be downloaded for the first time. All subsequent builds are much faster, since a copy of the base box is saved elsewhere for reuse.

I've been a long time user of MAMP, and while it may be quicker to map up a new version, you still have to make sure you're using the version of PHP that is going to map to your app instance, and some of the more advanced Apache configurations start to get convoluted. I think the biggest help is getting SSL support through the Vagrant machine, since that can add to headache as well. You also don't have to worry about which version of Apache or PHP is running after you update your version of OSX (for Mac folks). The vagrant machine is locked down to what you want it to be.

Oh yeah, and all of this is available for Windows too...

If you haven't done so, give Vagrant a try. Let me know what clever tricks you have setup and anything else you have done to streamline your development experience.

Enjoy!
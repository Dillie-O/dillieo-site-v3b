---
title: Initial Impressions Visual Studio For Mac
description: VS_Mac_Banner.png
published: 2016-11-18
image: images/posts/2016-11-vs_mac_banner.webp
imageAlt: VS_Mac_Banner.png
category: Default
tags: [net, net-core, aspnet, coding, mac, visual-studio]
---

While there was a premature leak earlier this week in the news, you can now officially download [Visual Studio for Mac](https://www.visualstudio.com/vs/visual-studio-mac/). While there isn't much you can necessarily say in one day of poking around, in addition to the fact that this is a "preview" app, here are a few initial impressions on it.

<!--more-->

![VS_Mac_Banner.png](@assets/images/posts/2016-11-vs_mac_banner.png)

Once the installer has completed and you fire up VS Mac (V-smack maybe?), you've given a simple dialog to pick your project. The exciting thing about this is that there are a lot of templates already in place, for Xamarin Forms, specific iOS / tvOS / Android apps, and even more importantly, Mono and .Net Core apps. The mono web apps give you a full MVC setup with an initial controller, while the .Net Core web app is pretty bare bones. It would be nice if the .Net Core projects have a little more fleshed out in them, but I suspect that will be happening soon. What would be really slick (in my opinion) is if VSMac can coordinate with the [Yeoman](https://github.com/omnisharp/generator-aspnet#readme) generators that are already out there to easily script and scaffold new solutions.

Speaking of scripting, I'm a little surprised there isn't a terminal window easily available in the IDE (I'm sort of liking those) as well as the well loved "Package Manager Console" that is in your typical copy of Visual Studio. One of the big learning curves, but big benefits with .Net Core is how a lot more of the scaffolding for modeling, deployments, migrations, etc are done through the command line. With the "right click, and new item, see a list of options for classes, controllers etc." not being there, you're left a little hung out to dry when building out a .Net Core web app. Admittedly it has been a while since I've been working with .Net Core itself (my recent projects are in the "classic" architecture) it would be nice to see some of those options there, especially to add database migrations and the like.

Right now it appears that I can't open a folder or create an empty solution file and start adding existing files to it (to integrate with a Yeoman scaffolded app) which is a little frustrating. I'll have to stick to Visual Studio Code for those items in the meantime.

With such a tight integration with Xamarin for mobile apps (rumor is that V-smack is Xamarin Studio with renovations) there is quite the toolset readily available for device emulators, which I found VERY nice. Pretty much everything you need is installed for you to get up and running for a mobile app. I even enjoyed seeing a regular expression toolkit available, since you never know when you need to tweak on one of those.

All of the editor goodness (dark theme, autocomplete, smart tabs, font size changes) is readily available and there doesn't seem to be any lag working with files or projects. I was even able to open a project build in Visual Studio and get it to compile (it defaulted to Mono) and run without hassle. It wasn't perfect (I wasn't expecting it to be) but it went a lot farther than I thought. Source control is at the forefront of V-smack as well, with new projects providing an option to include a default .gitignore file (saves me the hassle of tracking one down) as well as push/pull/blame/diff tools that need to be used.

I'm excited to see where Visual Studio for Mac is going to go. I've been debating about rebuilding the backend API for [Prayer Odyssey](http://www.prayerodyssey.com) to use .Net Core and this might prove to be a great project in which to do it. I still love Visual Studio Code, especially for it's flexibility across programming languages, but there is a large extensions gallery already available for Visual Studio for Mac, so we'll see where things go from here.

If you've never worked with .Net before, now might be the time to do it. Have a little patience with the overall IDE, but it's great to see the power of .Net making more and more inroads to the Mac environment. If you try it out, let me know what you think!
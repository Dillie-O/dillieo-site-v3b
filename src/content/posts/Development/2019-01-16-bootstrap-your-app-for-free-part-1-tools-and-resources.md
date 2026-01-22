---
title: Bootstrap Your App For Free Part 1 Tools And Resources
description: Bootstrap Your App For Free Part 1 Tools And Resources
published: 2019-01-16
category: Development
tags: [code, coding, coding, editors, geekery, graphics, tools]
---

<!-- wp:paragraph {"align":"left"} -->

Last year, as a means of doing a deeper dive into .Net Core and to fill a personal need, I built the [Bookmarkinator](http://www.bookmarkinator.gq). Simple, fun, and super helpful (at least for me). One of the requirements for this was that I could build a full-fledged app available to the public that cost me nothing (minus some elbow grease). It was a success, and I want to share the tools and resources that I used so that you can bootstrap your own app for free as well.

<!-- /wp:paragraph -->

<!-- wp:more -->

<!--more-->

<!-- /wp:more -->

<!-- wp:image -->

<!-- /wp:image -->

<!-- wp:paragraph -->

I'll outline the "why's" in a later post, but first, let's get through some of the resources needed to build in the app in the first place. A lot of these may seem like "no brainers", but it's worth mentioning, if only to refresh my forgetful brain a few more years down the line.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Editors / IDEs

<!-- /wp:heading -->

<!-- wp:paragraph -->

My very first code editor was a Borland C/C++ compiler. It was 10 floppy disks copied from a friend/mentor because I was a lowly high school student without a high paying job and compilers were expensive. Nowadays you can easily get away with using a "glorified text editor" and command line or a basic IDE to build your app. Here are a few of my favorites:

<!-- /wp:paragraph -->

<!-- wp:list -->

- [Visual Studio Code](https://code.visualstudio.com/) - It's really amazing at how fast Microsoft's Text Editor has taken form and established itself. Maybe they took a few queues from their predecessors like Sublime Text and Atom, but with the wide range of extensions available for nearly every programming language, basic Javascript / .Net debugging, and a built in terminal screen, you can get a LOT done for nothing. Bookmarkinator was built using this.
- [Visual Studio Community Edition](https://visualstudio.microsoft.com) - The original Visual Studio is not to be left in the dust though. Community Edition is all of the best features of their long standing IDE and they make it free for personal or small business use. The only things you can't do with it are install extensions (though a few are given special access to be installed) and use some deep data mining / test suite type tools. There's no reason you can't build something with this. I used it for my [Prayer Odyssey](http://www.prayerodyssey.com) app.
- [JetBrains PyCharm](https://www.jetbrains.com/pycharm/) - Are you doing Python development and need some extra code insights? PyCharm is the tool for you! It helped me out of a bind with an older project and the free community edition works amazingly well.

<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### Isolated Environment Management

<!-- /wp:heading -->

<!-- wp:paragraph -->

It used to run into the biggest problems with my PHP apps. I needed multiple versions to support different applications being built since upgrading was difficult or unfeasible. Likewise, back when the Apache 2.2 to 2.4 transition happened I wound up using a tool called MAMP to handle all of these configurations. MAMP updated my configuration defaults, but you could still run into problems if things didn't work out right. I didn't have nearly the same issues with .Net, but they were a possibility as well.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

I no longer have to worry about that thanks to [Docker](https://www.docker.com). Docker allows me to build isolated environments to match up to my specific dev needs. For Bookmarkinator, I was able to get a .Net Core 2.1 environment running, including an isolated version of SQL Server for Linux that I could fire up on either a Mac or a PC for my dev needs. Docker containers are deployable as well to a growing number of locations out there, which further helps overcome the typical challenges of deploying to a new environment. Give Docker a whirl, I think you'll love it.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Graphics Tools

<!-- /wp:heading -->

<!-- wp:paragraph -->

There's a chance you may need to build a logo, tweak a screenshot, or resize an image. The Adobe suite it still considered the best in class and is pricey, but here are a few things I've used to get by:

<!-- /wp:paragraph -->

<!-- wp:list -->

- [Paint.Net](https://www.getpaint.net) - Sorry Mac folks, you're out of luck on this one. Paint.Net has all the critical image editing tools out there for quick touchups. It also has the ability to work with image layers, giving you some advanced tools if you need to do something more in depth. I haven't really found a good Mac equivalent (GIMP, Seashore) so I'd love one if you know of it
- [Inkscape](https://inkscape.org) - Vector graphics are becoming more and more common for the web because they let you scale large or small without losing quality. I've used Inkscape in the past to generate icons for my app and even "trace" my bitmap related images into SVG images for greater quality. This is a handy tool to have.
- [FavIcon Generator](https://www.favicon-generator.org) - You still need that pretty icon at the top of the browser and the simplest way still is with an .ico file. This tool will take your logo (did you use a tool above? 8^D) and generate what you need.
- [PWA Image Builder](https://www.pwabuilder.com/imageGenerator) - Once you have that logo ready, you're going to want to have all the proper configurations and sizes ready to make them happy on mobile devices. This tool does all the heavy lifting for you and made my life easier than constantly resizing and testing.

<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### What's Next?

<!-- /wp:heading -->

<!-- wp:paragraph -->

In the next post I'll outline the tools available to host your code, have a light CI/CD pipeline, and host your application online.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Do you have any free tools you use for your dev work?! I'd love to hear about them.

<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"left"} -->

Last year, as a means of doing a deeper dive into .Net Core and to fill a personal need, I built the [Bookmarkinator](http://www.bookmarkinator.gq). Simple, fun, and super helpful (at least for me). One of the requirements for this was that I could build a full-fledged app available to the public that cost me nothing (minus some elbow grease). It was a success, and I want to share the tools and resources that I used so that you can bootstrap your own app for free as well.

<!-- /wp:paragraph -->

<!-- wp:more -->

<!--more-->

<!-- /wp:more -->

<!-- wp:image -->

<!-- /wp:image -->

<!-- wp:paragraph -->

I'll outline the "why's" in a later post, but first, let's get through some of the resources needed to build in the app in the first place. A lot of these may seem like "no brainers", but it's worth mentioning, if only to refresh my forgetful brain a few more years down the line.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Editors / IDEs

<!-- /wp:heading -->

<!-- wp:paragraph -->

My very first code editor was a Borland C/C++ compiler. It was 10 floppy disks copied from a friend/mentor because I was a lowly high school student without a high paying job and compilers were expensive. Nowadays you can easily get away with using a "glorified text editor" and command line or a basic IDE to build your app. Here are a few of my favorites:

<!-- /wp:paragraph -->

<!-- wp:list -->

- [Visual Studio Code](https://code.visualstudio.com/) - It's really amazing at how fast Microsoft's Text Editor has taken form and established itself. Maybe they took a few queues from their predecessors like Sublime Text and Atom, but with the wide range of extensions available for nearly every programming language, basic Javascript / .Net debugging, and a built in terminal screen, you can get a LOT done for nothing. Bookmarkinator was built using this.
- [Visual Studio Community Edition](https://visualstudio.microsoft.com) - The original Visual Studio is not to be left in the dust though. Community Edition is all of the best features of their long standing IDE and they make it free for personal or small business use. The only things you can't do with it are install extensions (though a few are given special access to be installed) and use some deep data mining / test suite type tools. There's no reason you can't build something with this. I used it for my [Prayer Odyssey](http://www.prayerodyssey.com) app.
- [JetBrains PyCharm](https://www.jetbrains.com/pycharm/) - Are you doing Python development and need some extra code insights? PyCharm is the tool for you! It helped me out of a bind with an older project and the free community edition works amazingly well.

<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### Isolated Environment Management

<!-- /wp:heading -->

<!-- wp:paragraph -->

It used to run into the biggest problems with my PHP apps. I needed multiple versions to support different applications being built since upgrading was difficult or unfeasible. Likewise, back when the Apache 2.2 to 2.4 transition happened I wound up using a tool called MAMP to handle all of these configurations. MAMP updated my configuration defaults, but you could still run into problems if things didn't work out right. I didn't have nearly the same issues with .Net, but they were a possibility as well.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

I no longer have to worry about that thanks to [Docker](https://www.docker.com). Docker allows me to build isolated environments to match up to my specific dev needs. For Bookmarkinator, I was able to get a .Net Core 2.1 environment running, including an isolated version of SQL Server for Linux that I could fire up on either a Mac or a PC for my dev needs. Docker containers are deployable as well to a growing number of locations out there, which further helps overcome the typical challenges of deploying to a new environment. Give Docker a whirl, I think you'll love it.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Graphics Tools

<!-- /wp:heading -->

<!-- wp:paragraph -->

There's a chance you may need to build a logo, tweak a screenshot, or resize an image. The Adobe suite it still considered the best in class and is pricey, but here are a few things I've used to get by:

<!-- /wp:paragraph -->

<!-- wp:list -->

- [Paint.Net](https://www.getpaint.net) - Sorry Mac folks, you're out of luck on this one. Paint.Net has all the critical image editing tools out there for quick touchups. It also has the ability to work with image layers, giving you some advanced tools if you need to do something more in depth. I haven't really found a good Mac equivalent (GIMP, Seashore) so I'd love one if you know of it
- [Inkscape](https://inkscape.org) - Vector graphics are becoming more and more common for the web because they let you scale large or small without losing quality. I've used Inkscape in the past to generate icons for my app and even "trace" my bitmap related images into SVG images for greater quality. This is a handy tool to have.
- [FavIcon Generator](https://www.favicon-generator.org) - You still need that pretty icon at the top of the browser and the simplest way still is with an .ico file. This tool will take your logo (did you use a tool above? 8^D) and generate what you need.
- [PWA Image Builder](https://www.pwabuilder.com/imageGenerator) - Once you have that logo ready, you're going to want to have all the proper configurations and sizes ready to make them happy on mobile devices. This tool does all the heavy lifting for you and made my life easier than constantly resizing and testing.

<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### What's Next?

<!-- /wp:heading -->

<!-- wp:paragraph -->

In the next post I'll outline the tools available to host your code, have a light CI/CD pipeline, and host your application online.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Do you have any free tools you use for your dev work?! I'd love to hear about them.

<!-- /wp:paragraph -->
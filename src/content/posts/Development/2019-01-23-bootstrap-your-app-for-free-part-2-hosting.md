---
title: Bootstrap Your App For Free Part 2 Hosting
description: Apple Laptop
published: 2019-01-23
image: images/posts/2019-01-macbook-apple-imac-computer-39284.jpg
imageAlt: Apple Laptop
category: Development
tags: [cloud, coding, geekery, hosting, iaas, paas, providers]
---

<!-- wp:paragraph -->

In my [last entry](/bootstrap-your-app-for-free-part-1-tools-and-resources), I outlined how I was able to build my [Bookmarkinator](http://bookmarkinator.gq) app for free thanks to a variety of tools and platforms out there (no credit card or limited time demo software either!). Now that you've built your app, then next step is to get it hosted out in the wild. Here are some of my "go to" places that are free for the life of the project (or until a service changes).

<!-- /wp:paragraph -->

<!-- wp:more -->

<!--more-->

<!-- /wp:more -->

<!-- wp:image {"id":"media-30"} -->

![Apple Laptop](@assets/images/posts/2019-01-macbook-apple-imac-computer-39284.jpg)

Photo by Pixabay on [Pexels.com](https://www.pexels.com/photo/apple-laptop-notebook-office-39284/)

<!-- /wp:image -->

<!-- wp:heading {"level":3} -->

### One Benefit / One Requirement

<!-- /wp:heading -->

<!-- wp:paragraph -->

One benefit I like about all of these platforms is that they are easily upgradable. One [wise person](https://john.do/) I've followed a bit through the years has a motto of "just ship" and if you're going to do that, particularly early on, you don't need a full AWS T3.large server running beta 0.1 of the project. You want it in peoples hands and saving a few bucks along the way is wise. All of these platforms allow you to easily upgrade your hosting to a paid platform when (and if) you are ready.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

One requirement I had when setting up my hosting is that it needed to be 100% free. This included not requiring a credit card to be on file for "overages" or "for when you're ready to upgrade." Indirectly linked to above, my project may never be ready for upgrade, or it is running sufficient with the resources it has. Also, a lot of places that require the credit card also do it in case your usage goes over a certain threshold, and then they'll charge you. I'd rather have services stop than get an unexpected \$3K hosting bill the following month.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

With that said, here are a few 100% free app hosting platforms I've used (or am currently using) in alphabetical order (to prevent favoritism 8^D)

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### AppHarbor

<!-- /wp:heading -->

<!-- wp:paragraph -->

[AppHarbor](https://appharbor.com) is one the longest running platform as a service (PAAS) providers, and early on it was the only one I could find that focused on .Net technology.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

**Pros**: Lots of additional services (such as SQL Server, RavenDB, MemCached, MailGun) that also have free tier platforms to integrate with your app.

**Cons**: The UI is a little outdated and difficult to manage. While setup is easy in the sense that you point it to your repo (or use theirs), if something goes wrong it can be a little difficult to triage. Custom hostnames cost extra too.

**Current Apps**: [Trellodoro](http://trellodoro.apphb.com) (Trello + Pomodoro = Kanban Bliss), [Message Cube](http://messagecube.apphb.com) (really old attempt at fusing social media platforms - use at your own risk)

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### GearHost

<!-- /wp:heading -->

<!-- wp:paragraph -->

[Gearhost](https://www.gearhost.com) is an independent hosting company that has kept up with the major providers over the years and also does its own form of cloud hosting. They specialize in .Net, PHP, and Node.js hosting, which also includes MySQL and SQL Server hosting. They also provide domain and certificate services too.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

**Pros**: Modern UI interface that makes it easy to create and work with your platforms. Up to 100 cloud sites/databases for free. Use custom domains with your sites for free.

**Cons**: .Net Core deployments have been difficult, even though they say it is fully supported. However, continuous deployment options through popular Git platforms may have resolved this. Free SQL Server in only 10MB, so tread lightly on your data.

**Current Apps**: [Prayer Odyssey](http://www.prayerodyssey.com)

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Heroku

<!-- /wp:heading -->

<!-- wp:paragraph -->

[Heroku](https://www.heroku.com) labels itself as a "Cloud Application Platform" that works with all of your "modern" programming languages: .Net, Python, Scala, Go, and more. One of their biggest features is the ability to host Docker containers. With that you can have your environment completely isolated and verified, and then push to the cloud when ready.

**Pros:** Docker, Kalfka readily available. Easy to scale up apps when ready. Quickly deploy and create services from the console using their CLI tool.

**Cons:** CLI and Git are the only means to deploy, sometimes you need a simple FTP deploy. Adding SSL is extra.

**Current Apps:** [Bookmarkinator](http://www.bookmarkinator.gq)

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Why not the "Big 3" ??

<!-- /wp:heading -->

<!-- wp:paragraph -->

By now you may be wondering why Azure, AWS, or GCP aren't in the mix here. All three of these require a credit card to get started even if you're working with your free credits or your free sized systems. To date I haven't found a way to "throttle" my usage to make sure I don't accidentally go over my free tier bounds and I just don't want to hassle with it. Once one of my apps gets really big, then I'll look to transfer, since deployments are getting smoother and smoother nowadays.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### What's Next?

<!-- /wp:heading -->

<!-- wp:paragraph -->

The final step to all of this is making your app "bonafide" through a domain name and a SSL certificate so you're not messing with a 15 character subdomain that won't fit into a single line to share.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Get that app out in the wild!

<!-- /wp:heading -->

<!-- wp:paragraph -->

With all of these free (and reliable) hosting options out there, there's no excuse for you not to get your app out for the world to see. Multiple eyes is the best debug tool out there and since Google presented us with the "perpetual beta" that is Gmail, people are used to working with a 0.6 type release knowing there are better things on the way.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

If you know of any free hosting providers you like to use, let me know! I'm always looking to check out something new.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

In my [last entry](/bootstrap-your-app-for-free-part-1-tools-and-resources), I outlined how I was able to build my [Bookmarkinator](http://bookmarkinator.gq) app for free thanks to a variety of tools and platforms out there (no credit card or limited time demo software either!). Now that you've built your app, then next step is to get it hosted out in the wild. Here are some of my "go to" places that are free for the life of the project (or until a service changes).

<!-- /wp:paragraph -->

<!-- wp:more -->

<!--more-->

<!-- /wp:more -->

<!-- wp:image {"id":"media-30"} -->

![Apple Laptop](@assets/images/posts/2019-01-macbook-apple-imac-computer-39284.jpg)

Photo by Pixabay on [Pexels.com](https://www.pexels.com/photo/apple-laptop-notebook-office-39284/)

<!-- /wp:image -->

<!-- wp:heading {"level":3} -->

### One Benefit / One Requirement

<!-- /wp:heading -->

<!-- wp:paragraph -->

One benefit I like about all of these platforms is that they are easily upgradable. One [wise person](https://john.do/) I've followed a bit through the years has a motto of "just ship" and if you're going to do that, particularly early on, you don't need a full AWS T3.large server running beta 0.1 of the project. You want it in peoples hands and saving a few bucks along the way is wise. All of these platforms allow you to easily upgrade your hosting to a paid platform when (and if) you are ready.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

One requirement I had when setting up my hosting is that it needed to be 100% free. This included not requiring a credit card to be on file for "overages" or "for when you're ready to upgrade." Indirectly linked to above, my project may never be ready for upgrade, or it is running sufficient with the resources it has. Also, a lot of places that require the credit card also do it in case your usage goes over a certain threshold, and then they'll charge you. I'd rather have services stop than get an unexpected \$3K hosting bill the following month.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

With that said, here are a few 100% free app hosting platforms I've used (or am currently using) in alphabetical order (to prevent favoritism 8^D)

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### AppHarbor

<!-- /wp:heading -->

<!-- wp:paragraph -->

[AppHarbor](https://appharbor.com) is one the longest running platform as a service (PAAS) providers, and early on it was the only one I could find that focused on .Net technology.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

**Pros**: Lots of additional services (such as SQL Server, RavenDB, MemCached, MailGun) that also have free tier platforms to integrate with your app.

**Cons**: The UI is a little outdated and difficult to manage. While setup is easy in the sense that you point it to your repo (or use theirs), if something goes wrong it can be a little difficult to triage. Custom hostnames cost extra too.

**Current Apps**: [Trellodoro](http://trellodoro.apphb.com) (Trello + Pomodoro = Kanban Bliss), [Message Cube](http://messagecube.apphb.com) (really old attempt at fusing social media platforms - use at your own risk)

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### GearHost

<!-- /wp:heading -->

<!-- wp:paragraph -->

[Gearhost](https://www.gearhost.com) is an independent hosting company that has kept up with the major providers over the years and also does its own form of cloud hosting. They specialize in .Net, PHP, and Node.js hosting, which also includes MySQL and SQL Server hosting. They also provide domain and certificate services too.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

**Pros**: Modern UI interface that makes it easy to create and work with your platforms. Up to 100 cloud sites/databases for free. Use custom domains with your sites for free.

**Cons**: .Net Core deployments have been difficult, even though they say it is fully supported. However, continuous deployment options through popular Git platforms may have resolved this. Free SQL Server in only 10MB, so tread lightly on your data.

**Current Apps**: [Prayer Odyssey](http://www.prayerodyssey.com)

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Heroku

<!-- /wp:heading -->

<!-- wp:paragraph -->

[Heroku](https://www.heroku.com) labels itself as a "Cloud Application Platform" that works with all of your "modern" programming languages: .Net, Python, Scala, Go, and more. One of their biggest features is the ability to host Docker containers. With that you can have your environment completely isolated and verified, and then push to the cloud when ready.

**Pros:** Docker, Kalfka readily available. Easy to scale up apps when ready. Quickly deploy and create services from the console using their CLI tool.

**Cons:** CLI and Git are the only means to deploy, sometimes you need a simple FTP deploy. Adding SSL is extra.

**Current Apps:** [Bookmarkinator](http://www.bookmarkinator.gq)

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Why not the "Big 3" ??

<!-- /wp:heading -->

<!-- wp:paragraph -->

By now you may be wondering why Azure, AWS, or GCP aren't in the mix here. All three of these require a credit card to get started even if you're working with your free credits or your free sized systems. To date I haven't found a way to "throttle" my usage to make sure I don't accidentally go over my free tier bounds and I just don't want to hassle with it. Once one of my apps gets really big, then I'll look to transfer, since deployments are getting smoother and smoother nowadays.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### What's Next?

<!-- /wp:heading -->

<!-- wp:paragraph -->

The final step to all of this is making your app "bonafide" through a domain name and a SSL certificate so you're not messing with a 15 character subdomain that won't fit into a single line to share.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Get that app out in the wild!

<!-- /wp:heading -->

<!-- wp:paragraph -->

With all of these free (and reliable) hosting options out there, there's no excuse for you not to get your app out for the world to see. Multiple eyes is the best debug tool out there and since Google presented us with the "perpetual beta" that is Gmail, people are used to working with a 0.6 type release knowing there are better things on the way.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

If you know of any free hosting providers you like to use, let me know! I'm always looking to check out something new.

<!-- /wp:paragraph -->
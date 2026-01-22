---
title: Sharing The Love Zurb Foundation For Apps Scaffolding For Net With Authentication
description: Sharing The Love Zurb Foundation For Apps Scaffolding For Net With Authentication
published: 2015-01-20
category: Development
tags: [net, angularjs, apps, coding, foundation, scaffold, zurb]
---

TLDR;

NuGet package [here](https://www.nuget.org/packages/z4a-dotnet-scaffold-auth/).

Github repository [here](https://github.com/Dillie-O/z4a-dotnet-scaffold-auth).

A little while back I was really excited that Zurb released their [Foundation for Applications](http://foundation.zurb.com/apps) (ZFA) library. I’ve been working with it a little and really like the results. I’ve learned some new things along the way and it’s helping be do a “platform shift” for my side project: [Prayer Journal](http://prayerjournal.firebaseapp.com). I even created an [initial scaffolding](/soup-to-nuts-using-zurb-foundation-for-apps-in-net) that others can use to start up their .Net apps. But I still needed to be able to let users create accounts and restrict access to pages, so a new scaffold was born, one with authentication.

<!--more-->

### The Basic s

The core of the authentication piece deserves a HUGE hat tip to Taiseer Joudah, who wrote an [amazing series](http://bitoftech.net/2014/06/01/token-based-authentication-asp-net-web-api-2-owin-asp-net-identity/) about how to build an app with a .Net web service backend and use an AngularJS architecture on the front end for client interaction. The series shows how to password protect only the pages you need to, as well as include other login services (such as Facebook and Twitter) to integrate into your application. I was able to go through the series, and adapt the code to the ZFA framework where needed.

I won’t go into a “soup to nuts” outline of the framework like I did for my previous scaffolding. I would highly recommend you read Taiseer’s [series](http://bitoftech.net/2014/06/01/token-based-authentication-asp-net-web-api-2-owin-asp-net-identity/) to get a better working knowledge of the WebAPI backend and the AngularJS factories/services used to handle authentication, and then read my [previous article](/soup-to-nuts-using-zurb-foundation-for-apps-in-net) on using ZFA in .Net to really get an in depth look of what is going on. For now, I’ll cover a few of the basics about how this scaffolding is organized.

### Authent ication

As mentioned earlier, .Net provides a great set of libraries to cover [OWIN](http://owin.org) (its open web protocol) and [WIF](http://msdn.microsoft.com/en-us/library/ee748475.aspx) (it’s updated identity management foundation). Since our single page application framework doesn’t play as nice with your typical cookie based authentication model (and any future mobile apps that might queue into this API wouldn’t either) we go with the newer and more flexible signed token approach. The great thing about this is that .Net gives us about 90% of this code out of the box with the frameworks mentioned above. We simply need to provide the appropriate wiring and configuration for our functions.

### WebA PI

Instead of using a MVC approach (though in a lot of ways this approach is MVC), we went and used the .Net WebAPI for all of our processing. This gives us the flexibility of using the same core code base with mobile applications and our front end framework plays quite nice with WebAPI. Again, thanks to the .Net libraries available, 90% of the work is done for us. We simply install the library, wire up some basic configuration code, and start building the API calls we need.

### Zurb / Angula r

Our front end uses AngularJS for our single page application framework. I’m still pretty new to the framework but really love how clean it makes a lot of the intense data binding/watching/updating methods that I used to have to work with. The template architecture provided by ZFA works great with AngularJS’s dynamic routing model and we have nicely compressed stylesheets/resources for optimal performance. There are plenty of “eye candy” type plugins as well for those fancy effects you may think are only available in a jQuery/Bootstrap environment.

### How to Us e

Start an empty solution in Visual Studio. Open up the package manager console and run the following command:

```Install-Package z4a-dotnet-scaffold-auth```

This will pull down the scaffolding and get the initials in place. Since this scaffold is a little more complex than the basic one, we do need to effectively “rebuild” our front end code base, as well as our backend database. The readme file that is attached will have the rest of the details.

### G o Make Something Great!

I hope this becomes a good resource for you to get going with what I like to call the “ZANS” architecture. I’d love to hear about what apps you’re building with it and if you run into any issues with it. Enjoy!

TLDR;

NuGet package [here](https://www.nuget.org/packages/z4a-dotnet-scaffold-auth/).

Github repository [here](https://github.com/Dillie-O/z4a-dotnet-scaffold-auth).

A little while back I was really excited that Zurb released their [Foundation for Applications](http://foundation.zurb.com/apps) (ZFA) library. I’ve been working with it a little and really like the results. I’ve learned some new things along the way and it’s helping be do a “platform shift” for my side project: [Prayer Journal](http://prayerjournal.firebaseapp.com). I even created an [initial scaffolding](/soup-to-nuts-using-zurb-foundation-for-apps-in-net) that others can use to start up their .Net apps. But I still needed to be able to let users create accounts and restrict access to pages, so a new scaffold was born, one with authentication.

<!--more-->

### The Basic s

The core of the authentication piece deserves a HUGE hat tip to Taiseer Joudah, who wrote an [amazing series](http://bitoftech.net/2014/06/01/token-based-authentication-asp-net-web-api-2-owin-asp-net-identity/) about how to build an app with a .Net web service backend and use an AngularJS architecture on the front end for client interaction. The series shows how to password protect only the pages you need to, as well as include other login services (such as Facebook and Twitter) to integrate into your application. I was able to go through the series, and adapt the code to the ZFA framework where needed.

I won’t go into a “soup to nuts” outline of the framework like I did for my previous scaffolding. I would highly recommend you read Taiseer’s [series](http://bitoftech.net/2014/06/01/token-based-authentication-asp-net-web-api-2-owin-asp-net-identity/) to get a better working knowledge of the WebAPI backend and the AngularJS factories/services used to handle authentication, and then read my [previous article](/soup-to-nuts-using-zurb-foundation-for-apps-in-net) on using ZFA in .Net to really get an in depth look of what is going on. For now, I’ll cover a few of the basics about how this scaffolding is organized.

### Authent ication

As mentioned earlier, .Net provides a great set of libraries to cover [OWIN](http://owin.org) (its open web protocol) and [WIF](http://msdn.microsoft.com/en-us/library/ee748475.aspx) (it’s updated identity management foundation). Since our single page application framework doesn’t play as nice with your typical cookie based authentication model (and any future mobile apps that might queue into this API wouldn’t either) we go with the newer and more flexible signed token approach. The great thing about this is that .Net gives us about 90% of this code out of the box with the frameworks mentioned above. We simply need to provide the appropriate wiring and configuration for our functions.

### WebA PI

Instead of using a MVC approach (though in a lot of ways this approach is MVC), we went and used the .Net WebAPI for all of our processing. This gives us the flexibility of using the same core code base with mobile applications and our front end framework plays quite nice with WebAPI. Again, thanks to the .Net libraries available, 90% of the work is done for us. We simply install the library, wire up some basic configuration code, and start building the API calls we need.

### Zurb / Angula r

Our front end uses AngularJS for our single page application framework. I’m still pretty new to the framework but really love how clean it makes a lot of the intense data binding/watching/updating methods that I used to have to work with. The template architecture provided by ZFA works great with AngularJS’s dynamic routing model and we have nicely compressed stylesheets/resources for optimal performance. There are plenty of “eye candy” type plugins as well for those fancy effects you may think are only available in a jQuery/Bootstrap environment.

### How to Us e

Start an empty solution in Visual Studio. Open up the package manager console and run the following command:

```Install-Package z4a-dotnet-scaffold-auth```

This will pull down the scaffolding and get the initials in place. Since this scaffold is a little more complex than the basic one, we do need to effectively “rebuild” our front end code base, as well as our backend database. The readme file that is attached will have the rest of the details.

### G o Make Something Great!

I hope this becomes a good resource for you to get going with what I like to call the “ZANS” architecture. I’d love to hear about what apps you’re building with it and if you run into any issues with it. Enjoy!
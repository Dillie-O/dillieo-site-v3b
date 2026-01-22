---
title: Quick Tip Taking Your Aspnet Application Offline
description: Quick Tip Taking Your Aspnet Application Offline
published: 2010-07-08
category: Development
tags: [aspnet, coding, configuration, offline, quick-tip]
---

ASP.Net is friendly enough that if you have to make a change to your application, you can simply copy the files up to the server location and be done with it (the noted XCopy method). A user currently using the application will work with an old copy of the DLL until their session is finished, whereas the new users will get a new copy of the DLL.

There are times, however, where a more robust update process is involved (adding some database entities, making sure session data is completely flushed, adding resource files) and you need to take the user offline. If you are running your own server, or have a single application on the server, this is a pretty simple process. You can simply shut down IIS altogether, or have the IIS entry redirect to a different page at the domain level, that way users can't get into the application through any vector.

If you're on a shared host, or have multiple applications using the same application pool, or just want a really quick way to take your application offline, there is a simple method by using one single file. I discovered this trick about a year and a half back while working on my netrep project and we just used it again the other day here at work.

Starting with .Net 2.0, if you need to take a web application offline, you simply need to upload a properly formatted HTML document named app_offline.htm and IIS/ASP.Net Worker Process handles the rest. Any users, current or new, reaching the application will be presented with your offline HTML page, as well as send a Server 200 response back to the browser. When you're ready to bring the application online again, simply remove the file, or better yet, rename it to app_offline_disabled.htm or something else and save it for the next time you need to take things offline.

That's it! No mess, no fuss, IMMENSE benefit! There were even some delusions of grandeur in my group about making a simple web application for our server admins to to allow them to simply check the web apps that need to go offline when an update is being made and it would automatically process these files.

The one small caveat to this is that you have to make your HTML file greater than 512 bytes in size. Otherwise, Internet Explorer (and potentially other browsers) will attempt to display a "friendly" error message to you, like they would on other sites when encountering 400, 200, 500, and other server return codes.

Enjoy!

ASP.Net is friendly enough that if you have to make a change to your application, you can simply copy the files up to the server location and be done with it (the noted XCopy method). A user currently using the application will work with an old copy of the DLL until their session is finished, whereas the new users will get a new copy of the DLL.

There are times, however, where a more robust update process is involved (adding some database entities, making sure session data is completely flushed, adding resource files) and you need to take the user offline. If you are running your own server, or have a single application on the server, this is a pretty simple process. You can simply shut down IIS altogether, or have the IIS entry redirect to a different page at the domain level, that way users can't get into the application through any vector.

If you're on a shared host, or have multiple applications using the same application pool, or just want a really quick way to take your application offline, there is a simple method by using one single file. I discovered this trick about a year and a half back while working on my netrep project and we just used it again the other day here at work.

Starting with .Net 2.0, if you need to take a web application offline, you simply need to upload a properly formatted HTML document named app_offline.htm and IIS/ASP.Net Worker Process handles the rest. Any users, current or new, reaching the application will be presented with your offline HTML page, as well as send a Server 200 response back to the browser. When you're ready to bring the application online again, simply remove the file, or better yet, rename it to app_offline_disabled.htm or something else and save it for the next time you need to take things offline.

That's it! No mess, no fuss, IMMENSE benefit! There were even some delusions of grandeur in my group about making a simple web application for our server admins to to allow them to simply check the web apps that need to go offline when an update is being made and it would automatically process these files.

The one small caveat to this is that you have to make your HTML file greater than 512 bytes in size. Otherwise, Internet Explorer (and potentially other browsers) will attempt to display a "friendly" error message to you, like they would on other sites when encountering 400, 200, 500, and other server return codes.

Enjoy!
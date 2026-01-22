---
title: Logging Client Errors Using Log4Net Mvc And Ajax
description: Logging Client Errors Using Log4Net Mvc And Ajax
published: 2012-12-03
category: Development
tags: [ajax, client, coding, errors, javascript, log4net, logging]
---

As you know, I'm a big fan of log4net. I love the flexibility it has and the power you can leverage with it. One thing I've been wanting to do for a while now is to be able to log client side messages in my logs. That way if there is an error due to a data call misfiring, some poorly formatted JSON, or I simply want to track some user clicks, I can have access to it. Thanks to AJAX and MVC controllers, I can now do this quickly and easily.

<!--more-->

The first step is to have log4net up and running in your web application. If you don't yet, I have a [tutorial](/log4net-a-quick-start-tutorial-and-guide-with-mvc-and-sqlite) that can get you up and running quickly.

Once log4net is up and running, the first step is to create a controller to handle the logging process. I called mine "ClientLogController" and defined the methods as follows:

\[gist]4172572

You'll notice that I have each logging level setup as it's own method. I do this so that if I need to do some custom processing in the future (such as pull some server diagnostic information on a fatal error) I can do so just for that level and keep everything separate. You'll also notice that my method are void methods. I'm not planning on returning anything to the client. If a logging call fails, it fails, and there's nothing I can do about it, except fire up the debugger in Visual Studio or use the debug mode in log4net. I'm fine with this. If you do need to track the results, it is simple enough to update the methods to use ActionResults and return the PartialView of your choice.

The next step is to create the JavaScript method that will make our AJAX request to the controller. I create a file called logging.js and add the following:

\[gist]4172612

You'll notice here that I have split up the logging events again based on type, to allow me to do additional processing if needs be (such as pop up a modal box on FATAL errors). I also use the .ajax() method instead of the .post() method, since I have additional configuration options if I need them for processing success/fail messages in the future.

That's all you need. Simply add logging.js to your layout page and you can quickly wire up a button to test your logging as follows:

```<input type="button" value="Log Me!" onClick="LogDebug('test debugging'); alert('Test complete.');" />```

That's all you need! With the increasing amount of client side processing and AJAX requests that are in modern web applications, being able to easily track errors (or details) without having to dump information to the screen or having your end users try to explain what happens is more valuable than ever. Using log4net and AJAX will allow you track these items without a lot of overhead.

Enjoy!

As you know, I'm a big fan of log4net. I love the flexibility it has and the power you can leverage with it. One thing I've been wanting to do for a while now is to be able to log client side messages in my logs. That way if there is an error due to a data call misfiring, some poorly formatted JSON, or I simply want to track some user clicks, I can have access to it. Thanks to AJAX and MVC controllers, I can now do this quickly and easily.

<!--more-->

The first step is to have log4net up and running in your web application. If you don't yet, I have a [tutorial](/log4net-a-quick-start-tutorial-and-guide-with-mvc-and-sqlite) that can get you up and running quickly.

Once log4net is up and running, the first step is to create a controller to handle the logging process. I called mine "ClientLogController" and defined the methods as follows:

\[gist]4172572

You'll notice that I have each logging level setup as it's own method. I do this so that if I need to do some custom processing in the future (such as pull some server diagnostic information on a fatal error) I can do so just for that level and keep everything separate. You'll also notice that my method are void methods. I'm not planning on returning anything to the client. If a logging call fails, it fails, and there's nothing I can do about it, except fire up the debugger in Visual Studio or use the debug mode in log4net. I'm fine with this. If you do need to track the results, it is simple enough to update the methods to use ActionResults and return the PartialView of your choice.

The next step is to create the JavaScript method that will make our AJAX request to the controller. I create a file called logging.js and add the following:

\[gist]4172612

You'll notice here that I have split up the logging events again based on type, to allow me to do additional processing if needs be (such as pop up a modal box on FATAL errors). I also use the .ajax() method instead of the .post() method, since I have additional configuration options if I need them for processing success/fail messages in the future.

That's all you need. Simply add logging.js to your layout page and you can quickly wire up a button to test your logging as follows:

```<input type="button" value="Log Me!" onClick="LogDebug('test debugging'); alert('Test complete.');" />```

That's all you need! With the increasing amount of client side processing and AJAX requests that are in modern web applications, being able to easily track errors (or details) without having to dump information to the screen or having your end users try to explain what happens is more valuable than ever. Using log4net and AJAX will allow you track these items without a lot of overhead.

Enjoy!
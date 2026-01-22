---
title: Quick Tip Adding Logentries To Laravel 50
description: Quick Tips
published: 2015-09-09
image: images/posts/2014-05-quick-tips.webp
imageAlt: Quick Tips
category: Default
tags: [coding, laravel, logentries, logging]
---

I've used [LogEntries](http://www.logentries.com) on a couple of projects now and I really like it. They provide a really simple API in which you can send your logging entries to and be able to view it online. This comes in handy when you don't always have access to the servers, or want some additional alerts without having to set them up yourself.

While there isn't a "specialized" plugin for Laravel, Laravel does use MonoLog by default, which has a LogEntries writer built into it. The [current documentation](https://blog.logentries.com/2014/09/logging-from-php-web-frameworks-like-laravel/) available works with version 4.2. However, in version 5.0, they removed the start/global.php file, requiring a slightly different approach.

<!--more-->

![Quick Tips](@assets/images/posts/2014-05-quick-tips.jpg)

Laravel 5.0 now takes advantage of service providers, instead of the "catch all" that was typically used in the global.php file. While you could build out your own logging provider, I found that since all I'm doing is registering LogEntries in addition to the default file logger, I would use the existing providers. Here's what you need to do.

Once you've created a LogEntries account and generated you "Manual TCP" token, open up the app/Providers/AppServiceProvider.php file. In here you'll find a method named register() that may have some code in it. Add the following lines before the end of the method:

```$logEntriesHandler = new LogEntriesHandler(env('LOGENTRIES_TOKEN')); $log = $this->app\['log']->getMonolog(); $log->pushHandler(\$logEntriesHandler);```

One other thing, make sure to add the LogEntriesHandler reference at the top of the file:

```use Monolog\\Handler\\LogEntriesHandler;```

You'll notice that we're storing our token in the .env file in case we want to change it on the fly. This code will pull up the existing application object and get the logger. We'll then push in the LogEntries handler into it, and we're done. Now whenever an event is logged, it'll log to the file AND to our LogEntries account.

That's all there is to it! Now you should start seeing log entries trickle into your LogEntries account.

Note, this works with 5.0, and I suspect 5.1. However, 5.1 has a lovely "configureMonologUsing" method that you can put in your app.php file that I think will make this even nicer. I'll have a followup on that once I upgrade to 5.1

Enjoy!
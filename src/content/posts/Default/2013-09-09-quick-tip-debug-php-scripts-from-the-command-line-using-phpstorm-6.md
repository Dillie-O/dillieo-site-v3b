---
title: Quick Tip Debug Php Scripts From The Command Line Using Phpstorm 6
description: Quick Tip
published: 2013-09-09
image: images/posts/2011-12-quicktip.jpg
imageAlt: Quick Tip
category: Default
tags: [cli, coding, command-line, command-line-interface, debugging, php, php-development, phpstorm]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

I'm a big fan of [PHPStorm](http://www.jetbrains.com/phpstorm/). It has made my PHP development life so much easier, especially with debugging. I've been trying to debug a PHP script from the command line (to diagnose a cron job that runs on our server) and here's how you can do it using PHP Storm.

<!--more-->

_Note: This tip assumes that you already have PHP Storm running and debugging is successfully working. If you don't, check out [this article](https://www.jetbrains.com/phpstorm/webhelp/debugging-with-a-php-web-application-debug-configuration.html) on how you can get things setup._

1. The first thing to do is to start up your site to debug as usual. Click the icon or hit Ctrl+D (or ^D for Mac users) to launch.

2. The next step is to grab the "idekey" used by PHPStorm when it launched the debugger and add this to your CLI path environment. To do this, simply execute the following:

```export XDEBUG_CONFIG="idekey=session_name"```

1. Finally, execute your PHP statement from the command prompt in your project directory. You should hit the proper breakpoints if you have them set.

That's it! I can't believe it took me this long to piece it together!
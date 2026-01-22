---
title: Quick Tip Enabling Xdebug In Mamp For Osx
description: Quick Tip Enabling Xdebug In Mamp For Osx
published: 2015-03-10
image: images/posts/2015-03-xdebug_mamp.jpg
imageAlt: Quick Tip Enabling Xdebug In Mamp For Osx
category: Default
tags: [coding, configure, mamp, php, xdebug]
---

I’ve swapped over to [MAMP](http://mamp.info) for my local web development needs on OSX. I work with a variety of projects that require different versions of PHP, and MAMP allows me to change the PHP version quickly and easily. It also comes with a preconfigured MySQL instance for my database needs.

By default, XDebug is not enabled in MAMP. I found plenty of MAMP Pro posts on how to setup XDebug, but not for simple MAMP. Here’s what you need to do.

<!--more-->

![](@assets/images/posts/2015-03-xdebug_mamp.jpg)

Really the only trick to know is that MAMP keeps two configuration files for each PHP version. One serves as a template when you start up PHP. There are two files you need to edit:

```
/Applications/MAMP/conf/php\[version]/php.ini

/Applications/MAMP/bin/php/php\[version]/conf/php.ini
```

In both of these files, go down to the very bottom of the config file, where the \[xdebug] section is, and uncomment ( remove the ; ) zend_extension line. In addition, add the following lines:

```xdebug.remote_autostart=1 xdebug.remote_enable=1 xdebug.remote_host=localhost xdebug.remote_port=9000 xdebug.remote_handler=dbgp```

The final result will look something like this:

```[xdebug] zend_extension="/Applications/MAMP/bin/php/php5.4.34/lib/php/extensions/no-debug-non-zts-20100525/xdebug.so" xdebug.remote_autostart=1 xdebug.remote_enable=1 xdebug.remote_host=localhost xdebug.remote_port=9000 xdebug.remote_handler=dbgp```

Restart MAMP (or launch it if you haven’t done so yet) and XDebug should be all set for whatever environment you use!

Hope this helps!
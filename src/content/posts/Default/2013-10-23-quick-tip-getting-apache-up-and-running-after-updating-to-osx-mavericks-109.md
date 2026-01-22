---
title: Quick Tip Getting Apache Up And Running After Updating To Osx Mavericks 109
description: Quick Tip
published: 2013-10-23
image: images/posts/2011-12-quicktip.webp
imageAlt: Quick Tip
category: Default
tags: [apache, coding, osx-mavericks, servers, tips, virtual-hosting]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

So you've taken the plunge and are now running the latest and greatest OSX Mavericks. You've hit one snag though. All of your local websites that you've built and run through apache are simply returning an "It Works!" page. Don't Fret! When OSX updated itself, it updated it's Apache install, essentially overwriting your /private/etc/apache2/httpd.conf file. However, before doing this, it created a backup of this file and named it https.conf.pre-update.

Simply pull up your favorite Diff tool (I really like [DiffMerge](http://www.sourcegear.com/diffmerge/) from [SourceGear](http://www.sourcegear.com)), find the differences, and apply the changes. For me it simply meant re-enabling virtual hosts and PHP5. Restart apache when you're done and you're good to go!

Note: If you don't have a httpd.conf.pre-update file, or it seems to not have the right values, check for a https.conf~previous file. I had one named that which included my homebrew modifications that were made.
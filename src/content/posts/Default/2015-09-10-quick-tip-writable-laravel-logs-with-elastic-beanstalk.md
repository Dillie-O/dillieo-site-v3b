---
title: Quick Tip Writable Laravel Logs With Elastic Beanstalk
description: Laravel-5.png
published: 2015-09-10
image: images/posts/quick_tip_writable_laravel_logs_with_elastic_beanstalk.webp
imageAlt: Laravel-5.png
category: Default
tags: [life]
---

A while ago I wrote an article outlining deploying [Laravel to Elastic Beanstalk](/laravel-5-configurations-in-aws-elastic-beanstalk). While this worked great, I started running into problems surrounding an error that Laravel couldn't write to it's log files. I had tried adding code to the pre-deploy scripts to update folder settings, but this didn't work. After a little more digging, I found you can use a post-deploy script. It looks a bit different (and doesn't have much documentation) but it does the trick.

<!--more-->

![Laravel-5.png](../img_post/2015-09-10-quick-tip-writable-laravel-logs-with-elastic-beanstalk/2015-05-laravel-51.png)

In your .ebextensions folder, create a file and name it what you like, as long as it is sequentially at the end. Mine is named '04postdeploy.config' Then in that file add the following code:

```files: "/opt/elasticbeanstalk/hooks/appdeploy/post/99_make_storage_writable.sh": mode: "000755" owner: root group: root content: | #!/usr/bin/env bash chmod -R 777 /var/app/current/storage```

...and that is it! The first line is the name of the script file to create, and that can be arbitrary, though you can change the numbering if you have multiple post deploy files. Elastic Beanstalk deploys the code into the /var/app/current folder (you may notice "ondeck" being used in pre-deploy scripts, so we can make sure we target the write location to update our permissions.

Enjoy!
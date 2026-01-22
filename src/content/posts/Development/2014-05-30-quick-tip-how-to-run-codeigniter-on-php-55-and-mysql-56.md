---
title: Quick Tip How To Run Codeigniter On Php 55 And Mysql 56
description: Quick Tip How To Run Codeigniter On Php 55 And Mysql 56
published: 2014-05-30
category: Development
tags: [codeigniter, coding, error, mysql, mysqli, php, yield]
---

This isn't a "production endorsed" solution, but it's something that can get you by in a pinch. After reformatting my MacBook Pro and installing PHP 5.5 and MySQL 5.6 on it, I found that an old CodeIgniter application I was supporting wouldn't run for me. After some error diagnosis (and code hacking) I was able to make things work by doing the following:

1\. Change your config/database.php file to use the "mysqli" database driver. The "mysql" one is for older versions and will call deprecated methods if used.

1. Rename and remap your "Yield" class. In PHP 5.5 there is is a new yield language construct, and that will interfere with the Yield class/method that CodeIgniter uses. To fix this:

1) Modify your hooks/Yield_hook.php file and rename the class to "Yield_hook"
2) In your config/hooks.php file, change the first hook mapping from class "Yield" to "Yield_hook"

Once you've saved those files, you should be up and running.

This isn't a "production endorsed" solution, but it's something that can get you by in a pinch. After reformatting my MacBook Pro and installing PHP 5.5 and MySQL 5.6 on it, I found that an old CodeIgniter application I was supporting wouldn't run for me. After some error diagnosis (and code hacking) I was able to make things work by doing the following:

1\. Change your config/database.php file to use the "mysqli" database driver. The "mysql" one is for older versions and will call deprecated methods if used.

1. Rename and remap your "Yield" class. In PHP 5.5 there is is a new yield language construct, and that will interfere with the Yield class/method that CodeIgniter uses. To fix this:

1) Modify your hooks/Yield_hook.php file and rename the class to "Yield_hook"
2) In your config/hooks.php file, change the first hook mapping from class "Yield" to "Yield_hook"

Once you've saved those files, you should be up and running.
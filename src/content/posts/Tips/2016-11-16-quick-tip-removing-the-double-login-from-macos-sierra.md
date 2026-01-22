---
title: Quick Tip Removing The Double Login From Macos Sierra
description: quick-tips.jpg
published: 2016-11-16
image: images/posts/2015-01-quick-tips.png
imageAlt: quick-tips.jpg
category: Tips
tags: [appleid, filevault, geekery, login, mac, osx]
---

When I upgraded to macOS Sierra about a month ago, I was given a notice that my admin password needed to change, so I went ahead and added a new one. After that, I ran into an odd situation during reboot. I would have to "log in" twice: once with my Apple ID and then with my admin password. While this wasn't a huge deal, it was a bit annoying and a bit confusing a well.

It turned out that during the upgrade process (or maybe before and I never noticed) that my FileVault encryption password had been tied to my Apple ID account. While this is handy as a means of unlocking the computer, it caused the "double login" because the Apple ID was only working to access drive contents, then you had to login as usual.

To fix it: I disabled FileVault and re-enabled it again, but used a GUID generated key that was tied to the keychain. I made sure to print out the key and put it in a safe place. Now there is no "double login" problems, since the OS can use the keychain and unlock itself.

<!--more-->

![quick-tips.jpg](@assets/images/posts/2015-01-quick-tips.png)

When I upgraded to macOS Sierra about a month ago, I was given a notice that my admin password needed to change, so I went ahead and added a new one. After that, I ran into an odd situation during reboot. I would have to "log in" twice: once with my Apple ID and then with my admin password. While this wasn't a huge deal, it was a bit annoying and a bit confusing a well.

It turned out that during the upgrade process (or maybe before and I never noticed) that my FileVault encryption password had been tied to my Apple ID account. While this is handy as a means of unlocking the computer, it caused the "double login" because the Apple ID was only working to access drive contents, then you had to login as usual.

To fix it: I disabled FileVault and re-enabled it again, but used a GUID generated key that was tied to the keychain. I made sure to print out the key and put it in a safe place. Now there is no "double login" problems, since the OS can use the keychain and unlock itself.

<!--more-->

![quick-tips.jpg](@assets/images/posts/2015-01-quick-tips.png)
---
title: Quick Tip Fixing Ssh Bitbucket Error In Windows 10 On Vmware Fusion
description: Quick Tip
published: 2016-02-11
image: images/posts/2011-12-quicktip.jpg
imageAlt: Quick Tip
category: Development
tags: [bitbucket, coding, debugging, ssh, vmware-fusion, windows-10]
---

I started seeing an odd bug when trying to push/pull code from Bitbucket:

```ssh: Could not resolve hostname bitbucket.org: Non-recoverable failure in name resolution fatal: Could not read from remote repository.```

Oddly enough doing a ping against the site works just fine. In my case I'm using VMWare Fusion, and changing the network settings from Bridged to NAT doesn't solve anything.

While full diagnostics are still not in, it appears that Visual Studio 2015 is installing a newer version of msysgit, which seems to cause the problem. The solution is to simply add the IP address to bitbucket in your hosts file and everything starts to work again.

It looks like VMWare might be looking into this, but it's hard to "point blame" at this point. Things are working, so I'm happy for now. 8^D

<!--more-->

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

I started seeing an odd bug when trying to push/pull code from Bitbucket:

```ssh: Could not resolve hostname bitbucket.org: Non-recoverable failure in name resolution fatal: Could not read from remote repository.```

Oddly enough doing a ping against the site works just fine. In my case I'm using VMWare Fusion, and changing the network settings from Bridged to NAT doesn't solve anything.

While full diagnostics are still not in, it appears that Visual Studio 2015 is installing a newer version of msysgit, which seems to cause the problem. The solution is to simply add the IP address to bitbucket in your hosts file and everything starts to work again.

It looks like VMWare might be looking into this, but it's hard to "point blame" at this point. Things are working, so I'm happy for now. 8^D

<!--more-->

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)
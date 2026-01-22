---
title: Developer Nirvana The Osx Vmware Fusion Visual Studio 2010 Amalgamation
description: OSX Win7 Fusion
published: 2012-03-14
image: images/posts/2012-03-osx_win7_fusion.png
imageAlt: OSX Win7 Fusion
category: Default
tags: [geekery, mac, osx, programming, tools, virtualization, visual-studio, vmware-fusion, windows-7]
---

![OSX Win7 Fusion](@assets/images/posts/2012-03-osx_win7_fusion.png)

I mentioned a little while back that my job has ben jumping through a lot of different environments in order to get my work done. I'm doing PHP development in OSX to be on the same page as the my fellow developers. I also do .Net development for some of the clients we have. Previously, I've been working in a dual boot environment, swapping between two OSes as needed and relying on [cloud life](/cloud-life-5-free-tools-to-get-what-you-need-whenever-and-wherever-you-need-it). Sometimes this doesn't work out the best.

<!--more-->

For instance, I may be working on a PHP project, and half way through the day, at urgent .Net request comes up, and I need to shut down what I'm doing, fire reboot into the Windows 7 partition to work. This causes me to lose time, and a bit of focus as I shift gears and wait for the other system to boot up. Also, for purely selfish reasons, the version of [Trillian](http://trillian.im) that runs on Windows is far more robust than the version for Mac. They have admitted they are updating the Mac version, but having the best in any field would be wonderful. I'll also add that the [TOAD](http://toadworld.com/) suite for database work is hands down the best. It's only available on Windows (though free!)

Finally, after a tasty upgrade to 8GB of RAM on my MacBook Pro, I was able to get the bet of both worlds, thanks to [VMWare Fusion's](http://www.vmware.com/products/fusion/features.html) Unity Mode. You're probably aware of VMWare Fusion. It's in the same category as Parallels or VirtaBox in that you can run a virtual machine of a different OS. This is great for creating a test suite of computers to verify your website look just fine in Chrome across Windows, Mac, and Unix. In addition, VMWare Fusion has a thing called "Unity Mode". This allows you to "hide" the virtual machine window that you typically see, and all of the applications run in their own windows on the desktop, as if they were native applications.

This is what hits the ball out of the park and makes life AMAZINGLY simpler for me. During the day, I can now keep Visual Studio 2010 and Aptana Studio 3 open at the same time for the various development tasks I'm doing. I can open up a Windows Explorer window, an OSX Finder Window, and copy any files I need to across system lines, without a hassle. Since Trillian runs better in Windows, I just start that up and use it like I would anything else. It is truly a BEAUTIFUL site to see AND work with.

I will add a couple notes that you should be mindful of when running this setup.

- You'll need 8GB of RAM. I've read stuff before saying 4 would be just fine, but I was using 4 for the longest time and I would always get hiccups, to the point that both OSes would halt. Not an issue anymore.
- Create a Boot Camp partition, and then let VMWare boot from that. You will get [better performance this way](http://apple.stackexchange.com/questions/13512/pros-and-cons-of-boot-camp-virtualization-for-windows-7), and don't have to deal with a VM file going bad.
- Make sure to [configure time machine to ignore the virtual machine files](http://kb.vmware.com/kb/1014046). Otherwise you'll have a 4GB backup starting up every hour, and this is not desirable.
- While in Unity mode, it appears that you can't move a given window to another virtual desktop (if you're using spaces). That's not that big of a deal for me, I just close the app and open it on the space I need.
- It's hard to get an application to launch an app as an Administrator (elevated privileges) while in Unity mode, unless the app itself asks for it. The trick to this is to swap back into Single Window or Full Screen mode and launch it that way. You don't have to worry about losing your running apps, it just takes a little longer to swap modes back and forth.

My productivity has never been better since getting Unity mode to run, and I feel that much more geekish in the process. 8^D If you're run into any other handy VMWare (or any other virtual machine app for that matter), kindly drop it my way.
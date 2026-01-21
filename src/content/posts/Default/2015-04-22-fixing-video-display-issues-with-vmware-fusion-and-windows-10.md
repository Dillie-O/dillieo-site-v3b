---
title: Fixing Video Display Issues With Vmware Fusion And Windows 10
description: Fixing Video Display Issues With Vmware Fusion And Windows 10
published: 2015-04-22
image: images/posts/fixing_video_display_issues_with_vmware_fusion_and_windows_10.webp
imageAlt: Fixing Video Display Issues With Vmware Fusion And Windows 10
category: Default
tags: [display, geekery, troubleshooting, video, vmware, windows-10]
---

I’ve really been enjoying Windows 10, even while in the Technical Preview mode. I think they’ve done a fabulous job at bridging the gap between the “traditional desktop” and the “metro interface” (the “convergence” thing). I’m also quite giddy for the day I can say “Hey Cortana! Open Visual Studio” and BAM there it is. I’ve been experiencing Windows 10 using VMWare Fusion. Unfortunately the typical “dynamic sizing” video behavior isn’t working and going to full screen mode doesn’t help either. After a little tweaking and testing, I’ve found a trick that works.

<!--more-->

![](../img_post/2015-04-22-fixing-video-display-issues-with-vmware-fusion-and-windows-10/2015-04-windows-10.jpg)

The trick is to simply not use the VMWare Fusion video driver at all. The build in display drivers that are coming in the technical previews work just fine and provide the higher resolutions you need. So I simply uninstalled VMWare Tools, which removed the video driver and restored the default one. After a system reboot I reinstalled VMWare Tools, but I used the “custom” option and omitted installing the video driver. I still need all the other benefits (like copying files between VM and Desktop) that VMWare Tools provides. Problem solved!

Without having the SVGA driver, you won’t get the added bonus of “dynamically resizing” your desktop window and having the resolution auto adjust. This wasn’t the end of the world for me. I was happy to be able to use some resolutions that matched my MacBook Pro display, or larger 24” monitor, especially when going into full screen mode.

Oh, another quick tip. Not sure what your screen resolutions are? The display settings only deal with default or “scaled” resolutions. The default options can be found by clicking the apple icon at the top left and select “About this Mac.” The second tab has your display resolutions.

![](../img_post/2015-04-22-fixing-video-display-issues-with-vmware-fusion-and-windows-10/2015-04-about_this_mac_and_win10-fresh.png)

Hope this helps!
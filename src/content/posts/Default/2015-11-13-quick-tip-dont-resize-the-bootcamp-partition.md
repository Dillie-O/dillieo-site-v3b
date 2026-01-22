---
title: Quick Tip Dont Resize The Bootcamp Partition
description: quick-tips.jpg
published: 2015-11-13
image: images/posts/quick_tip_dont_resize_the_bootcamp_partition.webp
imageAlt: quick-tips.jpg
category: Default
tags: [bootcamp, geekery, osx, partition, resize, windows]
---

So you created that BootCamp partition and after a night of "install-a-palooza", you've run out of space. _\[Zut alors!]_ There are several resources out there that indicate that you can use Disk Utility to open up some free space, then use a partition tool on the Windows side of things to consume that free space. However, there are several other resources, and a bit of personal experience, that indicate doing this may not allow your partitions to be properly identified when the process completes, causing the whole endeavor to fail. Similarly the space might not be visible (or accessible) to one (or both partitions).

In the end, it's a bit of a pain, but worthwhile to simply flush the partition and start over to avoid the risk. With the speed at which modern computers are running (with SSD/Fusion Drives as well), this shouldn't take too long. Plus, with cool [environment building tools](/rebuilding-your-dev-environment-quick-and-easy-on-windows-with-boxstarter), you can get everything up and running in no time.

<!--more-->

![quick-tips.jpg](@assets/images/posts/2015-01-quick-tips.png)
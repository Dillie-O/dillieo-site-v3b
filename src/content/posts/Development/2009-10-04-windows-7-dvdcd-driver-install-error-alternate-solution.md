---
title: Windows 7 Dvdcd Driver Install Error Alternate Solution
description: Windows 7 Dvdcd Driver Install Error Alternate Solution
published: 2009-10-04
category: Development
tags: [driver, geekery, install, iso-13346, troubleshooting, udf, windows7]
---

This weekend I got my barebones PC kit in the mail _\[WOOOOOO HOOOOO!!!!!]_ and proceeded to assemble and put the Windows 7 RC candidate on it. Since the RC is free until next year, I figured I'd use that license a bit longer while I scrape up the flow ducats to purchase a family license to put on all the machines.

I have a brand spankin' new motherboard, CPU, RAM, and video card. I used an existing DVD-ROM and IDE hard drive to finish off the box. All in all it is a pretty sweet way to get a new system for really cheap.

Once all the hardware was installed and I post tests were successful, I went ahead and dropped in the Windows 7 ISO I had burned, rebooted, and got giddy again for all the fun I was about to have. After the initial startup of the installer, I clicked the "Start Install" button and came across a rather odd error message:

**A required CD/DVD drive device driver is missing.**

And I was prompted with the option to insert a driver disc, or attach a USB device with the drivers in order to continue. After going through all the drivers on my motherboard install disc, I still had no luck. I pulled out my wireless network card and video card, and tried the install from a "bare" state and I still had the same error.

So I donned my Googlian Monk robes (via my iPod Touch) and hit the net for some help. Surprisingly enough, there were a lot of folks out there having the same problem. The problem seemed to be related to a bad burn of the DVD ISO, which would still function, but there was a critical driver or two missing. While I didn't rule the notion out completely, I had previously done 2 successful installs of Windows 7 on two separate laptops within the previous month, so I to rule that one out for the time being.

Another solution that was frequently mentioned was to prepare a bootable USB key and simply perform the installation that way. Unfortunately I didn't have a bootable USB key that was large enough, and my USB drive stored all of my backups, so I couldn't reformat it to make it bootable.

So I kept digging. I pulled out my Ultimate Boot CD for Windows to run some diagnostics and see if there was some fault with the drive, but I was able to zip around without hassle. I got the XP recovery console running, tried a few things there. Still no luck. Oddly enough I didn't think to check the Windows 7 disc through here, but thought about finding some kind of generic driver for the DVD drive and put the Googlian Monk robes on again.

I found an interesting thread that was discussing the Windows 7 install and using some generic drivers, and somebody had posted a rather unique solution, use the Vista disc to start the install process, but instead of starting the install, go to the repair installation section and use the command prompt they have available. Since all the CD/USB drivers were setup at that point, you could put your Windows 7 disc in, navigate into the sources directory, and start off the install.

Since I had a Vista disc (64bit too!) I went ahead and booted up with that. Started the repair process and went to the command prompt. Dropped in my Windows 7 disc, and went to navigate to the folder, but it didn't exist! Instead, there was a single README.TXT file which contained the following message:

**This disc contains a "UDF" file system and requires an operating system that supports the ISO-13346 "UDF" file system specification.**

Now THAT was something new and perplexing. Quite honestly I had never even heard of any of that before _\[My Geek Cred: -2]_. A couple brief searches on the issue didn't bring up anything too revealing, and it just may be that my DVD drive is a little too old (circa 2000) to understand the format. I'll have to look for some firmware updates to see if I can resolve that one. How the disc actually booted up is still a mystery to me, but I'll wager that the bootable portion of the DVD disc, which includes the initial RAM disk creation and setup environment for Windows 7 is being done in a generic format, wheras the rest of the files used for installation are locked down in this UDF format.

However, at this point in the game it dawned on me that I had all my piece in place, albeit fractured. I went over to my wife's laptop really quick, and copied all the files from my Windows 7 disc into a new folder on my USB portable drive. I then went back to my new machine, booted it up with the Windows 7 disc, but went to repair mode and jumped to the command prompt. At that point I had USB drivers installed, so I went over to my portable drive, jumped into the sources directory in my Windows 7 folder, and setup worked like a charm! Success!!!

So the bottom line is this. If you're having issues installing Windows 7 off of a DVD since it is missing CD/DVD drivers and you don't have a bootable USB drive, find yourself a way of booting up the machine so that USB drivers are installed (even use the existing install disc). Once the initial environment is setup, you can easily run the installer from a standard USB portable hard drive that has the setup files.

This weekend I got my barebones PC kit in the mail _\[WOOOOOO HOOOOO!!!!!]_ and proceeded to assemble and put the Windows 7 RC candidate on it. Since the RC is free until next year, I figured I'd use that license a bit longer while I scrape up the flow ducats to purchase a family license to put on all the machines.

I have a brand spankin' new motherboard, CPU, RAM, and video card. I used an existing DVD-ROM and IDE hard drive to finish off the box. All in all it is a pretty sweet way to get a new system for really cheap.

Once all the hardware was installed and I post tests were successful, I went ahead and dropped in the Windows 7 ISO I had burned, rebooted, and got giddy again for all the fun I was about to have. After the initial startup of the installer, I clicked the "Start Install" button and came across a rather odd error message:

**A required CD/DVD drive device driver is missing.**

And I was prompted with the option to insert a driver disc, or attach a USB device with the drivers in order to continue. After going through all the drivers on my motherboard install disc, I still had no luck. I pulled out my wireless network card and video card, and tried the install from a "bare" state and I still had the same error.

So I donned my Googlian Monk robes (via my iPod Touch) and hit the net for some help. Surprisingly enough, there were a lot of folks out there having the same problem. The problem seemed to be related to a bad burn of the DVD ISO, which would still function, but there was a critical driver or two missing. While I didn't rule the notion out completely, I had previously done 2 successful installs of Windows 7 on two separate laptops within the previous month, so I to rule that one out for the time being.

Another solution that was frequently mentioned was to prepare a bootable USB key and simply perform the installation that way. Unfortunately I didn't have a bootable USB key that was large enough, and my USB drive stored all of my backups, so I couldn't reformat it to make it bootable.

So I kept digging. I pulled out my Ultimate Boot CD for Windows to run some diagnostics and see if there was some fault with the drive, but I was able to zip around without hassle. I got the XP recovery console running, tried a few things there. Still no luck. Oddly enough I didn't think to check the Windows 7 disc through here, but thought about finding some kind of generic driver for the DVD drive and put the Googlian Monk robes on again.

I found an interesting thread that was discussing the Windows 7 install and using some generic drivers, and somebody had posted a rather unique solution, use the Vista disc to start the install process, but instead of starting the install, go to the repair installation section and use the command prompt they have available. Since all the CD/USB drivers were setup at that point, you could put your Windows 7 disc in, navigate into the sources directory, and start off the install.

Since I had a Vista disc (64bit too!) I went ahead and booted up with that. Started the repair process and went to the command prompt. Dropped in my Windows 7 disc, and went to navigate to the folder, but it didn't exist! Instead, there was a single README.TXT file which contained the following message:

**This disc contains a "UDF" file system and requires an operating system that supports the ISO-13346 "UDF" file system specification.**

Now THAT was something new and perplexing. Quite honestly I had never even heard of any of that before _\[My Geek Cred: -2]_. A couple brief searches on the issue didn't bring up anything too revealing, and it just may be that my DVD drive is a little too old (circa 2000) to understand the format. I'll have to look for some firmware updates to see if I can resolve that one. How the disc actually booted up is still a mystery to me, but I'll wager that the bootable portion of the DVD disc, which includes the initial RAM disk creation and setup environment for Windows 7 is being done in a generic format, wheras the rest of the files used for installation are locked down in this UDF format.

However, at this point in the game it dawned on me that I had all my piece in place, albeit fractured. I went over to my wife's laptop really quick, and copied all the files from my Windows 7 disc into a new folder on my USB portable drive. I then went back to my new machine, booted it up with the Windows 7 disc, but went to repair mode and jumped to the command prompt. At that point I had USB drivers installed, so I went over to my portable drive, jumped into the sources directory in my Windows 7 folder, and setup worked like a charm! Success!!!

So the bottom line is this. If you're having issues installing Windows 7 off of a DVD since it is missing CD/DVD drivers and you don't have a bootable USB drive, find yourself a way of booting up the machine so that USB drivers are installed (even use the existing install disc). Once the initial environment is setup, you can easily run the installer from a standard USB portable hard drive that has the setup files.
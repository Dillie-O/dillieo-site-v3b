---
title: Quick Tip How To Mount A Timemachine Network Drive At Login
description: Quick Tip
published: 2013-08-02
image: images/posts/quick_tip_how_to_mount_a_timemachine_network_drive_at_login.webp
imageAlt: Quick Tip
category: Default
tags: [applescript, drive, geekery, mount, network, osx, quick-tip, timemachine]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

I've had a lot of feedback from my article on [using readyshare drives for TimeMachine backups](/how-to-get-netgear-readyshare-to-work-with-time-machine-and-mountain-lion). The one glitch I've found is that I have to remount the sparsebundle file every time I log in. Here's a way to fix that issue.

<!--more-->

You may have seen articles that have you simply drag the drive into your Login Items profile to have it remount on login. This hasn't worked for me. It may be due to the fact that the readyshare drive has to be mounted first, I'm not 100% sure. However, we can create a simple AppleScript that will do the job for us.

Fire up the AppleScript editor (under Applications) and paste in the following script:

\[gist]6140774

_Note: Your path(s) will vary based on your share and sparse bundle names._

Before running this script, make sure your readyshare drives have been unmounted. Click the "run" button and verify the results. If you open up Finder, you should see your ReadyShare drive in the "Shares" section and your Time Machine drive listed in the "Devices" section.

If all is successful, use the File->Export dialog, making sure to change the format to "Application". You can name it whatever you'd like.

Once this is done, open up the "Users and Groups" settings, select your profile, and drag the application file from finder into the Login Items section.

Next time you reboot your computer, all your drives should come back for you automatically.

Enjoy!
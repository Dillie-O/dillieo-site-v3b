---
title: Quick Tip Disable Windows 10 Torrent Updates
description: DisableWin10TorrentUpdate
published: 2015-08-07
image: images/posts/2015-08-disablewin10torrentupdate.png
imageAlt: DisableWin10TorrentUpdate
category: Development
tags: [bittorrent, geekery, shared, torrent, update, windows10]
---

If you haven't read about it already, Windows 10 came out with a new feature that allows you to download updates from other computers, either in your local network, or on the Internet. While this is a nice idea, enabling this feature (which it is by default) effectively makes your computer a node on a bittorrent type network. I have no issues with torrents in general, but I'm not too keen on the network traffic it starts to take up, nor any security ramifications there might be. Here's how to disable it.

<!--more-->

1. Click your "Notifications" icon in the system tray (that looks like a speech bubble) and then select "All Settings"
2. In the settings window that appears, click "Update & Security".
3. In the "Windows Update" section, select "Advanced Options".
4. In the "Advanced Options" section, select the "Choose how updates are delivered" option.
5. Under the section "Updates in One Place" click the switch so that this option is turned off. This will make sure your updates come from Microsoft only, and that you aren't sharing "partial updates" with others.

![DisableWin10TorrentUpdate](@assets/images/posts/2015-08-disablewin10torrentupdate.png)

That's it. You can close the window and continue as usual.

Update: Naked Security has a [nice article](https://nakedsecurity.sophos.com/2015/08/03/windows-10-spread-the-love/) outlining this feature and says that it's pretty safe given the cryptography used to verify the files and the list. I'm still leaving it disabled for now since my VM seemed to take a little bit of a performance hit 8^D

If you haven't read about it already, Windows 10 came out with a new feature that allows you to download updates from other computers, either in your local network, or on the Internet. While this is a nice idea, enabling this feature (which it is by default) effectively makes your computer a node on a bittorrent type network. I have no issues with torrents in general, but I'm not too keen on the network traffic it starts to take up, nor any security ramifications there might be. Here's how to disable it.

<!--more-->

1. Click your "Notifications" icon in the system tray (that looks like a speech bubble) and then select "All Settings"
2. In the settings window that appears, click "Update & Security".
3. In the "Windows Update" section, select "Advanced Options".
4. In the "Advanced Options" section, select the "Choose how updates are delivered" option.
5. Under the section "Updates in One Place" click the switch so that this option is turned off. This will make sure your updates come from Microsoft only, and that you aren't sharing "partial updates" with others.

![DisableWin10TorrentUpdate](@assets/images/posts/2015-08-disablewin10torrentupdate.png)

That's it. You can close the window and continue as usual.

Update: Naked Security has a [nice article](https://nakedsecurity.sophos.com/2015/08/03/windows-10-spread-the-love/) outlining this feature and says that it's pretty safe given the cryptography used to verify the files and the list. I'm still leaving it disabled for now since my VM seemed to take a little bit of a performance hit 8^D
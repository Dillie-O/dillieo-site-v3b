---
title: Setting Up Roksbox With Itunes And Osx
description: Roksbox Logo
published: 2011-04-18
image: images/posts/2011-04-roksbox_logo_hd_4.png
imageAlt: Roksbox Logo
category: Development
tags: [configuration, geekery, roksbox, roku-box, web-server]
---

![Roksbox Logo](@assets/images/posts/2011-04-roksbox_logo_hd_4.png)

We've had our Roku Box for about 3 months now and were instantly hooked! The easy access to Netflix, Hulu, and Pandora, not to mention the plethora of channels out there is really amazing. Lately we've been wanting to stream our own mp3s from iTunes to the Roku, and found Roksbox as a viable solution.

<!--more-->

[Roksbox](http://roksbox.com) is a special channel for the Roku Box that will allow you to stream mp3 files from your local web server (or other locations) to the Roku for easy listening. Since all of our music is currently sitting on the Mac, I wanted to see what it would take to get this up and running. The process is tricky, but only because you have to go to a few places to get things setup.

The first step is to get a web server installed on your Mac. Fortunately this is already done for you (at least from OSX version 10.5 and above as far as I can tell). Simply click the Apple icon from the menu at the top and select "System Preferences..." In the window that opens up, double click on the "Sharing" section.

From there, simply check the "Web Sharing" option to enable things and voila! You have a web server. Make sure to take note of the web address for your server.

Verify that the server is up and running by opening up your web browser of choice and entering the main web server address, you should get a basic "It Works!" screen.

The next part is the trickiest. On one hand you can copy ALL of your music files to your website root folder (look into your Sites directory from your Home), but this makes things a pain to maintain. Instead, what you want to do is create a symbolic link (sym link) to your iTunes music folder. A simple alias will not work since the Apache web server (which comes with OSX) will not process symbolic links. Fire up the terminal window, and depending on the path to your iTunes music library, you'll enter a command that looks something like this:

```ln -s /Users/Home/Music/iTunes/iTunes\\ Media/Music /Library/WebServer/Documents/music```

One trick I found to this was to open the terminal window, and then drag your iTunes Music folder into the terminal window, this auto created the path for you, and then all you had to do was place the "ln -s" code in front and the "/Library" code after it.

Once this is done, go back to your web browser and type in your address again, but put "/music" to the end of the URL and you should get the list of your artists to show up.

Now go install the Roksbox channel on your Roku Box (see the site for details on how to do this) and enjoy streaming your own music!

Roksbox is going to charge you a one time fee of \$15 to use the channel, but they give you a 30 day free trial. I'm still using the trial myself, so I can't give you a definite vote either way.

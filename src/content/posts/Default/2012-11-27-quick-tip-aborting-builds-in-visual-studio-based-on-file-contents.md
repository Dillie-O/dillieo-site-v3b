---
title: Quick Tip Aborting Builds In Visual Studio Based On File Contents
description: Quick Tip
published: 2012-11-27
image: images/posts/2011-12-quicktip.jpg
imageAlt: Quick Tip
category: Default
tags: [net, coding, error, error-checking, events, file-contents, pre-build, quick-tip, visual-studio]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

Remember a little while back when I had that problem with [Entity Framework and SQL Server 2005/2008 databases](/quick-tip-fixing-the-datetime2-problem-with-entity-framework)? Well, it raised it's ugly head again, and I was looking for a way to detect our error. Fortunately, we can setup a pre-build event to detect the bug and stop the process from going further.

<!--more-->

Visual Studio has a wonderful little feature in the project settings for pre-build and post-build events. Mainly they are for running batch scripts to copy/move files or other small things. However, since we have the full featured batch command script at our disposal, we can do a quick file content check and abort if we don't find what we're expecting.

Open your solution in Visual Studio, right click on the project and select "Properties". From there, click the tab that says "Build Events." You'll see something like this:

![Build Events Screen](@assets/images/posts/2012-11-buildeventsscreen.png)

From here, either click the "Edit Pre-build" button or you can type directly into the window. Here's the basic format of what you need your script to say

\[gist]4162791

In my case, I'm checking my cptt.edmx file in my DAL folder to make sure that the ProviderManifestToken value is set to 2005. My particular pre-build command looks like this:

\[gist]4162784

That's all there is to it! If I modify my cptt.edmx file in Notepad and change the value to 2008 (what we don't want), the next time I do a build I see the following:

![Build Events Error](@assets/images/posts/2012-11-buildeventserror.png "Build Events Error")

My build won't continue after that, and I know that I need to fix things before I can continue.

There you have it! Simple pre-build error checking based on file contents. Enjoy!
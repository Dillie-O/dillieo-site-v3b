---
title: Quick Tip Batch Svn Rename Of Files Through Powershell
description: Quick Tip
published: 2013-07-29
image: images/posts/quick_tip_batch_svn_rename_of_files_through_powershell.webp
imageAlt: Quick Tip
category: Default
tags: [apache-subversion, Batch, files, geekery, powershell, quick-tip, rename, scripting, svn, windows-powershell]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)I'm trying to use Powershell more and more, and today I ran into a directory in one of my projects that had a lot of files that needed renaming. Here's the trick on how to do it in Powershell.

<!--more-->

I needed all filenames that had a space in them replaced with an underscore so that they would run properly in our batch scripts. In addition, I needed to do this through SVN, and not just a standard rename, so that our other developers noted the changes as well.

After a little tweaking, here's the quick and easy way to do it through Powershell.

\[gist]6106435

Note that I've formatted this on multiple lines for readability, simply remove the newline characters so that it is a single line and you can run it at the command prompt in the directory of your choosing.

If you need to tweak things a little, make sure to change the -match parameter on the first line to the character (and potentially string) that you're filtering off of, as well as the replace statement.

Enjoy!
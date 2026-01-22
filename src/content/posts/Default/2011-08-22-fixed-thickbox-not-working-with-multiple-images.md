---
title: Fixed Thickbox Not Working With Multiple Images
description: jQuery Logo
published: 2011-08-22
image: images/posts/fixed_thickbox_not_working_with_multiple_images.webp
imageAlt: jQuery Logo
category: Default
tags: [coding, jquery, quick-tip, selector, thickbox]
---

![jQuery Logo](@assets/images/posts/2011-08-jquery_logo.png "jQuery Logo")

This is really a triple Hat Tip (HT to my wife for dealing with this issue, HT to [Websites in a Flash](http://websitedesign.websitesinaflash.com/2009/07/jquery-thickbox-gallery-images-not-working/) where the solution was found, HT to [Stuff by Sarah](http://www.stuffbysarah.net/2009/02/16/thickbox-and-jquery-131/) where the original solution was found), but it bears repeating again.

<!--more-->

My wife is using [Thickbox](http://jquery.com/demo/thickbox/) to display some magazine article scans on a page she maintains for a client. Even though Thickbox is no longer supported, it is still a great library and it's hard to find something that does things in a similar fashion so quickly and easily.

That said, for some reason the gallery implementation of images was not working. The way it works is that you can have multiple image links grouped together using the "rel" tag in your links and Thickbox will grab all of the related images and put them together. That way when you click to view the englarged image, you have a nice "previous" and "next" navigation control built in to view the related items.

This wasn't working. The image loader would appear, but nothing would happen, and there was much weeping and gnashing of teeth to ensue.

Fortunately the solution was a simple, but nuanced in finding it.

From jQuery 1.3.1 and beyond, the way the selector works was slightly changed. You used to have to use the @ symbol as part of your selector for the rel tag, but that is no longer necessary. So with Thickbox, if you have the "standard" formatted file, simply drop down to line 79 and change:

to

If you're using a "minified" version of Thickbox (everything is super compressed and has a lot of 1 letter variables, do a search within the file and change

to

and you're all set!

Hopefully you'll stumble across this before many hours of headaches ensue. Thanks again to the folks above for making my wife's misery go away!!!
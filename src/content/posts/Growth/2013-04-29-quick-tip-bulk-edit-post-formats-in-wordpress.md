---
title: Quick Tip Bulk Edit Post Formats In Wordpress
description: Wordpress XML
published: 2013-04-29
image: images/posts/2013-04-wordpressxml.png
imageAlt: Wordpress XML
category: Growth
tags: [export, geekery, import, post-format, quick-tip, wordpress, xml]
---

As you may have noticed, I recently merged my photo blog and quote blog here into my main blog. As part of that process, I wanted all of my photos to use the "gallery" post format to take advantage of its display options in the new twenty thirteen theme. When you're in the main post editor, there's not way to "bulk edit" post formats. Here's a "back door" trick on how to get it done.

<!--more-->

WARNING: I should express that this was a quick trick that I used for a small amount of posts (less than 500) and wasn't too worried if things went crazy. I don't know how this will work on larger scale blogs or XML files, so please use caution. I highly recommend the [backwpup plugin](http://wordpress.org/extend/plugins/backwpup/) to back up your blog before proceeding.

The trick to do this is to use the import/export tools found in WordPress and change the post format there. The first step is to export your blog into XML/WXR format that WordPress provides. This will give you all posts, pages, and feedback. You can do this through the Tools->Export option.

From there you need to open up the XML file in a text editor (my favorites are [TextWranger](http://www.barebones.com/products/textwrangler/) for Mac and [Notepad++](http://notepad-plus-plus.org/) for PC). From there, you'll need to do a little digging. You're looking for the tag that looks like this:

`<category domain="post_format" nicename="XXX">`

Typically it is found after the `<wp:is_sticky>` tag.

![Wordpress XML](@assets/images/posts/2013-04-wordpressxml.png)

From there, simply change the nicename property to whatever you'd like. For me, I changed it to "post-format-gallery" and saved it under a different name (to preserve my original backup). If you do it right, you can use a global search and replace to update all of your tags. Similarly, if you need to add the tag for posts not previously defined with a post format, you can script up some macros as needed.

After you've saved your document, simply use the Tools->Import feature to import your XML file. Depending on the size of your XML file, this may take a while. You can always refresh your posts section to verify the update, or wait for the e-mail that will be sent to you when the import is complete.

Once complete, take a peek at your posts in the administrator panel and see the results:

![Wordpress Update](@assets/images/posts/2013-04-wordpressupdate.png) That's all there is to it!

One added bonus, it appears that this technique will match up title/timestamp/something and update existing posts that match, as opposed to duplicating them. When I first ran the import I accidentally imported my photos using the image format. Since it was easier to bulk delete posts, I figured I'd do a second import and then clean up my mess. Much to my surprise, I didn't have duplicate imported posts, but updated existing posts.

I hope this helps! Enjoy!

As you may have noticed, I recently merged my photo blog and quote blog here into my main blog. As part of that process, I wanted all of my photos to use the "gallery" post format to take advantage of its display options in the new twenty thirteen theme. When you're in the main post editor, there's not way to "bulk edit" post formats. Here's a "back door" trick on how to get it done.

<!--more-->

WARNING: I should express that this was a quick trick that I used for a small amount of posts (less than 500) and wasn't too worried if things went crazy. I don't know how this will work on larger scale blogs or XML files, so please use caution. I highly recommend the [backwpup plugin](http://wordpress.org/extend/plugins/backwpup/) to back up your blog before proceeding.

The trick to do this is to use the import/export tools found in WordPress and change the post format there. The first step is to export your blog into XML/WXR format that WordPress provides. This will give you all posts, pages, and feedback. You can do this through the Tools->Export option.

From there you need to open up the XML file in a text editor (my favorites are [TextWranger](http://www.barebones.com/products/textwrangler/) for Mac and [Notepad++](http://notepad-plus-plus.org/) for PC). From there, you'll need to do a little digging. You're looking for the tag that looks like this:

`<category domain="post_format" nicename="XXX">`

Typically it is found after the `<wp:is_sticky>` tag.

![Wordpress XML](@assets/images/posts/2013-04-wordpressxml.png)

From there, simply change the nicename property to whatever you'd like. For me, I changed it to "post-format-gallery" and saved it under a different name (to preserve my original backup). If you do it right, you can use a global search and replace to update all of your tags. Similarly, if you need to add the tag for posts not previously defined with a post format, you can script up some macros as needed.

After you've saved your document, simply use the Tools->Import feature to import your XML file. Depending on the size of your XML file, this may take a while. You can always refresh your posts section to verify the update, or wait for the e-mail that will be sent to you when the import is complete.

Once complete, take a peek at your posts in the administrator panel and see the results:

![Wordpress Update](@assets/images/posts/2013-04-wordpressupdate.png) That's all there is to it!

One added bonus, it appears that this technique will match up title/timestamp/something and update existing posts that match, as opposed to duplicating them. When I first ran the import I accidentally imported my photos using the image format. Since it was easier to bulk delete posts, I figured I'd do a second import and then clean up my mess. Much to my surprise, I didn't have duplicate imported posts, but updated existing posts.

I hope this helps! Enjoy!
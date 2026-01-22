---
title: Quick Tip Check Your Mime Types In Internet Explorer And Wordpress
description: Quick Tip Check Your Mime Types In Internet Explorer And Wordpress
published: 2011-04-13
image: images/posts/2011-04-wordpress-icon.webp
imageAlt: Quick Tip Check Your Mime Types In Internet Explorer And Wordpress
category: Default
tags: [geekery, internet-explorer, mime-type, quick-tip, wordpress]
---

![](@assets/images/posts/2011-04-wordpress-icon.png "wordpress-icon")

This is a rather odd problem I ran into yesterday with a colleague that was worth sharing.

She had installed a WordPress plug-in that allowed you to replace existing files in your media library. This is a great feature for us since we are often updating the same newsletter item and don't want to remove and re-add the file to the media gallery.

After installation, she went to replace an existing .jpg image and received the following error message:

> File type does not meet security guidelines.

Digging into the plug-in, we found the code that generates this message.

<!--more-->

;

// Check that mime type is allowed $allowed_mime_types = get_allowed_mime_types(); if (!in_array($new_filetype, \$allowed_mime_types)) { echo \_\_("File type does not meet security guidelines."); exit; }

This code is pretty straightforward, it uses a built in WordPress function to get the mime types of files that are allowed for upload. You can check your functions.php file in your WordPress wp-includes folder if you're curious.

After doing some digging, I decided to do some "old school" debugging and add a little more information to the error message:

After doing this, The error message we got back was the following:

> File type does not meet security guidelines. File Type specified: image/pjpeg

Now THIS was news to me! I've never heard of this mime type before. In addition, we had tried uploading a different file, and got a similar error message:

> File type does not meet security guidelines. File Type specified: image/x-png

To complicate matters more, I decided to try out the process again using Chrome (since we're an IE shop here) and it worked!!! Apparently Internet Explorer is tracking the images in a slightly different way, and other browsers seem to use the "standard" types. I'll be loose in defining "standard" here since I'm not the expert in this field.

To resolve this issue, at least temporarily, you have a couple of options:

1. Update your get_allowed_mime_types() function to include the additional mime types. I'm a little worried that there are more out there, but I haven't had a chance to research them further. The downside to this is that if the WordPress core is updated (which is frequently) you could lose this update as soon as the file is overwritten.
2. Write up a function in your plug-in that injects the additional mime types in right before processing. The downside to this is that it has to run this code every time the plug-in runs, and you may lose it as well when the plug-in is updated. You can follow the example in [this post](http://wordpress.stackexchange.com/questions/11563/adding-file-types-in-wordpress) (thank you WordPress Answers!) on how to accomplish this.

Now you know. And knowing is half the battle...
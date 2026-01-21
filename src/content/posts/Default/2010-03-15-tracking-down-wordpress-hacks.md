---
title: Tracking Down Wordpress Hacks
description: Tracking Down Wordpress Hacks
published: 2010-03-15
image: images/posts/tracking_down_wordpress_hacks.webp
imageAlt: Tracking Down Wordpress Hacks
category: Default
tags: [caching, coding, hack, sql, wordpress]
---

I’ve been volunteering my time over the last month or so helping to debug some spam and performance problems at the [Evangelical Outpost](http://evangelicaloutpost.com) blog. The blog is running WordPress, and while I’m no WordPress guru in any regard, I’ve spent enough time on the web that I could lend my expertise to these issues.

The spam issue wound up being a rather nasty exploit that I believe was traced to some file permission hacks in older versions of WordPress. What made them really difficult was that the spam was only showing up in the Google cache and search results, effectively driving the sites search ratings down, but not degrading the post content an active viewer would have. Since the average person would only see the live good content, the issue was unnoticed for a while and more difficult to track down. The full details of this is a post for another day.

However, one thing I did want to share was the process of elimination/cleansing I went through in order to find the issues. After the initial attack I believe there were a few other issues that compounded the problem at multiple levels (application, files, database). Hopefully this list will give you a nice process to go through if you’ve recently had your own WordPress hack and need to flush it out:

1\. Go into the admin section and do a search on all comments for the following keywords (in separate searches): “tramadol” (this was the spam vendor ailing us), “javascript”, “hover”, “style=”. Those are typically some of the injection vectors that get used in the comments themselves.

2\. Go into the theme editor and browse through all of the files in all of the themes you have installed on your WordPress install, even if inactive. Look for “base64” in there and also look for some blatant links to the spam sites. Sometimes the hackers aren't picky, if they have file access, they'll just inject it straight away with none of the encoding shenanigans. Look for other PHP method calls that just don’t seem right for your template. Its hard to make a specific list, but sometimes you’ll get a “code smell” of something that doesn’t seem like it should be happening and is worth investigation.

3\. Log into the file manager on your hosted site. Look for any .txt files in the root of your directory and the root of your Wordpress install. This is how I found a massive cached dump file of some old E-mails and posts, which had the tramadol keyword in it, and I suspect it was getting added to the cache, or skewing the search results, since there was a generic robots.txt file.

4\. Flush out your wp-cache folder, or at least look through them for the spam keywords. Whatever caching program you use is probably rebuilding this folder, so I'm not as worried about this, but flushing this out is helpful. That's why I really like the W3 Total Cache plug-in I installed for EO.

5\. Finally, go directly into the database manager and search through the comments at this level. The reason for this that a lot of the spam injection happens by putting HTML code into the database so that when it comes out, you don't see it on the page unless you go into the source code, and sometimes that is even filtered down. Use the following query to search your posts and comments for the common attack vectors:

SELECT \* FROM wp_posts WHERE post_content LIKE '%&lt;iframe%' UNION SELECT \* FROM wp_posts WHERE post_content LIKE '%&lt;noscript%' UNION SELECT \* FROM wp_posts WHERE post_content LIKE '%display:%' UNION SELECT \* FROM wp_posts WHERE post_content LIKE '%&lt;?%' UNION SELECT \* FROM wp_posts WHERE post_content LIKE '%&lt;?php%'

SELECT \* FROM wp_comments WHERE comment_content LIKE '%&lt;iframe%' UNION SELECT \* FROM wp_comments WHERE comment_content LIKE '%&lt;noscript%' UNION SELECT \* FROM wp_comments WHERE comment_content LIKE '%display:%' UNION SELECT \* FROM wp_comments WHERE comment_content LIKE '%&lt;?%' UNION SELECT \* FROM wp_comments WHERE comment_content LIKE '%&lt;?php%'

And that covers a pretty wide range of ways your site can get hacked. Last this week I’ll list a few WordPress plug-ins I’ve particularly useful for the EO site, as well as a diagnosis of the particular Google Cache hack, just in case you run into similar issues.
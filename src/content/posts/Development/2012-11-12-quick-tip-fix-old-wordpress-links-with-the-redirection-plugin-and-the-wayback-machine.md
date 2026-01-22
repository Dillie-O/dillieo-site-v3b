---
title: Quick Tip Fix Old Wordpress Links With The Redirection Plugin And The Wayback Machine
description: Quick Tip
published: 2012-11-12
image: images/posts/2011-12-quicktip.jpg
imageAlt: Quick Tip
category: Development
tags: ["404", geekery, link, quick-tip, redirection, way-back-machine, wordpress]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

I've been honored to be the webmaster over at [Evangelical Outpost](http://evangelicaloutpost.com) for a few years now. The site itself dates back to 2003, but I haven't been around quite that long. Being that the site has changed owners, webmaster, and formats a couple of times, our permalink structure has changed a couple of times as well. As a result, we're starting to find some 404 errors coming in from outside links. The old permalink format wasn't in any form we could recognize (post ID, date code, title, etc.), and I was worried that they might be lost forever. However, thanks to two little features, Redirection and the WayBack Machine, we can now successfully get our links working again! Here's how.

<!--more-->

Our old links were using an odd format of "archives/001234.html" but the number itself didn't match up to the post Id. While the initial bad links were found through human intervention, the rest I found after installing a great Wordpress plugin called [Redirection](http://wordpress.org/extend/plugins/redirection/). This plugin helps you manage your bad links and redirects without even having to worry about modifying your .htaccess file, though that option is available. After installing the plugin, I went to the Tools -> Redirection section, clicked on the "Log" link at the top, and noticed we had quite a few things to fix:

![Redirection Log](@assets/images/posts/2012-11-redirectionlog.png)

As I mentioned earlier, it was hard to track down where these posts actually went. When we were manually tracking these down, sometimes the titles matched, or the description was good enough to piece things together, but other times they weren't. The best bet was to somehow find a copy of the post when it was using the old URL format. This is where the [WayBack machine](http://archive.org/web/web.php) saves the day!

Just in case you didn't know, the WayBack machine has been taking "snapshots" of the Internet as far back as 1996. It's a great way to see how some sites have evolved over time, or find that lost Geocities page you once had. The good news is that the WayBack machine makes its snapshots based on the URL format it was at the time of the snapshot, not the latest version. Using this tactic, it allows us to plug in a URL and get the details we need. I took the full URL of the first item in the screenshot above and plugged it into the machine:

![WayBack Results](@assets/images/posts/2012-11-waybackresults.png)

Look at that! The WayBack Machine had crawled that URL several times, once as recent as 2006. Notice that we have a hilighted date of when one of the snapshots was made. Let's click that:

![WayBack Site](@assets/images/posts/2012-11-waybacksite.png)

There's the site we're looking for! Having the title, I can now find it in my post archive. Once I do that, I have the URL I need to redirect any request to.

The final step is to setup the redirection itself. If you notice in the Redirection log. There's a nice little + icon to the far right of the entry. Simply click on this and it will take us to the section to add a new redirection:

![Redirection New Entry](@assets/images/posts/2012-11-redirectionnewentry.png)

You'll notice that I've already pasted the proper redirect into the "Target URL" section. Notice that we only need the URL portion after our domain, so if we ever move the site to a new domain, we can take our redirections with us. For now we are using the default "Redirections" group, though you could create more if you need to. Once you're done, click the "Add Redirection" button and the redirection has been created!

Click the "Redirects" link near the top of the page and you'll see the item added to the list (I have a few others here now too):

![Redirection Summary](@assets/images/posts/2012-11-redirectionsummary.png)

That's all there is to it! You'll even have a log of the redirects, which can come in handy if you need to track statistics or other details.

I'll admit there is a bit of manual work to be done through this process, but it sure beats having a lot of dead links that draw traffic away to your site. I hope this comes in handy for you. Enjoy!

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

I've been honored to be the webmaster over at [Evangelical Outpost](http://evangelicaloutpost.com) for a few years now. The site itself dates back to 2003, but I haven't been around quite that long. Being that the site has changed owners, webmaster, and formats a couple of times, our permalink structure has changed a couple of times as well. As a result, we're starting to find some 404 errors coming in from outside links. The old permalink format wasn't in any form we could recognize (post ID, date code, title, etc.), and I was worried that they might be lost forever. However, thanks to two little features, Redirection and the WayBack Machine, we can now successfully get our links working again! Here's how.

<!--more-->

Our old links were using an odd format of "archives/001234.html" but the number itself didn't match up to the post Id. While the initial bad links were found through human intervention, the rest I found after installing a great Wordpress plugin called [Redirection](http://wordpress.org/extend/plugins/redirection/). This plugin helps you manage your bad links and redirects without even having to worry about modifying your .htaccess file, though that option is available. After installing the plugin, I went to the Tools -> Redirection section, clicked on the "Log" link at the top, and noticed we had quite a few things to fix:

![Redirection Log](@assets/images/posts/2012-11-redirectionlog.png)

As I mentioned earlier, it was hard to track down where these posts actually went. When we were manually tracking these down, sometimes the titles matched, or the description was good enough to piece things together, but other times they weren't. The best bet was to somehow find a copy of the post when it was using the old URL format. This is where the [WayBack machine](http://archive.org/web/web.php) saves the day!

Just in case you didn't know, the WayBack machine has been taking "snapshots" of the Internet as far back as 1996. It's a great way to see how some sites have evolved over time, or find that lost Geocities page you once had. The good news is that the WayBack machine makes its snapshots based on the URL format it was at the time of the snapshot, not the latest version. Using this tactic, it allows us to plug in a URL and get the details we need. I took the full URL of the first item in the screenshot above and plugged it into the machine:

![WayBack Results](@assets/images/posts/2012-11-waybackresults.png)

Look at that! The WayBack Machine had crawled that URL several times, once as recent as 2006. Notice that we have a hilighted date of when one of the snapshots was made. Let's click that:

![WayBack Site](@assets/images/posts/2012-11-waybacksite.png)

There's the site we're looking for! Having the title, I can now find it in my post archive. Once I do that, I have the URL I need to redirect any request to.

The final step is to setup the redirection itself. If you notice in the Redirection log. There's a nice little + icon to the far right of the entry. Simply click on this and it will take us to the section to add a new redirection:

![Redirection New Entry](@assets/images/posts/2012-11-redirectionnewentry.png)

You'll notice that I've already pasted the proper redirect into the "Target URL" section. Notice that we only need the URL portion after our domain, so if we ever move the site to a new domain, we can take our redirections with us. For now we are using the default "Redirections" group, though you could create more if you need to. Once you're done, click the "Add Redirection" button and the redirection has been created!

Click the "Redirects" link near the top of the page and you'll see the item added to the list (I have a few others here now too):

![Redirection Summary](@assets/images/posts/2012-11-redirectionsummary.png)

That's all there is to it! You'll even have a log of the redirects, which can come in handy if you need to track statistics or other details.

I'll admit there is a bit of manual work to be done through this process, but it sure beats having a lot of dead links that draw traffic away to your site. I hope this comes in handy for you. Enjoy!
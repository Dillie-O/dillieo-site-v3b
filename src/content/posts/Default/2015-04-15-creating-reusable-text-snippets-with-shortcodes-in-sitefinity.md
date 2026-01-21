---
title: Creating Reusable Text Snippets With Shortcodes In Sitefinity
description: Creating Reusable Text Snippets With Shortcodes In Sitefinity
published: 2015-04-15
image: images/posts/creating_reusable_text_snippets_with_shortcodes_in_sitefinity.webp
imageAlt: Creating Reusable Text Snippets With Shortcodes In Sitefinity
category: Default
tags: [content, life, shortcode, sitefinity]
---

One of the requests/challenges that I’ve come up against while working on a new project with [Telerik’s Sitefinity](http://www.sitefinity.com) CMS is providing a means of reusing text at a more granular than what a typcial shared content block provides. I needed to provide a way that was reusable, as well as easy for the end user to maintain and use. After some digging and tweaking, I’ve found what I believe to be an ideal solution. By combining shared content blocks and "short codes”, you can make this happen.

<!--more-->

![](../img_post/2015-04-15-creating-reusable-text-snippets-with-shortcodes-in-sitefinity/2015-04-feeratesresult.png "ShortCode Achievement: Unlocked!")

### Scenario

It might be helpful to provide a little more background. I’m working on a site for a financial type institution, and they have a series of fees and rates that they display on various pages in the site. The places where these values isn’t a trivial amount, and currently there is a time intensive process of going through the updates, since it has to be submitted and approved to perform by the technical staff. There is no sense of “reuse” here. Ideally, the end users would be able to update the fees/rates in a single location and have it update anywhere it was referenced. This would also give the end users the flexibility to create new pages as needed with this information.

### Content Blocks Almost Work

If you’ve worked with SiteFinity, the immediate though is to create a set of shared content blocks. This is a GREAT feature and allows you to create the content once, and then add it to other pages as you need it. If you update the block, all affected pages are also updated accordingly. The one glitch to this is that we can’t embed content blocks into other content blocks using the layout editor. In addition, content blocks are structured to be just that, blocks. We couldn’t drag/drop two of them next to each other in the page editor and have a “flowing” text result.

### Shortcodes to the Rescue

If you’re familiar with WordPress at all, you’ll know that they have a beautiful feature called “shortcodes”. Shortcodes allow you enter a friendly tag of code (such as \[youtube:a311n]) in your editor and have the result be displayed a full HTML chunk when it is rendered on the page. This allows you to have cleaner code while editing your content, and allows those that are not as tech saavy to be able to embed more complex features in their pages. SiteFinity already has a great overview on how to build a shortcode processor into your content block template [here](http://www.sitefinity.com/blogs/team-blog/2012/12/04/supporting-shortcodes-in-sitefinity-content). What we want to do is to be able to create short codes using the format of...

\[RateValue:Title of Content Block]

…and have that value retrieved from SiteFinity and injected into the content block text. I’ve made a few tweaks for my needs, but the core method to look at is this one:

https://gist.github.com/51ce10eca1928de3e414

Since we are going to have multiple shortcodes in our content block, we use a regular expression to find just the “rate value” tagged ones in this method. We also use a grouped match so that we have the title of the content block we want is available for our query, instead of having to parse the tag a second time. In addition, we add an extra filter to the content block query itself so that we could potentially have titles with the same name, and retrieve only the one we need. More details on adding category filters (they call them taxonomies under the hood) to queries can be found [here](http://docs.sitefinity.com/add-and-remove-taxonomies-add-categories).

### Build Your Content Blocks

With our content block template updated to look for shortcodes, we can get to work. Go into the SiteFinity admin panel and create a new content block. Give it a simple title, and down at the bottom, make sure to assign it to the “RateValues” category we are going to filter off of:

![](../img_post/2015-04-15-creating-reusable-text-snippets-with-shortcodes-in-sitefinity/2015-04-newcontentblock.png)

Keep adding codes as needed. Once these are in place, you can go to your page (or create a new one) and start typing in shortcodes as we outlined earlier.

![](../img_post/2015-04-15-creating-reusable-text-snippets-with-shortcodes-in-sitefinity/2015-04-shortcodeseditor.png)

Notice how we have two different shortcode tags here, RateValue and FeeValue. We have two separate methods that do the parsing for them independently (full source code below). Once the page is finished, we publish and we can see the results on the page.

![](../img_post/2015-04-15-creating-reusable-text-snippets-with-shortcodes-in-sitefinity/2015-04-1_feeratesresult.png)

Hazzah! Reusable text anywhere we want!

### Final Notes

You may notice a couple of odd things when looking at the code:

Duplicate Code - Yes, the FeeValue and RateValue shortcode processors could have easily been done in a single method that parses the category and title, but I’m keeping these separate for the time being since the needs for each might change, and thus processing would be different. Once things are finalized this could be refactored more.

No Code Behind File - For this project, I chose to put my updated content block template within the project theme/templates that resides in the App_Data folder, as opposed to compiling down the C# code and placing it somewhere within SiteFinity itself. Part of this is for convenience of storing just the customized code in one location, part of this is crazy class/namespace referencing that occurs when you try to reference everything via code behind on the server. As a result you’ll see all the programming methods are in the ASCX file as well.

Now be fruitful and shortcode! Oh, here’s the full content block template code. Just make sure to register the ContentBlockTemplate.ascx file as outlined in the shortcake template [documentation](http://www.sitefinity.com/blogs/team-blog/2012/12/04/supporting-shortcodes-in-sitefinity-content).

https://gist.github.com/3bae0bc84b4b793a9152
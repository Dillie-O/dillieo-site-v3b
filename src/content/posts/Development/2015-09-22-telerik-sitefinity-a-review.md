---
title: Telerik Sitefinity A Review
description: Telerik Sitefinity A Review
published: 2015-09-22
image: images/posts/2015-09-sitefinity_logo11.jpg
imageAlt: Telerik Sitefinity A Review
category: Development
tags: [cms, coding, sitefinity, telerik]
---

Last week we launched a site for a client that was built upon the [Telerik Sitefinity](http://www.sitefinity.com/) CMS platform. Between me and 3 or 4 other developers, we customized the front end, a bit of the back end, and all parts inbetween. I’m quite proud of the launch. There were lots of learning points along the way and I’m sure some folks are wondering if it’s worth using this platform to build a site. Here’s my rundown on the good, the bad, and the ugly with it.

<!--more-->

![](@assets/images/posts/2015-09-sitefinity_logo11.jpg)

## The Good

**Out of box features**: Need a blog? It’s there (as many as you need). Separate news feed? That’s there too. Compared to other CMS systems I’ve worked with, the user interface for building your pages is rather nice. Most of it resides in drag and drop components, so that you don’t accidentally mess up the style of the master templates themselves.

Sitefinity has this nice notion of “shared content blocks” that allows you to use the same chunks of text (or even images) in various places on the site. We used this, in conjunction with shortcodes, to allow our end users to easily change some pieces of info that is available in multiple places on the site.

**Extensibility:** A lot of their modules have WCF web services built to access them. I leveraged this to [dynamically submit forms](/soup-to-nuts-dynamically-submitting-sitefinity-forms-using-ajax) to the system. I also was able to update somebody else’s module to [import WordPress blogs into Sitefinity](/something-old-and-new-importing-wordpress-posts-into-sitefinity).

**Documentation:** Sitefinity has a pretty extensive online documentation and forums section to help you track down issues and also find out how to implement features. There are a lot of CMS systems out there with skimpy documentation and that can be a problem.

**Tech Support:** If you have a Sitefinity account, take advantage of the support tickets you can respond. While the responses aren’t always the most informative (for my tasks) I received a response within 24 hours every time and there was always some insights to be gleaned.

## The Bad

**Documentation:** The good is also the bad. While the documentation is available, often times it isn’t extensive enough for some of the advanced concepts. The basic documentation gave me the springboard to build out complex [custom user widgets](/creating-custom-formatted-layout-widgets-in-sitefinity), but the example they had was very primitive compared to the widgets I built, and while I can’t confirm for sure, it appears that in order to have multiple “drop locations” in a single widget you also need to be careful how you order the class names in your code. Several interactions with tech support and pouring through documentation yielded nothing.

**Modifying Settings:** Sitefinity provides a high level of granularity to customize the system, but sometimes that is a bit of overkill. For example, e-mail notifications are disabled by default in a sitefinity install. If you want e-mail notifications for when a form is submitted, you have to update you system settings, notification profile, and also enable notifications for forms. Having this all consolidated would be better. Even if you kept things granular, having a little more robust administrative interface for some of these common features that updates multiple settings behind the scenes could go a long way.

**Supporting Complex Templates:** In order to create a really great site for our client, we did a fully reponsive site using bootstrap, google maps, some jQuery interactions and more. When you attempt to load the page in the WSYWIG editor, it became extremely difficult to edit, since the editor was attempting to load those changes up. Sitefinity is working on a “feather” template that is supposed to be more bootstrap friendly, but ultimately we had to write some [special template code](/fixed-more-button-disabled-multiple-forms-and-script-issues-in-sitefinity) that didn’t load our custom scripts in the editor. I thnk if there was large scale HTML mode to help with some of those updates, then that could go a long way in helping. Sometimes you just need to edit the raw code.

## The Ugly

**CodeSync Tool:** The Sitefinity CodeSync tool is designed to allow you to do file pushes from Visual Studio to your server of choice and keep a differential. That way only the latest changes you’ve made (or exist on the server) need to be synchronized, saving you valuable bandwidth and guesswork with major updates.

However, this tool was difficult to setup. There was a server piece and a client piece to download/configure/upload. If you had a value wrong, or didn’t do it quite in the right order, you wouldn’t see the server to sync with. The tool doesn’t work with HTTPS, so that caused a lot of headache when trying to work with our servers when we had HTTPS configured. The “initial configuration” required you to effectively download the entire file source from the server, as opposed to keeping a checksum or other marker on the file to eliminate the need for a full file copy.

In addition, I ran into numerous problems when developing in conjunction with a team of developers. With three of us working on code and pushing at various times, the server would often report erroneous updates needed. Or updates would be downloaded and the tool reported the files needing updating again. Similarly, if a file was pushed to the server, but I had downloaded the same version of that file through our git repository pull, CodeSync did not notice that the file was actually the same one, and prompt for an update/download. Eventually I abandoned the tool altogether and simply did direct file copies between my local machine and the servers I had to work with. It wasn’t pretty, but easier than the alternative.

## Conclusion

I’m rather impressed with Sitefinity. The licensing price seems good compared to other paid tier .Net CMS platforms out there and the out of the box features and extensibility go a long way to get you up and running fast with a site. The templating model is good and the extensible models aren’t overly complicated to work with.

That said, really customizing your layouts or controls (or dynamic modules for that matter) aren’t quite as easy as it sounds on paper. There was a bit of trial and error to make things work, and sometimes there was a combination of files that needed to be setup and data that needed to be configured through an import tool that added to a bit of the confusion. So make sure to buffer yourself a little extra time when creating your custom modules, even if you have a base sample or documentation to work with.

I still would recommend Sitefinity to somebody looking to get a fresh CMS off the ground and has some money to spend to get the support that comes with it. My fellow developer still prefers Umbraco a bit more, especially since he’s had more experience with it, but he readily admits that there are a lot more features available that he would have had to code up from scratch, saving us all valuable time. I’m definitely keeping Sitefinity at the front of my tools available for .Net development.

Have you worked with Sitefinity? I’d love to know your thoughts about the platform. The more information to share, the better!

Last week we launched a site for a client that was built upon the [Telerik Sitefinity](http://www.sitefinity.com/) CMS platform. Between me and 3 or 4 other developers, we customized the front end, a bit of the back end, and all parts inbetween. I’m quite proud of the launch. There were lots of learning points along the way and I’m sure some folks are wondering if it’s worth using this platform to build a site. Here’s my rundown on the good, the bad, and the ugly with it.

<!--more-->

![](@assets/images/posts/2015-09-sitefinity_logo11.jpg)

## The Good

**Out of box features**: Need a blog? It’s there (as many as you need). Separate news feed? That’s there too. Compared to other CMS systems I’ve worked with, the user interface for building your pages is rather nice. Most of it resides in drag and drop components, so that you don’t accidentally mess up the style of the master templates themselves.

Sitefinity has this nice notion of “shared content blocks” that allows you to use the same chunks of text (or even images) in various places on the site. We used this, in conjunction with shortcodes, to allow our end users to easily change some pieces of info that is available in multiple places on the site.

**Extensibility:** A lot of their modules have WCF web services built to access them. I leveraged this to [dynamically submit forms](/soup-to-nuts-dynamically-submitting-sitefinity-forms-using-ajax) to the system. I also was able to update somebody else’s module to [import WordPress blogs into Sitefinity](/something-old-and-new-importing-wordpress-posts-into-sitefinity).

**Documentation:** Sitefinity has a pretty extensive online documentation and forums section to help you track down issues and also find out how to implement features. There are a lot of CMS systems out there with skimpy documentation and that can be a problem.

**Tech Support:** If you have a Sitefinity account, take advantage of the support tickets you can respond. While the responses aren’t always the most informative (for my tasks) I received a response within 24 hours every time and there was always some insights to be gleaned.

## The Bad

**Documentation:** The good is also the bad. While the documentation is available, often times it isn’t extensive enough for some of the advanced concepts. The basic documentation gave me the springboard to build out complex [custom user widgets](/creating-custom-formatted-layout-widgets-in-sitefinity), but the example they had was very primitive compared to the widgets I built, and while I can’t confirm for sure, it appears that in order to have multiple “drop locations” in a single widget you also need to be careful how you order the class names in your code. Several interactions with tech support and pouring through documentation yielded nothing.

**Modifying Settings:** Sitefinity provides a high level of granularity to customize the system, but sometimes that is a bit of overkill. For example, e-mail notifications are disabled by default in a sitefinity install. If you want e-mail notifications for when a form is submitted, you have to update you system settings, notification profile, and also enable notifications for forms. Having this all consolidated would be better. Even if you kept things granular, having a little more robust administrative interface for some of these common features that updates multiple settings behind the scenes could go a long way.

**Supporting Complex Templates:** In order to create a really great site for our client, we did a fully reponsive site using bootstrap, google maps, some jQuery interactions and more. When you attempt to load the page in the WSYWIG editor, it became extremely difficult to edit, since the editor was attempting to load those changes up. Sitefinity is working on a “feather” template that is supposed to be more bootstrap friendly, but ultimately we had to write some [special template code](/fixed-more-button-disabled-multiple-forms-and-script-issues-in-sitefinity) that didn’t load our custom scripts in the editor. I thnk if there was large scale HTML mode to help with some of those updates, then that could go a long way in helping. Sometimes you just need to edit the raw code.

## The Ugly

**CodeSync Tool:** The Sitefinity CodeSync tool is designed to allow you to do file pushes from Visual Studio to your server of choice and keep a differential. That way only the latest changes you’ve made (or exist on the server) need to be synchronized, saving you valuable bandwidth and guesswork with major updates.

However, this tool was difficult to setup. There was a server piece and a client piece to download/configure/upload. If you had a value wrong, or didn’t do it quite in the right order, you wouldn’t see the server to sync with. The tool doesn’t work with HTTPS, so that caused a lot of headache when trying to work with our servers when we had HTTPS configured. The “initial configuration” required you to effectively download the entire file source from the server, as opposed to keeping a checksum or other marker on the file to eliminate the need for a full file copy.

In addition, I ran into numerous problems when developing in conjunction with a team of developers. With three of us working on code and pushing at various times, the server would often report erroneous updates needed. Or updates would be downloaded and the tool reported the files needing updating again. Similarly, if a file was pushed to the server, but I had downloaded the same version of that file through our git repository pull, CodeSync did not notice that the file was actually the same one, and prompt for an update/download. Eventually I abandoned the tool altogether and simply did direct file copies between my local machine and the servers I had to work with. It wasn’t pretty, but easier than the alternative.

## Conclusion

I’m rather impressed with Sitefinity. The licensing price seems good compared to other paid tier .Net CMS platforms out there and the out of the box features and extensibility go a long way to get you up and running fast with a site. The templating model is good and the extensible models aren’t overly complicated to work with.

That said, really customizing your layouts or controls (or dynamic modules for that matter) aren’t quite as easy as it sounds on paper. There was a bit of trial and error to make things work, and sometimes there was a combination of files that needed to be setup and data that needed to be configured through an import tool that added to a bit of the confusion. So make sure to buffer yourself a little extra time when creating your custom modules, even if you have a base sample or documentation to work with.

I still would recommend Sitefinity to somebody looking to get a fresh CMS off the ground and has some money to spend to get the support that comes with it. My fellow developer still prefers Umbraco a bit more, especially since he’s had more experience with it, but he readily admits that there are a lot more features available that he would have had to code up from scratch, saving us all valuable time. I’m definitely keeping Sitefinity at the front of my tools available for .Net development.

Have you worked with Sitefinity? I’d love to know your thoughts about the platform. The more information to share, the better!
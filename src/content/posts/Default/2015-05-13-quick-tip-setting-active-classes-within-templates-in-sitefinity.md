---
title: Quick Tip Setting Active Classes Within Templates In Sitefinity
description: Quick Tip Setting Active Classes Within Templates In Sitefinity
published: 2015-05-13
image: images/posts/2015-05-sitefinity_custom_class1.webp
imageAlt: Quick Tip Setting Active Classes Within Templates In Sitefinity
category: Default
tags: [active, classes, coding, menu, navigation, sitefinity]
---

We ran into an issue with our Sitefinity instance where the default menu navigation that was provided wasn’t cutting the mustard. We needed something more elaborate. However, we wanted to display an “active” box in our menu options based on the page the user was on. After some trial and error, here’s how you do it.

<!--more-->

![](@assets/images/posts/2015-05-sitefinity_custom_class1.png)

For a quick background, we have a custom master template that outlines our page structure. Within that master template, we have a [custom formatted layout widget](/creating-custom-formatted-layout-widgets-in-sitefinity) that we put our navigation items in. This navigation widget is using your typical format, with <ul> and <li> tags for our section/subsections, as well as class definitions for styling. In our case, we want to apply the “active” class based on the current page the user is on. While I could have done this inline, I chose instead to make a helper function, so that our navigation (which is already a bit complex) reads a bit simpler.

At the top of our MainNavLayout.ascx file, I added the following code...

https://gist.github.com/d6f2db0653d265a7bc0f

With that in place, we can then add then inject the following code in our menu blocks:

```<li class="personal-menu <%= NavHelper.CheckActive("/personal-banking/") %>">```

When the page pre-renders the page, it makes a call to our CheckActive method. If the current page contains the value we provided, we return the value “active” which in turn assigns the active class in addition to the personal-menu class to our list item. If it doesn’t match, we simply return an empty string, and move on.

In my case, I put / characters around my section name so that if we have a “personal-banking” page that is in a different section of the site, our URL check won’t accidentally set the menu section as active.

There’s a lot of room to customize this further, but this gets you off the ground nicely.

Hope this helps!
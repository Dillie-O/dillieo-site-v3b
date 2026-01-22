---
title: Zfa Scaffold Update Authenticating A Page
description: zurb_foundation_for_apps.png
published: 2015-02-12
image: images/posts/2015-01-zurb_foundation_for_apps.webp
imageAlt: zurb_foundation_for_apps.png
category: Default
tags: [net, apps, authentication, coding, foundation, zurb]
---

Last week a nice guy named [Greg](https://informaticianuk.wordpress.com) reached out to me about the [ZANS scaffold](/sharing-the-love-zurb-foundation-for-apps-scaffolding-for-net-with-authentication) I created and how he was enjoying it. He also ran into an issue where the reload of a view wasn’t properly checking user credentials. He found a simple trick to fix this which I wanted to share really quick.

<!--more-->

![zurb_foundation_for_apps.png](@assets/images/posts/2015-01-zurb_foundation_for_apps.png)

The simple trick is to check the authentication object again when the controller initializes itself. You’ll find that sometimes when you rebuild your .Net app, or fire up the browser for the first time the browser retains an older cookie, even though it has expired, so some of your “logged in” items are still visible. By running a simple auth check again, we can eliminate that problem on the client side. To accomplish this, we include the location and authService directives into the controller. Here’s what the updated News controller looks like:

\[gist]bc7f3b014516ab5ad59d

That’s all there is to it! If you have one or two controllers, this will work just fine. For anything larger, we’ll want to push this code into the main application definition, and potentially intercept the route change event. I’ve done something similar in a previous iteration of a project, so once I get it migrated in I’ll post another update.

Thanks Greg!
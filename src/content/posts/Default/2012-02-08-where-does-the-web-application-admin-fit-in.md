---
title: Where Does The Web Application Admin Fit In
description: Web Admin
published: 2012-02-08
image: images/posts/where_does_the_web_application_admin_fit_in.webp
imageAlt: Web Admin
category: Default
tags: [administrator, geekery, iis, web, web-development]
---

![Web Admin](@assets/images/posts/2012-02-web-admin.jpg)

Managing "web sites", especially through IIS, can be an interesting trip down through the ranks of computers and politics.

<!--more-->

As a developer, the typical lifecycle for a new website goes something like this.

1. Create Virtual Directory in IIS with proper settings
2. Copy files up to virtual directory.
3. Run Site.
4. Make changes to files locally.
5. Push changes up to site.
6. Make changes to virtual directory settings as needed.
7. Repeat 4-6 as needed.

This all seems pretty straightforward, except for the fact that in most circumstances, the site configuration and file uploads are handled by a server administrator. They are responsible for what files stay on their server and what interacts with it. Some server admins don't mind developers tossing files around and doing a few minor configuration changes. Others mind a LOT, and require a ticket or an e-mail in order to push things up.

The problem arises when changes need to be done rapidly, and the server admin is swamped. Generally speaking file migrations become a low priority, so you can be stuck waiting for a while, for a pretty simply process. At other times it's due to some of the expertise needed to run IIS. I've had a few configuration changes I've needed (such as application pools or .Net versions within the application), and when e-mailing the admin about it, the response has been that they don't know what I was talking about, and I walked them through the process.

What to do?! I asked this question a while back in [ServerFault](http://serverfault.com/questions/1191/who-is-responsible-for-maintaining-iis-for-web-apps), and I think the response is still in the middle. How do you handle it?
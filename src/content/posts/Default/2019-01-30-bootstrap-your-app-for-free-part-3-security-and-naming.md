---
title: Bootstrap Your App For Free Part 3 Security And Naming
description: Bootstrap Your App For Free Part 3 Security And Naming
published: 2019-01-30
image: images/posts/bootstrap_your_app_for_free_part_3_security_and_naming.webp
imageAlt: Bootstrap Your App For Free Part 3 Security And Naming
category: Default
tags: [coding, domain, geekery, naming, security]
---

<!-- wp:paragraph -->

In my last few entries, I have outlined how I was able to build my [Bookmarkinator](http://bookmarkinator.gq/) app for free thanks to a [variety of tools and platforms](/bootstrap-your-app-for-free-part-1-tools-and-resources) out there (no credit card or limited time demo software either!). I followed it up with some resources that you could [host your app](/bootstrap-your-app-for-free-part-2-hosting) for free as well (no credit card either!). That takes us to the final step which helps polish our app and make it look bonafide: security and domain names.

<!-- /wp:paragraph -->

<!-- wp:more -->

<!--more-->

<!-- /wp:more -->

<!-- wp:image {"id":"media-108"} -->

![](@assets/images/posts/2019-01-pexels-photo-258174.jpg)

Photo by Pixabay on [Pexels.com](https://www.pexels.com/photo/close-up-of-no-4711-258174/)

<!-- /wp:image -->

<!-- wp:heading -->

## Why Bonafide?

<!-- /wp:heading -->

<!-- wp:paragraph -->

One thing you could be asking is "why bother"? This is just a beta version of my application and it isn't going to matter since I will blow it away two weeks later for my version 0.7. That's a valid point. If I have noticed anything over the years, there are a couple of important pieces to help get your beta app traction or even to help yourself support it long term.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## Security

<!-- /wp:heading -->

<!-- wp:paragraph -->

Security is highly important nowadays. Even if you're using a basic e-mail address and password to login, that data could be sniffed through a connection at your local coffee shop. If your friend (or users) are using that same password elsewhere, you wouldn't want to be the one to accidentally open the door to have other accounts hacked. Having a SSL encrypting your traffic helps cover a lot of issues.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

To that extent, [Let's Encrypt](https://letsencrypt.org) has been around for a couple years now and offers free SSL certificates through their automated tools. It has been created by a consortium of trusted companies and also has been approved by all the major browser companies as a legitimate certificate authority. They have tools for nearly every platform and web server out there, as well as Docker solutions. The process is nearly painless and as long as you remember (there are tools for this as well) to renew your certificate every three months or so, you are set.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## Domain Name

<!-- /wp:heading -->

<!-- wp:paragraph -->

Sure, this could be a bit of a vanity thing, but I find it far nicer to be able to say "Hey, go check out my little hobby project at bookmarkinator dot gq" than "Hey, go check out my little hobby project at Bookmarkinator dot node25 dash thx1138 dot saas host dot com." I exaggerate a little in there, but not too much based on previous experiences I've had. It should also be noted that some services, like SSL certificates or Google Authentication integration, can't work at the subdomain level, so having a TLD is important to getting that in place.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

To help with that, there are a handful of top level domains (TLDs) that are free and available. [Freenom](http://www.freenom.com) is a great tool that will check availability against .tk, .ml, .ga, .cf, and .gq domains. You can reserve them for a year, and they are free to renew after that. There's no weird hosting shenanigans either, you can create all the standard DNS entries (CNAME, A, MX) you need.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## Be Fruitful and Codify!

<!-- /wp:heading -->

<!-- wp:paragraph -->

Armed with all of this, you can now build your new great idea, get hosted securely, and with a name that doesn't take 2 minutes to spell out! I hope this has been helpful to you and if you have any other resources that are similar for building apps out for free, make sure to leave them in the comments.

<!-- /wp:paragraph -->
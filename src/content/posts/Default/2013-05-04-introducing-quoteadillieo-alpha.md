---
title: Introducing Quoteadillieo Alpha
description: Quote Shot
published: 2013-05-04
image: images/posts/introducing_quoteadillieo_alpha.webp
imageAlt: Quote Shot
category: Default
tags: [coding, geekery, imagemagick, programming, quotes, ruby-on-rails, signature]
---

What do you do when the family goes to bed early and you have a hankering to code? Write an app that will dynamically render your old tagline code as an image for use in your GMail signatures! Then you share it for the world to use!

<!--more-->

**TL;DR;** Need a random quote for whatever reason? Go to <http://quoteadillieo.aws.af.cm/generate> and you're all set! Need it directly as an image? Use an image tag and link to <http://quoteadillieo.aws.af.cm/generate.png> and you're golden! Please note that I'm pulling from an old tagline file, and the quotes haven't been filtered out yet for any potential non work friendly tags.

Such is the case with Quote-a-Dillie-O! I've been a long fan of the taglines from my old BBS days (QWKMail users unite!) and have been using their taglines off and on. However, I wanted a simple way to render them in my GMail signatures without calling a local script to randomly search a file.

So thanks to a little [Ruby on Rails](http://rubyonrails.org "Ruby on Rails"), a little [ImageMagick](http://www.imagemagick.org/ "ImageMagick"), and a little [Magick Title gem](https://github.com/citrus/magick_title), everything is up and running. Oh, and a little [Zurb](http://foundation.zurb.com) for layout and [App Fog](http://appfog.com) to put the magic online.

Are you interested?! Go for it! Simply go to the following URL:

<http://quoteadillieo.aws.af.cm/generate>

...and you can grab what you need. Simply refresh to get a new quote.

The best part with the Ruby formatting (and most importantly) is that you can get a direct image to embed in your GMail signature (or anywhere that accepts image URLs). To do that, call our PNG link:

<http://quoteadillieo.aws.af.cm/generate.png>

And you can see things like this!

![Quote Shot](../img_post/2013-05-04-introducing-quoteadillieo-alpha/2013-05-quoteshot.png)

Finally, if you're feeling experimental, you can get the quote text in raw JSON format:

<http://quoteadillieo.aws.af.cm/generate.json>

Let me know if you do something fun with that.

Please note that the quotes themselves are from some old QWK Mail tagline files, and some may not be work appropriate, so simply refresh if you need another. 8^D

I'll add stuff as I can, but wanted to share love.

Enjoy!
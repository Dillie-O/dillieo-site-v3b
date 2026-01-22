---
title: How To Add A Windows Phone 8 Live Tile Using Angularjs
description: How To Add A Windows Phone 8 Live Tile Using Angularjs
published: 2014-08-19
category: Default
tags: [coding, live-tile, shortcut, tiles, web-site, windows-phone-8, wp8]
---

Lately I’ve started up [yet another pet project](http://prayerjournal.apphb.com) and wanted to start working with AngularJS. So far things have been great (another blog post to follow). One thing I like to do with my “web based apps” is use a well known trick for creating a windows phone live tile so I can pin them to my home screen.

Doing this same thing using AngularJS is amazingly simple and needs only a slight modification. Here’s how you do it.

<!--more-->

## Create the Tile

The first step is to create the tile image you want on your home screen. Typically you want this to be a 768x768 square PNG image with a transparent background, so that your theme’s color (or background in WP 8.1) can show through.

## Add the Div

The next step is to create a div element at the bottom of your page (or home template) to display the live tile...

You’ll notice here that we have the ng-show AngularJS directive in place. This simple element easily allows us to show and hide the screen with the tile. We update our controller to hide the div by default (your app and controller name can be whatever you like)...

## Trigger the Display

Finally, all we do is create a link, button, image, etc. with the ng-click directive to show/hide the tile...

That’s all there is to it!

## Why all the work?

You may be wondering why you have to go to all this trouble in the first place? The way Windows Phone 8 works is that when you pin a web page to your start screen, Internet Explorer takes a snapshot of the page and creates a tile image using that. It grabs roughtly the top 768 pixels of the page. By creating this special overlay div with the icon we want, we “trick” the phone into using this for our live tile. I’m sure there will be better supported options down the road, but for now, this works just fine with not too much work. Hope this helps!

###### [Published using Desk](http://desk.pm)
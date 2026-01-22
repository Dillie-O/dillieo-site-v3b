---
title: Quick Tip Simple Iphoneipad Layout Changes In Phonegap
description: Quick Tip Simple Iphoneipad Layout Changes In Phonegap
published: 2011-10-19
category: Development
tags: [android, coding, css, html, ipad, iphone, mobile-computing, phonegap, quick-tip]
---

So my sort of deep dark secret is that I [have one application](http://itunes.apple.com/us/app/l5r-honor-counter/id447910476?mt=8) in the iTunes App Store. It's a simple little counter for the [L5R CCG](http://www.l5r.com/) that I play with some friends. While there are performance issues going between pages, all in all I think it's a great and simple little app that shows off some great artwork from the game. I used [PhoneGap](http://www.phonegap.com/) to put the application together quickly to be both compatible for iPhone and iPad, but there was one little trick to overcome along the way.

<!--more-->

What you probably already know is that when you start a new application, PhoneGap puts in a reference for two CSS files using CSS selectors, one for ipad.css and the other for iphone.css. Using CSS selectors to test for dimensions, the proper CSS is loaded for the device. If your layout is relatively simple, you can use this to leverage the exact same framework, but tweak it for each device. For instance, my clan logo is only 100px wide/high in the iPhone version, but with the added screen space I can make it 300px on the iPad version. No need for additional files or crazy logic, I simply create my "honor box" like this with HTML

&lt;fieldset id="BothMyHonorBox" class="ui-grid-a"> &lt;div class="ui-block-a"> &lt;img id="BothMySeal" src="L5R_Seal_Spider.png" /> &lt;/div>

&lt;div class="ui-block-b"> &lt;div id="BothMyHonorValueBox"> &lt;span id="BothMyHonorValue">0&lt;/span> &lt;/div> &lt;/div> &lt;/fieldset>

and then I can format differently depending on my platform:

In iphone.css

\#BothMyHonorBox { position: relative; top: 10px; }

\#BothMyHonorValueBox { position: absolute; top: 0px; right: 30px; text-align: center; background-image: url('L5R_Splatter.png'); background-repeat: no-repeat; background-size: 100% 100%; width: 100px; height: 100px; }

\#BothMySeal { width: 100px; height: 100px; }

...and in ipad.css

\#BothMyHonorBox { position: relative; top: 40px; }

\#BothMyHonorValueBox { position: absolute; top: 0px; right: 30px; text-align: center; background-image: url('L5R_Splatter.png'); background-repeat: no-repeat; background-size: 100% 100%; width: 300px; height: 300px; }

\#BothMySeal { width: 300px; height: 300px; }

One other thing you can do is to show/hide items for each layout. For instance, on this same page, I have a reset button along with a couple others all in a single line. In the iPad version of this, I have plenty of space. But due to width restrictions, I wanted my reset button to simply say "R" on the iPhone version. Instead of using some fancy JavaScript, to rewrite the button text depending on the version, I simply created two buttons:

and then set the display in the appropriate CSS files.

iphone.css

\#btnBothResetMyHonorLarge { display: none; }

\#btnBothResetMyHonor { display: inherit; }

and ipad.css

\#btnBothResetMyHonor { display: none; }

\#btnBothResetMyHonorLarge { display: inherit; position: relative; right: 50px; }

...and that's all there is to it!

PhoneGap really is a great platform and small tricks like this make for rapid deployment across multiple platforms nice and easy. Now it's time to tackle Android!

_Shameless Plug: You know, if you like L5R, or just want to toss 99 cents to [some guys](http://www.thedelightgroup.com/) to help them in their endeavors and get a nice counter in the process, why not [purchase a copy](http://itunes.apple.com/us/app/l5r-honor-counter/id447910476?mt=8) for yourself?!_

_Disclaimer: I no longer work for [The Delight Group](http://www.thedelightgroup.com/), but am the author of the application._

So my sort of deep dark secret is that I [have one application](http://itunes.apple.com/us/app/l5r-honor-counter/id447910476?mt=8) in the iTunes App Store. It's a simple little counter for the [L5R CCG](http://www.l5r.com/) that I play with some friends. While there are performance issues going between pages, all in all I think it's a great and simple little app that shows off some great artwork from the game. I used [PhoneGap](http://www.phonegap.com/) to put the application together quickly to be both compatible for iPhone and iPad, but there was one little trick to overcome along the way.

<!--more-->

What you probably already know is that when you start a new application, PhoneGap puts in a reference for two CSS files using CSS selectors, one for ipad.css and the other for iphone.css. Using CSS selectors to test for dimensions, the proper CSS is loaded for the device. If your layout is relatively simple, you can use this to leverage the exact same framework, but tweak it for each device. For instance, my clan logo is only 100px wide/high in the iPhone version, but with the added screen space I can make it 300px on the iPad version. No need for additional files or crazy logic, I simply create my "honor box" like this with HTML

&lt;fieldset id="BothMyHonorBox" class="ui-grid-a"> &lt;div class="ui-block-a"> &lt;img id="BothMySeal" src="L5R_Seal_Spider.png" /> &lt;/div>

&lt;div class="ui-block-b"> &lt;div id="BothMyHonorValueBox"> &lt;span id="BothMyHonorValue">0&lt;/span> &lt;/div> &lt;/div> &lt;/fieldset>

and then I can format differently depending on my platform:

In iphone.css

\#BothMyHonorBox { position: relative; top: 10px; }

\#BothMyHonorValueBox { position: absolute; top: 0px; right: 30px; text-align: center; background-image: url('L5R_Splatter.png'); background-repeat: no-repeat; background-size: 100% 100%; width: 100px; height: 100px; }

\#BothMySeal { width: 100px; height: 100px; }

...and in ipad.css

\#BothMyHonorBox { position: relative; top: 40px; }

\#BothMyHonorValueBox { position: absolute; top: 0px; right: 30px; text-align: center; background-image: url('L5R_Splatter.png'); background-repeat: no-repeat; background-size: 100% 100%; width: 300px; height: 300px; }

\#BothMySeal { width: 300px; height: 300px; }

One other thing you can do is to show/hide items for each layout. For instance, on this same page, I have a reset button along with a couple others all in a single line. In the iPad version of this, I have plenty of space. But due to width restrictions, I wanted my reset button to simply say "R" on the iPhone version. Instead of using some fancy JavaScript, to rewrite the button text depending on the version, I simply created two buttons:

and then set the display in the appropriate CSS files.

iphone.css

\#btnBothResetMyHonorLarge { display: none; }

\#btnBothResetMyHonor { display: inherit; }

and ipad.css

\#btnBothResetMyHonor { display: none; }

\#btnBothResetMyHonorLarge { display: inherit; position: relative; right: 50px; }

...and that's all there is to it!

PhoneGap really is a great platform and small tricks like this make for rapid deployment across multiple platforms nice and easy. Now it's time to tackle Android!

_Shameless Plug: You know, if you like L5R, or just want to toss 99 cents to [some guys](http://www.thedelightgroup.com/) to help them in their endeavors and get a nice counter in the process, why not [purchase a copy](http://itunes.apple.com/us/app/l5r-honor-counter/id447910476?mt=8) for yourself?!_

_Disclaimer: I no longer work for [The Delight Group](http://www.thedelightgroup.com/), but am the author of the application._
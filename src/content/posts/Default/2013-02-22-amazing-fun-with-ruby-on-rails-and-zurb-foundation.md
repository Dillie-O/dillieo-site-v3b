---
title: Amazing Fun With Ruby On Rails And Zurb Foundation
description: Timer Trio
published: 2013-02-22
image: images/posts/amazing_fun_with_ruby_on_rails_and_zurb_foundation.webp
imageAlt: Timer Trio
category: Default
tags: [app-fog, coding, coffeescript, countdown-timer, gaming, html, html5, json, mysql, programming, rails, responsive-design, ruby, ruby-on-rails, zurb, zurb-foundation]
---

![Timer Trio](../img_post/2013-02-22-amazing-fun-with-ruby-on-rails-and-zurb-foundation/2013-02-timertrio2.jpg)

A few weeks back a friend of mine asked me to create a game timer that he could use at the local [game / comic shop](http://www.gameonarizona.com/). Since the options were open, I used this opportunity to try out new web technology for me ([Ruby on Rails](http://rubyonrails.org "Ruby on Rails")) as well as dig deeper with a presentation framework I really like ([Zurb Foundation](http://foundation.zurb.com/)). It was nothing short of amazing fun!

<!--more-->

Functionally, the app was pretty simple. My friend wanted a basic countdown timer, with the ability to add background images for various games, have alerts at various times, and have it displayed full screen so they could put it up on their big screen TV in the shop for all to see. In addition, it should be easy to reset and restart the clock without having to fire up the configuration screen again. As an added perk, all of the images within a given game would also rotate at a fixed interval, just to keep things interesting.

The first step was the presentation/display. I immediately thought of Zurb Foundation. I started using Zurb a while back on a pet project of mine (still in the works) because I'm no designer, but I wanted things to look good AND give me the ability to have the timer run on your phone or tablet too! Zurb provides buttons, form elements, even some Javascript modules to get you up and running quickly. Here's what our fill out form looks like:

![Timer Setup Page](../img_post/2013-02-22-amazing-fun-with-ruby-on-rails-and-zurb-foundation/2013-02-timersetup.png)

Again to emphasize how much I love Zurb, this page automatically resizes itself to fit nicely on both my tablet and my phone. All I have to do is specify a few classes for column size and grid size and Zurb does the rest. But the real beauty comes when you click the "Launch Timer" button:

![Timer in Browser](../img_post/2013-02-22-amazing-fun-with-ruby-on-rails-and-zurb-foundation/2013-02-timerchrome.png)

It took a couple of small tweaks to get the "Reveal" module to go [full screen](/creating-full-screen-modal-windows-in-zurb-foundation-reveal), but even then it was pretty minimal. It was easy to specify a button bar to put my start, pause, and restart buttons. In order to accomodate for the smaller resolutions on the tablet and phone, I included a smaller text bar for the timer and a smaller version of the logo. By simply giving them the class of "hide-for-large-up" it goes away on the big screen. I use a similar class to hide the larger elements on the small screen.

Zurb makes things so simple to quick layouts, and when I needed to customize things, the framework is flexible enough to allow you to do it with minimal hassle! I can't wait to dig into it even more.

When it came to setting up the application architecture itself, I went to Ruby on Rails (RoR). I've heard great things about Ruby, and even [read a book a](/review-the-book-of-ruby) while back and wanted to see what all the hype was about. Needless to say RoR didn't disappoint at all!

I think the thing that most impressed me was the ActiveRecord and Scaffolding architecture that RoR provides. It's not to say the the "simplified" nature of the language wasn't appealing (having a quick way to generate HTML and JSON responses as well as quick and easy code to loop collections is very handy), but the biggest challenge on the back end was the constant tweaks to the database structure holding the data. For a while I was using a simple [SQLite](http://sqlite.org "SQLite") database to store our information, but changes in the architecture pushed me towards a [MySQL](http://www.mysql.com "MySQL") layout. Thanks to the way scaffolding, migrations, seeds, and ActiveRecord all work, I simply needed to change a configuration file to use MySQL as my storage engine, call a db:reset command, and RoR did the rest! Data validation and everything else was present too!

While I didn't get a chance to fully implement it, the use of [CoffeeScript](http://coffeescript.org/) within RoR was very nice too. It allowed me to setup a few functions and jQuery calls a lot simpler than I've had to do in the past, and it's a lot more readable.

While my description of RoR is quite brief here, it doesn't really do it justice to how nice it was. All of the architecture is well laid out and provides for a very "clean" code environment for me to work. All the database structure is separate from the configuration of the database engine itself. The controller provides simple coding to set variables for the view, and all of the "code helpers" at the view level make it easy to put form elements or iterate collections for the client. While it won't be replacing my primary language anytime soon (I still love .Net MVC with EF POCO), I can solidly say Ruby on Rails is my #2 language now and can't wait to work with it more.

I should put in one last note of thanks/amazement to [AppFog](http://appfog.com). They provide a "[Platform as a Service](http://www.wikinvest.com/concept/Cloud_Computing "Cloud Computing")" architecture that makes updating this application as simple as a few commands from a terminal window. They offer a wide variety of additional platforms (Python, PHP, etc.) and it all runs in the cloud, so you can leverage it's availability. They provide a basic free hosting plan that is perfect for me needs, but I know where I'll be looking when I have a larger scale project.

So there you have it! A really practical and fun project that I was able to put together in about a week (though stretched out over a lot of nights and weekend or two 8^D) with a couple of technologies I was no expert at. My friend loves it, and I even got to see it in action the other night at the shop!
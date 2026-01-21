---
title: A Fresh Perspective Two Years And Counting As A Remote Worker
description: A Fresh Perspective Two Years And Counting As A Remote Worker
published: 2013-06-04
image: images/posts/a_fresh_perspective_two_years_and_counting_as_a_remote_worker.webp
imageAlt: A Fresh Perspective Two Years And Counting As A Remote Worker
category: Default
tags: [fresh-consulting, life, programming, reflection, remote-work, telecommute]
---

Time flies when you're having some Fresh fun! This week I've started my second year with [Fresh Consulting](http://freshconsulting.com) as a remote worker. This has been my first foray into remote working, so I've been [documenting](/the-remote-worker-one-month-in) some [milestones/tips](/the-remote-worker-three-months-in) along the way. While my [first year](/a-fresh-year) seemed to be a huge eye opening experience in the way the private sector work, technologies to work with, and projects to work on, this year seemed a lot more focused.

<!--more-->

I spent a good 9 months on a single project this past year. Even then there was some small updates that made time linger more, but that's where the bulk of my effort went. It was an amazing project and I worked in an area I didn't have a lot of experience before: front end scripting. We worked with a company to rebuild their dashboard map to make it a "single page application" (SPA) that had better mapping, more data, and purely configurable from the database so if they wanted to change their color scheme for a given metric, no front end work was needed.

The company already had their own crack .Net team, so I was there as the front end "glue man." There would be discussions about a dashboard feature (a pie chart with data for X). Our designer would come up with the layout and a prototype with highcharts. The back end guys would discuss how they were going to update their data warehouse to provide that data. Then they'd look at me and ask how we put the two together. Eventually we worked out a smooth system for how to set up our AJAX requests and what the JSON results were to return. We wanted to make the client as "dumb" as possible; It makes a call to the API, it gets data. If the status is OK, then it drops a color, or an array of data, or something else, into the proper parameter that highcharts needs. Problem solved. There was enough going on with the management of 40+ charts/tables/map entities that had to respond to a change that needed to be handled.

In the end the project turned out to be an amazing release that the users loved. I gained some direct and detailed work with [d3](http://d3js.org), [highcharts](http://www.highcharts.com/), [datatables.net](http://datatables.net/), and [backbone.js](http://backbonejs.org/) that I'll be able to take to other place and refine even more. I even had a few good blog posts out of it, and a big one to follow soon.

This year was more of a "tools and techniques" year that anything else. As my remote relationship with Fresh has strengthened and more members have come on board, I've had a little more autonomy with my projects and time to work with them. This has had some pros and cons, main con being that sometimes our meetings would start off with a lot of catch up on really old items or confusion over a random e-mail that had come through. To help resolve this, I took a page from the "daily standup" meetings that our client above was using and started generating my own "daily virtual standup" meetings via e-mail. Staying true to it's goals, the e-mail can be glanced at in a minute, maybe two, and gives a quick overview of what client, what takes (sometimes a ticket number) and the progress on it from yesterday and the goals for today. If any question points are brought up, then we can discuss them further. This has been an amazing help in the overall communication level and most questions are answered equally as fast. It may have even inspired some additional progress meetings in the office 8^D

I really really try to work "smarter and not harder", especially with the need to jump into various projects (across different languages at times) often. The tools I've picked up and used over the past year have made my work that much more productive and manageable:

[Visual Studio Professional 2012](http://www.microsoft.com/visualstudio/eng) - Express is great, but some of the plugins with Pro really help

[JetBrains Resharper](http://www.jetbrains.com/resharper/) - I've never written better code in my life and it's helped me refactor a lot of existing code we have.

[JetBrains PHPStorm](http://www.jetbrains.com/phpstorm) - Easiest way I've been able to setup PHP debugging to date. (need to a full version 8^D)

[JetBrains RubyMine](http://www.jetbrains.com/ruby) - Best way I've been able to learn Ruby on the side (need to get a full version too 8^D)

[CoffeeCup Web Editor ](http://www.coffeecup.com/osx/web-editor/)- I'm a long time fan of the PC version, but they now have a nice Mac version I can use for my quick edits/checks.

[Sublime Text](http://www.sublimetext.com/) - Where have you been all my life?! It is an insanely powerful text editor! I've been converted! Plus it runs on Mac and PC.

"But what about the company itself?!" you may be thinking. Fresh is fabulous and wonderful, even more so than when I first started there. Our core team is growing, and everybody is willing to chip in somewhere or another when needed. While I don't see it often being the remote guy, collaboration is always encouraged and a person won't hesitate to ask for help on an issue that arises after getting stumped for too long. There's fun stuff the team does as well outside of "work hours", such as a [huge snowball fight to set a world record](http://freshconsulting.com/fresh-show-at-seattle-snow-day/) or even our upcoming [ragnar relay race](http://freshconsulting.com/a-fresh-perspective-on-running/).

The bottom line is I work in a place where my ideas are respected, I'm given the tools I need to implement them, and I get to solve a plethora of problems on a daily basis. I also do this from the comfort of my downstairs office at home so I have the flexibility of time to be with my family too. While there have been lots of balancing acts to learn, it has only gotten better over the past two years and I have Fresh to thank for that!

Here's to another 2 and beyond!
---
title: The Toolkit Backstory Part 1
description: The Toolkit Backstory Part 1
published: 2009-05-04
image: images/posts/the_toolkit_backstory_part_1.webp
imageAlt: The Toolkit Backstory Part 1
category: Default
tags: [ccg-toolkit, coding, deck-studio, netrep, ronin]
---

Back in 2004 or so, I was just getting my feet wet in the Yu-Gi-Oh community. I loved the game, but was a little bit of a "closet duelist" since I had no clue how many 20 somethings were actually playing the game. My excuse was to get into judging. I figured that way I could get an idea for the field, plus getting a handle on the game and helping others do so was a big passion of mine.

Through this process I stumbled upon a program called [RONIN](http://roninpro.com/), the Rulings Online Network Information Node. This tool was simply beautiful. It had all of the current official rulings and an easy method to retrieve them. The complete index of cards was listed on the side and there was an auto-complete textbox attached to it to quickly get you to the card you needed. On top of that, there was an advanced search that allowed you to narrow down specific types of cards to search.

What was really going on here was that I now had a rulings tool AND a basic card searching tool when I wanted to build my decks. I had not the time (nor the finances) to track down every card in the game (which was still pretty limited mind you, this was the second or third set released). This excited me to no end.

In addition to the functionality, my programmer site was giddy over the architecture of the program. There was the online component to viewing data (over a web service), an offiline mode which consisted in generating a data module to store all the rulings, a separate module that stored all the card names that was dynamically. A whole slew of stuff I was itching to try out since my primary job is in the web application side of things. On top of that, it was written in .NET, something I was getting immersed in and run really well, despite a lot of hate it seems to garner.

So I jumped over to the [City of Gamers](http://cogonline.net/) (CoG) forums, which was the host of the application. I was hoping to start pinging the brains of the folks over there for info, and maybe even help join the team to further the cause. I had some really warm feedback from the lead (and only for that matter) developer on things and I make sure to hang around, offer some feature requests, attempt to debug issues, and the like, just waiting for the chance to jump.

...and then it happened.

Empyre Group, the folks running CoG and RONIN, were offering up a programming contest to help them add to the functionality of RONIN. More specifically, they wanted a tool that could be run daily that would ping the primarily rulings site to see if there were any additions, modifications, or removals to rulings, and generate a report as such.

_\[This is it! My big break! Don't blow this one!]_

So I spent the next week coding like a madman. This was all new territory to me: .NET 1.1 Framework (I was still working my way in from a Perl/PHP background), WinForms, HTML Scraping using Regular Expressions, some form of file storage for this stuff. Everything!!! I had no clue how many others were entering this contest, but the traffic was increasing on the CoG site, and I'm sure that there were other folks of my ilk playing the game, and I was still a noob, so I had to impress.

In the end, I was rather impressed with the results, especially for my first shot at things. Don't get me wrong, the overall package was still pretty ugly. I discovered that DataBinding to DataGrids in WinForms was a bit more complicated that in WebForms, I had part of the application configuration through a menu option in the application, and another part of it stored in the app.config file, and a few really ugly strings that had to be used to the regular expression split on the card and ruling dividers since I hadn't optimized that process yet. But I had a nice little acronym for it RUN (RONIN Updating Node). Yes, I am an acronym junkie, you'll have to get used to it. Even more cleverly _\[and probably to my demise]_, I could say "Run RONIN Run!!!" and let the application update itself.

I submitted the application and waited, agonizing for a few days. The source code was to be provided too, which would either help or hinder, since my coding style was still quite green and not too nice. To my credit, I did have commenting drilled into my system pretty early in the game, so that should score a few points on make sure things were properly outlined.

A few days later, I received an e-mail from the lead developer at Empyre Group. _\[GULP]_ Pausing a moment before opening the message _\[Did they hate it?! Did the app actually run when they fired it off?! Was the code abysmal?!]_, I opened up the message and discovered I HAD WON! One particular phrase stuck out in the message... _the application was a bit of overkill from what we were expecting_... and I never found out if that was a good or a bad thing. I did discover later on that I had been the ONLY applicant to the process. 8^D However, what was more important was that A) I was getting some Yugi swag as the primary prize, and B) they wanted to know if I was interested in joining the team on a new project.

_\[Are you kidding?! That's why I entered in the first place!!!]_

With only a little hesitation, I said most definitely I wanted to join. I had to clear things with my wife first, because from what I was gathering, Empyre Group was getting ready to move into high gear and that would mean some late nights slingin some code. She approved, as long as EVERY night wasn't a coding night. From there the proposition came to me. Empyre Group wanted to have a deck building program that would better fill the needs of the deck builders out there, since RONIN wasn't designed for that. The best part was that they wanted ME \_\[Really me?! The rookie in the crew?!] \_to come up with some ideas. They weren't pushing anything on me, at least initially, they wanted to know my thoughts on the issue.

So I began to start learning a TONS about coding from my own coding Yoda, djp952 (mad props to ya, if you're still out there peeking in every now and then!). A lot of it came in the form of viewing the RONIN code and discussing ideas on how this new deck building program would work. So thus began my life as an EGI coder on the side.

In the next issue...the evolution of Deck Studio.
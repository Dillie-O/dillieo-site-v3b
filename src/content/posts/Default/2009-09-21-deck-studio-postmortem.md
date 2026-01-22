---
title: Deck Studio Postmortem
description: Deck Studio Postmortem
published: 2009-09-21
category: Default
tags: [ccg-toolkit, coding, deck-studio, netrep, ronin]
---

_For those if you that aren't in the software developer lingo, the postmortem typically occurs when a software project has been released into production, or even retired. Considering I have yet to do one, I figured I'd take the instance of the latter and use it to help reflect forward. Of course, I found a nice outline for one on the _[_StackOverflow_](http://stackoverflow.com/questions/38066/whats-your-post-mortem-meeting-format)_ site and I figured I'd pull a few items._

**1. What went wrong?**

Streamlining the data entry was a big culprit. It got better over time, but initially, especially after I had inherited RONIN and netrep, having three seperate databases, using different technologies, for the same data, really made things rough. The technical divide just in handling this almost stopped the suite of apps early on.

There could have been a better object oriented design, especially with the creation of controls and some common libraries (which happened during the start of the 2.0 process). Deck Studio was documented well enough that I could find the appropriate support methods when needed, but having it all in a single DSMain.vb file was very bad form.

The transition to netrep 2.0 did not go as favorably as planned. There were some genuinely surprising complaints by the end folks about some of the new layout that I took to heart (most notably the auto-complete feature). Ultimately I should have done more beta testing to draw in public feedback for the new functionality. I don't think I lost much repeat traffic, but it did put a bit of tarnish on the reputation of the site.

**2. What went right?**

It took a while to implement, but having a common database for Deck Studio, RONIN, and netrep was crucial. It cut the time of set releases dramatically and using SQLite to port things out for the "public consumption" allowed for a strong, normalized database for storage and a fast, denormalized database for reading records.

In addition, getting the public involved through set templates and the forums went a long way to keep everything "duelist oriented."

Keeping a "separation of concerns" was always a debated, but good decision. While there was a small rulings module added at the end to Deck Studio, the "heavy lifting" rulings application was always RONIN, and would stay that way. There are a handful of "elite duelists" that are looking intensely at the rules and the deck build, but the apps themselves were lightweight enough that you could be running both just fine and have each need met. I still [waver back and forth on this issue](/finding-the-balance-modules-or-apps), but I think ultimately individual apps with powerful extensions would be the way to go.

**3. What would you do differently if you ran the same project again?**

I would have started the main database to be more "portable" from the beginning. The card data, and the restriction lists, and the rulings, were all tied into a single file, which didn't make much sense when doing a simple restriction list update. Having this kind of structure would have made things more amenable to plug-ins and modifications, which became more and more in demand as the apps continued on in their life. Optimizing the search user interface would be another thing to modify. I went around and around on this issue with the best way of presenting, and executing, a method of doing granular search on cards ("all Fiend cards with less than 300 ATK and contain "brain" in their names" type things). There were two main methods to the search (inclusive vs exclusive) and ironically enough RONIN and Deck Studio both took opposite approaches with mixed results on both ends.

**4. What hindered your progress during the project?**

Documentation. Probably the number one killer of any collaborative app, but I spent a lot of time trying to figure out what my own convoluted code did a year later when making a critical update!

**5. What have you learned from the project?**

The question should be more of what **didn't** I learn from the project. This is where I get a little sentimental in a geekish manner and reveal how much I think coding is freaktastic. The CCG Toolkit (and Deck Studio primarily) was the project that I really got to sink my teeth into as a "real" programming project. I was only a couple of years out of college, and I had a little under my belt with line-of-business type apps, so I want' completely green to the environment.

But by creating tool used by hobbyists and enthusiasts around the globe, I was able to tackle such a wide variety of issues through development:

- User Interface Design (I had never done WinForms apps up until this point)
- User Feedback (which was taken very seriously in the design of the program)
- Creating portable storage mechanisms.
- Creating remotely updating portable storage mechanisms.
- Repository synchronization.
- ...and a heck of a lot more

This doesn't even begin to get into all the new code libraries I wrote from scratch, and learning about some really cool coding techniques along the way from my mentor/fellow programmer. I also got to see how the .NET Framework was growing, such as how the List&lt;T> class made things TONS easier for keeping sub decks together. It was genuinely a joy to sit down, sometimes on the weekend, sometimes late at night, and pound out that little update or set release that made somebody else on the other side of the globe happy. Call it a "perfect storm" type application.

Ultimately the toolkit revolved around the data, sorting, viewing, saving, organizing. So now I got to work with three (and almost 4 or 5) different "faces" to the same bit of data. Netrep was the web front end. RONIN was the client based version for the rules. Deck Studio was the client based version for organizing things personally. At one point there was a web based version of Deck Studio (horribly bad, but fixable) and there was thoughts of a mobile optimized version of netrep for viewing things. What a great foundation to get your feet wet with things.

Let's not forget all the awesome folks I met "digitally" through the process. My mentor was in Balitmore, another guy in Pittsburg, then I've had consistent data submissions by some folks in England, Italy, and most recently South Africa. Feedback on the application came from most places, and I probably couldn't track them all, even on my internal tracking application. The feedback was always constructive and helpful. I cannot thank those folks out there (djp952, Maruno, FloWen, Deathjester, YugiDad, all come to mind, but there are plenty of others that I apologize for forgetting here) for what they did!

But alas the time had come where more important priorities and the volume of work involved dictated that I need to cut my ties and start a new chapter. It is bittersweet. The [code and data](http://web.archive.org/web/20100820231755/http://dillieodigital.net/netreparchive/) is up so that others can take the torch and run. Somebody is already in the process of taking over netrep, which makes me happy. There are new apps to write down the road, but you never forget your first.
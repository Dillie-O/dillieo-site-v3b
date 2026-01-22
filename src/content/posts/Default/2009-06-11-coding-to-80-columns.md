---
title: Coding To 80 Columns
description: Coding To 80 Columns
published: 2009-06-11
category: Default
tags: [coding]
---

A while back I was reading a [StackOverflow](http://stackoverflow.com/questions/110928/is-there-a-valid-reason-for-enforcing-a-maximum-width-of-80-characters-in-a-code) post about how the best character width for your code.

As a quick flashback, coding style was never covered in college, aside from a few mentions about variable names. When I started in the workforce, code reviews involved printing out the code and discussing it in the group. I was obsessed enough that I setup my own standard of formatting my code to 120 characters, since this made for a perfect landscape printout using a Courier 10 font. I had my properties sidebar setup perfectly to 120 characters so I could type away and know when to go to the next line. \_\[Yes, pretty obsessive, but hey, code wrap was a bear when done in the wrong place.] \_Once I moved on to using the Consolas font, and moved on to another job with no reviews, this practice died off. The Consolas font was also "smaller" in appearance as well, so expanding the properties window looked weird to me.

In the post, the dominant answer was to stick wtih 80 characters. This seemed rather interesting to me. On one hand I thought that really was really a waste of space on my dual 19" monitor setup. It also seemed a little "old fogie" to try and go back to the old punch cards, which is where the length things originated from. But there was a lot of upvotes and good feedback about why to keep things at 80 characters, so I decided to give it a whirl. I was in a good position to do so in that I was midway through coding a project, so I could refactor some of the existing code and also write new code to this guidline.

I found a [simple registry hack](http://blogs.msdn.com/b/saraford/archive/2004/11/15/257953.aspx) to get a line drawn in Visual Studio at the 80 character mark and started hacking away to some very profound results:

I write some **really, really, ugly** variable and method names. I mean it is one thing to avoid declaring names like "c" or something like that, but something like dtmPositionPositionUnderFillDate is a little overkill. _\[But wait! That particular variable is referencing a given date field in a form with multiple panels that have similar names. Doing it this way helps you establish what panel and what variable you're working with and can easily be grouped with other variables in the panel.]_ Yes, that is true inner self, but there are much cleaner and shorter ways of doing that, especially if you have to compare that date to another date in your code, you wind up wrapping to a second line on a simple If x = y type statement, which really shouldn't be happening.

It is is a **lot easier** to debug my code _\[Horray, woot, yippee]_!!! A few people mentioned this, but it really didn't hit home until I had to start stepping through the code to debug a few things and in the line per line processing, my mind had fewer things to process, which actually made it easier for me to debug line per line to figure out what was going wrong.

Code presentation is much nicer for others. I've used a few of my updated code snippets when helping out some colleagues, and being able to paste the code into an e-mail without having to reformat it due to length is a big plus. This applies to online code postings too. Interestingly enough, this has also helped me identify some unhealthy methods in my code. They looked nice and concise in the wide format because the code was only 10 lines or so long. But when I had to condense them to the 80 character limit, the methods exploded in size. It also exposed some of the nasty variable names and methods I had listed above.

I recommend you try out 80 columns for yourself. You may be surprised at some sloppy coding style that may have been hiding in the luxury of the wide screen and super high resolutions. There's no hard and fast rule to stick to 80 characters. Some people even mentioned they stayed around 100. In the grand scheme of things though, I think having a smaller width of characters to work with help you write a little more elegant code.

**Update**: With the release of Visual Studio 2010, the registry hack used above will no longer work. However, the Visual Studio Pro Tools extension has a "Column Guides" tool built into it. You can get that [here](http://visualstudiogallery.msdn.microsoft.com/en-us/d0d33361-18e2-46c0-8ff2-4adea1e34fef). Unfortunately this doesn't work with the Express Editions that are available. I'm currently in the hunt for a solution. If you have one, post it here. I tried creating the necessary registry keys to no avail.
---
title: Developers Toolkit Mmx Edition
description: Developers Toolkit Mmx Edition
published: 2010-03-10
image: images/posts/developers_toolkit_mmx_edition.webp
imageAlt: Developers Toolkit Mmx Edition
category: Default
tags: []
---

Looking over my site, which needs a severe update, I realize that my “developers toolkit” is really out of date. The premise still remains the same: as robust and feature rich as most IDEs are nowadays, it is still difficult to have an "all in one" package for developing your applications. The database tool might be missing that handy view or export for the data. The graphics editor doesn't handle layering. You just need a place to store that code snippet you found in that forum thread until you're ready to paste it into your method.

However, there have been new tools that have come and gone, and I felt it was time for a revisit, partially to see how things have changed:

**File Management  
**_Then: PowerDesk  
Now: None._

Having a really good file manager used to be key to all of the file transfers and management on my projects. I think the most critical part was having a handy split view so that I could quickly migrate files from my local development sandbox up to the test server. Thanks to Windows 7 and the quick docking feature, the most important piece is a few simple keystrokes away.

Simply hold down the shift key while clicking on the Windows Explorer icon two times (not double clicking) so that two instances of Windows Explorer starts. From there hold down the window key and tap the right arrow so that one window docks on the right hand side. A quick ALT-TAB to go to the other Windows Explorer instance and use the left arrow with the window key and the window is docked on the left. Copy/Move becomes a nice and simple drag process, and there’s one less program for me to worry about.

When I’m dealing with a large batch of files to synchronize, I found the Microsoft’s [SyncToy](http://www.microsoft.com/downloads/details.aspx?familyid=c26efa36-98e0-4ee9-a7c5-98d0592d8c52) to be excellent at handling this. Of course, I couldn’t do anything without having [7-Zip](http://www.7-zip.org/) around to handle all my archiving/packaging needs.

**Quick Notes  
**_Then: Stickies  
Now: Stickies_

[Stickies](http://www.zhornsoftware.co.uk/stickies/) is one of those gems that has been around forever and is still being updated. Much hasn’t changed from when I installed version 5, and it is at version 7 now. That’s the beauty of it. There’s no bloat in the app. I use Stickies to pull off code snippets, e-mail details, and practically anything else I need to keep in note format during my coding/debugging process. Stickies will allow you to hide or place your note always on top, sleep for a designated period of time, and a myriad of handy features. You can even skin your stickies or synchronize them with your PocketPC or Palm device.

**Database Management  
**_Then: Toad  
Now: Toad_

[Toad](http://www.toadsoft.com/) is another one of those tools that has only gotten better with age. If you're not familiar with Toad, they have established themselves as the premiere Oracle development / management tool. The interface is crisp, the tools are feature rich, and the install size isn't too intense. The best thing is that the makers decided to release a freeware model that is lacking a few features, but nothing that interrupts your day to day tasks. They currently have version for you to use for all the major databases out there. As an added bonus, they have released a free version of their data modeling tool which will give you a great resource to design/document your database schema in ERP format and have the DDL auto-generated for your database.

**Text Editing**  
_Then: PSPad  
Now: Notepad++_

This is one of those categories where are so many great tools to choose from and choosing any of the top tools works great. I think the line numbers and built in differential tool of [Notepad++](http://notepad-plus.sourceforge.net/) is what brought me over to it. Its interface is what I’m most comfortable with when working with files. Again, each of the top editors has its nuance, so go with one that suits you best.

**Image Manipulation  
**_Then: Paint.Net  
Now: Paint.Net / Inkscape_

[Paint.Net](http://www.getpaint.net/) was just getting off the ground when I first wrote about it and since then it has turned into the defacto windows image editing program out there for the “average Joe.” Paint.NET gives you all of the tools you need for graphics development (plenty of export formats, layering, effects plug-ins, etc.) and is completely free. I use it for tweaking up some of my web images or creating new ones from scratch. Unless you need the advanced features of Photoshop, Paint.Net will work great for you.

Along the way, I’ve also needed to work on scaling images to higher resolutions and do some general vector based image manipulation. I’ve found that [Inkscape](http://www.inkscape.org/) is an excellent tool that gives me all of my vector imaging needs, with all of the popular pixel based formats to export to.

Once you get the hang of vector image manipulation, especially tracing existing images into vector format, you’ll be amazed at what you can accomplish between the two programs.

**Network Analysis  
**_Then: TCPView / Packetyzer  
Now: TCPView / Wireshark_

Are you wondering if your application is actually sustaining a connection with the database? If the connection is properly established, is the parameterized query being constructed and executed properly? I use [TCP View](http://technet.microsoft.com/en-us/sysinternals/bb897437.aspx) and [Wireshark](http://www.wireshark.org/) to validate these issues at a very granular level. TCP View will allow me to view which Internet connection I have open in real-time. If I really need to get to the minute details and/or verify that the communication between application and database is valid, Wireshark provides me with a excellent packet sniffer that has searching capabilities and the ability to retrace an entire communication between two endpoints by tapping into one packet.

**HTML / Javascript Analysis  
**_Then: Firefox Plugins  
Now: Chrome Developer Tools_

I became a Chrome convert around version 2.0. I wasn’t overly impressed with version 1.0, but the new features and updates in version 2.0, plus my plugin overload/slowdown in Firefox, brought me over to the “Spartan” side of web browsing. I do need Firebug on occasion, so I do have the install on there for that and Page Speed.

**Code Snippet Manager**  
_Then: None/PSPad  
Now: Snip-a-Dillie-O_

I’ve tried the Visual Studio manager, but I like to maintain HTML snippets, SQL queries, VB and C# code and even some other code related stuff that just didn’t quite fit into the snippet manager tool. Searching around the Internet really didn’t pan out to much, so when it doubt, code it yourself! I wrote a simple little tool that allows me to maintain my snippets, and easily drag and drop them into the editor of the moment for use. It’s great! I’m currently rewriting it to try my hand at WPF, LINQ, and use some new features with Windows 7. I’ll try to get it out to the public then.

So what about you? What tools are in your arsenal? I’m always looking for new ones!
---
title: Amazing Programmers Are Replaceable
description: matrixmini.jpg
published: 2016-10-06
image: images/posts/amazing_programmers_are_replaceable.webp
imageAlt: matrixmini.jpg
category: Default
tags: [coding, documentation, life, maintenance, quality]
---

Things got a little crazy at work last week while I was gone on vacation...

<!--more-->

![matrixmini.jpg](@assets/images/posts/2014-11-matrixmini.png)

I'm currently the lead developer on a platform we built for a client. I say "platform" instead of application because we have an API, Web Application, iOS Application, a WordPress site, and numerous static content resources put together to serve their needs. It's pretty slick, if I do say so myself. It is also a bit complex when you map out how the pieces fit together.

That said, there was some documentation in place and couple of others that work on the project. Recent updates had been slow for the project, so I left for vacation without much in mind.

I received a call midway through vacation from work. Another of our senior developers was on the line and needed to know how the merge/deployment process worked for the platform. I had mentioned there was some documentation, but gave a quick overview on things, since the API and Web App models were slightly different. That seemed to cover the questions they had and I went on my way.

When I got back from vacation and was filtering through my e-mails, I discovered things had gotten rather crazy. An immediate update was needed for the site, which affected both the API and the Web App portions of the platform. The documentation (after I had done some digging) was lacking in detail. It had taken several iterations, and a short time where the production Web App was broken, before things were pieced together and finally pushed out. The Web App didn't use the traditional approach we had in place for deployments, which made for more iterations and time lost. Additionally, there were some new reference codes that needed to be added immediately. Since there wasn't a formal admin module in place, this is typically done manually by me, but with no documentation, let alone a note about needing to open a firewall to the database, this task was left open until I had returned. Needless to say, I had failed the team, and our client, for a couple of tasks that weren't trivial, but not complex either.

I've tried to adopt the view of [software craftsmanship](/phatcode-share) over the years and a big factor of this is being able to write [maintainable code](/on-writing-maintainable-code). Along these lines, I want to write code and build solutions that don't require me to be lingering around for them to run or be updated effectively. Ideally they can get up and running with only the code and documentation at their disposal. I suspect there is still a small batch of programmers out there that buy in to an old standard of writing code that is so crazy, or has some "black box magic" in there that it will provide you job security, because the system would crash or and upgrade wouldn't be possible without them. I find this rather insulting to the craft of programming and software engineering as a whole.

Amazing programmers build systems and write code that makes them replaceable. By having "beautiful code" and [high-quality project documentation](https://www.freshconsulting.com/dev-principle-4-create-high-quality-project-documentation/), a programmer can walk away from their project and another developer can come on board and keep the ball rolling, with potentially a brief meeting to provide an overview of the project at hand. I don't want to keep my job because my code requires me to be there, I want to keep my job because my innovative solutions and clean code make me desirable to build new solutions and refine existing ones. Having code that makes me "replaceable" makes that possible.

This past week shows that I'm still not the amazing programmer that I'd like to be, even after 15 years of being in the craft. However, that still gives me new things to strive for and more refinement to do for my craft.
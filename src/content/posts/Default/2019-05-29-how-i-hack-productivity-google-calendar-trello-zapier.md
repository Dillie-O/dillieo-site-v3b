---
title: How I Hack Productivity Google Calendar Trello Zapier
description: Task Tools
published: 2019-05-29
image: images/posts/2019-05-tasks.webp
imageAlt: Task Tools
category: Default
tags: [geekery, life, productivity, task-management, tasks, trello, zapier]
---

<!-- wp:paragraph -->

These days, I practically live and die by my calendar. I have a ton of meetings for projects, interviews, mentorship, and even a little coding. Being able to manage this and still feel productive has been a struggle as of late. Fortunately, I have my own [Productivity Yoda](https://www.linkedin.com/in/elladorband/) here at the office! She's been giving me a few guidelines and tricks and I have been running from there. I still have to work on the "making time" aspect of my work, but I have gotten a great handle on "managing time" aspect of my work and here's how I'm doing it.

<!-- /wp:paragraph -->

<!-- wp:more -->

<!--more-->

<!-- /wp:more -->

<!-- wp:image {"id":6807} -->

![Task Tools](@assets/images/posts/2019-05-tasks.png)

<!-- /wp:image -->

<!-- wp:heading -->

## Google Calendar

<!-- /wp:heading -->

<!-- wp:paragraph -->

There's no fancy magic here. It's just Google Calendar. However, I do make sure that it is up to date frequently so that people can schedule meetings accordingly. I use a Google widget on my phone to have my calendar visible at a glance to find out where I have to go next. We also have our conference rooms added into our Google Suite so they can be managed and viewed on the fly through [Joan](https://getjoan.com), but I also keep a day view with all of the rooms available at t glance for a quick room scheduling. You'd be amazed at how crazy it can get shuffling things around.

<!-- /wp:paragraph -->

<!-- wp:image {"id":6808} -->

![Calendar View](@assets/images/posts/2019-05-calendarview.png)

<!-- /wp:image -->

<!-- wp:heading -->

## Trello

<!-- /wp:heading -->

<!-- wp:paragraph -->

I'm back on Trello! I've had a long term off and on relationship with Trello, particularly during my [Kanban pursuits](/introducing-trellodoro-trello-pomodoro-personal-kanban-bliss). However, things have changed up a little bit now. Thanks to some help from my Productivity Yoda, I know keep 5 lists in a task board that I work with daily:

<!-- /wp:paragraph -->

<!-- wp:list -->

- Hay List: The big haystack of things that I have to do. I put things in as they come up, they aren't always due immediately, but I need a place to keep it all.
- Day List: This is what I'm planning on doing for today. Note the word "planning" here 8^D
- Doing: Self explanatory, I hope. I do have to be mindful that I'm not doing too many things at once, and this helps me become more focused on a single task.
- Waiting on Something: Sometimes I need feedback from somebody or I need to wait for a process to finish. That may take a day or two, so I need it to be mindful without interrupting my workflow. I'll leave a comment and put it there.
- Done: The best column! I'm very much a "need to check things off" type person and so seeing all these things get done is encouraging, particularly on long days where technically only one thing gets done. I clear this out at the start of every week.

<!-- /wp:list -->

<!-- wp:paragraph -->

I started using just these two things with a lot of success. However, I was still having problems with making/managing. To be specific, I would have days chock full of meetings and 4 items in my Day List and maybe one of those would get completed. This was frustrating and difficult to manage. After a bit of thinking, I realized that in a way, my meetings were tasks too and having those meetings needed to be accounted for just as much as my other work. The question was, how to be able to track both easier...

<!-- /wp:paragraph -->

<!-- wp:heading -->

## Zapier

<!-- /wp:heading -->

<!-- wp:paragraph -->

If you haven't heard of it, [Zapier](https://zapier.com) is a cloud task automation service for your web apps, thankfully in large part due to the fact that Web APIs practically rule the world at this point. Want an e-mail when the weather forecast calls for rain? There's a zap you can build for that. Want to cross post your latest Instagram on your WordPress photo blog? There's a zap you can build for that. The possibilities are nearly endless.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

I wound up building a Zap connecting my Google Calendar with Trello. It was really easy. I connected Google Calendar, and then I created a new trigger which was the start of an event. However, I "hacked" it a little and set it to trigger 10 hours before the event starts. I then connected to Trello and added an action. The action is to create a new card on my Tasks board in my "Day List" column. I setup the Event Summary to be the Name of the Card. I also had the position of the card to be at the bottom. That way the calendar events showed up in chronological order form top to bottom for a quick browse. Finally, since I'm using labels to distinguish between projects, I went ahead and picked a free label color (Black) and gave it a name (Zaps) for a little bit of "flair" to show which items had been automatically added to my board. I saved it and turned it on.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Now, Zapier works hard for me at night (10 hours before my day ends) and gets all of my calendar events setup as work to be done for the day. I can glance at it first thing in the morning (even from my phone thanks to the mobile app) and better gauge how many additional items to add to my day list. The nice thing is that the zap seems to work with items "up to 10 hours", so any new calendar items that I'm invited to during the day show up as well.

<!-- /wp:paragraph -->

<!-- wp:image {"id":6807,"align":"center"} -->

![Task List](@assets/images/posts/2019-05-tasks.png)

Such a beautiful board!

<!-- /wp:image -->

<!-- wp:heading -->

## Et Vous?

<!-- /wp:heading -->

<!-- wp:paragraph -->

I've been using my board for only a couple of weeks now and the management portion of my work is getting so much easier. I'm able to better focus and prioritize my time through the day and tasks are not slipping through the cracks.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

How about you? Any productivity hacks worth sharing? I'd love to hear them!

<!-- /wp:paragraph -->
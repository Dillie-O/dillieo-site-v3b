---
title: Diary Of A Qakbot Infection Day 1 Perplexity
description: Diary Of A Qakbot Infection Day 1 Perplexity
published: 2011-04-22
image: images/posts/diary_of_a_qakbot_infection_day_1_perplexity.webp
imageAlt: Diary Of A Qakbot Infection Day 1 Perplexity
category: Default
tags: [geekery, qakbot, virus]
---

TL;DR; - Qakbot is a a complex and odd piece of virus work.

Tuesday started out like my normal Tuesdays around the office. I got in at 7:00 and went about my normal my normal business of working on the design for the ServiceDesk 2.0 app I'm writing. I also tend to the webmaster folder a bit to help with requests there.

About 10:00 and odd e-mail comes through the public announcement folder. It turns out there was an outbreak of a virus called "Win32.Qakbot" and we need to reboot our computers to apply a policy fix that should help the issue. Our virus scanner will pick up the slack after that and clean out the infections. Being a bit busy myself, I reboot my machine and continue on my way.

<!--more-->

I have a dentist appointment today during my lunch break at 11:00, so I finish off work as usual and check out for lunch. Getting a crown on your tooth is an interesting process, fortunately I'm in the final stretch, so they just have to trim up the crown a little and glue it in.

I get back a bit early from my lunch break and find my computer shut off and my supervisor, as well as my fellow web team colleague sitting in chairs talking. We're always filled to the brim with work, so this is rather odd and something goes off in the back of my head. I start talking with them and we find out that rebooting the systems didn't fix the virus and it has been spreading rapidly throughout the county. As a result, they forced the shut down of all non essential computers and a handful of the servers. They'll let us know when things are up again.

It's blackout time. Always kind of odd, considering how much time I spend on a computer daily and how much we use them for our day to day work. We enjoy the down time a little, but also take the time to talk with our new hire a bit more so he feels more welcome on the team.

We reach the end of the day and the mood is perplexed, but all in all normal. Tomorrow is Wednesday, and my fellow web team member typically has the day off, and my supervisor is out for surgery. This means it'll just be me, but again nothing seems wrong, just odd given the days events. I talk to the Ops/Networking guys as I'm heading out the door and offer up a word of support. They're the true heroes in times like these, because they are relentless in getting things fixed and it often means extra hours. I offer up my services, since I like to help out the team when I can, and they thank me.

I get home and prepare to take the kids to the pool for swim lessons. Just before I get ready to leave, I get a phone call. It's work. They're taking a couple more servers down, but more importantly there is a web application that some of the sheriffs use that since computers are still down, we need to take the app down as well. My supervisor is out, so that leaves me to come in. Taking the web app offline isn't that difficult, but it takes me a little bit of time to track down where the reroutes go, and to make sure things are disabled properly.

I use a bit of this time too to search around about Qakbot. There's not much out there. There are a few articles dated in 2009 talking about it. It indicates that while it is pretty "low" in regards to being out there, it is targeted for financial institutions and once it gets in, it starts mining for data and has a lot of back doors in place to protect it. What gets a little more ominous is another article I find saying that it hit a prominent insurance company few months back. I find another article from a security site indicating they've found a third generation variant of this that was recently released. Instead of multiple executables, they've repackaged it into a single executable, encrypted the data they steal (they "really want it") and added to means of eluding specific virus scanners, modifying security, and keeping some back door channels open via IE to dial home and try to get to other things. They say it likes to be spread through network shares, and considering I have about 10 of them on my computer to handle all the websites and apps I support, that can't be a good thing. I know our network provides each computer with two network shares typically, so this could get out of hand fast.

I decide to do a quick search on twitter for qakbot and don't really come up with anything substantial. I see an old link to an article I had read and one person indicating they were fighting it too. I go ahead and leave, giving the Ops and Networking guys one more word of thanks and encouragement. I leave a bit perplexed at what exactly this virus is \_\[never stop learning, right?], \_but I know we have some smart blokes, so they should have this thing licked by morning.
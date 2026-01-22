---
title: Know Your User Elvis Bean Hedy
description: Know Your User Elvis Bean Hedy
published: 2021-06-01
image: images/posts/2021-05-elvis-bean-hedy.png
imageAlt: Know Your User Elvis Bean Hedy
category: Default
tags: [architecture, coding, persona, ux]
---

<!-- wp:paragraph -->

While working on Project Moab, we encountered a really interesting, and nuanced problem that led us to expand our thinking and ultimately guide how multiple parts of the system operated. It also gave us a fun tool that I'm applying to other projects as well: Elvis, Bean, and Hedy.

<!-- /wp:paragraph -->

<!-- wp:more -->

<!--more-->

<!-- /wp:more -->

<!-- wp:image {"id":7124,"sizeSlug":"large","linkDestination":"media"} -->

![](@assets/images/posts/2021-05-elvis-bean-hedy.png)

<!-- /wp:image -->

<!-- wp:embed {"url":"https:\/\/open.spotify.com\/episode\/0eli2DI5MQMiUCOHAsIG6w?si=e5apdFkxTVCNXECmXjCi6w","type":"rich","providerNameSlug":"spotify","responsive":true,"className":"wp-embed-aspect-21-9 wp-has-aspect-ratio"} -->

https://open.spotify.com/episode/0eli2DI5MQMiUCOHAsIG6w?si=e5apdFkxTVCNXECmXjCi6w

<!-- /wp:embed -->

<!-- wp:heading {"level":3} -->

### The Challenge

<!-- /wp:heading -->

<!-- wp:paragraph -->

The challenge at hand was how we were going to allow users to upload their custom brain to the bot to test. That in turn raised even more questions about how the user was going to interact with the platform as a whole. We had a small LCD display, capable of basic text input, with two buttons and a small joystick controller for navigation. All of it is running on a Raspberry Pi, which gives us a lot of flexibility for providing dynamic updates. How were we going to let the user "hack" on the system?

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

A more important question arose from this: Who are we building this for in the first place?

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

The quick answer is "everybody", but the complexities and the timeline of the release made this impractical. We needed to identify what kind of user would be using this platform so we could setup our processes and interfaces accordingly. It's okay to be opinionated at times. In talking through these processes and interfaces, we came up with three fun user types to guide us through this process.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Elvis

<!-- /wp:heading -->

<!-- wp:paragraph -->

Our Elvis type has little to know technical knowledge. They want to come in, have some fun with the bot, grok some of the core concepts, and move on to the next thing. Supporting Elvis would require heavy documentation, potentially some how to videos. We would also want to provide a web interface or a well designed command line tool to allow Elvis to update things. This would reduce the complexity of the back end, since the infrastructure would be setup for one or two specific paths to execute.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Bean

<!-- /wp:heading -->

<!-- wp:paragraph -->

Did you know that the actor who plays Mr. Bean (Rowan Atkinson) has a masters degree in Electrical Engineering?! If Mr. Bean were to work with the system, aside from the potential mayhem, he would be quite familiar with the notion of secure copying a file over from another location. Some documentation would be nice, but detailed documentation wouldn't be necessary. Mr. Bean would likely be a light hacker as well, so having some powerful scripts or a configuration file to tweak things and see the result would be great. We would still need to put a few guard rails in place to prevent Mr. Bean from "bricking" their bot, such as making it difficult to update the firmware.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Hedy

<!-- /wp:heading -->

<!-- wp:paragraph -->

More than just a famous actress, Hedy Lamarr co-invented an early version of frequency-hopping spread spectrum communication, amongst other things. For someone like Hedy, with a deeper knowledge and a knack for tinkering and inventing, she would want full access to the system. She would most likely know several ways to transfer a brain to the bot and while documentation would be nice, specifications (the power limits of the servos), access to the source code, and other "low level" features would be ideal. The greater challenge in this system would be in making sure it is "open" and structured enough to allow Hedy to do whatever she wants.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### The Verdict

<!-- /wp:heading -->

<!-- wp:paragraph -->

For our initial release, we decided to target the Bean type user. We tried to support the Elvis users of the world by allowing them to attach a thumb drive to the bot an have the custom brain auto-updated, but there were too many security/process complications to smooth out. We also were a little hesitant to allow the Hedy users to "brick" their bot by experimenting with firmware updates, given the support needs it would raise.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

More importantly though, we decided that the Bean users were the perfect fit for this platform. We wanted to introduce hardware engineering types to the power of reinforcement learning. On the flip side, we wanted provide a simple use case with reinforcement learning that has an impact on an actual thing, not just simulators.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

In the end it also helped shape our mindset for software infrastructure and process in light of the targeted user. I've started to ask this question when I start other projects. Our UX people call these "personas" and while it always made sense from a user interface type perspective, it never really thought about it affecting the entire stack of a system until now, and I'm all the better for it.

<!-- /wp:paragraph -->
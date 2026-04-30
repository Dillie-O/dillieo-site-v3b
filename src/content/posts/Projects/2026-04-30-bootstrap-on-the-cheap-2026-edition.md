---
title: Bootstrap on the Cheap - 2026 Edition
published: 2026-04-30
description: An overview of how I built a new app for less than my coffee subscription. You can too!
image: images/posts/2026-04-30-agile_arcade_banner.webp
imageAlt: Bootstrap on the Cheap - 2026 Edition
imageCredit: ''
imageCreditUrl: '' 
category: Projects
tags: [agile,bootstrap,budget,cloud,hosting]
draft: false
---

Back in 2019, I [wrote a series](/posts/development/2019-01-16-bootstrap-your-app-for-free-part-1-tools-and-resources/) on how to build your side project without spending any  money, or very little. Times were tight, there were kids to support, and yet there was still an itch to get something creative out into the world! The landscape has changed a lot since then. Some tools are gone, new ones have taken their place, things are still tight, but the core idea hasn't changed at all.

I joke that this is the "golden age" of software development, only because I've said it about 3 times previously. But it's true! There has never been a better or cheaper time to build something and put it in front of people.

"Prove it!" you'll shout at me because you see that fancy tooling and deploy pipeline at work and figure it took forever to setup and/or cost a fortune. It's not as intimidating as you think. Here's what I built recently, step by step, cost by cost.

## The Excuse That Started It

I was in a sprint planning meeting a few weeks back, and since the team was remote that day, someone recommended we use one of those online "poker planning" type tools. It went well, remote sprint planning can be a little chaotic, and having a proper tool beats everyone holding up fingers to the camera. I casually recommended it and thought nothing of it until a dev on my team mentioned that their team had used the same tool until they got paywalled after "too much use". 

What?! Really?! A nice and valuable, but simple, tool that is used every two weeks by fewer than a dozen people for 2 hours before it goes back to sleep for two weeks... people have to pay for that?!

My brain immediately says _(and out loud too)_ "You know... this is something that a little guidance from AI could hack together on a train ride." Oh.. and I *love* to do some train hacking during my commute these days.

Oh yeah, what did I build? It's [Agile Arcade](https://github.com/Dillie-O/agile-arcade): a real-time agile story pointing game, that needs no accounts, no fuss, can be run locally, or deployed as a single Docker container, with a fun Zelda-inspired UI. The project is beside the point. What matters is the barrier from "I have an idea" to "I have a thing that the world can see and use" is smaller and cheaper than before.

Here's how it all came together.

## Building

So I built it. It took me maybe a week. Oddly enough I iterated more on the UX part of things than the logic side of things. I enjoyed talking with Gemini to evaluate platform choices because I wanted this to be as simple and self contained as possible so a dev could run it from their machine or through a small server in-house with Docker. No database, no login services, no nothing. 

* Architecting Cost: `$0`
* Infrastructure Cost: `$0`

I put this together using the "planned agentic" approach using Visual Studio Code and Copilot. Technically I had purchased a Github Copilot license earlier to experiment with other work, so we'll prorate at `$.33` a day and say it cost me `$1.65` - just 5 days of work (no weekends)!

By Monday I had a working prototype. By the end of the week it was live. The following Monday I hosted a session from my laptop and it got some joy..

* My bill so far: `$1.65`

Wait, when running the app on my local machine, I need to ensure that other people can get to me! My IP address is a little wonky to share, plus I'm at home and have to update my wireless router to forward traffic to my machine. What I really need is a proxy service to handle this routing for me. Cloudflare seems a little pricey for a quick situation and there is setup. Oh wait, there's ngrok. It's been around for a while! You can sign up and get a free token. They have a great NextJS library so all you do is provide your token in the app, wait a minute, and now you have a sharable URL for all of your remote friends. Easy peasy!

* Cost: `$0`
* My bill so far: `$1.65`

## Hosting

Oh, I also want to host this somewhere for people to take a quick test drive on! Since this app is a NextJS server based application, some of your more standard hosting like Vercel or Netlify won't do. Fortunately, there is still a service called [Render](https://render.com) that will give you a free Docker hosted container. It'll be a little limited on the functionality side since it will spin down after some inactivity but this is just a demo site. I signed in, granted access to my repo, and Render did the rest in minutes!

* Cost: `$0`
* My bill so far: `$1.65`

Admittedly we have a bit of a side quest here regarding hosting. During the first demo, there was a snag where the container timed itself out due to inactivity (we were discussing some nuances of a story) and then waiting for the demo server to start up and create the room again was a little bit of a speed bump. So digging around a little bit I decided to spin up an instance on Google Cloud Run that was a bit more stable and they have a generous free tier for usage as long as I stay under the cap and for a demo project like this, I'm far from hitting it. I also get the auto deploy goodness I had with Render as well.

* Cost: `$0`
* The final bill: `$1.65 + no recurring charges`

## The Free Tier Landscape in 2026

The beautiful thing that you might not realize is that all the major cloud platforms are in a quiet arms race for developer attention, and the casualty of that war is your dev and hosting bill. There are a ton of tools I look at/use when I'm building something new:

* Visual Studio Code
* Windsurf
* Antigravity (Google's version of VSC)
* Azure
* Firebase
* Google Cloud
* Vercel
* Render
* Netlify
* Supabase
* Github
* CodeMagic
* ...and more!

Agile Arcade was very simple and lightweight, but stateless and ephemeral isn't right for every project. My other side projects - [One Minute to Breathe](https://oneminutetobreathe.com) and [Prayer Odyssey](https://prayerodyssey.com) - have databases, auth, notifications, and more moving parts. The "bootstrap on the cheap" calculus looks different for those, but even those are costing me less than my monthly coffee subscription and I'll write about each of them separately and you'll see how I put that list above to use.

## Et Vous? What's Your Excuse?

If there's a tool your team uses that feels rickety, or a workflow you keep doing manually because "there's no good solution," or a paywall you're quietly annoyed about, or a fun idea you've been wanting to play around with just to explore new tech more, there's a train hack or weekend project hiding in there for you!

The barrier for getting something live has never been lower. The free tiers are real. The deployment tools are genuinely good. The main cost is a few hours and a "train" of thought you can't stop _(see what I did there? 8^D)_.

What would you build if you knew it wouldn't cost anything to ship? [:: seriously, I want to know ::]

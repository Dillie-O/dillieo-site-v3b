---
title: On The Joys Of Mvc Architecture
description: On The Joys Of Mvc Architecture
published: 2016-02-04
image: images/posts/on_the_joys_of_mvc_architecture.webp
imageAlt: On The Joys Of Mvc Architecture
category: Default
tags: [coding, controller, model, mvc, programming, view]
---

As part of the goals for 2016, one of them is to “reface” my [Prayer Journal](http://prayerjournal.apphb.com) app using the [Angular Material library](https://material.angularjs.org/latest/) provided by Google. In the process of doing this, I’ve come to appreciate (yet again) the joys of building things using MVC architecture.

<!--more-->

![](@assets/images/posts/2016-02-1454611227_1.png)

For those of you not familiar, MVC stands for Model / View / Controller. For your typical application structured in this manner (very popular on the web right now) your application is broken down into three main components:

Models - These are the objects or data points in your application. If you have an app with prayer records sitting in a database, you create a “Prayer” model that contains all of the properties that you have in the database. Models are pretty lightweight this way, though some frameworks prefer to have the actual CRUD methods (create, retrieve, update, delete) within the model classes as well.

Views - This is what the user actually sees when using your application. This is the web pages, mobile apps, or whatever you decide to have for users to interface with. Unlike previous ways of building apps, the view is predominantly “dumb”. It’s not responsible for doing complex processing of the data, simply to present it. You may need to show/hide a few things, but for the most part the view is all display code.

Controller - Most of your work is done in the controller. It’s the major workhorse for things. It takes a request from the view (go grab all my prayers), checks the security (user is logged in, check), grabs the data and puts it into the appropriate model (or talks to the model directly to do this) and then sends the necessary data back to the view for display. Lately a lot of “controllers” are built using a web based API (Prayer Journal is) so that you can have multiple views (web app, mobile app, some device) interface with your “app core” without much rework.

…which leads us into my point for today. Since I’ve built things using a MVC mindset with WebAPI serving as my “controller”, swapping out my views has been relatively painless. There is a little bit of a learning curve with how I want to present and restructure the pages themselves, but ultimately I’m making the same controller calls as I was before, so I don’t have to worry about any of that, I’m just putting on a new coat of paint.

It seems pretty commonplace to take this approach, but I’ve been through the years where your presentation/controller/data layers were all pretty tightly coupled and setting something up like this took a LOT of work. This is definitely a breath of fresh air.
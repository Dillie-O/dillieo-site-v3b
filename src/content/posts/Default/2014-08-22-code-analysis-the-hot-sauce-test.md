---
title: Code Analysis The Hot Sauce Test
description: Code Analysis The Hot Sauce Test
published: 2014-08-22
category: Default
tags: [architecture, code-analysis, coding, Database, diagnostics, features, software-engineering, ui]
---

Oftentimes I am called into a project that is adding new features to an existing application. While a lot of updates seem easy on the surface (I’m just adding a basic page that saves the user’s e-mail address), the underlying architecture of the system can make this rather complex. The shocking thing is that a lot of times the complexity isn’t immediatley discoverable. To help identify and estimate the work needed for a new feature, I’ve devised what I like to call “the hot sauce test."

<!--more-->

To help identify the amount of work and potential complications in adding new features, I propose a scenario with the client:

> Let’s suppose we need to add a new field to the system. This field tracks one simple thing: the user’s favorite brand of hot sauce. How do we add this to your system?

Discussing the answer to this question then helps us cover a wide variety of issues:

## Data Questions

### What’s the underlying data storage system?

There are SQL, NoSQL, Cloud based storage systems. Maybe the user is using a proprietary storage system for this kind of data. Knowing this allows you familiarize yourself with the technology or ask more questions about libraries or constraints.

### What architecture are you using to access your data?

Are you using stored procedures, an ORM (object relational model), a WebAPI, or writing good old fasioned parameterized queries? I once worked on a project where the data was accessed through a home grown ORM, so adding a simple field to the system required updating a third party library that the application was dependent upon, as well as coding extra parameters into the data access layer code within the application itself. This process wasn’t immediately recognizable until I went in to update things for the first time.

### Are there any constraints on your data model?

Some places require boolean type values to be char values instead with Y/N/Null as acceptble values. Some require integer for 1/0/Null values. Knowing this helps you in your middle tier/font end for processing radio buttons and other such items. Your "hot sauce ids" may wind up being some kind of encoded value based on the name and the index it appears in.

### How are data structure changes made?

Do you use SQL scripts? Do you use a migration script built into your ORM? Do you have to send a request to a DBA to have the change made? This will affect time spent simply adding the field before you can build your code.

### Will the user be “free forming” the data or will they have a fixed list to choose from?

This can lead to the need to create another table (see previous question).

## Code Behind / Business Layer Questions

### What kind of access security does the system have?

User authentication would protect their hot sauce preference from being modified by just them, but user authorization on top of this could allow some users to be able to modify the list of hot sauces to choose from. It could also dictate if we need to build a "hot sauce administration" page to manage values.

### Is the hot sauce preference required?

If so, we’ll need to make sure to do some additional data validation (both here and at the UI most likely) and if you let the preference be “free form” you might want to do some spell checking on it, or check for “white space”.

### Once the update is in place, how do you deploy the site?

Is there a “git pull” type deployment, an, “XCopy Deployment”, or do we need to contact the server administrator to deploy the code? Do we make a backup of the existing system first? Do we have access to the server to debug any deployment problems?

## UI / Display Questions

### Will the user be typing in their preference or selecting from a list?

This could have been answered previously, but depending on which way the discussion goes, you may ask this first, which would lead you to followup data questions.

### Are you using any UI libraries?

jQuery UI, Zurb, Bootstrap, etc. This let’s you know if you have the UI elements you already need or if you potentially need to download an extension to an existing library.

### Do you want an “dynamic” update or a “page refresh” update?

This helps you decide if you are going to use AJAX to update the details or a standard “post back”. This also might lead you to ask about a Web API or other method of updating the data

### Are you using any MVC libraries?

AngularJS, KnockoutJS, Backbone, etc. If you wind up going with the “dynamic” update these libraries can potentially save some time, or cause more work to wire up all of the data points. 8^D

## Come on! I just want to know the user’s favorite hot sauce!

As you can see, something as simple as a user preference can involve a lot of work depending on the architecture of the existing system. Hopefully this gives you an idea the next time you are adding features to a new system on what to watch out and plan for.

Any key questions I’m missing here? I’d love to add them. Just let me know!
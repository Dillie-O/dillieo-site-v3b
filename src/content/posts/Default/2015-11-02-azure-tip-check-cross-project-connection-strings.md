---
title: Azure Tip Check Cross Project Connection Strings
description: Azure Tip Check Cross Project Connection Strings
published: 2015-11-02
image: images/posts/2015-11-azure-logo21.jpg
imageAlt: Azure Tip Check Cross Project Connection Strings
category: Default
tags: [azure, coding, connection-strings, dal, debugging, entity-framework, mvc]
---

TL;DR; - When using multiple project solutions, make sure you database context and configuration connection strings are named the same across all projects.

<!--more-->

![](@assets/images/posts/2015-11-azure-logo21.jpg)

I spent a good 4 hours last week (probably more) going slightly mad trying to diagnose an odd Azure issue. I had setup a web app, setup a database, and all of the deployment / synchronization goodies that went with it. However, when I went to launch and work with the application, I was getting the dreaded “network” error indicating that the application couldn’t find the database specified. To make matters even more maddening, I was able to setup a firewall rule and connect to the database from my local machine without a hassle.

I finally tracked the issue down. We had muliple projects in our solution, two of them being a typical MVC app and a data access layer (DAL) app to manage all the data interaction. The DAL app had it’s base context name set to “TechConnection” whereas the MVC application had a value named “DefaultConnection” in the web.config file. While this worked fine locally (not sure why just yet) the mismatch caused problems in the deployed Azure environment. A quick name change in the web.config file restored functionality (and my sanity).

Say… can I get my \$30 tech support subscription money back since I solved it first Microsoft? 8^D
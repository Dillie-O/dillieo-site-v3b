---
title: Finding And Replacing Text In Sql Server
description: Finding And Replacing Text In Sql Server
published: 2010-09-23
category: Default
tags: [coding, replace, sql, text, update]
---

While cleaning up some WordPress hacks last week, I followed some documentation and noticed that MySQL has a nice function for doing a search and replace with text in a given column. All I had to do was execute the following statement:

This worked out great. I could easily update many rows, or a single one.

The other day at work, I ran into a situation where I needed to update some bad HTML tags that were sitting in a content field in one of our applications. This database was SQL Server, so I checked the documentation, and they had a REPLACE command as well. The only problem was that it didn't work in a similar manner, it only worked with actual variables or string content.

After digging around, I discovered you can accomplish the same effect by simply wrapping up your update statement around a retrival statement that replaces the text at the same time. This is how I got mine to work:

Since the replace statement requires a string, we have to use the SUBSTRING command to pull out all of the text of the column in question. Its a little crazy, but hey it works.

SQL Gurus, if you have a better alternative, please share!
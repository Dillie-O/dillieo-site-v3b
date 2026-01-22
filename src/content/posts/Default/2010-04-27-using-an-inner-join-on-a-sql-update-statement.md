---
title: Using An Inner Join On A Sql Update Statement
description: Using An Inner Join On A Sql Update Statement
published: 2010-04-27
category: Default
tags: [coding, join, sql, update]
---

I made a slight blunder in my application that crept up yesterday at work. We have an internal task tracking application and I've been writing some supplementary web pages to interface with the application.

It was discovered that in my code, I was incorrectly assigning the department Id of the user when inserting a new time track record into the database. I should have been inserting the Id of the requesting department instead, so that the proper time would be billed.

There were about 1500 records that had been affected over a period of a month or so. While this wasn't drastic, it was a sufficiently large enough count that it would take me too long to manually update all the records. Some of the time tracking records did have the proper department assignment, since the main web page was also being used to enter time. Finding the bad records in question was simple enough to do:

However, updating the records in a SQL statement was a little bit trickier, at least to this non Jedi/Ninja SQL guy. After a little bit of tweaking and testing, I found that I could use an INNER JOIN as part of an UDPATE statement, you just had to phrase the INNER JOIN through the FROM clause of the statement. A generic form of this statement looks like this:

In my case, with the additional WHERE clause to find the mismatching the departments, I was able to update the records quickly with this query:

Just another blade to add to your ninja skills, force trick to add to your Jedi skills, or tool to add to your trunk if you don't have it already. Enjoy!
---
title: Refactored Advanced Removal Of Duplicate Rows In Sql Server
description: Refactored Advanced Removal Of Duplicate Rows In Sql Server
published: 2013-06-03
image: images/posts/refactored_advanced_removal_of_duplicate_rows_in_sql_server.webp
imageAlt: Refactored Advanced Removal Of Duplicate Rows In Sql Server
category: Default
tags: [coding, duplicates, performance, records, removal, sql-server]
---

Refactoring is an ongoing process. After running into a few glitches on the test server with my existing script, I was able to refactor my [advanced duplicate row removal script](/advanced-removal-of-duplicate-rows-in-sql-server) to make things a lot faster and still delete the proper rows! Read on to see what changed.

<!--more-->

### Step 1: Remove Ugly \* Selection

It is a little bit of SQL 101 (shame on me) but unless you absolutely need it, never use a SELECT(\*) query in your lookups. Using \* forces the server to go pull down the details for the table in question to get the name of all the columns and then add them. This is particularly painful with large tables. In addition, if all you're doing is getting a count, just use a single column name. Every little bit of time helps in big processing. With that in mind, our initial duplicate query shaved off a bit of time by doing this:

\[gist]5700625

You'll find we do this elsewhere in the final script too.

### Step 2: Remove the JOIN and use a subquery in the DELETE Statement

Even though my queries were running fine locally, the test server was running into problems deleting duplicate rows on my largest table. The statements would execute fine, but no records would be removed. In addition, due to the ugly nature of the JOIN being used (we had to match up every column), it was taking a long time.

After doing some digging and diagnosing, I found a better way to run our query, and that's by doing a subquery. By doing a subquery, we can still use the TOP (x - 1) row limitation we need, but we can also do a direct matching against column values, instead of the crazy joining I was doing before. Without the joins, the query runs immensely faster and looks like this:

\[gist]5700786

### Putting it Together

With that in mind, here's our new final script. For the most part it looks the same, just some fine tuning on the query and the deletion portion:

\[gist]5700776

Enjoy!
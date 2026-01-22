---
title: Removing Rows With Duplicate Ids In Sql Server
description: Removing Rows With Duplicate Ids In Sql Server
published: 2010-07-20
category: Development
tags: [coding, duplicates, sql, troubleshooting]
---

Yes, you say it can't be done. You have a table where the Id field is set to be unique and the primary key, yet SOMEHOW there are two rows in a content table that have the same Id. When you try to delete one of the rows, it says it can't delete the row because there are duplicate unique keys. _\[Then why did you insert the extra one in the first place!!!!]_

&lt;Queue spontaneous head pounding against the wall />

On an interesting side note however _\[Yes, I tangent a lot]_, it appears the culprit was SQL Server Management Studio and its ability to allow you to paste data from Excel into the data view, thus inserting extra rows. Maybe it is temporarily disabling all constraints on the table behind the hood, I'm not sure, and I still need to duplicate it, but we saw an instance of this once before that seemed to have the same path.

I'm aware of the internal fields, such as row_number, that are available for queries, but I wasn't sure how to access it in this case. After passing word on to our almighty DBA, he did some research and came back with a really simple SQL statment that does the job for us:

SET ROWCOUNT 1

DELETE FROM dbo.content WHERE content_id = 40598

Problem solved and we cleaned out a good handful of records in this manner. What the first line of the script does is restrict any operations to stop after the first row is processed. Our second statement deletes a record (which you would expect), but since our rowcount statement halts the gathering of any additional records for processing after the first one, the constraint isn't triggered.

If you're stuck in a duplicate Id bind, let this one do the trick for you.

Yes, you say it can't be done. You have a table where the Id field is set to be unique and the primary key, yet SOMEHOW there are two rows in a content table that have the same Id. When you try to delete one of the rows, it says it can't delete the row because there are duplicate unique keys. _\[Then why did you insert the extra one in the first place!!!!]_

&lt;Queue spontaneous head pounding against the wall />

On an interesting side note however _\[Yes, I tangent a lot]_, it appears the culprit was SQL Server Management Studio and its ability to allow you to paste data from Excel into the data view, thus inserting extra rows. Maybe it is temporarily disabling all constraints on the table behind the hood, I'm not sure, and I still need to duplicate it, but we saw an instance of this once before that seemed to have the same path.

I'm aware of the internal fields, such as row_number, that are available for queries, but I wasn't sure how to access it in this case. After passing word on to our almighty DBA, he did some research and came back with a really simple SQL statment that does the job for us:

SET ROWCOUNT 1

DELETE FROM dbo.content WHERE content_id = 40598

Problem solved and we cleaned out a good handful of records in this manner. What the first line of the script does is restrict any operations to stop after the first row is processed. Our second statement deletes a record (which you would expect), but since our rowcount statement halts the gathering of any additional records for processing after the first one, the constraint isn't triggered.

If you're stuck in a duplicate Id bind, let this one do the trick for you.
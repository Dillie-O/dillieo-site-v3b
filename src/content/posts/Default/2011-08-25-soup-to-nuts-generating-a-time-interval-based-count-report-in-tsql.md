---
title: Soup To Nuts Generating A Time Interval Based Count Report In Tsql
description: Soup to Nuts - The Complete Package
published: 2011-08-25
image: images/posts/2011-08-soup2nuts.webp
imageAlt: Soup to Nuts - The Complete Package
category: Default
tags: [coding, interval, query, report, sql, t-sql, time]
---

![Soup to Nuts - The Complete Package](@assets/images/posts/2011-08-soup2nuts.jpg "Soup To Nuts Can")

At the beginning of the week I was tasked with generating a count based report of various records. The tricky part to this was that the report needed to be based over a certain period of time and in a 30 minute time interval. In other words, they wanted to see a report that looked something like.

```
Time Count 0:00:00 1 0:30:00 1 1:00:00 5 1:30:00 2
```

...and so on.

<!--more-->

The other little caveat to this was that ideally I needed to do this without having to create any tables in the database, since we wanted to keep as little a footprint as possible against the actual data in the system. Since we're using SQL Server 2005 in this case, we can leverage table variables and be able to dynamically generate data we need to join with without physically creating a table in the system. It also allows us a little more flexibility with our interval and date ranges.

We create a procedure that returns a table as its result set so we can easily call an INSERT INTO against the procedure to generate our data. It looks like this:

```sql
(@start DATETIME, @end DATETIME, @interval INT) AS

DECLARE @dt DATETIME, @dtEnd DATETIME, @dtnext DATETIME DECLARE @results TABLE(timeinterval DATETIME)

SET @dt = @start SET @dtEnd = @end SET @dtnext = @start

WHILE @dtnext &lt;= @end BEGIN INSERT INTO @results(timeinterval) VALUES(@dtnext) SET @dtnext = dateadd(minute, @interval, @dtnext) END

SELECT \* FROM @results

Since we need our report to be generated in time intervals, we need a function that will be able to round our datetime values as needed.

(@Time DATETIME, @RoundTo FLOAT) RETURNS DATETIME AS

BEGIN DECLARE @RoundedTime smalldatetime DECLARE @Multiplier float

SET @Multiplier = 24.0 / @RoundTo

SET @RoundedTime= ROUND(CAST(CAST(CONVERT(VARCHAR, @Time, 121) AS DATETIME) AS FLOAT) \* @Multiplier, 0) / @Multiplier RETURN @RoundedTime END
```

Wow, that's a lot of cast manipulation there!!! Yes it is. We need to convert our passed in date into the canoncial yyyy-mm-dd hh:mi:ss.mmm style format so that we can convert it into a float format in order to do the proper rounding. It's crazy, but I dug into a few resources to make sure it work.

In our reports, we're looking at taking counts of records that were created or updated within our date range. Since we need to do the rounding against our date values, and we're grouping our results based on the time interval, there's no easy way to grab every column I need in a single query. Instead, I had to create a procedure for each column I was looking at and process the value. However, for my final results, I CAN group them based off the column name as well, so for each column I have a procedure that looks like this.

```sql
(@start DATETIME, @end DATETIME) AS

SELECT Z.rounded_time, COUNT(\*) AS round_count, 'applications_created_at' AS column_name FROM ( SELECT dbo.RoundTime(created_at, .5) AS rounded_time FROM applications ) AS Z WHERE rounded_time BETWEEN @start AND @end GROUP BY z.rounded_time ORDER BY rounded_time DESC

I have a second procedure to handle the updated column.

Finally, we put our procedures and functions together to generate the report.

(@start DATETIME, @end DATETIME, @interval INT) AS

DECLARE @TimeIntervals TABLE(timeinterval DATETIME) DECLARE @UpdateCounts TABLE(rounded_time DATETIME, roundcount INT, column_name VARCHAR(200))

INSERT INTO @TimeIntervals EXEC dbo.TimeIntervalTable @start, @end, @interval

INSERT INTO @UpdateCounts EXEC dbo.GetApplicationsCreatedAtCounts @start, @end INSERT INTO @UpdateCounts EXEC dbo.GetApplicationsUpdatedAtCounts @start, @end

SELECT t.timeinterval AS time_slot, CASE WHEN u.roundcount IS NULL THEN 0 ELSE u.roundcount END AS update_count, CASE WHEN u.roundcount IS NULL THEN 'None' ELSE u.column_name END AS column_name FROM @TimeIntervals t LEFT OUTER JOIN @UpdateCounts u ON u.rounded_time = t.timeinterval ORDER BY t.timeinterval ASC
```

Let's take a peek at what we're doing here. First we declare our time interval table and our update counts tables. We fill our time interval table based on the parameters we've specified when we called the procedure. Then we fill our UpdateCounts table using our custom generated procedures. Note that each procedure will insert a time (rounded), a count, and the column name we pulled it from. We could continue this for as many columns as we need, provided we keep the format going. Then we join these two tables together to provide our final report. We do a little bit of "prettifying" the procedure by setting our count value to 0 and our column name to 'None' when we encounter a NULL value (occurs from our GetXCount procedure).

Running the procedure, and taking a snapshot of some of the results, we see something like that.

```
2011-08-04 09:00:00.0 0 None 
2011-08-04 09:30:00.0 0 None 
2011-08-04 10:00:00.0 0 None 
2011-08-04 10:30:00.0 0 None 
2011-08-04 11:00:00.0 1 created_at 
2011-08-04 11:30:00.0 29 updated_at 
2011-08-04 11:30:00.0 18 created_at 
2011-08-04 12:00:00.0 2 updated_at 
2011-08-04 12:30:00.0 0 None 
2011-08-04 13:00:00.0 1 created_at 
2011-08-04 13:30:00.0 1 created_at 
2011-08-04 13:30:00.0 2 updated_at
```

You can see that the results are nice and clean. It would be great to "pivot" the results in some manner, so that you have each column_name as a separate column with the count, but it is easy enough to transition that over to some final results, or even and excel spreadsheet. There's definitely some room for improvement. Ideally it would be nice to have procedure that would dynamically specify a column to get a count for, but I believe using a column name as a variable is something that can't be done in SQL Server (or others for that matter). In addition, if there was a way to split the column_name field into its own column when generating the results, you can quickly make a nice spreadsheet presentation with your results.

That said, this report setup has been used by us twice now, and had done a great job and being able to send diagnostic information off to our clients about activity in their database. There's a [github repository](https://github.com/Dillie-O/SQLServer-TimeInterval-Reports) setup for you if you want to download or contribute to the code. Enjoy!
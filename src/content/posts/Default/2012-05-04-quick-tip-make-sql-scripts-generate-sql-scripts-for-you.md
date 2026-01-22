---
title: Quick Tip Make Sql Scripts Generate Sql Scripts For You
description: Quick Tip
published: 2012-05-04
image: images/posts/quick_tip_make_sql_scripts_generate_sql_scripts_for_you.webp
imageAlt: Quick Tip
category: Default
tags: [coding, foreign-key, generation, quick-tip, script, sql, table]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

So the synopsis is this: sometimes you have a TON of rows you need to insert into a database from a spreadsheet, but you need to do some custom massaging of the data to generate the statements. While a few dozen rows is okay, try doing this with 10,000+ rows! The nice thing is that you can make the database do the work for you.

<!--more-->

Recently I had the following dilemma. I was given a spreadsheet to insert into the database with the following layout:

```
ProductID   CategoryCode  CategoryName
1A1231A     SWT           Sweets
3C1111B     PM            Processed Meats
1Z33325     PM            Processed Meats
1X3A33C     PM            Processed Meats
777A3X1     AC-01         Accessories (Group 1)
9WXX323     AC-01         Accessories (Group 1)
```

Now on it's face, this looks like a straight forward data import. Let the import tools do the work for you. However, there's some redundant data in there, namely the Categories. Any programmer worth their salt will at least take a moment and evaluate the concern about this. What if Processed Meats changes it's name or category? Well, we'd have to change those two records to accomodate for that. That might not be too bad, but when you're dealing with 10,000+ records (as I was) then that update becomes potentially unmanageable, or dangerous, if a stray user only updates one field.

To make this work better, we setup two tables. A category table and a product_mapping table. That way we can identify each category once and if a change to the category occurs, we only need to update the category in one place:

Category Table

```
id   code    name
1    SWT     Sweets
2    PM      Processed Meats
3    AC-01   Accessories (Group 1)
```

Product_Mapping Table

```
id   product_id   category_id
1    1A1231A      1
2    3C1111B      2
3    1Z33325      2
4    1X3A33C      2
5    777A3X1      3
6    9WXX323      4
```

The tricky part is how to convert our original spreadsheet to use our new categories and mappings, especially when we're dealing with a huge volume of records. The first step is to import our raw data into our database using whatever tool we have handy. This will create our table with our three columns. I imported mine with the name RawMappingData. From there, we need to extract our unique categories with a SELECT DISTINCT statement

```SELECT DISTINCT CategoryCode, CategoryName FROM RawMappingData```

This gives us a basic result set:

```
code   name
SWT    Sweets
PM     Process Meats
AC-01  Accesssories (Group 01)
```

This result set is pretty friendly to work with. We can dump this result set to the clipboard and put some "INSERT INTO category (code, name) VALUES" type text in front of it and voila, our SQL script is done. However, the dataset I'm working with has 178 categories. Doing even some fancy regular expression search and replace magic (which I've done before) can become time consuming.

All is not lost though! With our SQL statements, we can append text in front of our variables when generating our result sets. Try this query on for size:

```SELECT DISTINCT 'Woot: ' + CategoryCode, CategoryName FROM RawMappingData```

This will gives us the following result set:

```
code          name
Woot:  SWT    Sweets
Woot:  PM     Process Meats
Woot:  AC-01  Accesssories (Group 01)
```

Using this trick, we can hack up our SQL query to generate our category insert queries for us!

```SELECT DISTINCT 'INSERT INTO category (code, name) VALUES (''' + CategoryCode + ''', ''' + CategoryName + ''')' FROM RawMappingData```

Take a peek at these results:

```
(No column Name)
INSERT INTO category (code, name) VALUES ('SWT', 'Sweets')
INSERT INTO category (code, name) VALUES ('PM', 'Processed Meats')
INSERT INTO category (code, name) VALUES ('AC-01', 'Accessories (Group 01)')
```

We can dump this result set into a text editor, or query editor, save and run. We'll get uniquely generated Ids for our categories and execution time on the script will be really fast.

But what about the mapping records themselves. There's a good 10,000+ records to insert. Can we use this approach? Yes we can, but we'll take a slightly different angle to it, which will require a little bit of manual text editing, but far from anything that is time consuming. For our mapping records, we're going to setup a transactional approach, and insert 1000 records at a time in the database in batches. If we did them one by one, it would take a long amount of time to process, since each INSERT statement would have its own log record (for restore purposes) and that takes extra overhead.

The transactional approach uses the basic format for its queries:

```sql
SET NOCOUNT ON; SET XACT_ABORT ON; GO

BEGIN TRANSACTION; INSERT INTO [dbo].[product_mapping]([product_id], [category_id]) SELECT N'1A1231A', 1 UNION ALL SELECT N'3C1111B', 2 UNION ALL SELECT N'77A3X1', 3 COMMIT;

RAISERROR (N'[dbo].[submarket_mapping]: Insert Batch: 1.....Done!', 10, 1) WITH NOWAIT; GO
```

What this will do is process all of the statements within the transaction block and then commit them in one batch, which saves us time. Typically this can be done in 1000 or 5000 record transactions. If an error occurs within the block, none of the records are stored in the database. In our case, this isn't a big concern. So we can setup a similar query as we did above, generating all our SELECT statements that fit between our "INSERT INTO" and "COMMIT" block. We'll then take this text, dump it into a text editor, and insert our "BEGIN TRANSACTION" and "COMMIT" statements that wrap around every 1000 lines or so of code.

We still have one last hurdle to get past. Our raw data still contains the category code and name, but not the ID that we need for our product_mapping table. Fortunately, we can nest SELECT statements to pull out the data we need. Our "generator" query then looks something like this:

```sql
SELECT 'SELECT N''' + [ProdoctId] + ''', (SELECT [id] FROM [dbo].[category] WHERE [code] = ''' + [CategoryCode] + ''' AND [name] = ''' + [CategoryName] + ''') UNION ALL' FROM RawMappingData
```

And this will help us generate our final SQL Statement we need:

```sql
SET NOCOUNT ON; SET XACT_ABORT ON; GO

BEGIN TRANSACTION; INSERT INTO [dbo].[product_mapping]([product_id], [category_id]) SELECT N'1A1231A', (SELECT [id] FROM [dbo].[submarket] WHERE [code] = 'AT01' AND [name] = 'Region 01') UNION ALL SELECT N'3C1111B', (SELECT [id] FROM [dbo].[submarket] WHERE [code] = 'AT01' AND [name] = 'Region 01') UNION ALL SELECT N'77A3X1', (SELECT [id] FROM [dbo].[submarket] WHERE [code] = 'AT01' AND [name] = 'Region 01') COMMIT;

RAISERROR (N'[dbo].[submarket_mapping]: Insert Batch: 1.....Done!', 10, 1) WITH NOWAIT; GO
```

So there you have it. What took me about half a day with a text editor and some old regular expression replacement tricks (which still included some errors to fix) I was able to recreate in about 5 minutes by piecing these things together. This saved time and work.

Have you done anything similar using different means? I'd love to know. I'm always looking for new tricks for my toolbelt!
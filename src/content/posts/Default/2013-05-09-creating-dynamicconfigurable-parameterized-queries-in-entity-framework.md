---
title: Creating Dynamicconfigurable Parameterized Queries In Entity Framework
description: Creating Dynamicconfigurable Parameterized Queries In Entity Framework
published: 2013-05-09
category: Default
tags: [net, adonet-entity-framework, coding, Database, ef, entity, entity-framework, model, parameterized-queries, parameters, programming, searching]
---

EDIT: A better, refactored version of this can be found [here](/refactored-creating-dynamicconfigurable-parameterized-queries-in-entity-framework).

Entity Framework is an amazing tool. It allows you to quickly and easily get your basic queries and updates running with little hassle. In addition, you have business objects to interact with, which makes your middle tier (or your controller) that much easier to work with. However, when you need to start setting up more dynamic queries from user input, things start to get tricky. Here's a solution I created to help with that.

<!--more-->

### Introduction

Within Entity Framework, you have two main forms of queries, LINQ and EntityQueries. While LINQ offers an easier "visual" approach to a query, we run into a bit of difficulty when we want to optionally append a lot of parameters to our WHERE clause in the query. I have done this in the past by using a syntax similar to:

```sql
WHERE (@Cus_Name IS NULL OR Cus_Name LIKE '%' + @Cus_Name + '%') AND (@Cus_City IS NULL OR Cus_City LIKE '%' + @Cus_City + '%')
```

but in this case we're working with a large number of options and would like our executing SQL query to just look for the variables we need. In that regard, we can use our EntityQuery and setup something similar to...

```cs
var sites = context.sites; 
var query = sites.Where("Cus_Id = @CusId"); 
var queryParameter = new ObjectParameter("CusId", Type.GetType("System.Int32")) { Value = 5 };

query.Parameters.Add(queryParameter); var count = query.Count();
```

...and work from there. To add to our simple queries, we need to remember that we're setting up a way for users to be able to query our EF context, so we also need to account for wildcard searches (Name LIKE '%Jo%'), multiple item searches (Id = 5 OR Id = 6), range searches (StartDate >= '1/1/2010' AND StartDate <= '2/1/2010'), and also for NULL values in our searches (TypeId = NULL).

Ultimately our task is not complex (iterating through a list of parameters and setting up our query to handle them), but being able to do so in a relatively dynamic manner (minimal configuration) would allow us to reuse our code against any table/entity in our context/database. For that we need to setup a little bit of structure.

### Search Parameter Object and Dictionary

To accomplish this, the first step is to create a simple object that holds all of our parameter/criteria building information.

\[gist]5549386

You'll notice we have quite a few constructors in here. That's to make it easier to create our criteria based on our common scenarios. With this object, we then create a Dictionary collection of all the fields we want to be able to search on in our database. While it would be nice to auto-infer our search criteria, we have a few tricky situations (especially with date ranges) that require us to configure things accordingly:

\[gist]5549533

### Building the Parameterized Query

Armed with this structure, we can now build our parameterized query with the following method:

\[gist]5550329

Notice a few of the perks/nuances here:

- If there are no parameters in our collection, we simply return the existing query. This allows us to take an existing query from anywhere and not worry about what it already has in it.
- Since our "range" type queries involve two variables, we automatically look for paired parameters with a From/To name in them, parse them and generate a Range parameter for them.
- We also check for the empty or "null" value and use DBNull instead. Otherwise the parameterized query would throw an exception when it manually tried to convert the string "null" to NULL and it would treat empty strings differently.
- Parameters that are identified as allowing multiples are assumed to be pipe delimited and will be split accordingly.
- The method is using .Net generics for it's resulting ObjectQuery output as well as input object. This allows us to easily pass any entity from our EF Context into the method, since the parameters and search criteria are in a fixed type no matter what.

### Pull Your Parameters and Go!

Now that we have all the pieces together, how do we actually build and get our query results? The first step is to get your parameters. Notice the method is expecting a NameValueCollection object for parameters. The nice thing is that by default, web postbacks will automatically take any form parameters and put them into this object. This makes it perfect for a web interface, but you can easily modify your code to generate your own NameValueCollection to work with. Once you have this, it is as simple as executing the following code:

```cs
var ce = new YourEFContextObject(); 
var searchCriteria = GetSearchCriteria(); 
ObjectQuery<site> siteQuery = ce.sites; 
siteQuery = BuildObjectQuery(siteQuery, parameters, searchCriteria);

var siteCount = siteQuery.Count();
```

That's all there is to it! If you need to work with a different entity object, you simply generate a new ObjectQuery with its entity type, make sure you have the appropriate search criteria defined (it doesn't have to be a method, I find it easier for me to structure it as such), grab your parameters, and go!

### Room For Improvement

As it is with most things, there is always room for improvement here. For example, we're creating exclusive (AND) queries by default, and it would be helpful to modify the method to produce inclusive (OR) queries as well. In addition, we make the assumption of a pipe delimiter for multiple items, and we could also make that configurable.

Ideally it would be nice to take a simple string name of the entity we wanted to work with and have the method generate the ObjectQuery<T> object to work with. I did a lot of digging and couldn't quite make that happen. There's some tricky work with reflection and metadata that the entity context contains, but I couldn't quite find it. Any advice is greatly appreciated on how to make this happen.

All in all I'm quite happy to have this structure in place. Currently I'm finishing off implementing the dictionary search criteria for one entity item with about 50+ parameters that can be optionally searched on. I then have to repeat the process with another 7 or 8 tables. A couple of those tables will have more columns than the current one. With this solution, I no longer have to worry about special cases or duplicate processing. I simply generate my criteria dictionary, grab my parameters, and go!

I hope this is helpful to you as well!
---
title: Automatic User And Time Stamping In Entity Framework 4
description: Computer Code
published: 2011-10-12
image: images/posts/2011-07-computercode.webp
imageAlt: Computer Code
category: Default
tags: [net, coding, entity-framework, timestamp, userstamp]
---

![Computer Code](@assets/images/posts/2011-07-computercode.jpg "Computer Code")

Lately I've had the opportunity to really dig deep with [Entity Framework 4](http://msdn.microsoft.com/en-us/data/aa937723). While I'm not utilizing the "Code First" approach, I'm still quite happy with now nice the Entity Model can take my existing database and build practically everything I need for my application's data layer, and most of my business layer. The one tricky thing to resolve still is automating the user/time stamping that we use to track changes in the application.

<!--more-->

Here's a brief background. In most (if not all) of our database tables, we have the following fields:

- creator_id
- created_at
- updater_id
- updated_at

You've probably seen this pattern before. I've seen "created_by" as well that stores a string. Having these fields allows us to do some row auditing behind the scenes to see when a row was created, when it was last updated, and who performed such actions. In the past, I've been able to automatically set these values to the current date/time and the user logged into the database, because we had impersonation setup for our applications. This was great because you could simply run your INSERT/UPDATE statements and ignore auditing, it was handled automatically.

Let's flash forward now a little into Entity Framework, and our "creator_id" feature. With this new application, our auditing columns were set to reference a user Id. This does make things a bit easier to track backwards (via Foreign Key or other method) and users can update their user name without conflict. However, since we're not using impersonation with our application (and even if we did we couldn't impersonate an Id properly), being able to set this field automatically becomes a problem. When looking at the entity model generated, there exists a property within each field called "StoredGeneratedPattern" that you can change to "Computed." If you do this, you tell the Framework not to worry about the field (even if it's required) because the database will auto compute this field for you. You can also set it to "Identity" in cases when you're working with auto incrementing type fields.

This can solve our problem with our created/updated at fields, but it still doesn't solve our creator/updater id fields. In addition, there's apparently a bug in the EF4 entity designer that doesn't set your StoredGeneratedPattern field properly in the underlying XML. This might have been fixed by now (haven't found a definitive answer yet) and you have to manually code the XML yourself. This was a bit of a concern for me since every time you add a new table, you'd have to recode the changes, and there are a good dozen or more tables that we use these auditing field with. After digging around StackOverflow and the MSDN sites a bit, I finally pieced together a solution that worked the best for our scenario.

The key to the solution is that with the update to Entity Framework 4, a lot of the methods built into the ObjectContext can now be overridden. Since .Net allows us to do partial classes, we can extend our Entity Data Context and provide the necessary logic to set our values before the the database calls are made to insert or update the logic is done. To do this, we want to overwrite the context_SavingChanges method that exists in the for the context. Within this method, we can inspect which objects have been modified, and we can even figure out the type of entity being modified. For instance, you could iterate through the entities as such:

It is as simple as that. We can automatically update our fields that we need. However, I have about a dozen tables, and potentially more, that I'm going to need to modify the creator/updater fields for. Looking at my code above, I'm going to have do a lot of type testing and custom logic for each type. However, the Entity Framework provides some powerful methods that allow us to dig into our entities without necessarily knowing what types they are. We make the assumption (or design) that any entity that has auditing that we need will have the columns in it that we listed above.

With that design in place, and the added filtering that Entity Framework does to only give us the entities that have been modified or added, we can abstract our logic further. With that in mind, my solution was to create a partial class for our entity context class and register a method to overwrite the SavingChanges for the entity class. That method checks for our audit fields and sets the default values. The final code looked like this:

using System; using System.Collections.Generic; using System.Data; using System.Data.Objects; using System.Web; using MyApp.BLL;

namespace MyApp.DAL { public partial class AppEntities { partial void OnContextCreated() { this.SavingChanges += new EventHandler(context_SavingChanges); }

private static void context_SavingChanges(object sender, EventArgs e) { // Find any new or modified entities using our user/timestampting // fields and update them accordingly. foreach (ObjectStateEntry entry in ((ObjectContext)sender).ObjectStateManager .GetObjectStateEntries (EntityState.Added | EntityState.Modified)) { // Only work with entities that have our user/timestamp records in them. if (!entry.IsRelationship) { CurrentValueRecord entryValues = entry.CurrentValues; if (entryValues.GetOrdinal("updater_id") > 0) { HttpContext currContext = HttpContext.Current; int userId = 0; DateTime now = DateTime.Now;

if (currContext.User.Identity.IsAuthenticated) { if (currContext.Session\["userId"] != null) { userId = (int)currContext.Session\["userId"]; } else { // Call custom moethod to retrieve User ID userId = Security.GetUserId(currContext.User.Identity.Name); } }

entryValues.SetInt32(entryValues.GetOrdinal("updater_id"), userId); entryValues.SetDateTime(entryValues.GetOrdinal("updated_at"), now);

if (entry.State == EntityState.Added) { entryValues.SetInt32(entryValues.GetOrdinal("creator_id"), userId); entryValues.SetDateTime(entryValues.GetOrdinal("created_at"), now); } } } } } } }

As long as I make sure all my database fields continue to use the fields listed above in our method, then it'll automatically update for any new tables that are placed into the entity model as well. If for some reason there are other columns or unique tables, I can customize things for those specific cases.

I hope this helps. Enjoy!
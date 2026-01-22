---
title: Quick Tip Run Entityframework Migration Seeds For Migratedatabasetolatestversion Configuration
description: quick-tips.jpg
published: 2016-06-17
image: images/posts/2015-01-quick-tips.png
imageAlt: quick-tips.jpg
category: Development
tags: [life]
---

Yep, a long title, and a a complete HT to this [StackOverflow post](http://stackoverflow.com/questions/36024400/migratedatabasetolatestversion-no-running-seed-method), but considering it took me a day of digging and tweaking to ultimately find it, I'm leaving myself a copy of it here for future reference.

<!--more-->

![quick-tips.jpg](@assets/images/posts/2015-01-quick-tips.png)

## Background

Entity Framework has a great migrations tool that allows you to incrementally update your database structure based on changes. There is also a seeding method available to populate your database with some initial data. Unfortunately, by default this seeder method is only called when creating the database for the first time. If you're using the MigrateDatabaseToLatestVersion initializer option (rather common) the seed method won't be called until the second time the application is updated/refreshed, which can cause some confusion, and frustration as well.

## Solution

The solution is to check for any pending migrations and force the seed method to run when this happens after the standard update completes. Here are the updates to your files:

### Startup.cs (or something similar that you initialize your app with)

```Database.SetInitializer(new MigrateDatabaseToLatestVersion<MyDbContext, Configuration>());```

### Configuration.cs (in your Migrations folder)

```cs
private readonly bool _pendingMigrations;

public Configuration()
{
    AutomaticMigrationsEnabled = true;

    // Check if there are migrations pending to run, this can happen if database // doesn't exists or if there was any change in the schema
    var migrator = newDbMigrator(this); _pendingMigrations = migrator.GetPendingMigrations().Any();

    // If there are pending migrations run migrator.Update() to create/update the // database then run the Seed() method to populate the data if necessary. 
    if (_pendingMigrations) 
    { 
        migrator.Update(); 
        Seed(newMyDbContext()); 
    }
}

    protected override void Seed(MyDbContext context) 
    { 
        // Your seed code here... // Make sure to have the context save changes and to call the base seed method afterwards. 
        context.SaveChanges(); 
        base.Seed(context); 
    }
```

There you have it! Now your database will update itself and seed itself during the very first, and subsequent updates. No second calls needed!

Yep, a long title, and a a complete HT to this [StackOverflow post](http://stackoverflow.com/questions/36024400/migratedatabasetolatestversion-no-running-seed-method), but considering it took me a day of digging and tweaking to ultimately find it, I'm leaving myself a copy of it here for future reference.

<!--more-->

![quick-tips.jpg](@assets/images/posts/2015-01-quick-tips.png)

## Background

Entity Framework has a great migrations tool that allows you to incrementally update your database structure based on changes. There is also a seeding method available to populate your database with some initial data. Unfortunately, by default this seeder method is only called when creating the database for the first time. If you're using the MigrateDatabaseToLatestVersion initializer option (rather common) the seed method won't be called until the second time the application is updated/refreshed, which can cause some confusion, and frustration as well.

## Solution

The solution is to check for any pending migrations and force the seed method to run when this happens after the standard update completes. Here are the updates to your files:

### Startup.cs (or something similar that you initialize your app with)

```Database.SetInitializer(new MigrateDatabaseToLatestVersion<MyDbContext, Configuration>());```

### Configuration.cs (in your Migrations folder)

```cs
private readonly bool _pendingMigrations;

public Configuration()
{
    AutomaticMigrationsEnabled = true;

    // Check if there are migrations pending to run, this can happen if database // doesn't exists or if there was any change in the schema
    var migrator = newDbMigrator(this); _pendingMigrations = migrator.GetPendingMigrations().Any();

    // If there are pending migrations run migrator.Update() to create/update the // database then run the Seed() method to populate the data if necessary. 
    if (_pendingMigrations) 
    { 
        migrator.Update(); 
        Seed(newMyDbContext()); 
    }
}

    protected override void Seed(MyDbContext context) 
    { 
        // Your seed code here... // Make sure to have the context save changes and to call the base seed method afterwards. 
        context.SaveChanges(); 
        base.Seed(context); 
    }
```

There you have it! Now your database will update itself and seed itself during the very first, and subsequent updates. No second calls needed!
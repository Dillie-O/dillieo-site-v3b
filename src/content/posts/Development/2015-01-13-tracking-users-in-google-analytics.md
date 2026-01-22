---
title: Tracking Users In Google Analytics
description: Tracking Users In Google Analytics
published: 2015-01-13
image: images/posts/2015-01-1_ga_user_overview.png
imageAlt: Tracking Users In Google Analytics
category: Development
tags: [coding, google-analytics, statistics, tracking, user]
---

Google Analytics provides some great insights into which pages are being accessed and a lot of usage statistics about them. But for web applications, you can’t immediately track which users are using which pages, unless you are doing your own tracking in the database code. However, I found a quick way to do some basic user tracking without much setup.

<!--more-->

### Configuring User Tracking

The newest version of Google Analytics (the analytics.js file) changed the implementation of its events tracking to make it a lot easier and customizable. An “event” can now be generated down to 3 levels of data:

- Category
- Action
- Label

Technically there is a 4th level (value) but since it can only be a numeric field, we can’t really use that (unless you track user id values).

So send a “3 level” event, we simply add the following code after we setup your Google Analytics tracking:

```ga(‘send’, ‘event’, 'category', 'action', 'label');```

For our user tracking, we’re going to define our levels as follows:

- Category - Controller/Page user is on (Shipments Page)
- Action - Action/Feature user is performing (Show Shipment)
- Label - Username of user

In my case, I have a .Net MVC app in place, so my Razor code on the front end looks something like this:

```cs
@if (User.Identity.IsAuthenticated) 
{ 
    <text> 
    var page = '@ViewContext.Controller.ValueProvider.GetValue("controller").RawValue'; 
    var action = '@ViewContext.Controller.ValueProvider.GetValue("action").RawValue'; 
    var user = '@User.Identity.Name';

    // Change the action to friendlier names. 
    if (action == 'Index') { action = 'Home'; }

    ga('send', 'event', page, action, user); </text> 
}
```

That’s all there is to it. Start up your app, log in, and you can start seeing the events tracking in action. Since events are supported in the beta “Real Time” tracking as well, you can even see which users are logged in to your application.

### Viewing User Activity

Once you start getting data in, you’ll want to start tracking the activity of your users. Log in to your Google Analytics account, expand the “Behavior” section, then the “Events” section and click the “Overview” link. This will bring up a page like this:

![](@assets/images/posts/2015-01-1_ga_user_overview.png)

At this level you can see our categories, which corresponds to our pages. This isn’t that different than what you can see elsewhere in Google Analytics. The magic comes when you click on the “Event Label” section in the “Top Events”:

![](@assets/images/posts/2015-01-ga_user_level.png)

Now you can track how many events each user raised. This will help you see which users are more active than others on the site. The next step is to track what a given user is doing. Go ahead and click on one of the Event Label values to bring up their details. The default view won’t show much detail, however, if you apply a second dimension to the report, Behavior -> Event Category, you get a better idea of what your user is doing:

![](@assets/images/posts/2015-01-ga_user_detail.png)

Now we can see that our user spends most of their time on the shipments page. We can refine this even more into a report screen that will drill down each user to list their Categories and Actions, to give us an idea of the specific things they were doing on each page.

I’ll admit that this isn’t the most elegant of solutions, but setting up custom dimensions within Google Analytics, and then wiring them up through the code can take some time and you still don’t have the real time data offered through events. This will give you a quick way to get some nice metrics on your app usage without much setup time.

If you know of any other shortcuts through Google Analytics, definitely pass them along!

Google Analytics provides some great insights into which pages are being accessed and a lot of usage statistics about them. But for web applications, you can’t immediately track which users are using which pages, unless you are doing your own tracking in the database code. However, I found a quick way to do some basic user tracking without much setup.

<!--more-->

### Configuring User Tracking

The newest version of Google Analytics (the analytics.js file) changed the implementation of its events tracking to make it a lot easier and customizable. An “event” can now be generated down to 3 levels of data:

- Category
- Action
- Label

Technically there is a 4th level (value) but since it can only be a numeric field, we can’t really use that (unless you track user id values).

So send a “3 level” event, we simply add the following code after we setup your Google Analytics tracking:

```ga(‘send’, ‘event’, 'category', 'action', 'label');```

For our user tracking, we’re going to define our levels as follows:

- Category - Controller/Page user is on (Shipments Page)
- Action - Action/Feature user is performing (Show Shipment)
- Label - Username of user

In my case, I have a .Net MVC app in place, so my Razor code on the front end looks something like this:

```cs
@if (User.Identity.IsAuthenticated) 
{ 
    <text> 
    var page = '@ViewContext.Controller.ValueProvider.GetValue("controller").RawValue'; 
    var action = '@ViewContext.Controller.ValueProvider.GetValue("action").RawValue'; 
    var user = '@User.Identity.Name';

    // Change the action to friendlier names. 
    if (action == 'Index') { action = 'Home'; }

    ga('send', 'event', page, action, user); </text> 
}
```

That’s all there is to it. Start up your app, log in, and you can start seeing the events tracking in action. Since events are supported in the beta “Real Time” tracking as well, you can even see which users are logged in to your application.

### Viewing User Activity

Once you start getting data in, you’ll want to start tracking the activity of your users. Log in to your Google Analytics account, expand the “Behavior” section, then the “Events” section and click the “Overview” link. This will bring up a page like this:

![](@assets/images/posts/2015-01-1_ga_user_overview.png)

At this level you can see our categories, which corresponds to our pages. This isn’t that different than what you can see elsewhere in Google Analytics. The magic comes when you click on the “Event Label” section in the “Top Events”:

![](@assets/images/posts/2015-01-ga_user_level.png)

Now you can track how many events each user raised. This will help you see which users are more active than others on the site. The next step is to track what a given user is doing. Go ahead and click on one of the Event Label values to bring up their details. The default view won’t show much detail, however, if you apply a second dimension to the report, Behavior -> Event Category, you get a better idea of what your user is doing:

![](@assets/images/posts/2015-01-ga_user_detail.png)

Now we can see that our user spends most of their time on the shipments page. We can refine this even more into a report screen that will drill down each user to list their Categories and Actions, to give us an idea of the specific things they were doing on each page.

I’ll admit that this isn’t the most elegant of solutions, but setting up custom dimensions within Google Analytics, and then wiring them up through the code can take some time and you still don’t have the real time data offered through events. This will give you a quick way to get some nice metrics on your app usage without much setup time.

If you know of any other shortcuts through Google Analytics, definitely pass them along!
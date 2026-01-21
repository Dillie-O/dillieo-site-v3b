---
title: Dynamically Changing Titles In Zurb Foundation For Applications
description: ZANSTitleBinding.png
published: 2015-02-20
image: images/posts/dynamically_changing_titles_in_zurb_foundation_for_applications.webp
imageAlt: ZANSTitleBinding.png
category: Default
tags: [angularjs, coding, data-element, dynamic, foundation, front-matter, header, title, zans, zurb, zurb-foundation-for-applications]
---

As mentioned before, I’m a big fan of [Zurb Foundation for Applications](http://foundation.zurb.com/apps/) and have even built my own [ZANS Scaffold](/sharing-the-love-zurb-foundation-for-apps-scaffolding-for-net-with-authentication) to help launch new apps quick and easy. One thing that wasn’t immediately available in the scaffold was a way to dynamically update the title. Thanks to some [StackOverflow answers](http://stackoverflow.com/questions/12506329/how-to-dynamically-change-header-based-on-angularjs-partial-view) and a little tweaking, I figured out the way to do it.

<!--more-->

![ZANSTitleBinding.png](../img_post/2015-02-20-dynamically-changing-titles-in-zurb-foundation-for-applications/2015-02-zanstitlebinding.png)

### Step 1: Move Application Declaration

The first step is to move your ng-app declaration to the top HTML element, if you haven’t done so already. This allows us to expose the entire page to things like \$rootScope within our application.

```<html lang=“en” ng-app=“application”>```

### Step 2: Update View Front Matter

ZFA uses “front matter” for easy route/controller declaration. Within the front matter is a data field that allows you to define custom data elements. Front matter is YAML based and space sensitive, so we update our front matter for all of our views to something like this (note we have 4 spaces in our indentation):

```--- name: prayers url: /prayers controller: PrayersController data: title: My Prayers ---```

### Step 3: Set placeholder for title update.

You can have this in your HTML header, or anywhere else really. In the screenshot example, I’m updating a title bar element for the mobile layout, but updating the HTML title header as well. Here’s what the title binding looks like:

```<title ng-bind="title"></title>```

…and in our menu bar

```<div class="menu-group-left"> <ul class="menu-bar primary"> <li><a><strong ng-bind="title"></strong></a></li> </ul> </div>```

If you’re curious, we use the ng-bind tag to prevent the “handlebars” from being visible when the page is loading. If you prefer handlebars (to add additional text) you can always use a ng-cloak directive with it.

### Step 4: Wire up events to detect change

There are two events when we might be changing the view, the routeChangeSuccess event (when a page is initially loaded) and the stateChangeStart event (when using navigation within the app).

Thanks to the front matter processing with ZFA, all we need to do is access our title data element and update our rootScope variable accordingly. We need to inject rootScope into our run function, so the updated app.js file looks like this:

```js
function run(authService, \$rootScope) { FastClick.attach(document.body); authService.fillAuthData();

$rootScope.$on('$routeChangeSuccess', function (event, current, previous) 
{ 
    $rootScope.title = current.\$\$route.data.vars.data.title; 
});

$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) 
{ 
    $rootScope.title = toState.data.vars.data.title; 
}); 
}
```

That’s all there is to it! Do a fresh gulp build and you should see your titles change dynamically!

Using these events will also allow us to do some “high level” security checks before loading pages, but that’s another post. 8^D
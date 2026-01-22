---
title: Fixed More Button Disabled Multiple Forms And Script Issues In Sitefinity
description: sitefinity_logo.jpg
published: 2015-08-03
image: images/posts/2015-04-sitefinity_logo1.webp
imageAlt: sitefinity_logo.jpg
category: Default
tags: [coding, debugging, forms, layouts, scripts, selectors, sitefinity, telerik, troubleshooting]
---

I can take no credit for these fixes, but I left enough of a dent in my desk going through them that I felt it important enough to write them out.

<!--more-->

### ![sitefinity_logo.jpg](@assets/images/posts/2015-04-sitefinity_logo1.jpg)

### Custom Scripts Conflicting with the Editor

As we’ve been build a new site with Sitefinity, we’ve put in a lot of custom scripts. We have a custom mouseover navigation, some custom forms, and other things that you would expect in a site of this size. The problem we’ve run into is that when we load our pages into the editor to update content, the scripts are loaded as well, which sometimes interferes with the normal editor functions.

Typically, we’ve taken advantage of the RadScriptManager tag, which functions almost the same as the standard .Net ScriptManager. It will do bundling/minification of your scripts and make them available as an AXD to help speed up client page loading. Our RadScriptManager block looked something like this:

After some discussions with Telerik about the issue, the solution was to strip out all of our custom scripts from the RadScriptManager and have a separate script, that we put at the top of our master template, which runs during the Pre_Render event and looks something like this:

What this script does is detects if we’re loading the design mode for the page or not. If we aren’t, go ahead and add our custom scripts to the RadScriptManager before it starts to do it’s compilation. Otherwise nothing happens, and the RadScriptManager will load the core Telerik scripts as outlined in our RadScriptManager.

Overall quite simple and helpful. Ideally Telerik will add an attribute to the RadScriptManager to allow us to specify these things in there, since there are already other custom atttributes available.

### Multiple Forms

Generally speaking, in an ASP.Net WebForms application, you can’t have multiple forms on the page. This is because ASP.Net uses the single form there to handle a varitey of postback actions for the various buttons and other elements on the page. However, we were integrating with another in-house application and they had a custom form that we would need to submit to from our page. To handle this, I added another hidden form above the main body form with the parameters we needed, and setup some Javascript to submit to that form at the proper time. This worked just fine.

A little while after this update was in place, we noticed that when we went into the page designer, that the “More” button that is used for advanced properties and other features of the various objects in a page was no longer working. This is what lead to the script issue mentioned above, but even this didn’t fix the issue. There were some discussions with Sitefinity tech support, but they weren’t much help, other than slowly adding/removing components of your template until things started working properly.

One of our front end gurus jumped in on this and after about half a day (I think, probably longer) he finally tracked down the solution.

Instead of adding the “onclick” event to the more button in the code, a more popular means nowdays is to use a jQuery selector once the document is ready to “wire up” an element to its click event. This allows you to wire up multiple items that are the same in one command, instead of multiple, and also helps abstract some of the functional work from the presentation work. This is all a great idea.

The problem we ran into was that the Sitefinity code was using what I was told was a “flimsy selector”. The selector that was used to find and attach the click event was assuming that there was only one form on the page and simply selecting the first form element it came across. In our case, it was selecting our hidden form, looking for the sfMoreOptions class, and finding none it simply failed to attach an event. Since this wasn’t an error per-se, simply nothing to wire things up to, the code moved on without displaying an error.

Moving our custom form to the bottom of the template, after the master form, fixed this up really quick.

Sometimes it’s truly amazing how so much work can go into simple fixes, but that’s the nature of our work 8^D

That’s a couple more notes from the Sitefinity battleground worth nothing for future use.
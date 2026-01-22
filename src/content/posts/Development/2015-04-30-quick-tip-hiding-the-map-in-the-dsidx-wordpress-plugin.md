---
title: Quick Tip Hiding The Map In The Dsidx Wordpress Plugin
description: Quick Tip Hiding The Map In The Dsidx Wordpress Plugin
published: 2015-04-30
image: images/posts/2015-04-real_estate_matching_your_search___jerry_fohrman3.png
imageAlt: Quick Tip Hiding The Map In The Dsidx Wordpress Plugin
category: Development
tags: [coding, dsidx, google-maps, mls, tip]
---

I have a site I helped a friend put together that has real estate listings. It’s WordPress based and we’re using the DS-IDX plugin to display listings. The nice thing is that they provide a simple URL to generate listings for a given area. However, we wanted the map to remain hidden when the results are first loaded. It’s a bit “hacky” but here’s how you can get it done.

<!--more-->

![](@assets/images/posts/2015-04-real_estate_matching_your_search___jerry_fohrman3.png)

As of this writing, there was no “toggle” parameter to add in the URL to let the map remain hidden by default. I’ve been told that once the user hides the map, the parameter is “remembered” during the next refresh, but this wasn’t desired either. After some poking and experimenting, the solution was to add simple batch of Javascript to run after the page loads. You can modify your theme or use a plugin that adds the code at the bottom of the page.

Here’s what you need:

```js
$( document ).ready(function() 
{ 
    if($('#dsidx-map').is(":visible")) 
    { 
        setTimeout(function() 
        {
            $('#dsidx-map-control a')[0].click();
        }, 1000);
    } 
});
```

That’s the trick. We check to see if the map is visible or not (for those refresh cases that it already starts out hidden) and if it is visible, we set a timeout for one second that triggers the click event if you were to manually click the link to hide the map.

Why the delay? Well, the IDX plugin loads the data first and then makes a call to render the Google Map. If I hide the map immediately, something odd happens and the map isn’t rendered properly. It could be related to parsed map points, it could be something else. I’m not 100% sure. That said, when the page loads, the animation if hiding isn’t that visible (if at all) and you could potentially slide this down to half a second.

Next time you load the page, it’ll look like this:

![](@assets/images/posts/2015-04-real_estate_matching_your_search___jerry_fohrman21.png)

…and that’s it! Hope this helps! Enjoy!

I have a site I helped a friend put together that has real estate listings. It’s WordPress based and we’re using the DS-IDX plugin to display listings. The nice thing is that they provide a simple URL to generate listings for a given area. However, we wanted the map to remain hidden when the results are first loaded. It’s a bit “hacky” but here’s how you can get it done.

<!--more-->

![](@assets/images/posts/2015-04-real_estate_matching_your_search___jerry_fohrman3.png)

As of this writing, there was no “toggle” parameter to add in the URL to let the map remain hidden by default. I’ve been told that once the user hides the map, the parameter is “remembered” during the next refresh, but this wasn’t desired either. After some poking and experimenting, the solution was to add simple batch of Javascript to run after the page loads. You can modify your theme or use a plugin that adds the code at the bottom of the page.

Here’s what you need:

```js
$( document ).ready(function() 
{ 
    if($('#dsidx-map').is(":visible")) 
    { 
        setTimeout(function() 
        {
            $('#dsidx-map-control a')[0].click();
        }, 1000);
    } 
});
```

That’s the trick. We check to see if the map is visible or not (for those refresh cases that it already starts out hidden) and if it is visible, we set a timeout for one second that triggers the click event if you were to manually click the link to hide the map.

Why the delay? Well, the IDX plugin loads the data first and then makes a call to render the Google Map. If I hide the map immediately, something odd happens and the map isn’t rendered properly. It could be related to parsed map points, it could be something else. I’m not 100% sure. That said, when the page loads, the animation if hiding isn’t that visible (if at all) and you could potentially slide this down to half a second.

Next time you load the page, it’ll look like this:

![](@assets/images/posts/2015-04-real_estate_matching_your_search___jerry_fohrman21.png)

…and that’s it! Hope this helps! Enjoy!
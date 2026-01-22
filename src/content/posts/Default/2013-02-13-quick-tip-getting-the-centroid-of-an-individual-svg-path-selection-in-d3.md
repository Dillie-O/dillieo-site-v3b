---
title: Quick Tip Getting The Centroid Of An Individual Svg Path Selection In D3
description: Quick Tip
published: 2013-02-13
image: images/posts/quick_tip_getting_the_centroid_of_an_individual_svg_path_selection_in_d3.webp
imageAlt: Quick Tip
category: Default
tags: [centroid, coding, d3, quick-tip, svg]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

If you're using [D3](d3.org) to render SVG paths, you'll find that you can iterate through a collection of paths and get the centroids of each one through a simple loop:

<!--more-->

```js
d3.selectAll("#states path") .each(function (d, i) 
{ 
    var centroid = path.centroid(d); 
    alert('Centroid at: ' + centroid\[0] + ', ' + centroid\[1]); 
});
```

However, if you try a similar approach on a single selection:

```js
var state = d3.select("#state_01000"); 
var centroid = path.centroid(state); 
alert('Centroid at: ' + centroid\[0] + ', ' + centroid\[1]);
```

Your centroid value comes back as undefined.

The trick is that the .each method that iterates through the collection is actually using an underlying property of the selection for its processing.

The solution is to use the .datum() method on the selection.

```js
var state = d3.select("#state_01000"); 
var centroid = path.centroid(state.datum()); alert('Centroid at: ' + centroid\[0] + ', ' + centroid\[1]);
```

Happy coding!
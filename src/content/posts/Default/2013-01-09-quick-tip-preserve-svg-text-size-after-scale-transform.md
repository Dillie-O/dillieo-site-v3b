---
title: Quick Tip Preserve Svg Text Size After Scale Transform
description: Quick Tip
published: 2013-01-09
image: images/posts/2011-12-quicktip.webp
imageAlt: Quick Tip
category: Default
tags: [coding, d3, height, javascript, preserve, quick-tip, scale, svg, text, transform]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg) I've been battling this one for a little while now. SVG is great for fast graphics rendering and scaling to any dimension, but what do you do when you need to keep your text size the same, regardless of the size of your scaling?

<!--more-->

For example. Let's say you have a map of the United States, drawn in SVG. You also have a set of hidden labels for major states, that you want to display when the user clicks on a state already prepped. I have something like this:

![Map Start](@assets/images/posts/2013-01-mapstart.png)

Now when a state is clicked on, we load a file that has the counties for the state, and calculate the transform needed to get the county shapes to fill our viewport. In addition, we apply the transform to the labels, so that they will show up in the proper location:

![Map Scale Arizona](@assets/images/posts/2013-01-mapscalearizona.png)

Now this doesn't look too bad, but some states are smaller than others, which makes the transform REALLY big.

![Map Scale Connecticuit](@assets/images/posts/2013-01-mapscaleconnecticuit.png)

So what are we to do? There is a "font-size" attribute we can apply, we can even use CSS, but once the transform is applied, it's values trump whatever is in CSS/HTML since we're resizing dynamically. If we were somehow able to calculate where the transform would be, or what the resulting coordinates are of our label, then we could simply "redraw" the label after the transform has occurred. I tried using this with the getBBox() method, but it was still referencing the original properties of our label/elements.

Finally, I came across the solution using the getBoundingClientRect() function, which provides the details of our label/element AFTER the transform has completed! With this information, we can create a new label at the new location. I'm using the [d3](http://d3.org) library with GeoJson to provide my initial data, so your code may be a little different, but here's what my code looks like after the transform occurs:

\[gist]4494557

I've done a little extra formatting on our new labels, so that they have a "pill box" background. We also have a CSS class in place that sets our font to the properties we need (12 point font, black text).

Here's what our results look like:

![Map Fixed Arizona](@assets/images/posts/2013-01-mapfixedarizona.png)

Our super zoom states don't look that bad either...

![Map Fixed Connecticuit](@assets/images/posts/2013-01-mapfixedconnecticuit.png)

So there you have it. Take advantage of the getBoundingClientRect() function after you transform your SVG objects in order to redraw your text at the proper location.

Hope this helps! Enjoy!
---
title: Quick Tip How To Draw A Star With Svg And Javascript
description: Quick Tip
published: 2013-01-16
image: images/posts/2011-12-quicktip.webp
imageAlt: Quick Tip
category: Default
tags: [coding, css, graphics, javascript, point, quick-tip, star, svg]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

[SVG](http://www.w3.org/Graphics/SVG/ "Scalable Vector Graphics") provides a powerful way to create graphics that will scale to any size in your application. It's easy enough to draw a star, but you need to work with the polygon shape to work with. Ideally you'd want a way to calculate your star shapes, similar to how you can specify a radius or width/height with circles and rectangles. Fortunately there is a way to calculate the points on a star, and here is how.

<!--more-->

To calculate the points on our star, we bring trigonometry to the rescue! Thank to a [StackOverflow answer](http://stackoverflow.com/questions/2710065/drawing-star-shapes-with-variable-parameters) (written in Java), we know that a basic star is simply a fixed set of points on a circle, equidistant from each other. To make a "fancy" looking star, we work with two circles, and outer and an inner, and use the same angle, applied to the larger and shorter radius. The nice thing about this formula is that we can calculate the proper angle no matter how many "arms" we want on the star: 5, 6, 11, etc.).

With SVG, we simply need to define the points in our polygon (star) and it will do all the hard work of connecting the lines and filling in the space. All our algorithm needs to do is "walk" along the star, and make note of the coordinates at each tip of the arm. That said, here's what our function looks like:

\[gist]4548290

When using the D3 library, we can easily append our star with the following syntax:

```js
d3.select("#star_svg") .append("svg:polygon") .attr("id", "star_1") .attr("visibility", "visible") .attr("points", CalculateStarPoints(pointX, pointY, 5, 10, 5))
```

After you apply a little CSS formatting you get the final result (as applied onto a map)

![Arizona SVG Star](@assets/images/posts/2013-01-arizonasvgstar.png)

There you have it! You can easily modify this function to work with other libraries, including those that draw the lines between points.

Hope this helps!
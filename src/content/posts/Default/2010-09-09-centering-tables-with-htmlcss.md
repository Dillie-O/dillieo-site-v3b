---
title: Centering Tables With Htmlcss
description: Centering Tables With Htmlcss
published: 2010-09-09
image: images/posts/centering_tables_with_htmlcss.webp
imageAlt: Centering Tables With Htmlcss
category: Default
tags: [center, coding, css, format, gridview, html, table]
---

What?! You're not using CSS layouts for a table-less presentation. How awful!

Don't cry foul just yet.

There ARE still some places out there on the web (notably internal LOB apps that have predefined grids like objects) that are using tables to display their content. As a matter of fact, there are still some places where tables work better, especially when you're doing just that, displaying tabluar data.

With the older versions of web browsers and HTML, you could simply add an align="center" snippet to your table, or even wrap the table in a div or paragraph tag that has it's text alignment centered and be done with it.

In today's browsers, you get mixed results, with most of them leaving the table aligned to the left side of the screen The reason this worked though, was that the browsers weren't adhering as strictly to HTML guidelines and giving the box element of the table a pass and went ahead and centered the table for you. As HTML5 is finalized and browsers stick closer to CSS3 guidelines, I'm sure none of them will use this old method.

Fortunately though, the solution to this is simple, almost too simple. It surprised me how long it took me to figure this one out. To my credit (or excuse 8^D) I was still getting the hang of CSS and learning how the box model does things. Alas, enough babble and on to the code.

To center your table (or GridView objects if you're using ASP.Net), simply create for yourself two classes:

.align-center { text-align: center; }

.CenterTable { margin-left: auto; margin-right: auto; }

The first class is self explanatory. It is really just an alias to the standard text alignment. However, I like to use this class because it is named a little more friendly for me and allows me to use multiple classes when necessary on an element without having to mix style and class tags within.

The second class was a bit trickier. What this class does is allows the browser to calculate the left and right margins for the table, which in turn makes sure it centers itself up within whatever containing box it is in, or the page itself. I'll admit that I'm no CSS guru, so that explanation still seems a bit magical to me.

Regardless, when you're ready to roll, all you have to do is this:

&lt;div class="align-center">

&lt;table class="CenterTable"> &lt;tr> &lt;td>Woot!&lt;/td> &lt;td>Centerized!!!&lt;/td> &lt;/tr> &lt;/table>

&lt;/div>

Or similarly:

That's all there is to it. Simple, handy, reusable.

Hope this helps!
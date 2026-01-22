---
title: Quick Tip Iif Isnt Doesnt Like Null Values
description: Quick Tip
published: 2011-12-14
image: images/posts/quick_tip_iif_isnt_doesnt_like_null_values.webp
imageAlt: Quick Tip
category: Default
tags: [coding, function, iif, operator, quick-tip, ternary, vbnet, visual-basic]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

I've spent a good day beating my head up against a wall, and discovered that our VB ternary friend can be a little unfriendly at times...

<!--more-->

For those if you still in Visual Basic land (I delve back and forth these days), you know that there is no default ternary operator built into the language. However there is a helpful function that gives you the same functionality. In my case, I was doing some simple string formatting type stuff:

However, running this code gives you a lovely NullReferenceException. After some more head-banging-wall action and a wonderful [nugget of wisdom](http://stackoverflow.com/questions/428959/using-vb-net-iif-i-get-nullreferenceexception) from StackOverflow, I realized the reason. IIf is a **function** provided by the VB.Net framework, it is not it's own **operator**, like the x ? y : z code works in C#. Therefore, if a null value is passed into a function, that isn't expecting it, it's going to yell at you, instead of short circuiting the evaluation, as you'd expect.

The solution? Use the If operator that became available a while back:

Sometimes one little redundant character makes all the difference... Enjoy!
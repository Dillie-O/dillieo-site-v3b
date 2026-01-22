---
title: Quick Tip Locating Namespaces In Visual Studio
description: findnamespace_1
published: 2014-12-31
image: images/posts/2014-12-findnamespace_1.png
imageAlt: findnamespace_1
category: Default
tags: [coding, namespace, resharper, visual-studio]
---

When I’m using Visual Studio 2013 Community ([for free too!](http://www.visualstudio.com/products/visual-studio-community-vs)) while working on my pet project, I’ve come to realize how dependent I’ve become upon [Resharper](https://www.jetbrains.com/resharper/) for a lot of simple programming needs. While attempting to build some code and compile it, it turns out I was missing a namespace reference that I didn’t immediately know where to find it. After a little experimentation, here’s a trick I found that helps about 90% of the time.

<!--more-->

Here are the quick pictures/steps.

### 1. Build and see your problems…

![findnamespace_1](@assets/images/posts/2014-12-findnamespace_1.png)

Yep, I can’t compile, a couple namespaces are missing.

### 2. Move the cursor to the object and press F12

![findnamespace_2](@assets/images/posts/2014-12-findnamespace_2.png)

The F12 command is the “Go to Definition” command used to easily navigate to a function or object definition, giving you the details on its structure and methods. Click the cursor on the type of object you need the details for and press F12. The “symbol results” window will pop up some options for you.

### 3. Add using statement for the namespace you need.

![findnamespace_3](@assets/images/posts/2014-12-findnamespace_3.png)

Once you know the namespace you need add the appropriate using statement to the top of the page. In my case, I added two or three and bingo I have properly compiling code!

If you know any other tricks, pass them along!
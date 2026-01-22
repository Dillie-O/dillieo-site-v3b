---
title: Quick Tip Color Objects From Hex Codes In Net
description: Hex Palette
published: 2011-03-28
image: images/posts/2011-03-hexpalette2.png
imageAlt: Hex Palette
category: Development
tags: [coding, color-code, hex, html, quick-tip, translation, web]
---

![Hex Palette](@assets/images/posts/2011-03-hexpalette2.png) .Net provides a wonderful class called the color class. There are plenty of predefined colors in it that make it easy when you want to set the color of a label or background quickly and easily. Sometimes though, you need to have a little more control on the color you're working with. Having dabbled in the web realm for so long, hex codes are my friend. So when I discovered I couldn't simply set the ForeColor property of my label webcontrol using Hex values. I was a bit frustrated and stumped.

<!--more-->

Fortunately, the Color class itself came to the rescue! They provide a translator class that allows you to easily work hex code into your labels. To start, simply import the System.Drawing library into your class. From there, do something like this:

```lblAppName.ForeColor = ColorTranslator.FromHtml("#DEDBEF");```

You'll get a nice shade of **light blue, err, off white, err, periwinkle** using that code above. What's really nice is that the ColorTranslator is a shared class, so you don't even need to instantiate an instance of the object to use it. Enjoy!

![Hex Palette](@assets/images/posts/2011-03-hexpalette2.png) .Net provides a wonderful class called the color class. There are plenty of predefined colors in it that make it easy when you want to set the color of a label or background quickly and easily. Sometimes though, you need to have a little more control on the color you're working with. Having dabbled in the web realm for so long, hex codes are my friend. So when I discovered I couldn't simply set the ForeColor property of my label webcontrol using Hex values. I was a bit frustrated and stumped.

<!--more-->

Fortunately, the Color class itself came to the rescue! They provide a translator class that allows you to easily work hex code into your labels. To start, simply import the System.Drawing library into your class. From there, do something like this:

```lblAppName.ForeColor = ColorTranslator.FromHtml("#DEDBEF");```

You'll get a nice shade of **light blue, err, off white, err, periwinkle** using that code above. What's really nice is that the ColorTranslator is a shared class, so you don't even need to instantiate an instance of the object to use it. Enjoy!
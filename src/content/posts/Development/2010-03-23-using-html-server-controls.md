---
title: Using Html Server Controls
description: Using Html Server Controls
published: 2010-03-23
category: Development
tags: [aspnet, coding, controls, html]
---

Did you know that you can attach the **runat=server** tag to basic HTML controls in ASP.Net? What you get is something like this:

When you do this, you create what is known as an HTML Server Control or what I prefer to call a Hybrid Control. What this does is expose the HTML control to your code behind pages and allows you to access them directly, without having to register jQuery scripts to modify the control.

_Why bother with this at all? ASP.Net has a great WebControls that I interact with all the time._

This is true. For the most part I stick with WebControls as well, but there are a couple of distinct advantages you get with the Hybrid Controls:

**1. Less overhead on the web page.**

Sometimes all you need is a simple image or a simple hyperlink with dynamic interaction with the standard features, like the display text. Using the hybrid control will keep all of the additional web control features out.

Here's an example. In a previous application I wrote, I had a table layout with various options that a user was selecting to add/remove. I was stuck with the table due to layout restrictions, but I needed a simple way of hiding certain rows and changing the background on certain rows. I could have worked with panels within the table rows, but this was starting to make the code look pretty ugly.

Instead, I simply gave each table row an id and converted them into a hybrid control. The ASPX code then looked something like this:

I then created a couple of CSS classes to highlight or hide the row. Modifying the style of the row became as simple as doing the following in my code behind:

That was it. Little overhead was added to the ASPX page, and I had easy code behind access to the rows in question without having to worry about Panels and potential formatting issues of embedding div tags within table elements.

**2. Allows for .Net referencing tricks.**

One of the tricky issues when working with Hyperlinks or Images with master pages or user controls path reference issues that can occur. WebControls allow you to use the ~/ prefix to reference the application root of your web application, but normal HTML controls do not. This forces you into hard coding the full path of your image/hyperlink, or limiting the folder structure of your application so you don't have reference issues.

However, if you create a hybrid control out of your Hyperlink or Image tag, it will allow you to use the referencing options that you get in Web Controls. Let's look at my first example again:

This snippet comes from a menu user control that I have nested in a controls folder within my application. The control is embedded into a master page, which resides in a master folder within my web application. The application itself has a root level of common files, as well as subfolders that are limited to certain roles within the application.

Without creating a hybrid control, the href of this tag would be difficult to maintain, since .Net is assembling my pages dynamically based on the master page and the controls involved. Since I did use the hybrid control, I'm able to simply use the ~/ reference and expand the actual hyperlink by embedding an image, which is what I did in the full version of the menu control.

So there's a quick overview of HTTP Server Controls or Hybrid Controls and how they can benefit you in your next ASP.Net application.

Has anybody else come up with clever tricks for the hybrid controls? I'd love to hear them!

Did you know that you can attach the **runat=server** tag to basic HTML controls in ASP.Net? What you get is something like this:

When you do this, you create what is known as an HTML Server Control or what I prefer to call a Hybrid Control. What this does is expose the HTML control to your code behind pages and allows you to access them directly, without having to register jQuery scripts to modify the control.

_Why bother with this at all? ASP.Net has a great WebControls that I interact with all the time._

This is true. For the most part I stick with WebControls as well, but there are a couple of distinct advantages you get with the Hybrid Controls:

**1. Less overhead on the web page.**

Sometimes all you need is a simple image or a simple hyperlink with dynamic interaction with the standard features, like the display text. Using the hybrid control will keep all of the additional web control features out.

Here's an example. In a previous application I wrote, I had a table layout with various options that a user was selecting to add/remove. I was stuck with the table due to layout restrictions, but I needed a simple way of hiding certain rows and changing the background on certain rows. I could have worked with panels within the table rows, but this was starting to make the code look pretty ugly.

Instead, I simply gave each table row an id and converted them into a hybrid control. The ASPX code then looked something like this:

I then created a couple of CSS classes to highlight or hide the row. Modifying the style of the row became as simple as doing the following in my code behind:

That was it. Little overhead was added to the ASPX page, and I had easy code behind access to the rows in question without having to worry about Panels and potential formatting issues of embedding div tags within table elements.

**2. Allows for .Net referencing tricks.**

One of the tricky issues when working with Hyperlinks or Images with master pages or user controls path reference issues that can occur. WebControls allow you to use the ~/ prefix to reference the application root of your web application, but normal HTML controls do not. This forces you into hard coding the full path of your image/hyperlink, or limiting the folder structure of your application so you don't have reference issues.

However, if you create a hybrid control out of your Hyperlink or Image tag, it will allow you to use the referencing options that you get in Web Controls. Let's look at my first example again:

This snippet comes from a menu user control that I have nested in a controls folder within my application. The control is embedded into a master page, which resides in a master folder within my web application. The application itself has a root level of common files, as well as subfolders that are limited to certain roles within the application.

Without creating a hybrid control, the href of this tag would be difficult to maintain, since .Net is assembling my pages dynamically based on the master page and the controls involved. Since I did use the hybrid control, I'm able to simply use the ~/ reference and expand the actual hyperlink by embedding an image, which is what I did in the full version of the menu control.

So there's a quick overview of HTTP Server Controls or Hybrid Controls and how they can benefit you in your next ASP.Net application.

Has anybody else come up with clever tricks for the hybrid controls? I'd love to hear them!
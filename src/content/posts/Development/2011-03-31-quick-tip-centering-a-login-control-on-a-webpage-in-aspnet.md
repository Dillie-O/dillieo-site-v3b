---
title: Quick Tip Centering A Login Control On A Webpage In Aspnet
description: Quick Tip Centering A Login Control On A Webpage In Aspnet
published: 2011-03-31
image: images/posts/2011-03-centerlogincontrol.png
imageAlt: Quick Tip Centering A Login Control On A Webpage In Aspnet
category: Development
tags: [aspnet, coding, css, formatting, login, quick-tip]
---

![](@assets/images/posts/2011-03-centerlogincontrol.png "CenterLoginControl")

Oddly enough, the ASP.Net Login control is a pesky bugger to center on a page. I'm sure you've tried doing the "double wrapper" div tags, and I even use a similar trick when on a given page, but to no avail. After some digging and tweaking, I've found the solution and here it is:

<!--more-->

The thing to remember is that by default the box model for the div is going to expand the entire width of the section you're working with, so trying to center that is pointless. Instead you need to set your box width to the proper fixed width and then set your margins to auto.

You do need some kind of "wrapper" setting the text-align: center to establish things, and you can even do that in your body tag on the page. For the sake of example here, I'll do all stylesheets inline, but you can always create classes. Here's the finished product:

&lt;div style="text-align: center;">

&lt;div style="width: 400px; margin-left: auto; margin-right:auto;">

&lt;asp:Login ID="AppLogin" runat="server" DestinationPageUrl="~/Default.aspx" TitleText="Please enter your credentials to access this application."> &lt;/asp:Login>

&lt;/div>

&lt;/div>

And there you go! Feel free to tweak our your login control formatting, but this should keep the control itself centered nicely on your page. This works in IE8 (without having to run compatibility mode), Chrome, Firefox, and Safari.

Enjoy!

![](@assets/images/posts/2011-03-centerlogincontrol.png "CenterLoginControl")

Oddly enough, the ASP.Net Login control is a pesky bugger to center on a page. I'm sure you've tried doing the "double wrapper" div tags, and I even use a similar trick when on a given page, but to no avail. After some digging and tweaking, I've found the solution and here it is:

<!--more-->

The thing to remember is that by default the box model for the div is going to expand the entire width of the section you're working with, so trying to center that is pointless. Instead you need to set your box width to the proper fixed width and then set your margins to auto.

You do need some kind of "wrapper" setting the text-align: center to establish things, and you can even do that in your body tag on the page. For the sake of example here, I'll do all stylesheets inline, but you can always create classes. Here's the finished product:

&lt;div style="text-align: center;">

&lt;div style="width: 400px; margin-left: auto; margin-right:auto;">

&lt;asp:Login ID="AppLogin" runat="server" DestinationPageUrl="~/Default.aspx" TitleText="Please enter your credentials to access this application."> &lt;/asp:Login>

&lt;/div>

&lt;/div>

And there you go! Feel free to tweak our your login control formatting, but this should keep the control itself centered nicely on your page. This works in IE8 (without having to run compatibility mode), Chrome, Firefox, and Safari.

Enjoy!
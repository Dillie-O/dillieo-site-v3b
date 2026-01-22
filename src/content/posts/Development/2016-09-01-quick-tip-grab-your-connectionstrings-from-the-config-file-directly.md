---
title: Quick Tip Grab Your Connectionstrings From The Config File Directly
description: quick-tips.jpg
published: 2016-09-01
image: images/posts/2015-01-quick-tips.png
imageAlt: quick-tips.jpg
category: Development
tags: [net, coding, connection-strings, debug]
---

Interesting little tidbit discovered today. I was debugging a helper method that took a connection string as an input parameter, so that it could create a simple SQL connection (no entity framework magic) in order to process things. Since there was some EF code and context already established, the original code was setup to pass the connection string from the existing context:

```context.Database.Connection.ConnectionString```

However, I was getting an error when connecting. A little digging brought to light the fact that when you pull the connection string in this manner, the password is omitted. I suspect for security purposes. That said, simply using the standard:

```ConfigurationManager.ConnectionStrings\["DefaultContext"].ConnectionString```

...will get you what you need.

<!--more-->

![quick-tips.jpg](@assets/images/posts/2015-01-quick-tips.png)

Interesting little tidbit discovered today. I was debugging a helper method that took a connection string as an input parameter, so that it could create a simple SQL connection (no entity framework magic) in order to process things. Since there was some EF code and context already established, the original code was setup to pass the connection string from the existing context:

```context.Database.Connection.ConnectionString```

However, I was getting an error when connecting. A little digging brought to light the fact that when you pull the connection string in this manner, the password is omitted. I suspect for security purposes. That said, simply using the standard:

```ConfigurationManager.ConnectionStrings\["DefaultContext"].ConnectionString```

...will get you what you need.

<!--more-->

![quick-tips.jpg](@assets/images/posts/2015-01-quick-tips.png)
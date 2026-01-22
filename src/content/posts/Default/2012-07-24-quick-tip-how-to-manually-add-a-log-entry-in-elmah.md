---
title: Quick Tip How To Manually Add A Log Entry In Elmah
description: Quick Tip
published: 2012-07-24
image: images/posts/quick_tip_how_to_manually_add_a_log_entry_in_elmah.webp
imageAlt: Quick Tip
category: Default
tags: [coding, elmah, logging, quick-tip]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

I'm a big fan of [Elmah](/elmah-a-quick-start-tutorial-and-guide) (even though I'm still a little more partial to [log4Net](/log4net-a-quick-start-guide) since it gives you a very quick way of logging all unhandled exceptions in your application. However, sometimes you need to manually add an entry (say within a try/catch block) and fortunately Elmah provides a simple way to do that.

<!--more-->

I should have looked through StackOverflow sooner, but here it is. Add this one statement in your catch block (or anywhere else really) and you can get a log entry into Elmah, and let your code continue as planned:

```Elmah.ErrorSignal.FromCurrentContext().Raise(ex)```

That's all! Happy logging!
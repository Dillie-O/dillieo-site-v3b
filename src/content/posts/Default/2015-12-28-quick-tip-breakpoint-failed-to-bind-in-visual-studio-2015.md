---
title: Quick Tip Breakpoint Failed To Bind In Visual Studio 2015
description: Quick Tip Breakpoint Failed To Bind In Visual Studio 2015
published: 2015-12-28
image: images/posts/quick_tip_breakpoint_failed_to_bind_in_visual_studio_2015.webp
imageAlt: Quick Tip Breakpoint Failed To Bind In Visual Studio 2015
category: Default
tags: [coding, debug, debugger, visual-studio]
---

Are you running into an unusual amount of “Breakpoint failed to bind.” errors in Visual Studio 2015? This is probably due to a change in how the debugger is working. In the past when you fired up the debugger, Visual Studio automatically triggered a rebuild of the source code in debug mode, so that all the debug symbols are up to date and ready to debug. It appears that this is no longer the case in VS MMXV.

The solution is simple enough. Make sure to change your compile target to “Debug” before pressing that magical F5 button and you should be all set! It’s always the simple things… 8^D

<!--more-->

![](@assets/images/posts/2015-12-1451322919_1.png)
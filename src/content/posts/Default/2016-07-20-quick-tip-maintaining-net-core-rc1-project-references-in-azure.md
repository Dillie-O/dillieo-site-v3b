---
title: Quick Tip Maintaining Net Core Rc1 Project References In Azure
description: quick-tips.jpg
published: 2016-07-20
image: images/posts/quick_tip_maintaining_net_core_rc1_project_references_in_azure.webp
imageAlt: quick-tips.jpg
category: Default
tags: [net, azure, bugs, coding, core, dependencies, libraries, rc1, rc2, references]
---

Sometimes you just have to stick with older code...

I ran into a problem a while back when deploying an application to Azure that was using the DNX / .Net Core RC1 Framework. I started seeing errors such as:

```
Unable to resolve dependency Microsoft.Extensions.Options 1.0.0-rc2-final
```

Similarly when I would attempt to compile I would see an error such as:

```
The dependency Microsoft.Extensions.Options 1.0.0 in project ZZZ does not support framework DNX,Version=v4.5.1.
```

Something strange was going on...

<!--more-->

![quick-tips.jpg](@assets/images/posts/2015-01-quick-tips.png)

It was odd considering I hadn't updated any of the project libraries and had only recently made a small processing change. Doing some tech support and troubleshooting indicated I should just update to RC2 since some of the dependencies were defaulting there to resolve things.

The problem with this is that Microsoft is typically really good about maintaining reverse compatibility with libraries and it seemed odd that it would break now. In addition, some of my other libraries were incompatible with RC2, which really would cause a headache if I had to find new libraries to solve my issues.

Digging through things a bit more led me to discover that some of my project dependencies were using the version format of:

```
1.0.0-*
```

This allowed the package manager to pull the most recent version along that version tree, which was causing it to pull the RC2 libraries. What was tricker was that one of the libraries had a dependency that allowed it to pull a RC2 version, which I didn't find until I dug into the project.lock.json file.

Changing these references to...

```
1.0.0-rc1-final
```

...and letting the package manager update the project did the trick!

Hopefully this saves you some of the sanity I lost along the way 8^D
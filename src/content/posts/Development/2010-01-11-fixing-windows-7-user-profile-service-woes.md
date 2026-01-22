---
title: Fixing Windows 7 User Profile Service Woes
description: Fixing Windows 7 User Profile Service Woes
published: 2010-01-11
category: Development
tags: [geekery, profile, user, windows7]
---

I’ve run into this pesky little problem now twice. Once on my machine at home and this morning on my machine at work.

When I attempted to login to the site, I got the following message:

> User Profile Service failed login.
>
> User profile cannot be loaded.

This can be a rather scary message to receive, especially if you’ve logged out of your machine successfully and haven’t done anything crazy to it. What’s worse is that one time I received this message with additional details saying the profile was corrupt, though upon inspection I couldn’t see anything wrong with the files in the profile.

Searching for solutions on the Internet have brought up a lot of Vista related solutions, some of which involve folder and file manipulations that don’t exist in my Windows 7 install.

While I haven’t tracked down the root cause of the issue. The primary symptom I’ve seen both times I’ve run into it relates to something gone wacky with the profile data in the registry.

I know the prospect of doing “registry surgery” seems daunting to most folks, the Windows folks were smart enough to make a backup of your profile when the login goes bad and “rebuilds” your profile with a temporary one.

The solution for me (and hopefully you) comes by simply replacing your current registry with the backed up one. To do this, log in under an Administrator account and follow the following steps:

1. Start up **regedit**.
2. Navigate down to the registry path to the `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList` folder and expand this folder out.
3. You’ll notice a bunch of the profile SIS, in which none of them will match your login Id that you’re familiar with. However, you should see a folder that is named with a profile Id with a .bak extension attached to it.
4. Delete the matching folder that **DOES NOT** have the .bak in its name.
5. Rename the profile folder to get rid of the .bak in its name.
6. Log out of the Administrator account and log back in under the faulty profile.

And that has done the trick!

I’ve run into this pesky little problem now twice. Once on my machine at home and this morning on my machine at work.

When I attempted to login to the site, I got the following message:

> User Profile Service failed login.
>
> User profile cannot be loaded.

This can be a rather scary message to receive, especially if you’ve logged out of your machine successfully and haven’t done anything crazy to it. What’s worse is that one time I received this message with additional details saying the profile was corrupt, though upon inspection I couldn’t see anything wrong with the files in the profile.

Searching for solutions on the Internet have brought up a lot of Vista related solutions, some of which involve folder and file manipulations that don’t exist in my Windows 7 install.

While I haven’t tracked down the root cause of the issue. The primary symptom I’ve seen both times I’ve run into it relates to something gone wacky with the profile data in the registry.

I know the prospect of doing “registry surgery” seems daunting to most folks, the Windows folks were smart enough to make a backup of your profile when the login goes bad and “rebuilds” your profile with a temporary one.

The solution for me (and hopefully you) comes by simply replacing your current registry with the backed up one. To do this, log in under an Administrator account and follow the following steps:

1. Start up **regedit**.
2. Navigate down to the registry path to the `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList` folder and expand this folder out.
3. You’ll notice a bunch of the profile SIS, in which none of them will match your login Id that you’re familiar with. However, you should see a folder that is named with a profile Id with a .bak extension attached to it.
4. Delete the matching folder that **DOES NOT** have the .bak in its name.
5. Rename the profile folder to get rid of the .bak in its name.
6. Log out of the Administrator account and log back in under the faulty profile.

And that has done the trick!
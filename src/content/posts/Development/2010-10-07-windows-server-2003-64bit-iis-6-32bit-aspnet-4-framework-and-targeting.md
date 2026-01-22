---
title: Windows Server 2003 64Bit Iis 6 32Bit Aspnet 4 Framework And Targeting
description: Windows Server 2003 64Bit Iis 6 32Bit Aspnet 4 Framework And Targeting
published: 2010-10-07
category: Development
tags: [32bit, 4-framework, 64bit, aspnet, coding, windows-server-2003]
---

This article is nothing but a hat tip (HT) to [my buddy Ben](http://redtrails.com) at work for his awesome work.

Here's the rundown. There is a server at work that is running Windows Server 2003 x64 with IIS 6 and and .Net 4 Framework. Due to an existing application on the server, IIS has to run in 32bit mode. Ben had recently put a new web application on the server, which needed to use the .Net 4 Framework. Since the server was initially setup with the .Net 2.0 Framework, the new application defaulted to the 2.0 Framework. Typically you can go to the IIS settings for the application and use the ASP.Net tab to re-target the appropriate Framework. But for some reason, when he went into IIS to set the properties on the Virtual Directory/Web Application, the ASP.Net tab was missing.

After a LOT of digging, head beating against the wall, and some good thinking, he wasn't able to get the tab to appear, but he was able to get the application to retarget the proper framework by doing the following:

1\. Open up the command prompt on the server and figure out how IIS is running by executing the following command:

> cscript C:\\inetpub\\adminscripts\\adsutil.vbs GET W3SVC/AppPools/Enable32BitAppOnWin64

2\. You should see 'Enable32BitAppOnWin64 : (BOOLEAN) True.'

3 Is the server setup for 32-bit compatibility mode for legacy apps? If not execute the following command:

> cscript C:\\inetpub\\adminscripts\\adsutil.vbs SET W3SVC/AppPools/Enable32BitAppOnWin64 True

4\. Assuming it has been installed, make sure .Net 4 Framework is registered for ASP.Net by executing:

> aspnet_regiis -i

5\. Find out what IIS extensions are enabled (0) and disabled (0) by executing teh following command:

> C:\\Windows\\System32 "cscript iisext.vbs /ListFile

6\. If the .Net 4 Framework is disabled you will need to run the following command:

> cscript iisext.vbs /EnFile C:\\WINDOWS\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll

and verify that you now see a '1' in the status of the desired Framework.

7\. Now navigate to your Framework version folder and run the following command:

> aspnet_regiis -lv

to list the status and installation path of all versions of ASP.NET that are installed on the computer. Notice the (Root) note that specifies this is the default Framework.

8\. Execute the following command:

> aspnet_regiis -lk

to list the path and version of all IIS metabase keys where ASP.NET is mapped.

9\. Note in the attached image that the desired application DSMapApp is still targeting the 2.0 framework EVEN THOUGH running aspnet_regiis -i is supposed to switch all apps to the specified Framework.

10\. To switch a particular application's targeted Framework we'll need the -s switch to Update scriptmaps and application-pool assignments for the specified application and for all sub-applications.:

> aspnet_regiis -s W3SVC/1/Root/\[AppName]

...and that should do it. The following screen shot below traces the commands executed.

Mad props to you Ben!

This article is nothing but a hat tip (HT) to [my buddy Ben](http://redtrails.com) at work for his awesome work.

Here's the rundown. There is a server at work that is running Windows Server 2003 x64 with IIS 6 and and .Net 4 Framework. Due to an existing application on the server, IIS has to run in 32bit mode. Ben had recently put a new web application on the server, which needed to use the .Net 4 Framework. Since the server was initially setup with the .Net 2.0 Framework, the new application defaulted to the 2.0 Framework. Typically you can go to the IIS settings for the application and use the ASP.Net tab to re-target the appropriate Framework. But for some reason, when he went into IIS to set the properties on the Virtual Directory/Web Application, the ASP.Net tab was missing.

After a LOT of digging, head beating against the wall, and some good thinking, he wasn't able to get the tab to appear, but he was able to get the application to retarget the proper framework by doing the following:

1\. Open up the command prompt on the server and figure out how IIS is running by executing the following command:

> cscript C:\\inetpub\\adminscripts\\adsutil.vbs GET W3SVC/AppPools/Enable32BitAppOnWin64

2\. You should see 'Enable32BitAppOnWin64 : (BOOLEAN) True.'

3 Is the server setup for 32-bit compatibility mode for legacy apps? If not execute the following command:

> cscript C:\\inetpub\\adminscripts\\adsutil.vbs SET W3SVC/AppPools/Enable32BitAppOnWin64 True

4\. Assuming it has been installed, make sure .Net 4 Framework is registered for ASP.Net by executing:

> aspnet_regiis -i

5\. Find out what IIS extensions are enabled (0) and disabled (0) by executing teh following command:

> C:\\Windows\\System32 "cscript iisext.vbs /ListFile

6\. If the .Net 4 Framework is disabled you will need to run the following command:

> cscript iisext.vbs /EnFile C:\\WINDOWS\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll

and verify that you now see a '1' in the status of the desired Framework.

7\. Now navigate to your Framework version folder and run the following command:

> aspnet_regiis -lv

to list the status and installation path of all versions of ASP.NET that are installed on the computer. Notice the (Root) note that specifies this is the default Framework.

8\. Execute the following command:

> aspnet_regiis -lk

to list the path and version of all IIS metabase keys where ASP.NET is mapped.

9\. Note in the attached image that the desired application DSMapApp is still targeting the 2.0 framework EVEN THOUGH running aspnet_regiis -i is supposed to switch all apps to the specified Framework.

10\. To switch a particular application's targeted Framework we'll need the -s switch to Update scriptmaps and application-pool assignments for the specified application and for all sub-applications.:

> aspnet_regiis -s W3SVC/1/Root/\[AppName]

...and that should do it. The following screen shot below traces the commands executed.

Mad props to you Ben!
---
title: Installing Sitefinity With Iis 8 Sql Server 2012 And Windows Server 2012
description: Installing Sitefinity With Iis 8 Sql Server 2012 And Windows Server 2012
published: 2015-04-02
image: images/posts/installing_sitefinity_with_iis_8_sql_server_2012_and_windows_server_2012.webp
imageAlt: Installing Sitefinity With Iis 8 Sql Server 2012 And Windows Server 2012
category: Default
tags: [apppool, cms, configuration, Database, geekery, sitefinity, sqlserver, telerik]
---

I’m working on a new project that uses the [Sitefinity CMS](http://sitefinity.com) by Telerik. So far I’ve been impressed with the architecture and features it provides. The documentation is robust and there is good support. I did run into a couple of snags installing a new Sitefinity instance on an Azure VM that is running Windows Server 2012, IIS 8, and SQL Server Express 2012. Here are a few tweaks you’ll need to make to get an install working.

<!--more-->

![](../img_post/2015-04-02-installing-sitefinity-with-iis-8-sql-server-2012-and-windows-server-2012/2015-04-sitefinity_logo1.jpg)

If you specify a “SQL Server Express” install during the setup, it will use the file system and create a .MDB file in your App_Data folder, which we don’t want. We want to use the database itself.

After some digging, and tweaking, I found the following article that really outlines everything nicely:

<http://www.codeproject.com/Articles/674930/Configuring-IIS-ASP-NET-and-SQL-Server>

If you don’t want to read the entire thing, here are the highlighted points of the article below.

_Note_: First use the Sitefinity Project Manager app to install the files in the location of your choosing, but do not check the box at the end to open up the administration settings. With the files in place, you’ll want to do the things outlined below.

### Change the Application Pool identity to Network Service

With IIS 7.5 or so, the security was updated to create an individual AppPoolIdentity account for each website. Unfortunately we can’t link this identity up to a SQL Server login, which we ultimately want. Changing the identity for the application pool (in Advanced Settings) to “Network Service” will bypass these issues.

### Grant Full Control of the App_Data folder to the Network Service account

Since the site will be running under the Network Service user, we need to give them full control of the App_Data folder in order to upload files, add templates, etc. You can do this by opening the preferences for the App_Data folder in file explorer and adding the user in the security tab. Make sure to go back to the advanced options and apply the security to all child folders of the App_Data folder.

### Add a Network Service login in SQL Server and give it sysadmin privileges

Oddly enough you can’t add the Network Service user through the Management Studio interface, but you can do it in a standard query window with the following statement:

```CREATE LOGIN```

Once you’ve done this, you can use the Management Studio interface to grant the user the “sysadmin" role. After the initial database is created you can go back in and refine the security a bit more for your specific database.

### Finish Installation

Now that the settings are in place, you can launch the website and step through the process to complete the installation. You should be able to select “Microsoft SQL Server” (not express) as your database option, use “Windows Authentication” and simply provide the name of the server and database. This will work with a SQL Server Express install as well, simply use MACHINE NAME\\SQLEXPRESS as the server name and you should be set.

Sometimes the devil is in the details, and these small details took me the better part of a day and a half to finally piece together. Next time, it won’t be so crazy.
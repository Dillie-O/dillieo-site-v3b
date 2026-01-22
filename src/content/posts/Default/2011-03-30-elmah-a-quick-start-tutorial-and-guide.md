---
title: Elmah A Quick Start Tutorial And Guide
description: ElmahMain
published: 2011-03-30
image: images/posts/elmah_a_quick_start_tutorial_and_guide.webp
imageAlt: ElmahMain
category: Default
tags: [coding, configuration, elmah, logging-net, quickstart, tutorial]
---

## Synopsis

Elmah (Error Logging Modules and Handlers) provides an excellent way for you to get a basic logging mechanism into your web application in minutes. One of the beautiful things about Elmah is that it exists as it’s own module, so you can integrate it into an existing web application without having to do anything invasive to your existing code. Elmah gives you detailed information about each exception it logs, including a “snapshot” of the “yellow page of death” that was generated for further examination.

Application logging is a great way to debug and maintain your application for its entire lifecycle. While there are numerous logging frameworks out there these days, Elmah . This article will give you a basic overview of the library and how you can integrate it into your projects quickly and easily.

<!--more-->

## The Fundamentals

You can download Elmah from [their site](http://code.google.com/p/elmah/) in two forms, the binaries or the full source code. If you’re looking to simply use Elmah, simply download the binaries and you’ll be all set. Elmah allows you to log the exceptions into the following formats:

- Microsoft SQL Server
- Oracle (OracleErrorLog)
- SQLite (version 3) database file
- Microsoft Access (AccessErrorLog)
- VistaDB
- Loose XML files
- RAM (in-memory)
- SQL Server Compact Edition (arrives with version 1.2)
- MySQL (arrives with version 1.2)
- PostreSQL (arrives with version 1.2)

Elmah can be used with any version of the .Net Framework from 1.1 and above and will run under medium trust using version 2.0, which enables you to use Elmah on most hosted sites. This is a big help since a some logging frameworks require full trust in order to function properly.

## Configuring Your Logging Environment

For purposes of this article, we’re going to configure logging to use SQLite to log our exceptions. Using SQLite provides a nice database of our logs that we can access through third party tools if necessary, and helps keep the file size down, as opposed to using an XML file. In addition, not logging to SQL Server allows us to log database errors that otherwise might not get logged.

After downloading the Elmah binaries, copy the Elmah.dll and System.Data.SQLite.dll files into your project directory. I typically create a “references” folder within my project to support my third party libraries. Open your project and add the references to these two DLLs in your project. This is typically done by right clicking on the “References” folder in your project, selecting “Add Reference” and browsing to the files.

Once the libraries have been referenced in your project, you need to update your web.config file to enable and configure Elmah. The first step is to add a configuration section group at the top of your web.config file:

_Note: In all of the web.config snippets below, if there already exists the proper tag for a given element (configSections, httpModules, etc.) don’t add them a second time, simply add your tag into the existing section._

Since we are using SQLite, we need to add a connection string entry as well. I’m creating a database file in my output folder called ErrorLog.db:

The next step is to add the HTTP handler and module for Elmah:

&lt;system.web> &lt;httpHandlers> &lt;add verb="POST,GET,HEAD" path="elmah.axd" type="Elmah.ErrorLogPageFactory, Elmah" /> &lt;/httpHandlers>

&lt;httpModules> &lt;add name="ErrorLog" type="Elmah.ErrorLogModule, Elmah" /> &lt;/httpModules> &lt;/system.web>

We also need to add a web server module and handler for Elmah:

&lt;system.webServer> &lt;modules> &lt;add name="Elmah.ErrorLog" type="Elmah.ErrorLogModule, Elmah" preCondition="managedHandler" /> &lt;/modules>

&lt;handlers> &lt;add name="Elmah" path="elmah.axd" verb="POST,GET,HEAD" type="Elmah.ErrorLogPageFactory, Elmah" preCondition="integratedMode" /> &lt;/handlers> &lt;/system.webServer>

Finally, we add our Elmah entry, with the proper configuration to specify security and the logging module:

_Note: In the configuration above, I’ve set the remote access property to 1, allowing me to view the error log without having to log onto the server itself. This is quite handy in a hosted situation. If you do not need to enable remote access, set the value to 0._

That’s it! Compile your app again, deploy the files, and you’re ready to go!

## Logging Your Application

Since Elmah is setup to grab any exception and log it, we simply need to generate one for testing. I created a basic web application, configured it as above, and added a button with a simple piece of code.

Private Sub btnException_Click(ByVal sender As Object, ByVal e As System.EventArgs) \_ Handles btnException.Click

Throw New Exception("I'm evil!!!!")

End Sub

## Viewing The Log

In order to view the log, you simply need to access the “elmah.axd” file that resides in the root of your application. You’ll be greeted by a page similar to this:

![ElmahMain](@assets/images/posts/2011-03-elmahmain_thumb.png)

You can see how the basic details of the exceptions are displayed. Selecting the “Details” link displays a full dump of the exception in question:

![ElmahDetail](@assets/images/posts/2011-03-elmahdetail1.png)

From here you should have nearly everything you need to debug an issue with your site. Elmah also provides an RSS feed of recent exceptions and a way of downloading the entire log into a CSV file, if you need to work with it in other ways.

## Final Thoughts

I’m really impressed with how easy Elmah is to get running and how detailed the error logs it produces. I’m currently using it as part of a web application template we use within our organization to help get our LOB apps up and running fast, but still be able to track bugs as they occur. While Elmah doesn’t allow you to configure levels of logging (such as log4net) it does provide great ways to filter your exception logs and even e-mail the exceptions to you. I highly recommend it.
---
title: Log4Net A Quick Start Tutorial And Guide With Mvc And Sqlite
description: Log4Net A Quick Start Tutorial And Guide With Mvc And Sqlite
published: 2012-11-29
image: images/posts/log4net_a_quick_start_tutorial_and_guide_with_mvc_and_sqlite.webp
imageAlt: Log4Net A Quick Start Tutorial And Guide With Mvc And Sqlite
category: Default
tags: [net, coding, configuration, log4net, logging, nuget, tutorial]
---

Note: A lot of this is duplicated from my [original post](/log4net-a-quick-start-guide), but I felt it helpful to add a new post with new technology!

## Synopsis

[Log4Net](http://logging.apache.org/log4j "Log4j"), a port of the well known Log4J being used in Java environments, provides a feature rich, highly configurable, and simple to configure logging mechanism that you can have up and running in no time. This article will give you a basic overview of the library and how you can integrate it into your projects quickly and easily.

<!--more-->

Application logging is a great way to debug and maintain your application for its entire lifecycle. Unfortunately, setting up an efficient logging mechanism can be time consuming and often not feasible with short deadline projects. Those days are no more. Log4Net, a port of the well known Log4J being used in Java environments, provides a feature rich, highly configurable, and simple to configure logging mechanism that you can have up and running in no time. This article will give you a basic overview of the library and how you can integrate it into your projects quickly and easily.

## The Fundamentals

Log4Net contains 5 levels of debugging and two "Catch All / Revoke All" levels:

- ALL
- [DEBUG](http://en.wikipedia.org/wiki/Debugging "Debugging")
- INFO
- WARN
- ERROR
- FATAL
- OFF

These levels function heirarchically, so that a debug level set to "WARN" will log any WARN, ERROR, or FATAL log events. The debug level is configured through a [XML](http://en.wikipedia.org/wiki/XML "XML") [configuration file](http://en.wikipedia.org/wiki/Configuration_file "Configuration file"). That way you can change the debug level on the fly as needed without having to recompile the application.

Log4Net has three types of objects that make the application work:

**Loggers: **These serve as the "receivers" of events from the class itself and do any processing necessary, such as determining the log level, retrieving the necessary code/exception data, and passing it on to the appender. **Appenders: **These serve to save the logging information to the medium specified. There are a wide variety of appenders available including File, [SMTP](http://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol "Simple Mail Transfer Protocol"), Database, [Windows Event Log](http://en.wikipedia.org/wiki/Event_Viewer "Event Viewer"), and more. **Layouts: **Layouts are the format in which the appenders write their data. Some layouts, such as XML Layouts, have a fixed format. Others, such as Pattern Layouts, allow you to customize which log information to write to the appender. Once you have defined a logger, appender, and layout in your configuration file, you're all set to log within your application!

## Setting Up and Configuring Your [Logging](http://en.wikipedia.org/wiki/Logging "Logging") Environment

The beauty of Log4Net is that you can mix and match loggers, appenders, and layouts however you like. For example, you could have one logger tracking all FATAL events using a SMTP appender to send an e-mail while also having a second logger tracking all WARN and higher events to a file appender for general purposes. You could also have a single logger with multiple file appenders, each using a different pattern layout. One layout would be optimized for human consumption and the other for another computer to read and process.

Also remember that loggers are attached to a given class. With that in mind you can have one logger attached to the root class of your application doing general logging and a second logger attached to your critical business operations class logging at the intensive debug level. Since all of these loggers can be turned on or off through the configuration file, you can turn on the high level debugging only when necessary and have it zero in only on the mission critical information.

For this article, we're going to use the [SQLite database](http://sqlite.org) to store our logs. The advantage to this is that we can sort and search our log entries quickly and easily with any SQLite management tool. The database is also stored locally, so we don't run into any problems if the network connection between our web server and database server goes down. We can actually log this! We'll go ahead and log everything from the WARN level and above.

The first step is to install Log4Net. Fortunately, the [Nuget Package Manager](http://nuget.org) makes this really simple. Open up the package manager console and enter the following command:

```install-package log4net```

We also need to install the SQLite database framework. Nuget makes things easy again. Enter the following command:

```install-package System.Data.SQLite```

Once this is complete, we need to create a configuration file for Log4Net. I prefer to use a seperate file so that multiple appenders/layouts don't cause the main configuration file to get too complex to read. It also allows us to [modify our configuration on the fly](/changing-log4net-configurations-dynamically) without triggering a full application pool reset. We'll start with a basic FileAppender setup which will write log events to a local [text file](http://en.wikipedia.org/wiki/Text_file "Text file"). In addition, the logger will only write events that are at the WARN level or above.

\[gist]4170237

I have added two important flags to this configuration. The "appendToFile" flag will make the log continue to append to the file instead of overwriting it. The "lockingModel" flag will put a minimal lock on the file, that way I can have multiple processes log to the same file if necessary. I can also view this file in other application, such as [Notepad++](http://notepad-plus-plus.org/) without disrupting the logging process.

In addition, we need to specify that we want to have Log4Net look for our configuration file for initialization/setup purposes. With MVC, I've had troubles getting log4net to initialize when starting things up in the AssemblyInfo.cs file, so I add the following code the Application_Start method in your Global.asax file:

\[gist]4170313

That's all there is to it. Now you are ready to start logging your application.

## Logging Your Application

The first step to log an event is to make sure a logger has been defined for the class. In my case, I've created a new controller called "SampleController" and at the top of the class declaration, I've added a new logger instance:

```cs
public class SampleController : Controller 
{ 
    private static readonly ILog log = LogManager.GetLogger(typeof(SampleController).FullName);

// // GET: /Sample/ public ActionResult Index() { } 
}
```

At this point, you can log events according to your own desires. I typically like to use the ERROR log level to log any exceptions that are caught by the application. I will use the INFO log level as a "first level" debugging scheme to show whenever I enter or exit a method. From there I use the DEBUG log level to trace detailed information. The FATAL log level is used for any exceptions that I have failed to catch in my web based applications. All of this logging then makes a class look something like this...

```cs
public ActionResult GenerateDebugLog() 
{ 
    log.Info("Starting GenerateDebugLog method..."); 
    log.Debug("No input parameters for method.");

    log.Info("Starting loop."); 
    for (var i = 0; i &lt;= 10; i++ ) 
    { 
        log.Debug("Current value: " + i); 
    } 
    
    log.Info("Loop complete.");

    log.Info("GenerateDebugLog method complete.");

    try 
    { 
        throw new Exception("Evil exception test!"); 
    } 
    catch(Exception ex) 
    { 
        log.Error("Bad Juice!", ex); 
    }

    ViewBag.Message = "Sample complete."; return View(); 
}
```

Notice that the log.Error method has a second parameter specified, which appens to be the exception thrown. All of the logging methods have an overloaded signature that will accept an exception as an argument. The details of the exception is parsed and added to the log accordingly.

One thing I want to point out in this example is that the logging may seem excessive for such a trivial method. The thing to realize is that since logging level is [dynamically configurable](/changing-log4net-configurations-dynamically), we can slide the logging level depending on our needs. By default, the logging mode is set to WARN, which means that only the exception message will be logged. This works perfect for the day to day operations of the application, and if an exception occurs, most likely we will have all the information we need to solve the issue. But if we needed to go deeper into the application to debug an issue, all you have to do is update the logging level to INFO or DEBUG to get the appropriate data you need. When debugging is complete, change the logging level back to WARN and all the details are no longer logged. This scenario works out great for web environments where you don't have direct access to debug the source code. In addition, having the log4net configuration in a seperate file allows you to change the logging level without triggering a refresh of IIS, which would occur if the configuration was stored in the Web.config file.

## Logging to SQLite

The final step is to setup an appender for SQLite. Unfortunately there is no "SQLite" appender out of the box. However, since the System.Data.SQLite library does leverage ADO.Net, we can use the AdoNetAppender and configure it accordingly.

The first step is to create our log database. Start up your SQLite Manager of choice (I really like [SQLite Expert](http://www.sqliteexpert.com/)) and run the following command to create the table you need:

\[gist]4170581

After that, we update our log4net.config file to add our SQLite appender:

\[gist]4170626

Without going into too many details here, you'll notice that we define what our INSERT statement is, as well as the layout for each column to be expected in the database. The most important item to note is the connection string value itself. Since our connection string needs to abide by ADO.Net rules, we can't specify a relative path to our log file, we either have to hard code the path, or use some of the .Net defaults. For the sake of portability, I've gone ahead and specified that our log file will reside in the |DataDirectory| folder, which maps to the App_Data folder within the root of the application folder.

If you want to circumvent this, you can modify where the DataDirectory parameter maps to through in the Application_Start method.

Make sure to add this BEFORE you do your log4net initialization or SQLite will continue to look for your database in the App_Data folder (and drive you insane like it did me one day. 8^D)

## ASP.NET: One Tricky Detail

One thing to take note of when logging in your ASP.NET applications is that the log4net will attempt to log using whatever user account is assigned to the ASP.NET worker process itself. Depending on your server and network configuration, this can cause problems with the log being able to write entires. Since log4net does not throw exceptions when it cannot perform its duties (you need to turn on debug mode for that), you will have an empty log and no means of tracking things.

There are a couple of workarounds to this. The first is to give your log file or folder containing your log file write priviliges by everybody. The second is to elevate the privileges of the user account running the ASP.NET process. Both of these solutions can open up extra security holes that may not be desirable.

The solution that has worked best in my Intranet environment is to turn on identity impersonation in the web.config file. Granted we have this solution in place anyway to facilitate Active Directory logins, but doing this allows the log4net to write entries as the user currently logged in to the application. In addition, the log file itself has granted write priviliges to Authenticated Users, so this prevents unknown users from potentially tampering with things.

## Viewing the Log

Once you have your log entries generated, you need a means of viewing the log. This will depend on what type of appender and layout pattern you are using. Notepad can be used to view most of the FileAppender logs. You could even setup the Pattern layout to meet a standard you could easily parse into another application, such as a CSV format for Excel. The example above used the SQLite layout because it works great with the [SQLite Expert](http://www.sqliteexpert.com/) program I mentioned earlier. I'm also working on updating [Hacksaw](http://hacksaw.codeplex.com) to support SQLite based logs (a personal creation).

In addition, you could use the XmlLayoutSchemaLog4j layout pattern. This pattern is also viewable within the Hacksaw tool, but Apache has also provided a great tool for viewing log entries that are in this format. The tool is called [Chainsaw](http://logging.apache.org/chainsaw/) and it can be downloaded or run as a Java Web Start application. The application is easy to use and can also be used as an UDP Receiver to recieve log events that the UDP appender sends out in real time.

## Final Thoughts

I hope this article has you excited about Log4Net. It provides a free and robust method of logging anything you desire within you applications. It is easy to configure the log in any way you desire and extend it to meet your custom logging needs. Enjoy!
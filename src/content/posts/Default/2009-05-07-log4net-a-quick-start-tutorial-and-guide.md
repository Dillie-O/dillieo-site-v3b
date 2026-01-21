---
title: Log4Net A Quick Start Tutorial And Guide
description: Log4Net A Quick Start Tutorial And Guide
published: 2009-05-07
image: images/posts/log4net_a_quick_start_tutorial_and_guide.webp
imageAlt: Log4Net A Quick Start Tutorial And Guide
category: Default
tags: [net, coding, configuration, log4net, logging, quickstart, tutorial]
---

## Synopsis

Log4Net, a port of the well known Log4J being used in Java environments, provides a feature rich, highly configurable, and simple to configure logging mechanism that you can have up and running in no time. This article will give you a basic overview of the library and how you can integrate it into your projects quickly and easily.

Application logging is a great way to debug and maintain your application for its entire lifecycle. Unfortunately, setting up an efficient logging mechanism can be time consuming and often not feasible with short deadline projects. Those days are no more. Log4Net, a port of the well known Log4J being used in Java environments, provides a feature rich, highly configurable, and simple to configure logging mechanism that you can have up and running in no time. This article will give you a basic overview of the library and how you can integrate it into your projects quickly and easily.

_(Updated 4/30/2009 - Found additional key to add if embedding log4net configuration within web.config file. This allows it to work in medium trust environments. Thanks [Phil Haack!](http://haacked.com/archive/2006/07/09/ConfiguringLog4NetWithASP.NET2.0InMediumTrust.aspx))_

## The Fundamentals

You can download Log4Net from the [Apache Software Foundation website](http://logging.apache.org/log4net). The download has source code, documentation, tutorials, examples, and a precompiled binary so that you can immediately add it to your application.

Log4Net contains 5 levels of debugging and two "Catch All / Revoke All" levels:

- ALL
- DEBUG
- INFO
- WARN
- ERROR
- FATAL
- OFF

These levels function heirarchically, so that a debug level set to "WARN" will log any WARN, ERROR, or FATAL log events. The debug level is configured through a XML configuration file. That way you can change the debug level on the fly as needed without having to recompile the application.

Log4Net has three types of objects that make the application work:

**Loggers: **These serve as the "receivers" of events from the class itself and do any processing necessary, such as determining the log level, retrieving the necessary code/exception data, and passing it on to the appender. **Appenders: **These serve to save the logging information to the medium specified. There are a wide variety of appenders available including File, SMTP, Database, Windows Event Log, and more. **Layouts: **Layouts are the format in which the appenders write their data. Some layouts, such as XML Layouts, have a fixed format. Others, such as Pattern Layouts, allow you to customize which log information to write to the appender. Once you have defined a logger, appender, and layout in your configuration file, you're all set to log within your application!

## Configuring Your Logging Environment

The beauty of Log4Net is that you can mix and match loggers, appenders, and layouts however you like. For example, you could have one logger tracking all FATAL events using a SMTP appender to send an e-mail while also having a second logger tracking all WARN and higher events to a file appender for general purposes. You could also have a single logger with multiple file appenders, each using a different pattern layout. One layout would be optimized for human consumption and the other for another computer to read and process.

Also remember that loggers are attached to a given class. With that in mind you can have one logger attached to the root class of your application doing general logging and a second logger attached to your critical business operations class logging at the intensive debug level. Since all of these loggers can be turned on or off through the configuration file, you can turn on the high level debugging only when necessary and have it zero in only on the mission critical information.

For this article, we're going to keep things simple. We are going to use the XML logging pattern that is compatible with the log4j event DTD. The advantage of this is that the log files are immediately compatible with the Chainsaw log viewer. I'll explain that later. We'll go ahead and use a file appender and log everything from the WARN level and above.

To make this happen, we need to create a configuration file for Log4Net. I prefer to use a seperate file so that multiple appenders/layouts don't cause the main configuration file to get too complex to read. Create your AssemblyName.dll.log4net like this:

```xml
<?xml version="1.0" encoding="utf-8"?> <log4net debug="false"> <appender name="XmlSchemaFileAppender" type="log4net.Appender.FileAppender"> <file value="AppLog.xml" /> <appendToFile value="true" /> <lockingModel type="log4net.Appender.FileAppender+MinimalLock" /> <layout type="log4net.Layout.XmlLayout" /> </appender>

<root> <level value="WARN" /> <appender-ref ref="XmlSchemaFileAppender" /> </root> </log4net>
```

Note: Your file name needs to match the assembly name that the application is compiled into for this particular configuration.

If you want to have your log4net configuration in your web.config / app.config file, you need to do two things. The first is to add the following section inside <configSections&amp;gt; tag in your file:

Then add everything listed above just before the closing </configuration> tag in your file except for the first line that reads "<?xml version..."

I have added two important flags to this configuration. The "appendToFile" flag will make the log continue to append to the file instead of overwriting it. The "lockingModel" flag will put a minimal lock on the file, that way I can have multiple processes log to the same file if necessary. I can also view this file in other application, such as Hacksaw, Chainsaw, or even Notepad without disrupting the logging process.

In addition, we need to specify that we want to have Log4Net look for a .log4net file for initialization/configuration purposes. This code only needs to be added once into your application and I typically do it at the beginning of my Global.asax.vb / Main.vb file:

Note: If you are are running a Web Site or Web Application that does not compile your codebehind files into a .dll file, or you have your log4net configuration set in your web.config/app.config file, you will need to put your configuration in your web.config file and a Global.asax.vb file will not be available to you. Instead, add the following code to your Application_Start method in your Global.asax file:

That's all there is to it. Now you are ready to start logging your application.

## Logging Your Application

The first step to log an event is to make sure a logger has been defined for the class. To instantiate a new logger, simply declare as a variable for the entire class: Public Class LogSample

At this point, you can log events according to your own desires. I typically like to use the ERROR log level to log any exceptions that are caught by the application. I will use the INFO log level as a "first level" debugging scheme to show whenever I enter or exit a method. From there I use the DEBUG log level to trace detailed information. The FATAL log level is used for any exceptions that I have failed to catch in my web based applications. All of this logging then makes a class look something like this...

```
Public Class LogSample

Private Shared ReadOnly Log As log4net.ILog = log4net.LogManager.GetLogger(GetType(LogSample))

Public Function AddNumbers(ByVal Number1 As Integer, ByVal Number2 As Integer) As Integer

Dim intResults As Integer

Log.Info(Starting AddNumbers Method...) Log.Debug(Number1 Specified: &amp;amp;amp; Number1) Log.Debug(Number2 Specified: &amp;amp;amp; Number2)

intResults = Number1 + Number2

Try

intResults = Number1 + Number2

Catch ex As Exception

Log.Error(Error Adding Numbers., ex)

End Try

Log.Info(AddNumbers Method Complete.)

Return intResults

End Function

End Class
```

Notice that the Log.Error method has a second parameter specified, which appens to be the exception thrown. All of the logging methods have an overloaded signature that will accept an exception as an argument. The details of the exception is parsed and added to the log accordingly.

One thing I want to point out in this example is that the logging may seem excessive for such a trivial method. The thing to realize is that since logging level is dynamically configurable, we can slide the logging level depending on our needs. By default, the logging mode is set to WARN, which means that only the exception message will be logged. This works perfect for the day to day operations of the application, and if an exception occurs, most likely we will have all the information we need to solve the issue. But if we needed to go deeper into the application to debug an issue, all you have to do is update the logging level to INFO or DEBUG to get the appropriate data you need. When debugging is complete, change the logging level back to WARN and all the details are no longer logged. This scenario works out great for web environments where you don't have direct access to debug the source code. In addition, having the log4net configuration in a seperate file allows you to change the logging level without triggering a refresh of IIS, which would occur if the configuration was stored in the Web.config file.

## Added Bonus for ASP.NET Applications

Sometimes the file appender isn't behaving properly in an Intranet environment, or I want to do some detailed debugging of my web application by using the ASP.NET tracer. The beautiful thing about log4net is that there is a built in appender for the ASP.NET tracer and you only need to add a few lines of code to get it running. Building off of our configuration above, simply add a second appender below the XML File Schema Appender with the following information:

Then add a reference to this appender into your root section just below the XML File Schema Appender reference:

Now when you turn on tracing through your web.config file, you'll see all of your logging details merged in with the trace details.

## ASP.NET: One Tricky Detail

One thing to take note of when logging in your ASP.NET applications is that the log4net will attempt to log using whatever user account is assigned to the ASP.NET worker process itself. Depending on your server and network configuration, this can cause problems with the log being able to write entires. Since log4net does not throw exceptions when it cannot perform its duties (you need to turn on debug mode for that), you will have an empty log and no means of tracking things.

There are a couple of workarounds to this. The first is to give your log file or folder containing your log file write priviliges by everybody. The second is to elevate the privileges of the user account running the ASP.NET process. Both of these solutions can open up extra security holes that may not be desirable.

The solution that has worked best in my Intranet environment is to turn on identity impersonation in the web.config file. Granted we have this solution in place anyway to facilitate Active Directory logins, but doing this allows the log4net to write entries as the user currently logged in to the application. In addition, the log file itself has granted write priviliges to Authenticated Users, so this prevents unknown users from potentially tampering with things.

## Viewing the Log

Once you have your log entries generated, you need a means of viewing the log. This will depend on what type of appender and layout pattern you are using. Notepad can be used to view most of the FileAppender logs. You could even setup the Pattern layout to meet a standard you could easily parse into another applcation, such as a CSV format for Excel. The example above used the XmlLayoutSchema layout because it works great with the [Hacksaw](http://hacksaw.codeplex.com/) log viewing tool (a personal creation).

In addition, you could use the XmlLayoutSchemaLog4j layout pattern. This pattern is also viewable within the Hacksaw tool, but Apache has also provided a great tool for viewing log entries that are in this format. The tool is called Chainsaw and it can be downloaded or run as a Java Web Start application. The application is easy to use and can also be used as an UDP Receiver to recieve log events that the UDP appender sends out in real time.

## Final Thoughts

I hope this article has you excited about Log4Net. It provides a free and robust method of logging anything you desire within you applications. It is easy to configure the log in any way you desire and extend it to meet your custom logging needs. Enjoy!
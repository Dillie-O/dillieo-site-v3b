---
title: Changing Log4Net Configurations Dynamically
description: Changing Log4Net Configurations Dynamically
published: 2010-07-15
category: Development
tags: [net, coding, configuration, dynamic, log4net]
---

One issue I've run up against over my time using [log4net](http://logging.apache.org/log4net/index.html) is being able to change the logging levels dynamically. When I build an application, I put in both top level Error/Fatal log messages, but I also put Debug/Info level messages when issues arise that I need to handle (check out my [Quick-Start Guide](/log4net-a-quick-start-guide) if you're curious on how to set this all up). By default I have the logging level set to WARN, but I want to be able to quickly see DEBUG level messages when things aren't working properly.

Changing the configuration on the fly works fine in a development environment, but in a production environment, I don't have access to the configuration file to make the proper modification due to the security restrictions we have in our environment. In addition, if I'm working on an application through a web host, it would be nice to change the configuration without having to FTP into the server.

Thanks to the LINQ to XML features announced in the .Net 3.5, being able to change the configuration on the fly became really easy. To note, I'm sure there were ways of dynamically updating the configuration pre-3.5, but parsing XML documents and searching/updating them can be tricky and time intensive at times. Not so anymore.

Without going into too much detail, the solution comes through using the XDocument object and the . For instance, if I wanted to get the logging level being used, and I know the proper XML path to the node, I can use the following code:

Similarly, each the entire document can be exposed as an enumerable XElement object, so you can iterate through a collection of appenders, looking through the proper filename value through the following code:

XDocument ContentDoc; IEnumerable&amp;lt;XElement&amp;gt; DocPoints;

ContentDoc = XDocument.Parse(File.ReadAllText(LogPath)); DocPoints = ContentDoc.Descendants(&amp;quot;log4net&amp;quot;).Descendants(&amp;quot;appender&amp;quot;); foreach (XElement Item in DocPoints) { if (Item.Attribute(&amp;quot;name&amp;quot;).Value == &amp;quot;XmlSchemaFileAppender&amp;quot;) { Results = Item.Ancestors().Descendants(&amp;quot;file&amp;quot;).Attributes().First().Value; } }

From here you can see that accessing and modifying values becomes quick and easy to do. The XDocument object also allows you to easily add new nodes to an existing document. You could easily add an ASP.Net appender, or any other appender to the system on the fly, or enable/disable appenders on the fly as well.

But for today, we're going to keep things simple and only worry about updating the logging level. This way you can easily make your application dump out diagnostic data in the production environment and then revert back to its simple error logging after you have the necessary data.

Most of the code is given to you above. The final step in the process is to update the log level value and then write it back out to an XML file. The XDocument object provides for this as well:

It really is that simple. The trickiest part of the whole process is learning how to navigate through the XML document with the proper use of the Descendants(), Ascendants(), and Elements() structure used within the object.

In an effort to share the love, I've written a really simple ASP.Net application that will show demonstrate all of this, and give you the complete code blocks to make this happen for you. There are two items to note when setting up your own configuration:

1. The configuration file needs to be in a separate \[Assembly].dll.log4net file. Modifying the web.config file on the fly will cause the application to restart its worker process, and eliminate the goals in mind. See my [Quick-Start Guide](/log4net-a-quick-start-guide) if you need details on setting it up.
2. You will need to make sure your ASP.Net application has proper write privileges to your configuration file, otherwise the process will file when it attempts to write to the file.
3. The log entries generated are using the built in lo4net XML format, so you'll either need to read the XML or maybe take a peek at an old and ugly (but still usable) [log4net viewer app](http://hacksaw.codeplex.com) I wrote 8^D.

The apps have been tested and compiled to use the Visual Studio Development Server, so you should be able to unzip, fire up the solution, and run the project.

If you run into some additional clever uses with XDocument and log4net configuration, by all means share them here. Hopefully I can get a really robust configuration tool developed to extend things even further.

Enjoy!

One issue I've run up against over my time using [log4net](http://logging.apache.org/log4net/index.html) is being able to change the logging levels dynamically. When I build an application, I put in both top level Error/Fatal log messages, but I also put Debug/Info level messages when issues arise that I need to handle (check out my [Quick-Start Guide](/log4net-a-quick-start-guide) if you're curious on how to set this all up). By default I have the logging level set to WARN, but I want to be able to quickly see DEBUG level messages when things aren't working properly.

Changing the configuration on the fly works fine in a development environment, but in a production environment, I don't have access to the configuration file to make the proper modification due to the security restrictions we have in our environment. In addition, if I'm working on an application through a web host, it would be nice to change the configuration without having to FTP into the server.

Thanks to the LINQ to XML features announced in the .Net 3.5, being able to change the configuration on the fly became really easy. To note, I'm sure there were ways of dynamically updating the configuration pre-3.5, but parsing XML documents and searching/updating them can be tricky and time intensive at times. Not so anymore.

Without going into too much detail, the solution comes through using the XDocument object and the . For instance, if I wanted to get the logging level being used, and I know the proper XML path to the node, I can use the following code:

Similarly, each the entire document can be exposed as an enumerable XElement object, so you can iterate through a collection of appenders, looking through the proper filename value through the following code:

XDocument ContentDoc; IEnumerable&amp;lt;XElement&amp;gt; DocPoints;

ContentDoc = XDocument.Parse(File.ReadAllText(LogPath)); DocPoints = ContentDoc.Descendants(&amp;quot;log4net&amp;quot;).Descendants(&amp;quot;appender&amp;quot;); foreach (XElement Item in DocPoints) { if (Item.Attribute(&amp;quot;name&amp;quot;).Value == &amp;quot;XmlSchemaFileAppender&amp;quot;) { Results = Item.Ancestors().Descendants(&amp;quot;file&amp;quot;).Attributes().First().Value; } }

From here you can see that accessing and modifying values becomes quick and easy to do. The XDocument object also allows you to easily add new nodes to an existing document. You could easily add an ASP.Net appender, or any other appender to the system on the fly, or enable/disable appenders on the fly as well.

But for today, we're going to keep things simple and only worry about updating the logging level. This way you can easily make your application dump out diagnostic data in the production environment and then revert back to its simple error logging after you have the necessary data.

Most of the code is given to you above. The final step in the process is to update the log level value and then write it back out to an XML file. The XDocument object provides for this as well:

It really is that simple. The trickiest part of the whole process is learning how to navigate through the XML document with the proper use of the Descendants(), Ascendants(), and Elements() structure used within the object.

In an effort to share the love, I've written a really simple ASP.Net application that will show demonstrate all of this, and give you the complete code blocks to make this happen for you. There are two items to note when setting up your own configuration:

1. The configuration file needs to be in a separate \[Assembly].dll.log4net file. Modifying the web.config file on the fly will cause the application to restart its worker process, and eliminate the goals in mind. See my [Quick-Start Guide](/log4net-a-quick-start-guide) if you need details on setting it up.
2. You will need to make sure your ASP.Net application has proper write privileges to your configuration file, otherwise the process will file when it attempts to write to the file.
3. The log entries generated are using the built in lo4net XML format, so you'll either need to read the XML or maybe take a peek at an old and ugly (but still usable) [log4net viewer app](http://hacksaw.codeplex.com) I wrote 8^D.

The apps have been tested and compiled to use the Visual Studio Development Server, so you should be able to unzip, fire up the solution, and run the project.

If you run into some additional clever uses with XDocument and log4net configuration, by all means share them here. Hopefully I can get a really robust configuration tool developed to extend things even further.

Enjoy!
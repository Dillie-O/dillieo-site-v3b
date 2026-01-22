---
title: Quick Tip Removing Old Files In Azure Containers
description: Quick Tip Removing Old Files In Azure Containers
published: 2014-07-02
category: Default
tags: [azure, blob, coding, container, maintenance, storage]
---

I’ve been doing a lot of coding with Windows Azure as the hosted platform lately. I’ve really been impressed by the power and flexibility that is avaialable. One thing I recently did was create a tool that imports data from a mainframe system into our database using the new WebJobs feature available. This leverages the Azure storage containers to save the data files and logs for easy retrieval and prevents them from being removed.

While Azure storage does provide automatic cleaning of it’s internal logs, it doesn’t provide a way to automatically clean out old files in your containers. Our containers were filling up pretty fast and the policy was to only retain records for 30 days. Fortunately, you can create a simple script (and save it as a WebJob) to keep your containers nice and tidy.

<!--more-->

To remove your old files in a container, we need to make a simple query against the container against the last modified date property. I keep a “date threshold” configurable parameter so that I can adjust this value as needed without having to recompile. Make sure you use NuGet to import the WindowsAzure.Storage libraries and place the following code into your app.

I created a simple console app with this script. Saved it as a WebJob, and uploaded it to our Azure instance to run daily. Having the console write statements generates information to the output log that I can use for debugging purposes.

That’s all there is to it! Enjoy!

###### […proudly published using DeskPM](http://desk.pm)
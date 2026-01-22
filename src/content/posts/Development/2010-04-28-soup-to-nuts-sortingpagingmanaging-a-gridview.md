---
title: Soup To Nuts Sortingpagingmanaging A Gridview
description: Soup To Nuts Sortingpagingmanaging A Gridview
published: 2010-04-28
category: Development
tags: [aspnet, coding, gridview, paging, sorting]
---

As much as I love the latest and greatest stuff coming out of the .Net camp (still catching up on my MVC2 video tutorials) I work in a pretty standard “Line of Business” (LOB) environment. We use ASP.Net Webforms and I doubt things will change anytime soon.

One of the most used items when developing our applications is the GridView. Its a great server control. There are a lot of features built into it that make for a great control to manage data with. You can sort, page, update, delete, and even perform custom commands within it.

That said, I’ve never found a really nice comprehensive article/source to cover all of these features available, though the MSDN documentation helped a bit. Since I had just finished a project in which I was doing all of these features with the GridView, I thought now would be the perfect time to put together a “Soup to Nuts” solution that had all of these features. It would be packed up into a solution that you could actually run and interact with, instead of just looking at snippets and imagining how they came together.

So I humbly present to you my S2N (Soup to Nuts) GridView. Simply download the appropriate file, unzip it to the location of your choice, and open up the solution file in Visual Studio. The solutions have already been compiled and tested. They have also been configured to use the built-in web server with Visual Studio, so you don’t need to worry about having IIS installed on your machine if it isn’t already there. I’ve packed the following “features” into the solution and provided a little bit of documentation within the code outlining:

- Sorting records in the GridView.
- Paging records in the GridView.
- Inline Edit & Delete of records in the GridView.
- Using the footer of the GridView to add new records (a great space saver).
- (Bonus) Using an XML/XSD file to function as a simple database ([based on my article](/using-xsds-for-quick-datatables-in-net)).

To some degree there is a lot to be said about the various features of the GridView, and maybe I’ll do some individual posts about the various features found within the samples.

A couple of disclaimers to note:

The data isn’t that robustly structured. You can have multiple folks with the same name (different departments). In addition, the department should have been a separate table, but hey, this is a demo. 8^D

You’ll notice on the .aspx page that there are no databinding &lt;%= %> type elements within the template columns. I’ve always had a preference to do my custom column data binding through the RowDataBound event. I find this a bit cleaner to manage and gives you some extra options to work with. I guess I’ll have to write up an article on that at a later date. 8^D

If you’re looking for some extra magic to do with a GridView, especially with AJAX, I highly recommend [Matt Berseth’s](http://mattberseth.com/blog/gridview/) blog. He hasn’t done any updates in about a year now, but there are a lot of great articles to read through there.

Hopefully these code samples will give you an good overview of the GridView if you’re just getting started with it. If you’re a “veteran” of the control, hopefully these code samples will make for a nice template to use when rolling out a new GridView in your application.

As always, all comments/suggestions are greatly appreciated.

As much as I love the latest and greatest stuff coming out of the .Net camp (still catching up on my MVC2 video tutorials) I work in a pretty standard “Line of Business” (LOB) environment. We use ASP.Net Webforms and I doubt things will change anytime soon.

One of the most used items when developing our applications is the GridView. Its a great server control. There are a lot of features built into it that make for a great control to manage data with. You can sort, page, update, delete, and even perform custom commands within it.

That said, I’ve never found a really nice comprehensive article/source to cover all of these features available, though the MSDN documentation helped a bit. Since I had just finished a project in which I was doing all of these features with the GridView, I thought now would be the perfect time to put together a “Soup to Nuts” solution that had all of these features. It would be packed up into a solution that you could actually run and interact with, instead of just looking at snippets and imagining how they came together.

So I humbly present to you my S2N (Soup to Nuts) GridView. Simply download the appropriate file, unzip it to the location of your choice, and open up the solution file in Visual Studio. The solutions have already been compiled and tested. They have also been configured to use the built-in web server with Visual Studio, so you don’t need to worry about having IIS installed on your machine if it isn’t already there. I’ve packed the following “features” into the solution and provided a little bit of documentation within the code outlining:

- Sorting records in the GridView.
- Paging records in the GridView.
- Inline Edit & Delete of records in the GridView.
- Using the footer of the GridView to add new records (a great space saver).
- (Bonus) Using an XML/XSD file to function as a simple database ([based on my article](/using-xsds-for-quick-datatables-in-net)).

To some degree there is a lot to be said about the various features of the GridView, and maybe I’ll do some individual posts about the various features found within the samples.

A couple of disclaimers to note:

The data isn’t that robustly structured. You can have multiple folks with the same name (different departments). In addition, the department should have been a separate table, but hey, this is a demo. 8^D

You’ll notice on the .aspx page that there are no databinding &lt;%= %> type elements within the template columns. I’ve always had a preference to do my custom column data binding through the RowDataBound event. I find this a bit cleaner to manage and gives you some extra options to work with. I guess I’ll have to write up an article on that at a later date. 8^D

If you’re looking for some extra magic to do with a GridView, especially with AJAX, I highly recommend [Matt Berseth’s](http://mattberseth.com/blog/gridview/) blog. He hasn’t done any updates in about a year now, but there are a lot of great articles to read through there.

Hopefully these code samples will give you an good overview of the GridView if you’re just getting started with it. If you’re a “veteran” of the control, hopefully these code samples will make for a nice template to use when rolling out a new GridView in your application.

As always, all comments/suggestions are greatly appreciated.
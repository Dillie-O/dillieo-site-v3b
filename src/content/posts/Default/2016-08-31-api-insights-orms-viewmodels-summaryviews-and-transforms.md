---
title: Api Insights Orms Viewmodels Summaryviews And Transforms
description: Matrix Code Tunnel
published: 2016-08-31
image: images/posts/api_insights_orms_viewmodels_summaryviews_and_transforms.webp
imageAlt: Matrix Code Tunnel
category: Default
tags: [api, coding, data, data-formatting, models, mvc, webapi]
---

I've been working through another project lately that is being build using a WebAPI model with an AngularJS front end. It's becoming a very popular way of building things out. It's quite helpful, but it does lend itself a little bit to some complexities not always found in a traditional MVC model, especially when it comes to the structure and size of the data being returned in the payload. Here is one way I work around those issues.

<!--more-->

![Matrix Code Tunnel](../img_post/2016-08-31-api-insights-orms-viewmodels-summaryviews-and-transforms/2010-09-matrixmini.jpg)

Most application platforms are using some form of ORM (object relational manager) to make your life a lot easier. Most of the time this does make your life easier. Instead of having to write out all your CRUD operations for basic tables, you simply build an object model, let it map to a table, and when you update an object and tell it to save, it'll make the appropriate changes. This gives you the added benefit of using actual objects with fully typed properties in your code, as opposed to looking at row columns or other abstractions.

The added benefit of ORMs comes with relation mapping as well. You can declare that your organization contains a collection of members, and with little (or potentially no) configuration your ORM will automatically build the foreign keys into your tables, and do the necessary join statements for your queries.

This is where things can start to get a little crazy...

Let's look back to our scenario above. An organization can contain a collection of members. Likewise a member may have a collection of organizations that it belongs to. When your API endpoint queries the organization, it will most likely use a concept called "lazy loading" to keep a reference of the members, but not actually pull them until some code requests that property, which most likely would be when the API is rendering the JSON to return to the client. At this point the ORM kicks in, and grabs the members. They have an organization object connected to it, so the ORM is going to grab the details. You don't want to see the size of the data return on this, if you make it that far, trust me.

How do we fix this? For me, I like to take a page out of my MVVM playbook and use a ViewModel. A ViewModel is typically a POCO (plain 'ol common object) that uses all of basic data types for my model that I want to send back to the client. In C# terms, this means that any virtual or ICollection type objects are replaced with the basic object or a List&lt;T>. You can use custom objects in the results, as long as ultimate they map to simple data types that can be serialized to the client.

In the case of my Organization, I create an OrganizationViewModel and use a simple List&lt;Member> object. This requires one extra step in my API code in which I trigger the lazy loading by getting my member object and adding it to the list, but I can stop the crazy recursion in my code. I've found that by creating a constructor for the ViewModel that takes the original object, you can reduce your processing code to a simple line quick and pretty.

Sometimes the ViewModel is not enough though. In our situation above, the Member object is going to have an Organization attached to it, and the Organization has 20 to 30 properties that we don't need duplicated in the result set. For that, I use what I call a SummaryView, which includes a subset of the necessary data, and oftentimes contains just the ID of related data, such as the organization. The thought behind that being that the SummaryView is just that, a summary. If I need the full set of data I'll make a separate query to that specific object. In the case of my OrganizationViewModel, I would have a List&lt;MemberSummaryView> as opposed to a List&lt;Member> in there. That way the data size of the return object doesn't get too large, especially if you're returning 100s of records that need to be rendered at the client end.

One alternative to this, which I've worked with as well, is to use Transforms to modify the data being returned to the client. Transforms essentially serve as a hook or intercept between the object retrieval and the object rendered to the client. With the transform, you specify which data is returned, and can structure it differently if needs be. You can also do additional data querying if needed. It's a little more lightweight, but if you have some really complex objects, it may cause too many problems.

The next time your WebAPI starts giving you grief with huge datasets or circular reference, give these options a shot, or let me know what you do instead.
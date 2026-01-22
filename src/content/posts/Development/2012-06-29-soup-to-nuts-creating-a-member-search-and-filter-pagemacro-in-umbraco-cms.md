---
title: Soup To Nuts Creating A Member Search And Filter Pagemacro In Umbraco Cms
description: Soup to Nuts - The Complete Package
published: 2012-06-29
image: images/posts/2011-08-soup2nuts.jpg
imageAlt: Soup to Nuts - The Complete Package
category: Development
tags: [cms, coding, filter, member, razor, script, sort, umbraco]
---

![Soup to Nuts - The Complete Package](@assets/images/posts/2011-08-soup2nuts.jpg)

Recently I've started working with the Umbraco CMS for a project at work. While there was a bit of a learning curve to Umbraco (having done a lot of WordPress work as of late) I found it to be very robust and powerful. One of the things we needed to add to our Umbraco site was a page that allowed members to search and sort all the members that had opted in to be on the list. While the solution is rather simple, tracking it down wasn't.

<!--more-->

The first step in this process is to create a member group and type and assign any additional properties you may want to display/search by. For our example, we're setting up a nice little business directory, so the following properties were added to our member:

- Location (alias userLocation)
- Title (alias userTitle)
- Company (alias userCompany)
- LinkedIn URL (alias userLinkedInUrl)
- Show on Member List (alias userShowMemberOnList)

All of these fields are simple Textstring types, with our "Show on Member List" field being a true/false type.

After this, we need to create our script. To accomplish this, I'm using the Razor scripting engine that was made available in version 4.7 of Umbraco. Is provides IMMENSELY more functionality, and it's a little bit friendlier for me to work with. I initially started (and wrote a couple other macros) using XSLT (a nice throwback) but some of the things I needed to accomplish was better done in Razor.

The first step is to pull down all the members and include their properties. Unfortunately there is no single user table in Umbraco that contains this information. By default Umbraco uses the membership provider used by default in the .Net Framework (a good thing if you ask me) and then stores custom properties about members elsewhere. However, since this information is available through the various API methods, we'll retrieve our users and generate an XDocument object with all the user details in it:

```cs
// Get Members 
IEnumerable members = Member.GetAllAsList(); 
var xdoc = new XDocument(); 
var xMembers = new XElement("members"); 
xdoc.Add(xMembers);

// Iterate and populate 
foreach (Member member in members) 
{ 
    var user = new XElement("member",""); 
    user.Add(new XElement("id", member.Id.ToString(CultureInfo.InvariantCulture))); 
    user.Add(new XElement("name", member.Text)); 
    user.Add(new XElement("email", member.Email));

    foreach (umbraco.cms.businesslogic.property.Property prop in member.getProperties) 
    { 
        user.Add(new XElement(prop.PropertyType.Alias, prop.Value)); 
    }

    xMembers.Add(user); 
}
```

Now it may seem odd to be interacting with XML at this point, but this is what the API currently provides for us. However, thanks to LINQ to XML, we can immediately query all of our XML member information and create data we're more comfortable working with:

```cs
// Return Members 
List var memberList = from member in xdoc.Descendants("member") 
    where member.Element("userShowOnMemberList").Value.Equals("1") 
    select new 
    { 
        id = member.Element("id").Value, 
        name = member.Element("name").Value, 
        email = member.Element("email").Value, 
        location = member.Element("userLocation").Value,
        title = member.Element("userTitle").Value, 
        company = member.Element("userCompany").Value
        linkedInUrl = member.Element("userLinkedInUrl").Value 
    };
```

That's all there is to it. The final step is to put this data in a nice table for display/sorting/etc. Thanks to Razor script, we can easily merge our HTML and our code together:

```cs
@foreach (var memberItem in @memberList) 
{ 
    <table id="people-table" class="people-table tablesorter"> 
        <thead> 
            <tr> 
                <th>Name</th> 
                <th>Title</th> 
                <th>Company</th> 
                <th>Location</th> 
                <th>Email</th> 
                <th>&nbsp;</th> 
            </tr> 
        </thead>

        <tbody> 
            <tr> 
                <td> @memberItem.name </td> 
                <td> @memberItem.title </td> 
                <td> @memberItem.company </td> 
                <td> @memberItem.location </td> 
                <td style="text-align: center;"> 
                    <a title="@memberItem.email" href="mailto:@memberItem.email"><img src="/images/mail-at-sign.png" alt="" /></a> 
                </td> 
                <td class="td-link"> 
                    @if (!string.IsNullOrEmpty(@memberItem.linkedInUrl)) 
                    { 
                        <script type="text/javascript" src="//platform.linkedin.com/in.js"></script> <script type="IN/MemberProfile" data-id="@memberItem.linkedInUrl" data-format="hover" data-related="false"></script> 
                    } 
                </td> 
            </tr> 
        </tbody> 
    </table>
}
```

What's really nice is that we have a nice little e-mail icon for users to click on to send an e-mail, as well as using LinkedIn's public API to generate the proper link to their profile page.

"What about the searching and sorting?!" I'm sure you're saying at this point. While we could have done some additional work on the .Net side of things, we decided to take a much simpler route (a full HT to my colleague Will for finding this) and use the [jQuery TableSorter Library](http://tablesorter.com/). Simply put this library allows you to target a table (that has used the proper <th> tags) and it'll automatically create the sorting functionality on it! You can even style it however you need. In addition, the [uiTableFilter Library](http://gregweber.info/projects/uitablefilter) provides the filtering functionality we need in a similar manner. Since it is done in jQuery, there is no need to refresh the call to the server for each new sort/search function. All it takes is a simple script initialization and some properly named items.

When you put all of this together, your final Razor script looks like this:

```cs
@using System.Globalization@using umbraco.cms.businesslogic.member @using System.Xml.Linq

@{ 
    // Get Members 
    IEnumerable members = Member.GetAllAsList(); 
    var xdoc = new XDocument(); 
    var xMembers = new XElement("members"); xdoc.Add(xMembers);

    // Iterate and populate 
    foreach (Member member in members) 
    { 
        var user = new XElement("member",""); 
        user.Add(new XElement("id", member.Id.ToString(CultureInfo.InvariantCulture))); 
        user.Add(new XElement("name", member.Text)); 
        user.Add(new XElement("email", member.Email));

        foreach (umbraco.cms.businesslogic.property.Property prop in member.getProperties) 
        { 
            user.Add(new XElement(prop.PropertyType.Alias, prop.Value)); 
        }

        xMembers.Add(user); 
    }

    // Return Members 
    List var memberList = from member in xdoc.Descendants("member") 
        where member.Element("userShowOnMemberList").Value.Equals("1") 
        select new 
        { 
            id = member.Element("id").Value, n
            ame = member.Element("name").Value, 
            email = member.Element("email").Value, 
            location = member.Element("userLocation").Value,
            title = member.Element("userTitle").Value,
            company = member.Element("userCompany").Value, linkedInUrl = member.Element("userLinkedInURL").Value 
        }; 
}

<script type="text/javascript" language="Javascript"> 
// Doc Ready! 
$(document).ready(function () 
{ 
    // Find People - Sortable & Search-able! 
    $("#people-table") 
    // Table Sorter 
    .tablesorter({ headers: { 5: { sorter: false } } })

    // Table Sorter Filterting 
    .tablesorterFilter({ 
        filterContainer: $("#txtFilterParam"), filterClearContainer: $("#btnResetFilter"),
        filterColumns: \[0, 1, 2, 3, 4], 
        filterCaseSensitive: false
    }); 
}); 
</script>

<div class="people-table-filter"> 
    Filter People&nbsp; 
    <input id="txtFilterParam" type="text" />&nbsp; 
    <input id="btnResetFilter" type="button" value="Reset" />
</div>

@foreach (var memberItem in @memberList) 
{ 
    <table id="people-table" class="people-table tablesorter"> 
        <thead> 
            <tr> 
                <th>Name</th> 
                <th>Title</th> 
                <th>Company</th> 
                <th>Location</th> 
                <th>Email</th> 
                <th>&nbsp;</th> 
            </tr> 
        </thead>

        <tbody> 
            <tr> 
                <td> @memberItem.name </td> 
                <td> @memberItem.title </td> 
                <td> @memberItem.company </td> 
                <td style="text-align: center;"> 
                    <a title="@memberItem.email" href="mailto:@memberItem.email">
                        <img src="/images/mail-at-sign.png" alt="" />
                    </a> 
                </td> 
                <td class="td-link"> 
                    @if (!string.IsNullOrEmpty(@memberItem.linkedInUrl)) 
                    { 
                        <script type="text/javascript" src="//platform.linkedin.com/in.js"></script> 
                        <script type="IN/MemberProfile" data-id="@memberItem.linkedInUrl" data-format="hover" data-related="false">
                        </script> 
                    } 
                </td> 
            </tr> 
        </tbody> 
    </table> 
}
```

Don't forget to add the proper script and stylesheet references into your template (or even within the script if you so desire). Save your script, make sure it is bound to a macro, and add it into a simple content page!

One quick note, when I modify my macro settings, I "invert" the defaults so that "Use in Editor" is checked, and "Render content in editor" is unchecked. That way I can add the module anywhere via the Content editor, but we don't see all the details that don't show up until runtime.

I'm sure there are plenty of optimizations that can occur with this macro, such as adding parameters to the module or potentially making server call backs if you have a large member base. For the most part, this has been working well for us and saves a lot of time.

Let me know if this helps for you or you have some suggestions for improvement.

![Soup to Nuts - The Complete Package](@assets/images/posts/2011-08-soup2nuts.jpg)

Recently I've started working with the Umbraco CMS for a project at work. While there was a bit of a learning curve to Umbraco (having done a lot of WordPress work as of late) I found it to be very robust and powerful. One of the things we needed to add to our Umbraco site was a page that allowed members to search and sort all the members that had opted in to be on the list. While the solution is rather simple, tracking it down wasn't.

<!--more-->

The first step in this process is to create a member group and type and assign any additional properties you may want to display/search by. For our example, we're setting up a nice little business directory, so the following properties were added to our member:

- Location (alias userLocation)
- Title (alias userTitle)
- Company (alias userCompany)
- LinkedIn URL (alias userLinkedInUrl)
- Show on Member List (alias userShowMemberOnList)

All of these fields are simple Textstring types, with our "Show on Member List" field being a true/false type.

After this, we need to create our script. To accomplish this, I'm using the Razor scripting engine that was made available in version 4.7 of Umbraco. Is provides IMMENSELY more functionality, and it's a little bit friendlier for me to work with. I initially started (and wrote a couple other macros) using XSLT (a nice throwback) but some of the things I needed to accomplish was better done in Razor.

The first step is to pull down all the members and include their properties. Unfortunately there is no single user table in Umbraco that contains this information. By default Umbraco uses the membership provider used by default in the .Net Framework (a good thing if you ask me) and then stores custom properties about members elsewhere. However, since this information is available through the various API methods, we'll retrieve our users and generate an XDocument object with all the user details in it:

```cs
// Get Members 
IEnumerable members = Member.GetAllAsList(); 
var xdoc = new XDocument(); 
var xMembers = new XElement("members"); 
xdoc.Add(xMembers);

// Iterate and populate 
foreach (Member member in members) 
{ 
    var user = new XElement("member",""); 
    user.Add(new XElement("id", member.Id.ToString(CultureInfo.InvariantCulture))); 
    user.Add(new XElement("name", member.Text)); 
    user.Add(new XElement("email", member.Email));

    foreach (umbraco.cms.businesslogic.property.Property prop in member.getProperties) 
    { 
        user.Add(new XElement(prop.PropertyType.Alias, prop.Value)); 
    }

    xMembers.Add(user); 
}
```

Now it may seem odd to be interacting with XML at this point, but this is what the API currently provides for us. However, thanks to LINQ to XML, we can immediately query all of our XML member information and create data we're more comfortable working with:

```cs
// Return Members 
List var memberList = from member in xdoc.Descendants("member") 
    where member.Element("userShowOnMemberList").Value.Equals("1") 
    select new 
    { 
        id = member.Element("id").Value, 
        name = member.Element("name").Value, 
        email = member.Element("email").Value, 
        location = member.Element("userLocation").Value,
        title = member.Element("userTitle").Value, 
        company = member.Element("userCompany").Value
        linkedInUrl = member.Element("userLinkedInUrl").Value 
    };
```

That's all there is to it. The final step is to put this data in a nice table for display/sorting/etc. Thanks to Razor script, we can easily merge our HTML and our code together:

```cs
@foreach (var memberItem in @memberList) 
{ 
    <table id="people-table" class="people-table tablesorter"> 
        <thead> 
            <tr> 
                <th>Name</th> 
                <th>Title</th> 
                <th>Company</th> 
                <th>Location</th> 
                <th>Email</th> 
                <th>&nbsp;</th> 
            </tr> 
        </thead>

        <tbody> 
            <tr> 
                <td> @memberItem.name </td> 
                <td> @memberItem.title </td> 
                <td> @memberItem.company </td> 
                <td> @memberItem.location </td> 
                <td style="text-align: center;"> 
                    <a title="@memberItem.email" href="mailto:@memberItem.email"><img src="/images/mail-at-sign.png" alt="" /></a> 
                </td> 
                <td class="td-link"> 
                    @if (!string.IsNullOrEmpty(@memberItem.linkedInUrl)) 
                    { 
                        <script type="text/javascript" src="//platform.linkedin.com/in.js"></script> <script type="IN/MemberProfile" data-id="@memberItem.linkedInUrl" data-format="hover" data-related="false"></script> 
                    } 
                </td> 
            </tr> 
        </tbody> 
    </table>
}
```

What's really nice is that we have a nice little e-mail icon for users to click on to send an e-mail, as well as using LinkedIn's public API to generate the proper link to their profile page.

"What about the searching and sorting?!" I'm sure you're saying at this point. While we could have done some additional work on the .Net side of things, we decided to take a much simpler route (a full HT to my colleague Will for finding this) and use the [jQuery TableSorter Library](http://tablesorter.com/). Simply put this library allows you to target a table (that has used the proper <th> tags) and it'll automatically create the sorting functionality on it! You can even style it however you need. In addition, the [uiTableFilter Library](http://gregweber.info/projects/uitablefilter) provides the filtering functionality we need in a similar manner. Since it is done in jQuery, there is no need to refresh the call to the server for each new sort/search function. All it takes is a simple script initialization and some properly named items.

When you put all of this together, your final Razor script looks like this:

```cs
@using System.Globalization@using umbraco.cms.businesslogic.member @using System.Xml.Linq

@{ 
    // Get Members 
    IEnumerable members = Member.GetAllAsList(); 
    var xdoc = new XDocument(); 
    var xMembers = new XElement("members"); xdoc.Add(xMembers);

    // Iterate and populate 
    foreach (Member member in members) 
    { 
        var user = new XElement("member",""); 
        user.Add(new XElement("id", member.Id.ToString(CultureInfo.InvariantCulture))); 
        user.Add(new XElement("name", member.Text)); 
        user.Add(new XElement("email", member.Email));

        foreach (umbraco.cms.businesslogic.property.Property prop in member.getProperties) 
        { 
            user.Add(new XElement(prop.PropertyType.Alias, prop.Value)); 
        }

        xMembers.Add(user); 
    }

    // Return Members 
    List var memberList = from member in xdoc.Descendants("member") 
        where member.Element("userShowOnMemberList").Value.Equals("1") 
        select new 
        { 
            id = member.Element("id").Value, n
            ame = member.Element("name").Value, 
            email = member.Element("email").Value, 
            location = member.Element("userLocation").Value,
            title = member.Element("userTitle").Value,
            company = member.Element("userCompany").Value, linkedInUrl = member.Element("userLinkedInURL").Value 
        }; 
}

<script type="text/javascript" language="Javascript"> 
// Doc Ready! 
$(document).ready(function () 
{ 
    // Find People - Sortable & Search-able! 
    $("#people-table") 
    // Table Sorter 
    .tablesorter({ headers: { 5: { sorter: false } } })

    // Table Sorter Filterting 
    .tablesorterFilter({ 
        filterContainer: $("#txtFilterParam"), filterClearContainer: $("#btnResetFilter"),
        filterColumns: \[0, 1, 2, 3, 4], 
        filterCaseSensitive: false
    }); 
}); 
</script>

<div class="people-table-filter"> 
    Filter People&nbsp; 
    <input id="txtFilterParam" type="text" />&nbsp; 
    <input id="btnResetFilter" type="button" value="Reset" />
</div>

@foreach (var memberItem in @memberList) 
{ 
    <table id="people-table" class="people-table tablesorter"> 
        <thead> 
            <tr> 
                <th>Name</th> 
                <th>Title</th> 
                <th>Company</th> 
                <th>Location</th> 
                <th>Email</th> 
                <th>&nbsp;</th> 
            </tr> 
        </thead>

        <tbody> 
            <tr> 
                <td> @memberItem.name </td> 
                <td> @memberItem.title </td> 
                <td> @memberItem.company </td> 
                <td style="text-align: center;"> 
                    <a title="@memberItem.email" href="mailto:@memberItem.email">
                        <img src="/images/mail-at-sign.png" alt="" />
                    </a> 
                </td> 
                <td class="td-link"> 
                    @if (!string.IsNullOrEmpty(@memberItem.linkedInUrl)) 
                    { 
                        <script type="text/javascript" src="//platform.linkedin.com/in.js"></script> 
                        <script type="IN/MemberProfile" data-id="@memberItem.linkedInUrl" data-format="hover" data-related="false">
                        </script> 
                    } 
                </td> 
            </tr> 
        </tbody> 
    </table> 
}
```

Don't forget to add the proper script and stylesheet references into your template (or even within the script if you so desire). Save your script, make sure it is bound to a macro, and add it into a simple content page!

One quick note, when I modify my macro settings, I "invert" the defaults so that "Use in Editor" is checked, and "Render content in editor" is unchecked. That way I can add the module anywhere via the Content editor, but we don't see all the details that don't show up until runtime.

I'm sure there are plenty of optimizations that can occur with this macro, such as adding parameters to the module or potentially making server call backs if you have a large member base. For the most part, this has been working well for us and saves a lot of time.

Let me know if this helps for you or you have some suggestions for improvement.
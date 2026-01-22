---
title: Using Label Placeholders In Aspnet Applications
description: Using Label Placeholders In Aspnet Applications
published: 2009-05-22
category: Default
tags: [coding]
---

Here's a little nugget that is pretty simple, but has had some really nice results for me. I write a lot of CRUD (create, retrieve, update, delete) type applications that are used in house, and one glitch I run into from time to time is having data that is out of synch appear on the page. The user has pulled up a new record, but a given field shouldn't be there because there is no data in the database. In some cases, the space allocated for the data field isn't wide enough, because the output was longer than expected.

In most web applications, Label controls are used to display data fields (if not using a GridView) and the labels are set to have their Text property set to blank by default. The Label itself may even have its Visibility property set to False, thus hiding it. This allows for a quick and simple pass through with data binding. However, this starts to lead to a little bit of lazy coding, and that's where the troubles can rise up.

To prevent this, I've started putting placeholder data in my labels, and making sure the Visibility is set to true by default. So a typical label that might look like this:

```
<asp:label id="lblName"" runat=""server" text="" visible="false"></asp:label>
```

is instead set to:

```
<asp:label id="lblName" runat="server" text="[Joe D Schmoe]" ></asp:label>
```

If I forget to see if the database filed is null or empty when iterating through my databinding results, I will see a nice glaring piece of data that shouldn't be on the page. In a page where there is easily a dozen data fileds being bound, this will enforce me to make sure I handle each piece, even if it means setting the text field to an empty string to properly handle the results.

In addition, this gives me a rough visual element in the designer of what my web page is shaping up to look like without having to build/bind/preview it in the browser. If I hadn't specified a text field, the Visual Studio designer would have a "lblName" value sitting where the text would be, which may not show enough space for the data bound content to stay.

Give label placeholders it a try. It will require a little more work to make sure you're checking all your databound fields, but you'll have better coverage of your code and your UI will be a little better laid out for the work.

Peace out homeskillets!!!
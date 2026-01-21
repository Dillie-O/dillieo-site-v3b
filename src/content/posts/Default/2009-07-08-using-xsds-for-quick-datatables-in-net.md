---
title: Using Xsds For Quick Datatables In Net
description: Using Xsds For Quick Datatables In Net
published: 2009-07-08
image: images/posts/using_xsds_for_quick_datatables_in_net.webp
imageAlt: Using Xsds For Quick Datatables In Net
category: Default
tags: [net, coding, datatable, xml, xsd]
---

A little while back, I put together a website for my wife's bakery that she started. One of the things she wanted to do was to have an online gallery of some of her cupcakes, so that potential customers could see what they were ordering. She also wanted to be able to add/remove items when she wanted to, but I really didn't have the time to put in a full fledged database solution in place with all the CRUD items.

I decided to create a "portable" database she could update when needed, but I could still leverage all the quick and easy data binding capabilities with the DataList object. To do this, I took advantage of the XSD DataSet tool in Visual Studio and a couple of built in methods that it provides.

The first step was to create the DataTable that I wanted to bind the cupcake data to the gallery page with. My table had three simple items: a Name for the cupcake name, an Image, which was the path to the scanned image, and a Thumbnail, which was the path to the thumbnail image of hte cupcake. I was going to present a grid of thumbnails for the cupcakes and let the user choose one, which would bring up a larger image.

I right-clicked on my project name then selected Add->New Item. In the Add New Item dialog, I selected the "DataSet" item under the "Data" category, named it CrazyBakerSchema.xsd and clicked the "Add" button. Once the XSD editor is displayed in Visual Studio, I right-clicked on the canvas, selected Add->DataTable. I clicked on the "title" section of the DataTable to give it a new name. In the DataSet properties window, I updated the Namespace property to be http://crazybakers.com/CrazyBakerSchema.xsd to match the website it was going to be placed on. This isn't required, but it is recommended that you rename the default "temuri.org" URL if you're doing anything on the "outside world." I then added each column by right-clicking on the DataTable and selecting Add->Column.

Once this was complete. I saved and compiled. This created the DataTable object and its supporting methods. In addition, it put the context of the DataTable into XML format as well (remember that an XSD is an XML schema document).

The next step was to create some simple data to display on the gallery page. The beautiful thing about the XSD information is that it gets put into Visual Studio's Intellisense for auto-completion to easily create the XML structure needed to read data into a DataTable object.

I right-clicked on the project again and selected Add->New Item. I selected "XML File" from the "Data" category and gave it the name CakeImages.xml and clicked the "Add" button. I then added a reference to my schema document, right under the initial XML declaration

Once the schema is detected, all of the fields in the DataTable will begin to appear via Intellisense. Simply type your opening "&lt;" and intellisense will help you enter the fields you need.

This allows you to quickly put together the data you need. I already had some images uploaded to the proper locations, so my final file looked like this:

```
<div id="_mcePaste">[code lang="xml"]
<?xml version="1.0" encoding="utf-8">
<xs:CrazyBakerSchema xmlns:xs="http://crazybakers.com/CrazyBakerSchema.xsd">
<xs:GalleryImage>
   <xs:Name>Janie's Dinner</xs:Name>
   <xs:Image>JaniesDinner.jpg</xs:Image>
   <xs:Thumbnail>JaniesDinner_Thumb.jpg</xs:Thumbnail>
</xs:GalleryImage>

<xs:GalleryImage>
   <xs:Name>Vanilla</xs:Name>
   <xs:Image>Vanilla.jpg</xs:Image>
   <xs:Thumbnail>Vanilla_Thumb.jpg</xs:Thumbnail>
</xs:GalleryImage>

<xs:GalleryImage>
   <xs:Name>Snicker Doodles</xs:Name>
   <xs:Image>SnickerDoodle.jpg</xs:Image>
   <xs:Thumbnail>SnickerDoodle_Thumb.jpg</xs:Thumbnail>
</xs:GalleryImage>

<xs:GalleryImage>
   <xs:Name>White Mint Minis</xs:Name>
   <xs:Image>WhiteMint.jpg</xs:Image>
   <xs:Thumbnail>Whitemint_Thumb.jpg</xs:Thumbnail>
</xs:GalleryImage>

<xs:GalleryImage>
   <xs:Name>Turtle</xs:Name>
   <xs:Image>Turtle.jpg</xs:Image>
   <xs:Thumbnail>Turtle_Thumb.jpg</xs:Thumbnail>
</xs:GalleryImage>
</xs:CrazyBakerSchema>
[/code]

</div>
```

Note: This isn't the complete code block, just the items I mentioned above.

In my code behind file, the DataSet object makes it really easy to suck up an XSD and an XML file to create a strongly typed DataTable:

In five lines of code I have an simple XML "database" loaded and bound to a DataList! I love it! I added a little bit of my formatting code to my DataList as follows:

protected void FormatListItem(object sender, DataListItemEventArgs e) { ImageButton imbTarget;

if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem) { imbTarget = (ImageButton)e.Item.FindControl("imbCakeThumbnail"); imbTarget.CommandArgument = ((DataRowView)e.Item.DataItem).Row.ItemArray\[1].ToString(); imbTarget.ImageUrl = "~/Photos/" + ((DataRowView)e.Item.DataItem).Row.ItemArray\[2].ToString(); imbTarget.AlternateText = ((DataRowView)e.Item.DataItem).Row.ItemArray\[0].ToString(); } }

Finally, when the user clicked an image, I process the CommandArgument by displaying the large image selected:

I wrapped the DataList and display items within an UpdatePanel, so the refreshes will occur without and flicker on the screen.

And there you have it! I used this approach again when creating a simple calendar to list events or special sales that were coming up. The great thing about the strongly typed tables is that you can also store integer or dattime related data and not have to worry about converting it back in later. The schema will handle that for you.

I hope this proves helpful for you when you need a quick data store for a drop down list, or a small image gallery, or anything else for that matter. Just remember that XML gets bulky really fast, so if you have a lot of data, or need super fast processing, this approach won't work for you. But for a lot of simple needs, it does the job quite nicely, especially if your web host doesn't provide a database or you've already used yours up.
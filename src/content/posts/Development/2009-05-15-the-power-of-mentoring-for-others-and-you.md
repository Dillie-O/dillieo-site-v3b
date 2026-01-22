---
title: The Power Of Mentoring For Others And You
description: The Power Of Mentoring For Others And You
published: 2009-05-15
category: Development
tags: [coding]
---

Last week I was asked to show one of my colleagues how the web service works that I had setup for accessing our AS/400 database. The person in question was our AS/400 developer, who didn't have a robust knowledge of the .NET framework. They had done a couple of applications in the past, but most of that knowledge had escaped them.

So after going over the concept of strongly-typed vs. weakly-typed DataTables and why I like to use them with my applications, I sent over the code I used in to call one of the web services and store the results in a strongly typed table. One little nuance to it was that the results sent back from the AS/400 brought back all of the check locations, and I needed to filter out the inactive locations that had a "-Z" in their name. As I walked them through the code sample, we came across one little piece of code that took a bit more explaining than I expected:

```
If TempRow("CHECKLOCATIONDESCRIPTION").ToString.IndexOf("-Z") = -1 Then

   drCheckLocation = Results.NewCheckLocationRow()
   drCheckLocation.Id = Integer.Parse(TempRow("CHECKLOCATIONCODE").ToString)
   drCheckLocation.Description = TempRow("CHECKLOCATIONDESCRIPTION").ToString
   Results.Rows.Add(drCheckLocation)

End If
```

The first issue arose as to what the first line of code was doing. The long explanation is that the TempRow has a column named CHECKLOCATIONDESCRIPTION and we need to check that value to see if the "-Z" is there to filter out. The IndexOf method allows for a string to be passed in. If it doesn't find the value, it returns a -1, since the string uses a 0 base index array.

As I was trying to explain this, it dawned on me, that there was a much cleaner way to do this, thanks to some "new" methods _\[I really gotta remmeber to target my brain for stuff past 1.1]_ that are available in the string class:

```
If Not TempRow("CHECKLOCATIONDESCRIPTION").ToString.Contains("-Z") Then
```

Now this is MUCH simpler to read, and it is very self-documenting since it describes exactly what we're trying to do, to see if this particular column does not contains the "-Z" value within the string.

Then we moved on to the block of code that evaluates when we need to add a row to the DataTable. I began to explain how the DataTable object will accept a variety of ways to add a new row, but I've always had issues with using an Array due to typing issues within the strongly typed table. In addition, one of the nuances I've discovered along the way is that if you do want to use a DataRow object to add to a DataTable, the row has to be "attached" to the table already, by having the table itself create an empty row for you to shovel data into.

And then I remembered something I stumbled upon while working on my [CCG Toolkit](http://ccgtoolkit.com/) project the other night. In addition to all the lovely named columns and such you can access through the object, there is also the following method: Add*YourTableName_Row, which will take all the individual columns as parameters, create the new row, and add it to the table in 1 shot! *\[Sometimes it pays to just scroll through the Intellisense results every now and then...]\_

We updated the code within the block and here's what it looks like now:

```
If Not TempRow("CHECKLOCATIONDESCRIPTION").ToString.Contains("-Z") Then

   Results.AddCheckLocationRow _
           (Integer.Parse(TempRow("CHECKLOCATIONCODE").ToString), _
            TempRow("CHECKLOCATIONDESCRIPTION").ToString)

End If
```

The result is that we have a more "natural" condition that we're evaluating here and our 4 lines of code to add a new row has been consolidated into 1. This new code was MUCH easier for my colleague to understand, and I had a quick refactoring session on my own code. Everybody wins!

I offer this little story just to say if you're not trying to help others with coding, give it a shot, even going over a small block of code will help them AND yourself.

Last week I was asked to show one of my colleagues how the web service works that I had setup for accessing our AS/400 database. The person in question was our AS/400 developer, who didn't have a robust knowledge of the .NET framework. They had done a couple of applications in the past, but most of that knowledge had escaped them.

So after going over the concept of strongly-typed vs. weakly-typed DataTables and why I like to use them with my applications, I sent over the code I used in to call one of the web services and store the results in a strongly typed table. One little nuance to it was that the results sent back from the AS/400 brought back all of the check locations, and I needed to filter out the inactive locations that had a "-Z" in their name. As I walked them through the code sample, we came across one little piece of code that took a bit more explaining than I expected:

```
If TempRow("CHECKLOCATIONDESCRIPTION").ToString.IndexOf("-Z") = -1 Then

   drCheckLocation = Results.NewCheckLocationRow()
   drCheckLocation.Id = Integer.Parse(TempRow("CHECKLOCATIONCODE").ToString)
   drCheckLocation.Description = TempRow("CHECKLOCATIONDESCRIPTION").ToString
   Results.Rows.Add(drCheckLocation)

End If
```

The first issue arose as to what the first line of code was doing. The long explanation is that the TempRow has a column named CHECKLOCATIONDESCRIPTION and we need to check that value to see if the "-Z" is there to filter out. The IndexOf method allows for a string to be passed in. If it doesn't find the value, it returns a -1, since the string uses a 0 base index array.

As I was trying to explain this, it dawned on me, that there was a much cleaner way to do this, thanks to some "new" methods _\[I really gotta remmeber to target my brain for stuff past 1.1]_ that are available in the string class:

```
If Not TempRow("CHECKLOCATIONDESCRIPTION").ToString.Contains("-Z") Then
```

Now this is MUCH simpler to read, and it is very self-documenting since it describes exactly what we're trying to do, to see if this particular column does not contains the "-Z" value within the string.

Then we moved on to the block of code that evaluates when we need to add a row to the DataTable. I began to explain how the DataTable object will accept a variety of ways to add a new row, but I've always had issues with using an Array due to typing issues within the strongly typed table. In addition, one of the nuances I've discovered along the way is that if you do want to use a DataRow object to add to a DataTable, the row has to be "attached" to the table already, by having the table itself create an empty row for you to shovel data into.

And then I remembered something I stumbled upon while working on my [CCG Toolkit](http://ccgtoolkit.com/) project the other night. In addition to all the lovely named columns and such you can access through the object, there is also the following method: Add*YourTableName_Row, which will take all the individual columns as parameters, create the new row, and add it to the table in 1 shot! *\[Sometimes it pays to just scroll through the Intellisense results every now and then...]\_

We updated the code within the block and here's what it looks like now:

```
If Not TempRow("CHECKLOCATIONDESCRIPTION").ToString.Contains("-Z") Then

   Results.AddCheckLocationRow _
           (Integer.Parse(TempRow("CHECKLOCATIONCODE").ToString), _
            TempRow("CHECKLOCATIONDESCRIPTION").ToString)

End If
```

The result is that we have a more "natural" condition that we're evaluating here and our 4 lines of code to add a new row has been consolidated into 1. This new code was MUCH easier for my colleague to understand, and I had a quick refactoring session on my own code. Everybody wins!

I offer this little story just to say if you're not trying to help others with coding, give it a shot, even going over a small block of code will help them AND yourself.
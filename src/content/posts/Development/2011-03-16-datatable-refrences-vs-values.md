---
title: Datatable Refrences Vs Values
description: evil-computer-monitor
published: 2011-03-16
image: images/posts/2011-03-evil-computer-monitor_thumb.jpg
imageAlt: evil-computer-monitor
category: Development
tags: [coding, datatable, pass-by-reference, pass-by-value]
---

![evil-computer-monitor](@assets/images/posts/2011-03-evil-computer-monitor_thumb.jpg)

I was bit by this issue for the **third** time last week and as a result I felt I should remind myself here.

Take a peek at the following code:

<!--more-->

dtFundingFrom = New BasicFundingDataTable dtFundingTo = New BasicFundingDataTable

For Each Fund As Fund In Position.Funding dtFundingFrom.AddBasicFundingRow(Fund.Code, Fund.Percent) Next

gvFundingFrom.DataSource = dtFundingFrom&lt;br>gvFundingFrom.DataBind()

dtFundingTo = DirectCast(Session("CurrentFundingTo"), BasicFundingDataTable)

If dtFundingTo Is Nothing OrElse dtFundingTo.Rows.Count = 0 Then dtFundingTo = dtBasicFundingInfo End If

Everything is pretty straightforward, right? You create a couple new DataTables and fill one up with some funding information. Then you pull some additional funding from a session variable, and if it has no data, you simply set the Funding To DataTable to be the same as the Funding From DataTable to copy the data.

Later on (assuming some changes have been made) you update the funding data into a database.

After getting a call from the end users saying their funding codes were looking wrong, I took a peek and noticed that the Funding To codes were mirroring the funding from codes in the database and in the application. After giving things some second thought, and remembered a cachine issue I ran into a while back where DataTables were involved. I remembered…

> DataTable objects will pass by **reference** and not by value when assigning one to another.

This was the nature of my problem. If the funding data wasn’t there for the funding to field, the funding to table was being pointed to the funding from table, and data was duplicated. Instead, the code above should have been processed like this:

dtFundingFrom = New BasicFundingDataTable&lt;br>dtFundingTo = New BasicFundingDataTable

For Each Fund As Fund In Position.Funding dtFundingFrom.AddBasicFundingRow(Fund.Code, Fund.Percent) Next

gvFundingFrom.DataSource = dtFundingFrom gvFundingFrom.DataBind()

dtFundingTo = DirectCast(Session("CurrentFundingTo"), BasicFundingDataTable)

If dtFundingTo Is Nothing OrElse dtFundingTo.Rows.Count = 0 Then

dtFundingTo = New BasicFundingDataTable

For Each Fund As Fund In Position.Funding dtFundingTo.AddBasicFundingRow(Fund.Code, Fund.Percent) Next

End If

In this case, the data is still copied, but it is done so by copying the values over into new rows, so any future updates will properly update the Funding To DataTable. As a side note, in order to properly copy the rows over, you’ll need to use the predefined “Add\[X]Row” method built into the DataTable and specify the values. Attempting to set/copy the rows in a similar manner to the DataTable will cause an error, because the DataRow objects are setup to only belong to one DataTable and it will not allow you to reference it to multiple DataTables.

So Remember kids: DataTable objects pass by reference, not by value. Don't let it bite you like it did me...thrice now...

![evil-computer-monitor](@assets/images/posts/2011-03-evil-computer-monitor_thumb.jpg)

I was bit by this issue for the **third** time last week and as a result I felt I should remind myself here.

Take a peek at the following code:

<!--more-->

dtFundingFrom = New BasicFundingDataTable dtFundingTo = New BasicFundingDataTable

For Each Fund As Fund In Position.Funding dtFundingFrom.AddBasicFundingRow(Fund.Code, Fund.Percent) Next

gvFundingFrom.DataSource = dtFundingFrom&lt;br>gvFundingFrom.DataBind()

dtFundingTo = DirectCast(Session("CurrentFundingTo"), BasicFundingDataTable)

If dtFundingTo Is Nothing OrElse dtFundingTo.Rows.Count = 0 Then dtFundingTo = dtBasicFundingInfo End If

Everything is pretty straightforward, right? You create a couple new DataTables and fill one up with some funding information. Then you pull some additional funding from a session variable, and if it has no data, you simply set the Funding To DataTable to be the same as the Funding From DataTable to copy the data.

Later on (assuming some changes have been made) you update the funding data into a database.

After getting a call from the end users saying their funding codes were looking wrong, I took a peek and noticed that the Funding To codes were mirroring the funding from codes in the database and in the application. After giving things some second thought, and remembered a cachine issue I ran into a while back where DataTables were involved. I remembered…

> DataTable objects will pass by **reference** and not by value when assigning one to another.

This was the nature of my problem. If the funding data wasn’t there for the funding to field, the funding to table was being pointed to the funding from table, and data was duplicated. Instead, the code above should have been processed like this:

dtFundingFrom = New BasicFundingDataTable&lt;br>dtFundingTo = New BasicFundingDataTable

For Each Fund As Fund In Position.Funding dtFundingFrom.AddBasicFundingRow(Fund.Code, Fund.Percent) Next

gvFundingFrom.DataSource = dtFundingFrom gvFundingFrom.DataBind()

dtFundingTo = DirectCast(Session("CurrentFundingTo"), BasicFundingDataTable)

If dtFundingTo Is Nothing OrElse dtFundingTo.Rows.Count = 0 Then

dtFundingTo = New BasicFundingDataTable

For Each Fund As Fund In Position.Funding dtFundingTo.AddBasicFundingRow(Fund.Code, Fund.Percent) Next

End If

In this case, the data is still copied, but it is done so by copying the values over into new rows, so any future updates will properly update the Funding To DataTable. As a side note, in order to properly copy the rows over, you’ll need to use the predefined “Add\[X]Row” method built into the DataTable and specify the values. Attempting to set/copy the rows in a similar manner to the DataTable will cause an error, because the DataRow objects are setup to only belong to one DataTable and it will not allow you to reference it to multiple DataTables.

So Remember kids: DataTable objects pass by reference, not by value. Don't let it bite you like it did me...thrice now...
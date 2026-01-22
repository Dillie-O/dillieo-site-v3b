---
title: Soup To Nuts Exporting A Gridview To Excel
description: Soup To Nuts Exporting A Gridview To Excel
published: 2010-10-19
category: Default
tags: [api, coding, excel, export, gridview, npoi]
---

Excel spreadsheets are a subtle form of currency in LOB and other environments. If you can get some data off the screen and into a spreadsheet to an Excel guru, they will love you for life and can do some amazing things with the data. In the ASP.Net WebForms world, GridViews still run rampant. They are easy to configure, easy to extend to include update/edit/delete controls, and provide a nice way to interact with data in a common interface.

Making these two items work together has been a little daunting in the past. Interfacing with the GridView wasn't the issue, it was generating an Excel document. You could easily generate a CSV file with the data needed, but that doesn't allow you to generate a header and potentially format some key cells in the spreadsheet. There are the Interop libraries, but these are older COM wrappers and are generally frowned upon with .Net apps. Visual Studio Tools for Office (VSTO) is a robust library for working with all of the Office document types, but it also requires Office on the system to generate the objects fully.

I recently stumbled upon a new library, called [NPOI](http://npoi.codeplex.com/), which makes this entire process quick and painless. The library isn't terribly new. It is a port of Apache's POI library, which is a Java library used create and read Office documents. The POI library has been around a while and is well written, so getting the .Net version of it puts you ahead, even for its 1.2.3 release.

The example package you can download has some great samples and its really simple to iterate through the row/column structure of the document you're creating. Since the GridView is equally easy to interate through its row/column structure, I was able to tap into an existing web application and create a basic spreadsheet in about 20. The code is as simple as this:

```vb
DocInfo = PropertySetFactory.CreateDocumentSummaryInformation(); DocInfo.Company = "Dillie-O Digital"; Workbook.DocumentSummaryInformation = DocInfo;

SummaryInfo = PropertySetFactory.CreateSummaryInformation(); SummaryInfo.Subject = "Soup to Nuts GridView Export Example"; Workbook.SummaryInformation = SummaryInfo;

DataSheet = Workbook.CreateSheet("Employees");

for(int i = 0; i &lt;= GridData.Rows.Count - 1; i++) { CurrRow = DataSheet.CreateRow(i);

for(int j = 0; j &lt;= GridData.Rows\[i].Cells.Count - 1; j++) { if(!IgnoreColumns.Contains(j)) { CurrCell = CurrRow.CreateCell(i); CurrCell.SetCellValue(GridData.Rows\[i].Cells\[j].Text); } } }

ResultStream = new FileStream(EndPath, FileMode.Create); Workbook.Write(ResultStream); ResultStream.Close();
```

All of the dirty work is handled by the libraries in the API and you do not need Office installed on the machine generating the documents! It is really simple and effective, which is a HUGE credit to the library, and the authors porting it to help .Net developers. There is a lot more available in these libraries, which is worth looking into!

Similar to my other "Soup to Nuts" type articles, I've created a C# and a VB.Net project that contains everything you need to export a GridView to Excel for viewing. I've done a little header formatting in the example, as well as include an option to exclude columns from being exported (as in the case when you have a GridView with action links in one of the columns. I've also included a sample on how to export the GridView to a file and how to export the GridView to a file and prompt the user to download/open it. Many thanks to [NPOI](http://npoi.codeplex.com/) for making my life a lot easier, and hopefully this will help you to!

**Visual Studio 2010 Solutions** [S2NGridViewExcelCS](https://www.sugarsync.com/pf/D6057691_8153298_87179) (C#) [S2NGridViewExcelVB](https://www.sugarsync.com/pf/D6057691_8153298_87173) (VB)

**Visual Studio 2008 Solutions** [S2NGridViewExcelCS](https://www.sugarsync.com/pf/D6057691_8153298_87177) (C#) [S2NGridViewExcelVB](https://www.sugarsync.com/pf/D6057691_8153298_87171) (VB)

_Note: You'll need [7-Zip](http://www.7-zip.org/) to extract these files:_
---
title: Quick Tip Handy Sort Arrows In Your Gridview Without Css Or Graphics
description: GridView with Arrows
published: 2011-10-07
image: images/posts/quick_tip_handy_sort_arrows_in_your_gridview_without_css_or_graphics.webp
imageAlt: GridView with Arrows
category: Default
tags: [coding, css, graphics, gridview, quick-tip, sorting]
---

![GridView with Arrows](@assets/images/posts/2011-10-sortingwitharrows.png "SortingGridViewWithArrows")

The nice thing about the GridView in .Net is that there is a plethora of built in controls that simply need enabling. One of them is Sorting. Simply set the AllowSorting property to "true" in your and then make sure to write up some code for the Sorting event to adjust your data source, and you're set.

However, one tricky thing to work with is providing a friendly way to indicate which field is being sorted, and in which direction. I've found a simple trick that uses no CSS or images whatsoever.

<!--more-->

They key here is that there is an extended ASCII character for both the up (▲) and down (▼) arrows that are readable by most, if not all, modern browsers. More importantly, they have their HTML friendly counterparts (& #9650;) and (& #9660;) available as well. Go ahead, you can copy and paste those somewhere for a quick reference. 8^D

All we have to do at this point, is add the proper icon next to the column we're sorting as we're rendering the GridView. We do this in the RowDataBound event. Here's what my code looks like, and I'll explain it below:

protected void gvVersions_RowDataBound(object sender, GridViewRowEventArgs e) {

/\* GridView Row has following column layout \* 0 - Actions (Edit) \* 1 - Revision \* 2 - Updated By \* 3 - Updated At \* 4 - Field Changed \* 5 - Old Value \* 6 - New Value \*/

if (e.Row.RowType == DataControlRowType.Header) { LinkButton sortLink; string sortBy = Session\["sortColumn"].ToString(); string sortDir = Session\["sortDirection"].ToString();

// Use the HTML safe codes for the up arrow ▲ and down arrow ▼. string sortArrow = sortDir == "ASC" ? "& #9650;" : "& #9660;";

// GridView rows with sortable columns will have a linkbutton // generated. Compare to the CommandArgument since this is what // we set our sortColumn based on. foreach (System.Web.UI.WebControls.TableCell currCell in e.Row.Cells) { if (currCell.HasControls()) { sortLink = ((LinkButton) currCell.Controls\[0]); if (sortLink.CommandArgument == sortBy) { sortLink.Text = sortLink.Text + " " + sortArrow; } } } }

if (e.Row.RowType == DataControlRowType.DataRow) { VersionLog versionLog = (VersionLog) e.Row.DataItem; e.Row.Cells\[1].Text = versionLog.version.ToString(); e.Row.Cells\[2].Text = versionLog.updatedBy; e.Row.Cells\[3].Text = versionLog.updatedAt.ToString("MM/dd/yyyy hh:mm:ss tt"); e.Row.Cells\[4].Text = versionLog.fieldChanged;

if (versionLog.oldValue != null) { e.Row.Cells\[5].Text = versionLog.oldValue; }

if (versionLog.newValue != null) { e.Row.Cells\[6].Text = versionLog.newValue; } } }

So let's take a quick peek at what's going on here. If we're dealing with our header row, we pull the sorting column and direction out of some session variables that are stored. Sadly the GridView doesn't handle sorting by direction well when you do your own custom binding, so the session works best. Next we set our arrow code based on the direction of the sort. I use the HTML based codes so that it will render nice in the browser. Some browsers may not recognize the ASCII, so its best to use the HTML.

For each column in our GridView, if the column has a SortExpression value assigned to it, a LinkButton control is created to handle it. In our case, we want to check the CommandArgument value of the LinkButton created, and not the text, because I often use friendly names for the text, such as "Updated By" when the underlying data field is "updated_by" or something else. In cells where we have a control, I grab the first (and typically only) control, and look at it's CommandArgument. If it matches the current sorting column, I simply append the arrow to the text and move along. Our DataRows do their typical binding of values from our DataItem.

That's all there is to it! If you click the image at the top of the page, you'll see a simple GridView, with a nice arrow sitting next to it to indicate the sort direction, without the use of CSS manipulation or even additional graphics.

Enjoy!

_Note: In the text and example above, there is a space between the & and the #9650; values since putting them together will render the arrow again on the page instead of the code. Make sure to close that gap again in your own code. 8^D_
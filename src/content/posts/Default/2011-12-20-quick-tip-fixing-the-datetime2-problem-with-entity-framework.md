---
title: Quick Tip Fixing The Datetime2 Problem With Entity Framework
description: Quick Tip
published: 2011-12-20
image: images/posts/quick_tip_fixing_the_datetime2_problem_with_entity_framework.webp
imageAlt: Quick Tip
category: Default
tags: [coding, entity-framework, quick-tip, sql-server, version]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

Ever run into the error "Type datetime2 is not a defined system type." when working with your newly polished and adored Entity Framework model? I did, and here's how you fix it.

<!--more-->

Most of the time you probably won't run into this error. You WILL most likely run into this error if you are on a larger development team with some folks running SQL Server 2008 and some folks are running SQL Server 2005. If you open up your .edmx file for your data model in the XML editor, you'll find this code around line 7:

The important thing to look at is the "ProviderManifestToken" parameter. According to [Microsoft](http://msdn.microsoft.com/en-us/library/bb896311%28v=vs.90%29.aspx), this parameter helps the entity model function while not connected to the database, I think it also helps best structure the queries it generates against the target database. The tricky thing is that every time you update the data model, even to move an object around in the display editor, this value is updated and saved to the database it is connected to.

Case in point, one of the team members I work with has SQL Server 2008 R2, and I'm running SQL Server 2005. When the model was updated on their machine, it set the ProviderManifestToken value to 2008, which included using the datetime2 data type on all date related queries it performed. The problem with this is that SQL Server 2005 doesn't have this data type, and the generated queries would fail.

The solution? Simply change that value back to 2005 (as reported [here](http://connect.microsoft.com/VisualStudio/feedback/details/345018/entity-framework-uses-incompatible-types-e-g-datetime2-when-deployed-to-systems-with-older-sql-server-versions-even-when-source-database-had-compatibility-level-set-correctly)) and recompile the app. You need to remember to do this every time you update the data model when working with SQL Server 2008. Apparently there's no "permanent fix" for this.

It's always the small oddities that make programming so interesting 8^D Enjoy!
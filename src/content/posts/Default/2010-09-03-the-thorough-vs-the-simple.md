---
title: The Thorough Vs The Simple
description: ThoroughSimple Flowchart
published: 2010-09-03
image: images/posts/2010-09-flowchart-vs.webp
imageAlt: ThoroughSimple Flowchart
category: Default
tags: [best-practice, coding, debug, problem-solving]
---

![Thorough/Simple Flowchart](@assets/images/posts/2010-09-flowchart-vs.png)

The other morning I ran into an urgent issue with one of our applications. I had recently made some updates, and had assumed that the end users had tested the full process of uploading data into their system. The process included generating a preview document (which looked fine) upon initial submission, with an import to the database.

As a result of a feature change, the preview document allowed for white spaces in some fields. However, the database itself truncated these white spaces during the scripted import, and caused the import job to fail. This left our end users with missing data, and an urgent time table to get things functional again.

The application itself is nearly 5 years old now (potentially longer), written in an older version of the .Net framework. It is a little "finicky" when it comes to updates, according to other developers that have updated the application. This put me in an interesting situation when it came to fixing the problem. In addition, another bug was discovered with the submission process as a result of this update. There were additional records being saved for the end user, when there shouldn't be. This was due to the end user not having the proper way to "abort" a data entry item, when the previous workflow had a workaround process to make this happen. The page also served as an insert AND edit page, with a few variables in place to indicate which "mode" to function in.

Typically, there are two approaches in resolving this issue:

**The Thorough**

In the thorough approach, I'd evaluate the entire workflow and note where the process is failing and where the workflow is using some bad processing models. In this case I discovered that additional records were being bypassed when the validator count exceeded a certain number, essentially saying, "Don't worry about having THAT many errors, it means we are to ignore this." In addition, we noted that the temporary tables being used to store the preview data didn't quite match the database tables, since whitespace values were getting truncated, causing null column exceptions.

This is where a "refactor" comes in. The entire page/module would be rewritten to accommodate for the new feature and workflow. Using a validator count as a "bypass" would be removed. The local tables would be updated to prohibit space characters from going in, to eliminate problems during the import. Doing this would take a bit of time, but it would make the workflow cleaner, and potentially more efficient. In addition, future updates would be easier to perform as well.

**The Simple**

In the simple approach, I'd look at the existing workflow and data model, and I'd find the "nook" in the code where I could inject some code to resolve the issues at hand. In this case I discovered that I could simply change my blank fields to "N/A". In addition, I find the part in the code when the data values are saved, and do a secondary check to clean up the records.

This is where a "patch" comes in. There are only two major points in the code where changes need to be made, as well as a couple smaller places as well. Doing this gets the job done fast and fixes the known issues we have at this time. We can get the application up and running by midday, clean up a few data problems caused by the bug, and the user can be on smooth sailing again.

Having been in the field for a while, I will note that there are people heavily set in one camp or the other. Sometimes some heated discussions arise between how to resolve an issue like this, and I found both of those camps going to war in my head during the initial diagnosis process of this bug.

How would you resolve it? Which route would you take, the thorough or the simple? I think I've laid out the caveats for both solutions, with all the prerequisite information in place. Let me know what you would do and I'll come back with how I resolved things in a few days...
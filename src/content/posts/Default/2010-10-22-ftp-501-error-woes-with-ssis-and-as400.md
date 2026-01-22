---
title: Ftp 501 Error Woes With Ssis And As400
description: FTPAS400File
published: 2010-10-22
category: Default
tags: ["501", as400, coding, ftp, ssis, troubleshooting]
---

The other day I was helping Anne (our AS400 guru) with an SSIS task needed for a data conversion project she's working on. The process was simple. She'd connect to a file (sort of like a database table) on the AS400 and download the data to a local text file (space padded). She'd then take this file and upload it as a file on the AS400 in another location, which would automatically load it up as a table for viewing/modification.

Anne had created a SSIS package for this that was quite simple. One task to download the file over an ODBC connection, and another task to upload the file via FTP to the server again. However, after configuring and running the package, the job kept failing with the following message:

> 501 Unknown extension in database file name.

Anne had verified the path was correct. The path in question was:

> /qsys.lib/trlibobx.lib/ccstx1p.mbr

The way the AS400 works, if memory serves, is that you specify the file you want to upload into when doing FTP uploads and the server handles the processing of the file into the table accordingly.

After a few proverbial beatings of the head against a wall ni search of details, we donned our Googlian Monk robes and did some searching. Interestingly enough, the FTP task within SSIS doesn't function the same way. We never pulled the full debug log to figure out why, but what we did discover was two key points:

1. Contrary to typical file uploads, when using the FTP task, you DO NOT specify the file that you upload to in your path.
2. When doing uploads in this fashion, the AS400 server will only allow files with a .file in their extension.

With this info, and a few more tweaks to the task, we finally got things to work. Instead of downloading our data into a .txt file, we downloaded it directly into the filename we needed:

![FTPAS400File](@assets/images/posts/2010-10-ftpas400file.png)

Secondly, in the FTP task, we specifed only the path to the location that we were to upload to. We could even overwrite an existing file if it was already there on the server.

![FTPAS400Task](@assets/images/posts/2010-10-ftpas400task.png)

Success! There were a total of three files that needed to go through this routine, and the rest of them took on the magnitude of minutes to accomplish, as opposed to a good 2 hours for the first one. Enjoy!
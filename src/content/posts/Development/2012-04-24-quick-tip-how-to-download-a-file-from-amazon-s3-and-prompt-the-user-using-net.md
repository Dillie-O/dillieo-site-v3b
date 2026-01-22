---
title: Quick Tip How To Download A File From Amazon S3 And Prompt The User Using Net
description: Quick Tip
published: 2012-04-24
image: images/posts/2011-12-quicktip.jpg
imageAlt: Quick Tip
category: Development
tags: [net, amazon, aws, c, coding, download, getobject, httpresponse, prompt, quick-tip, s3, transmitfile]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

Amazon S3 is a wonderfully simple and powerful way to have mass storage at your disposal in the cloud. Amazon provides a wonderful SDK with great examples on how to do the common tasks. However, I ran into one issue I didn't see an example for, and spend the better part of a day piecing my way though. How do download a file from S3 using a web application and prompt the user on what to do with the file.

<!--more-->

By itself, it doesn't seem like there would be an issue with automatically downloading the file. However, if the user doesn't know where the file has been downloaded to, or wants to change the location, problems can occur. Amazon does allow you to change the response headers in the GetObject() method, but this didn't seem to work for me.

The solution I found was to download the file from S3 into a temporary location on the web server, and then serve the file to the user in the HttpResponse using the TransmitFile() method. One advantage to this is that you could potentially setup some local caching with the file, or even do some additional checking with the file, before sending it on to the user. Here's what the final code looks like. This assumes you already have the AWS SDK for .Net configured in your application, if not, you'll need to set that up first. The other thing to note is that our bucket may have a pseudo folder structure in place by use of "/" characters between "folders". The code will parse that to get the actual file name to properly name it upon download.

\[gist]2480125

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

Amazon S3 is a wonderfully simple and powerful way to have mass storage at your disposal in the cloud. Amazon provides a wonderful SDK with great examples on how to do the common tasks. However, I ran into one issue I didn't see an example for, and spend the better part of a day piecing my way though. How do download a file from S3 using a web application and prompt the user on what to do with the file.

<!--more-->

By itself, it doesn't seem like there would be an issue with automatically downloading the file. However, if the user doesn't know where the file has been downloaded to, or wants to change the location, problems can occur. Amazon does allow you to change the response headers in the GetObject() method, but this didn't seem to work for me.

The solution I found was to download the file from S3 into a temporary location on the web server, and then serve the file to the user in the HttpResponse using the TransmitFile() method. One advantage to this is that you could potentially setup some local caching with the file, or even do some additional checking with the file, before sending it on to the user. Here's what the final code looks like. This assumes you already have the AWS SDK for .Net configured in your application, if not, you'll need to set that up first. The other thing to note is that our bucket may have a pseudo folder structure in place by use of "/" characters between "folders". The code will parse that to get the actual file name to properly name it upon download.

\[gist]2480125
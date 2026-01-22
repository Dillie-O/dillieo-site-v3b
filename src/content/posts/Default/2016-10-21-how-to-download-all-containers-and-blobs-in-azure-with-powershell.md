---
title: How To Download All Containers And Blobs In Azure With Powershell
description: Azure Wallpaper
published: 2016-10-21
image: images/posts/how_to_download_all_containers_and_blobs_in_azure_with_powershell.webp
imageAlt: Azure Wallpaper
category: Default
tags: [azure, azure-media-services, coding, powershell, scripting]
---

PowerShell to the rescue once again! A week back I needed to create an archive of all of the video content processed by [Azure Media Services](https://azure.microsoft.com/en-us/services/media-services/) (AMS). While I have used my trusty [Azure Storage Explorer](http://storageexplorer.com) tool in the past, it only allowed me to deal with one container at a time. AMS is structured so that each new job that was created stored it's files in a new container, which made manually grabbing 250+ containers named with GUIDs rather difficult.

<!--more-->

![Azure Wallpaper](@assets/images/posts/2014-03-azure.jpg)

Fortunately, with a little digging online, I was able to build a quick PowerShell script that allowed me to traverse all containers for a given storage account and then traverse all the blobs within the container and download them all. All in all I had about 38GB of data to pull down in about 2 hours. I've saved the script as a Github Gist for you to use if you need it, and for me to [dogfood](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) again later. Enjoy!

https://gist.github.com/c68d8ea53eaf86f588d4716077448a64
---
title: Running Sitefinity In Azure Services
description: sitefinity_logo1.jpg
published: 2017-03-21
image: images/posts/2015-09-sitefinity_logo11.jpg
imageAlt: sitefinity_logo1.jpg
category: Development
tags: [azure, configuration, deployment, geekery, microsoft-azure, sitefinity]
---

A couple years back, I outlined how you could get [Sitefinity](http://www.sitefinity.com) running on an [Azure VM](/installing-sitefinity-with-iis-8-sql-server-2012-and-windows-server-2012). However, with a new dev environment to setup, more advancements in hosting platforms, I went back to see if I could get my Sitefinity site running through the typical Azure App and Database services. Good news is you can and it's quite simple.

<!--more-->

![sitefinity_logo1.jpg](@assets/images/posts/2015-09-sitefinity_logo11.jpg)

## Install Sitefinity

Go ahead and install Sitefinity in your local dev environment as you normally would. There isn't anything particularly special you will need to do here.

## Setup Azure Services

Setup your Azure App Service and Database Service like you normally would. I like to put them together in a resource group and use the standard S0 or S1 configurations, based on your performance needs. The nice thing is that you can scale up (and out) at anytime.

## Migrate Database

Azure Database Services uses a slightly different version of SQL Server 2016, so you won't be able to use SQL Server Management Studio like you normally would. However, there is a fabulous tool called [SQL Azure Migration Wizard](https://sqlazuremw.codeplex.com) that will read the database, generate a script, and then run it against the Azure database. Just make sure you've opened up your firewall to connect.

## Update Files and Deploy

The nice thing is that as far as file modifications are concerned, the only thing you need to do is to update your project file to make sure all your core files, themes, and Sitefinity assets are "Included in the Project". From there, simply modify the ```App_Data/Sitefinity/Configuration/DataConfig.config```

file to use your Azure connection string make sure the "dbType" parameter is set to "SqlAzure".

From here you can use the web deployment wizard to connect to your Azure account, target or create an App Service, and deploy the site. You're up and running in no time!

Enjoy!

A couple years back, I outlined how you could get [Sitefinity](http://www.sitefinity.com) running on an [Azure VM](/installing-sitefinity-with-iis-8-sql-server-2012-and-windows-server-2012). However, with a new dev environment to setup, more advancements in hosting platforms, I went back to see if I could get my Sitefinity site running through the typical Azure App and Database services. Good news is you can and it's quite simple.

<!--more-->

![sitefinity_logo1.jpg](@assets/images/posts/2015-09-sitefinity_logo11.jpg)

## Install Sitefinity

Go ahead and install Sitefinity in your local dev environment as you normally would. There isn't anything particularly special you will need to do here.

## Setup Azure Services

Setup your Azure App Service and Database Service like you normally would. I like to put them together in a resource group and use the standard S0 or S1 configurations, based on your performance needs. The nice thing is that you can scale up (and out) at anytime.

## Migrate Database

Azure Database Services uses a slightly different version of SQL Server 2016, so you won't be able to use SQL Server Management Studio like you normally would. However, there is a fabulous tool called [SQL Azure Migration Wizard](https://sqlazuremw.codeplex.com) that will read the database, generate a script, and then run it against the Azure database. Just make sure you've opened up your firewall to connect.

## Update Files and Deploy

The nice thing is that as far as file modifications are concerned, the only thing you need to do is to update your project file to make sure all your core files, themes, and Sitefinity assets are "Included in the Project". From there, simply modify the ```App_Data/Sitefinity/Configuration/DataConfig.config```

file to use your Azure connection string make sure the "dbType" parameter is set to "SqlAzure".

From here you can use the web deployment wizard to connect to your Azure account, target or create an App Service, and deploy the site. You're up and running in no time!

Enjoy!
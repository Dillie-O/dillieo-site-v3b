---
title: Tame Your Configurationdeployments With Web Config Transforms
description: Tame Your Configurationdeployments With Web Config Transforms
published: 2010-09-27
category: Development
tags: [coding, configuration, connection-strings, webconfig, xml, xslt]
---

Starting out with ASP.Net web apps, one of the maintenance hassles I ran into was managing connection strings and application settings in the web.config file. I typically have three environments for a single application (development on my box, the test server, the live server), which offer a mix of e-mail server, database server, and general configuration changes that affect the app.

Initially, I kept all of my configuration settings in the web.config file, and then commented or uncommented out the appropriate section based on the environment involved. This worked fine until I had to do a "mixed" test where my reference data was reading from the production database and my record data was in the test database. Maintaining the XML there was hideous. In addition, it became difficult at times to explain to the SysAdmin where and how to modify the XML when migrating the application to production. I didn't have access to the production site, and they aren't XML experts.

The next step, and long term solution, was to create separate files for each environment. In this case I'd create a web.config.test, and web.config.prod file and update them with the proper values. When I migrated the application to test, I simply copied the web.config.test file up with it. I then deleted the existing web.config file and rename the .test file accordingly. While not nearly as crazy as the single config file, there still were management issues with the various files. There were plenty of times where I had updated something in the web.config file in an atypical section, and it tricked into test or production. This caused a big headache when the same forms authentication cookie was being used in multiple environments.

With the release of Visual Studio 2010, a new feature came out called Web Configuration Transforms. To create a set of transforms, simply right click on the Web.config file in your ASP.Net project select "Add Config Transforms." That's it! You'll see two new files associated with your web.config file called "Web.Debug.config" and "Web.Release.config". Transformations work by doing simple XSLT transformations on your web.config file to create a new config file. If you open one of these files, you'll see that it is a "diet" version of a web.config file with a few sample values added. The structure of the tranform file matches the architecture of the web.config file, but only where you need changes to occur. For instance, if you needed to modify the connection string for your test environment, open the Web.Debug.config file and add the following lines:

This tells the transform to go to the &lt;connectionStrings section> match the entity with the name "AppSecurity" and replace the connectionString attribute with the new value we specify. The transform requires a unique way of identifying a entity and can then perform the modifications necessary. If you had an application setting that needed updating, you can do the following:

In this case we match the "key" attribute in order to set the value.

You can remove values as well. For instance, by default the following transform is added to your Web.Release.config file:

This entry removes the debug option from the compilation settings so that your production apps don't have the debug data compiled in can slow down the app.

Armed with this data, I was able to easily update my transform files to have the proper application settings and connection strings needed. I also realized that I could keep my forms authentication name updated for the proper environment as well. Going back into the &lt;system.web> section of the transform, I added the following section:

This transform finds my forms authentication section and renames my authentication ticket to my new production value.

The beauty of this is that any section in your web.config can be transformed without maintaining a complete web.config file. You simply apply the transform and get a new file out of it.

The one restriction with web config transforms is that you need to use the Publishing or Deployment tools that are a part of Visual Studio 2010. This in itself isn't that bad either. If you don't have direct access to your deployment locations, you can use the simple publishing tool and specify a new folder on your local machine. That way you get your web.config file tranformed and you have a single location in which to launch from in your deployment process. Up until now I've had to write my own batch file to prep my deployment process, but that isn't an issue either.

If you haven't had a chance to try them out yet, I HIGHLY recommend getting your hands dirty with Web Config Transformations. They'll save you a lot of time and effort with your development process.

Starting out with ASP.Net web apps, one of the maintenance hassles I ran into was managing connection strings and application settings in the web.config file. I typically have three environments for a single application (development on my box, the test server, the live server), which offer a mix of e-mail server, database server, and general configuration changes that affect the app.

Initially, I kept all of my configuration settings in the web.config file, and then commented or uncommented out the appropriate section based on the environment involved. This worked fine until I had to do a "mixed" test where my reference data was reading from the production database and my record data was in the test database. Maintaining the XML there was hideous. In addition, it became difficult at times to explain to the SysAdmin where and how to modify the XML when migrating the application to production. I didn't have access to the production site, and they aren't XML experts.

The next step, and long term solution, was to create separate files for each environment. In this case I'd create a web.config.test, and web.config.prod file and update them with the proper values. When I migrated the application to test, I simply copied the web.config.test file up with it. I then deleted the existing web.config file and rename the .test file accordingly. While not nearly as crazy as the single config file, there still were management issues with the various files. There were plenty of times where I had updated something in the web.config file in an atypical section, and it tricked into test or production. This caused a big headache when the same forms authentication cookie was being used in multiple environments.

With the release of Visual Studio 2010, a new feature came out called Web Configuration Transforms. To create a set of transforms, simply right click on the Web.config file in your ASP.Net project select "Add Config Transforms." That's it! You'll see two new files associated with your web.config file called "Web.Debug.config" and "Web.Release.config". Transformations work by doing simple XSLT transformations on your web.config file to create a new config file. If you open one of these files, you'll see that it is a "diet" version of a web.config file with a few sample values added. The structure of the tranform file matches the architecture of the web.config file, but only where you need changes to occur. For instance, if you needed to modify the connection string for your test environment, open the Web.Debug.config file and add the following lines:

This tells the transform to go to the &lt;connectionStrings section> match the entity with the name "AppSecurity" and replace the connectionString attribute with the new value we specify. The transform requires a unique way of identifying a entity and can then perform the modifications necessary. If you had an application setting that needed updating, you can do the following:

In this case we match the "key" attribute in order to set the value.

You can remove values as well. For instance, by default the following transform is added to your Web.Release.config file:

This entry removes the debug option from the compilation settings so that your production apps don't have the debug data compiled in can slow down the app.

Armed with this data, I was able to easily update my transform files to have the proper application settings and connection strings needed. I also realized that I could keep my forms authentication name updated for the proper environment as well. Going back into the &lt;system.web> section of the transform, I added the following section:

This transform finds my forms authentication section and renames my authentication ticket to my new production value.

The beauty of this is that any section in your web.config can be transformed without maintaining a complete web.config file. You simply apply the transform and get a new file out of it.

The one restriction with web config transforms is that you need to use the Publishing or Deployment tools that are a part of Visual Studio 2010. This in itself isn't that bad either. If you don't have direct access to your deployment locations, you can use the simple publishing tool and specify a new folder on your local machine. That way you get your web.config file tranformed and you have a single location in which to launch from in your deployment process. Up until now I've had to write my own batch file to prep my deployment process, but that isn't an issue either.

If you haven't had a chance to try them out yet, I HIGHLY recommend getting your hands dirty with Web Config Transformations. They'll save you a lot of time and effort with your development process.
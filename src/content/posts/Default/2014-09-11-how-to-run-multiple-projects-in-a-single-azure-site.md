---
title: How To Run Multiple Projects In A Single Azure Site
description: How To Run Multiple Projects In A Single Azure Site
published: 2014-09-11
category: Default
tags: [azure, coding, configuration, deployment, projects]
---

This is probably a fringe case, but here’s the scenario. I have a site for a client that is actually broken down into several projects, but not in a single solution. The layout looks something like this:

- Root Folder

  - - index.html (basic home page with links to project roots)

    - ProjectA

      - - Default.aspx
        - Details.aspx
        - etc...

    - ProjectB

      - - Default.aspx
        - Features.aspx
        - etc...

    - ProjectC

      - - Default.aspx
        - Contact.aspx
        - etc...

By default, if you were to have your root folder checked into source control, and had Azure deploy from the root folder, you’d either have only Project A deployed on the site, or most likely, the deployment would fail with a message that it doesn’t know what project to deploy.

There was nothing I could do to get around this situation, but I did come up with a way to make it work.

<!--more-->

This trick will break a couple of “best practices” but when you need things to work you do what you must.

### Create simple deployment file

The first step is to instruct the Azure deployment not to do anything. To set this up, add a file named .deployment in the Root Folder and give it the following content:

\[config]  
project = .

This will do a “raw” deployment of all the files in the folder (including subfolders).

### Include binaries

Since we’re doing a “raw” deployment without compiling anything, we will have needed to precompile the files for each of the projects. In addition, we’ll need to right click on the bin folder with the project files and use the “Include in Project” option so that they are added to source control (and deployment)

### Add binaries to root

Oddly enough, this still won’t do the trick when it comes to some master template files and other references. The final step is to create a bin folder in the Root Folder (even if there is a simple index.html file there) and copy the binaries from each of the project files there. That way the application can find the binaries necessary if the base pathing isn’t working.

### Deploy and verify

Once all of this is in place, check in your files again and let Azure do it’s deployment. If all goes like it should, the index.html page will come up when you go to the site root and navigating to root/ProjectA will load up the Default.aspx page there without difficulites.

Hope this helps!

###### [Published Using Desk](http://desk.pm)
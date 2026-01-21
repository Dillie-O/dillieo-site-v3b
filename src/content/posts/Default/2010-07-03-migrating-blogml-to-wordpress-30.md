---
title: Migrating Blogml To Wordpress 30
description: Migrating Blogml To Wordpress 30
published: 2010-07-03
image: images/posts/migrating_blogml_to_wordpress_30.webp
imageAlt: Migrating Blogml To Wordpress 30
category: Default
tags: [blogml, coding, import, wordpress]
---

_Update (1/18/2013): An amazing developer by the name of [Patrick Daly](http://developdaly.com/) has updated this plugin through GitHub to import tags too. Go grab it [here](https://github.com/developdaly/BlogML-Importer-for-WordPress)!_

_Update: My plugin has been approved by WordPress! I've updated the documentation and links accordingly._

As part of my [migration](/bienvenue-wordpress) to WordPress 3.0, I needed to get all of my posts migrated over. My comments were stored via [Disqus](http://disqus.com), and I'm working with them on migrating that data to the new URL slugs.

[BlogEngine.Net](http://dotnetblogengine.net/) uses [BlogML](http://blogml.codeplex.com/) as their sole export format, which became a little tricky, since there is still no WordPress importer built in to handle this.

As is with most things in life, we are all standing on the shoulders of giants. In this case, [Aaron Lerch](http://www.aaronlerch.com) was my giant and he had created a great BlogML importer, which included all of the necessary XPath information needed to import blog entries.

The only problem is that the plugin was created to work with WordPress 2.6, and the format for importing content has changed since then. The 'wp-admin/imports' folder no longer exists in 3.0, and it could have been earlier than that as well.

An initial peek of the importer code didn't yield any results to me, but installing the simple RSS importer and examining that code allowed me to see what was going on. With the newer format for importing, you downloaded a plugin, which upon activation registered itself with the import module used in WordPress. All I needed to do was to put this registration wrapper around the existing code, update some documentation, and voila, a working BlogML importer!

Just as my giant has opened the code up, I'm doing the same, for any BlogEngine.Net, [SubText](http://subtextproject.com/), or other BlogML formatted folks out there that are thinking of migrating to WordPress.

Before importing, you'll want to go into your BlogML file and look for any file or image references that exist and update them accordingly. For instance, with BlogEngine.Net, it uses a 'file.axd' HTTP helper to deliver a lot of its files. You can always update this data after the import. It is up to you.

Using the importer is rather simple:

1. Log into your WordPress site and go to the 'Plugins' section.
2. Click the "Add New" button and search for the term "blogml".
3. Find the 'blogml-importer' plugin and install it.
4. Activate the plugin.
5. Go to the Tools->Import screen, and select the 'BlogML' option.
6. Follow the directions to complete the process.

As an added bonus (thanks to Aaron), the import process will create a CSV file that maps the old permalinks found in the BlogML file to the new permalinks that WordPress generated. It will also give you the option of mapping posts to a current user, or to create a new user account for them.

I ran this process and had all of my posts migrated over in a few seconds. Granted I only had 65 posts, but it still saved me a lot of time. I'm still doing a bit of image/link cleanup, but that is simple to do.

One other important item to note is that categories and tags may or may not be properly imported. In my case, none of my tags came over, and my categories came over named as GUIDs. Renaming the categories didn't take long and I'll simply need to retag my posts. Again, considering the time it would have taken me to renter all of my posts (and I know others have lots more), I'm not too worried about this.

I hope this helps other folks out their with their WordPress migrations. I'm hoping to look through the import code again, and work on getting some of the category/tag issues resolved. I may even try to do some kind of auto-detecting on the image/file links to provide a proper "remap" option like with the user import. Once the plugin is approved in the codex, I'll update my link to point there.

Enjoy!

If you want to download the plugin go to the direct link [here](http://wordpress.org/extend/plugins/blogml-importer).

UPDATE: If you want a standalone tool that will migrate BlogML to WordPress, check out the [Blog Migration Tool](http://blogmigrator.codeplex.com) I wrote over on CodePlex.
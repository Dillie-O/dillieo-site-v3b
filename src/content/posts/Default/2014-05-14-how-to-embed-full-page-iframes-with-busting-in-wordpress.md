---
title: How To Embed Full Page Iframes With Busting In Wordpress
description: How To Embed Full Page Iframes With Busting In Wordpress
published: 2014-05-14
category: Default
tags: [coding, frame-busting, iframe, jquery, wordpress]
---

Sometimes (at least I did) you need to embed a page (maybe even your own) in “full screen" within your WordPress site. The problem is that by default, you’ll have the header, footer, and any widgets also embedded in the site. This can cause some layout nightmares. However, here’s a trick I have put togetether to render these kind of pages and keep your links working properly.

<!--more-->

The best way to embed a page in your current one is through the use of an iFrame. By now you’ve probably seen them in action. They’re rather ubiquitous and easy to implement. As it’s core, it is as simple as:

…and you will see it show up in your page.

With WordPress, you can start a new page in your site, go to Text mode, insert the code above, and you’d be all set.

However, at this point, you’ll see your header, footer, widgets, etc. on the page. We need a way to get rid of all of this.

**Step 1: Create a “Content Only” Template**

Thanks to the WordPress template stucture, this is an easy task. Open up your text editor of choice and paste in the following code:

Save this file to whatever you like (I named mine page-contentonly.php) and upload it into the wp-content/themes/\[theme] folder that you are currently using.

Next, create a new page and paste the iFrame code listed above. Go over to the right hand side of the WordPress editor and find the drop down for your page templates. You can now select the “Content Only” page template.

Now publish your page and give it a peek. Voila! Your iFrame page fills the entire screen (without the “double scrollbar issue”) and none of your header/footer/widget areas are in place.

There’s one last step to this process.

**Step 2: Create “iFrame busting” code**

The one downfall with the iFrame is that any links that you click, will load within the iFrame, which can cause issues with your URLs or other resources. To fix this, we add some simple JavaScript code to the end of your normal page templates. Depending on how your theme is setup, there may be a widget, a footer.php file, or some other page that contains your closing &lt;/body> tag. Find this file/section and add the following code:

The beauty about this little snippet is that it only runs when the page loaded is within an iFrame. It also will update all links and form elements with the proper target, so there is nothing used unless absolutely necessary.

That’s it! Nest iFrames in your WordPress site without the headers/footers as needed!

###### _...Proudly published using [Desk PM](http://desk.pm)_
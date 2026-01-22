---
title: How To Add Zurb Foundation 5 To A Laravel 4 App
description: How To Add Zurb Foundation 5 To A Laravel 4 App
published: 2014-05-29
category: Development
tags: [coding, laravel, setup, zurb]
---

I needed to rebuild a simple [game timer app](http://gametimer.roku-mart.com) and figured it would be a great way to get my feet wet with [Laravel](http://laravel.com). I’ve heard great things about it and wanted to give it a try. I also wanted to upgrade the application to use [Zurb Foundation 5](http://foundation.zurb.com), since I already used 4 with the application and wanted to use the latest and greatest. Unfortunately, there aren’t any composer packages or ruby gems or other handy installers to get Zurb into my Laravel project. It turns out it isn’t as hard as you might think.

<!--more-->

To add Zurb Foundation 5 to your Laravel 4 project, you simply need to do the following:

1. Follow the [Laravel Quickstart](http://laravel.com/docs/quick) to start a fresh application if you don’t have one already.
2. [Download](http://foundation.zurb.com/develop/download.html) Zurb Foundation 5 from their site. Note: Don’t install the Sass version. This may be a deal breaker for you, but not for me.
3. Copy the css resources into the public/css folder in your Laravel project.
4. Copy the javascript resources into the public/js folder in your Laravel project. This will wind up having a subfolder for foundation and vendor, but that is okay. All of the scripting paths are relative and can find things without a hassle.
5. Edit your app/views/layout.blade.php file so that it looks something like this:

That’s all there is to it! You can see where there are yield statements for title, content, and custom script imports, as well as a basic top bar with navigation in place. You can customize this to your heart’s content.

Enjoy Laravel 4 and Zurb Foundation 5 quick and easy!

###### [_...Proudly published using Desk PM_](http://desk.pm)

I needed to rebuild a simple [game timer app](http://gametimer.roku-mart.com) and figured it would be a great way to get my feet wet with [Laravel](http://laravel.com). I’ve heard great things about it and wanted to give it a try. I also wanted to upgrade the application to use [Zurb Foundation 5](http://foundation.zurb.com), since I already used 4 with the application and wanted to use the latest and greatest. Unfortunately, there aren’t any composer packages or ruby gems or other handy installers to get Zurb into my Laravel project. It turns out it isn’t as hard as you might think.

<!--more-->

To add Zurb Foundation 5 to your Laravel 4 project, you simply need to do the following:

1. Follow the [Laravel Quickstart](http://laravel.com/docs/quick) to start a fresh application if you don’t have one already.
2. [Download](http://foundation.zurb.com/develop/download.html) Zurb Foundation 5 from their site. Note: Don’t install the Sass version. This may be a deal breaker for you, but not for me.
3. Copy the css resources into the public/css folder in your Laravel project.
4. Copy the javascript resources into the public/js folder in your Laravel project. This will wind up having a subfolder for foundation and vendor, but that is okay. All of the scripting paths are relative and can find things without a hassle.
5. Edit your app/views/layout.blade.php file so that it looks something like this:

That’s all there is to it! You can see where there are yield statements for title, content, and custom script imports, as well as a basic top bar with navigation in place. You can customize this to your heart’s content.

Enjoy Laravel 4 and Zurb Foundation 5 quick and easy!

###### [_...Proudly published using Desk PM_](http://desk.pm)
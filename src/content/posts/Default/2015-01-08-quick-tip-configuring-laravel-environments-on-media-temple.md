---
title: Quick Tip Configuring Laravel Environments On Media Temple
description: Quick Tip Configuring Laravel Environments On Media Temple
published: 2015-01-08
image: images/posts/quick_tip_configuring_laravel_environments_on_media_temple.webp
imageAlt: Quick Tip Configuring Laravel Environments On Media Temple
category: Default
tags: [coding, configuration, environment, htaccess, laravel, php]
---

_Note: This applies to Laravel 4. I'm still looking into options for Laravel 5..._

I ran into a pesky little bug today where the Laravel standard environment configuration by hostname wasn’t working on a Media Temple deployed site. After some digging and tweaking, here’s how you get it to work…

<!--more-->

### Cause

Media Temple uses a form of dynamic hostnames for it’s grid server hosting. As a result, even when you run “hostname” at the command prompt and use that value it will not work for you.

### Solution

A simple way to get environments to work is to add a server variable into your .htaccess file that resides in the “public” folder of your site. Add the following line to set an environment variable:

```SetEnv HTTP_LARAVEL_ENV "test";```

_Important Note: Media Temple requires you prefix your variable with HTTP\_ for security reasons._

Then we modify our bootstrap/start.php file (around line 27) to check for the variable when starting up:

```$env = $app->detectEnvironment(function() { return $_SERVER['HTTP_LARAVEL_ENV'] ?: 'local'; });```

Notice here that we have a fallback here so that if the environment variable isn’t found, we default to local. I know that Laravel has a “production default” mindset for it’s configuration, but I prefer to default to local because it will typically crash the app in the test/production environment and I can easily determine if I have an improper setup. In addition, having this setup doesn’t require me to do anything additional in my local development environment.

There you have it. Deploy this and you should have your environment configurations singing along nicely.

### Final Note

If you were using the original “hostname” type configuration, you may have been able to run the standard artisan migrate command from the command line without problems. With this new configuration, you’ll need to add one more parameter when running it:

```php artisan migrate —env=test```

### Bonus Tip

Getting weird errors when trying to run migrations from the command prompt? By default Media Temple uses PHP 5.3 and you’ll need PHP 5.4+ in order to properly run Laravel. Make sure you configure the directory from the administrative panel to use the latest version of PHP. Then you can run your migrations from the command prompt as such:

```php-latest artisan migrate —env=test```

Enjoy!!!
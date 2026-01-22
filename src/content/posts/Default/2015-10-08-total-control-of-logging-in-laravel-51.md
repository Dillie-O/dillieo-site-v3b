---
title: Total Control Of Logging In Laravel 51
description: Laravel-5.png
published: 2015-10-08
image: images/posts/total_control_of_logging_in_laravel_51.webp
imageAlt: Laravel-5.png
category: Default
tags: [coding, configuration, laravel, logging]
---

A little while back I showed how to [configure LogEntries with Laravel 5.0](/quick-tip-adding-logentries-to-laravel-5-0). Now that I’ve updated to 5.1, I needed to update the configuration to use Laravel’s new layout. In addition, I needed to control the level at which log entries were being saved to remove the clutter of the logs in the staging/production environment. Here’s how you set that up.

<!--more-->

![Laravel-5.png](@assets/images/posts/2015-05-laravel-51.png)

With Laravel 5.1, they offer a configureMonologUsing method that you can add to your bootstrap/app.php file and customize what and how Monolog is setup. Looking through some of the existing code, the different Monolog handler types support a “log level” parameter. They are just set to “debug” by default in it’s core configuration. What we do then is add a couple of extra variables to our .env file:

LOGGING_LEVEL - Can be set to DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, or ALERT

LOG_MAX_FILES - Maximum files to use in the daily logging format.

From there we add the following code to our bootstrap/app.php file right before the final line that returns the $app variable:

```
$app->configureMonologUsing(function($monolog) {

// Configure default file logger to follow level conventions in // environment configuration. $logLevels = Logger::getLevels(); $logLevel = env('LOGGING_LEVEL', 'DEBUG'); $logMaxFiles = (int)env('LOG_MAX_FILES', 5); $storagePath = realpath(__DIR__.'/../') . '/storage';

$monolog->pushHandler( $handler = new RotatingFileHandler( $storagePath . '/logs/laravel.log', $logMaxFiles, $logLevels[$logLevel]) );

$handler->setFormatter(new LineFormatter(null, null, true, true));

// Configure logentries to follow level conventions in environment configuration. $logEntriesHandler = new LogEntriesHandler(env('LOGENTRIES_TOKEN')); $monolog->pushHandler($logEntriesHandler, $logLevels[$logLevel]); });
```

That’s all there is to it. If you compare this to the default code, you may have noticed that I didn’t use the storagePath variable, because that value hasn’t been defined yet. Instead we use the “raw” pathing that the storagePath call when setting itself up.

The final step (and another blog post) will be to allow upating the logging configuration on the fly, something that [I like to do with my .Net based apps](/changing-log4net-configurations-dynamically).

Enjoy!
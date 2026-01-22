---
title: Laravel 5 Configurations In Aws Elastic Beanstalk
description: Laravel 5 Configurations In Aws Elastic Beanstalk
published: 2015-05-29
image: images/posts/2015-05-laravel-51.webp
imageAlt: Laravel 5 Configurations In Aws Elastic Beanstalk
category: Default
tags: [aws, coding, configuration, eb, elastic-beanstalk, laravel, rds]
---

I’m working on a new project that is running an API using Laravel 5. We’re also hosting it on Amazon’s Elastic Beanstalk service, which gives us great scaling capabilities on the fly. However, since new instances of your application can be added/removed on the fly, setting your configuration requires a little more tweaking than the base install provides.

<!--more-->

![](@assets/images/posts/2015-05-laravel-51.png)

With Laravel 5, they have adopted the [phpdotenv](https://github.com/vlucas/phpdotenv) library to provide a flexible configuration setup. Simply create a .env file in the root of the site with the configuration overrides that you need, and the library will load them into the environment variables. You’ll see that in configuration files in Laravel will contain code such as:

```'key' = env('APP_KEY', 'SomeRandomString’)```

Which will check for an environment variable named APP_KEY, or default to the alternate value. Before this code has run, phpdotenv has already found our .env file and loaded our APP_KEY value into the environment accordingly.

Both phpdotenv, and Laravel, use the mindset that the overrides are intended for development use only, so your production values should be in the configuration files. This brings up two issues that we have to resolve.

### AWS RDS Connection Strings

If you have an AWS RDS database in conjunction with your database, Amazon does a great thing and auto-generates environment variables that you need to connect to your database. These are easily referenced through variables such as \$\_SERVER\["RDS_HOSTNAME”]. However, the .env file is designed to have basic text, so you can’t put a server variable there. In addition, if you put this value into the “default” condition in the env() method, it generates an error in local development, because from what I can see, env tries to retrieve both values and then evaluate them, instead of finding the env first and then continuing. While you could technically put the actual database values that AWS provides (which are very cryptic for security), I still don’t like that prospect in the event that I have multiple databases scaled up through RDS or they change on me. Instead, we change our app/database.php file to use the shortcode ternary operator instead:

```'host' = env('DB_HOST') ?: $_SERVER["RDS_HOSTNAME"]```

This will do our standard env check. In the local environment our .env file will already have DB_HOST set. In production, with no .env file, this value will be null, so we then grab our RDS_HOSTNAME value and set that for our DB_HOST. We have a dynamic setting that is secure, and we can still have our local overrides without hassle.

### Using .env for Staging Environment

So by now, your configuration files have all of your production values, and for your local development you have your .env file in place with all of your local overrides in it. But what do you do for your staging environment? For me, we have an EB instance up and running, but some of our configuration values (like URLs and app keys) are different than production. How do we account for this?

One thing we could do is to SSH in to the server, create a .env file with our settings, and let things run as usual. The problem with this is that as soon as we push a fresh code change up, EB will build a new instance and that .env file is wiped out. We could add extra server side conditions to our configuration files based on the server name, but with the dynamic nature of EB, those server names could change as well.

What we do instead is we create a special “elastic beanstalk” version of our .env file that we check into our code repository, and then add some additional instructions to our EB deployment. In case you didn’t know, you can create a .ebextensions folder in the root of your project and add additional commands, configurations, etc to your EB instance. More details about that can be found [here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers.html).

The first step is to create a .env.elasticbeanstalk file in the root of our project and put our staging details in there, it could be something as:

```APP_ENV=staging APP_DEBUG=true APP_URL=staging.example.com```

Then, in our .ebextensions folder, we create a new file, named 01envconfig.config and add the following lines:

```container_commands: # Copy EB env configuration file over 01_config_environment: command: mv /var/app/ondeck/.env.elasticbeanstalk /var/app/ondeck/.env```

Note that spacing is important here and not to use tab characters.

Save these files and run your Elastic Beanstalk deployment again. What will happen is that your elasticbeanstalk config file will be renamed .env, allowing you to have your staging overrides in place. You can update this later to use a different file or command if necessary when deploying to your production environment.

There you have it, a nice way to handle managing Laravel 5 configurations with Elastic Beanstalk that will handle your local/staging/production unique configurations as well as remain stable and flexible during any scaling/deployments that AWS EB will do for you.

If you know any other tricks, make sure to share them!
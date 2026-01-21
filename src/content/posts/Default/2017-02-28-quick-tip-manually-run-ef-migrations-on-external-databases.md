---
title: Quick Tip Manually Run Ef Migrations On External Databases
description: quick_tip_banner
published: 2017-02-28
image: images/posts/quick_tip_manually_run_ef_migrations_on_external_databases.webp
imageAlt: quick_tip_banner
category: Default
tags: [coding, Database, entity-framework, migrations]
---

Entity Framework migrations are a great thing. They've made my development life a LOT easier. Automated migrations can cause problems, especially on a project with multiple developers involved. For that, we use manual migrations through the Package Manager Console.

But how do you manually run these migrations against your test (or live) server when your deployment tool doesn't run them? If you have access to the database in question, you can add the ConnectionString and ProviderName parameters at the Package Manager Console prompt and make life a lot easier:

```Update-Database -ConnectionString "MY_CONNECTION_STRING" -ConnectionProviderName "System.Data.SqlClient"```

You can pull your connection string direct from your web.config transform, no special "magic" needed.

Enjoy!

<!--more-->

![quick_tip_banner](../img_post/2017-02-28-quick-tip-manually-run-ef-migrations-on-external-databases/2017-02-quick_tip_banner.jpg)
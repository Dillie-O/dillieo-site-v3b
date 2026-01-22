---
title: Freeform Friday 7
description: art-graffiti-abstract-vintage.jpg
published: 2016-05-06
image: images/posts/freeform_friday_7.webp
imageAlt: art-graffiti-abstract-vintage.jpg
category: Default
tags: [coding, sql, sql-server, t-sql]
---

_Simply write about the first thing that comes to your mind …. NOW!_

I have two new favorite commands in SQL Server, especially given the insane digging I've done in a huge database with oddly named columns and tables:

```EXEC sp_fkeys '[Table_Name]'```

This gem will give you all of the foreign keys for a given table, and what table they are referencing. Helpful when building things out or tracking them down.

Update: Looking for the opposite? Looking for the tables/keys that are referencing the table you're inspecting, use this syntax

```EXEC sp_fkeys @fktable_name='[Table_Name]'```

That will flip the data around.

```SELECT \* FROM information_schema.COLUMNS WHERE column_name like '%[Column_Name]%'```

Wondering where in the world the table that said column in a side referenced documentation / form is actually located at, this will find it for you. It also includes views.

Any other handy SQL Server tricks to share?

<!--more-->

![art-graffiti-abstract-vintage.jpg](@assets/images/posts/2016-01-art-graffiti-abstract-vintage.jpg)
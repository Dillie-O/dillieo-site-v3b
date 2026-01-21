---
title: Quick Tip Insert Sequentially Random Data In Mysql
description: quick-tips.jpg
published: 2015-11-04
image: images/posts/quick_tip_insert_sequentially_random_data_in_mysql.webp
imageAlt: quick-tips.jpg
category: Default
tags: [life]
---

I ran into this problem yesterday. In the process of flushing and reloading a lookup table in a MySQL database, I had accidentally flushed one of the join tables that it used as well since it had a cascading delete attached to it.

<!--more-->

![quick-tips.jpg](../img_post/2015-11-04-quick-tip-insert-sequentially-random-data-in-mysql/2015-01-quick-tips.png)

I needed to reseed this table in two ways. The first was the job_id field, which was sequential for all the job records I had. The second was the category_id table, which at this point could be a random id from 1 to 6 for testing purposes. While I could have manually done this for a trivial amount of rows, I had 3000 rows to update and not a lot of time, so I needed a smarter solution.

Thanks to some StackOverflow questions and a little tweaking, I was able to put together this little stored procedure that did the trick:

\[gist]50133cf07309d86872ee

You can see that we use the v_counter as our incremental updater for our job_id column, which is why we start things at 1. Make sure to remove the stored procedure when done.

Know a more elegant way? I'd love to see it!
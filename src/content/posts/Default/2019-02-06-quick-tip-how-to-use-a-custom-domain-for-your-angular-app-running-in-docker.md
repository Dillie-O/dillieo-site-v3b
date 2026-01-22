---
title: Quick Tip How To Use A Custom Domain For Your Angular App Running In Docker
description: Quick Tip How To Use A Custom Domain For Your Angular App Running In Docker
published: 2019-02-06
image: images/posts/quick_tip_how_to_use_a_custom_domain_for_your_angular_app_running_in_docker.webp
imageAlt: Quick Tip How To Use A Custom Domain For Your Angular App Running In Docker
category: Default
tags: [angular, coding, configuration, docker, domain]
---

<!-- wp:paragraph -->

So you've used one of the default templates out there to build and deploy your Angular app using Docker. Fabulous! Now let's wire it up so that way you can use something more meaningful than localhost...

<!-- /wp:paragraph -->

<!-- wp:more -->

<!--more-->

<!-- /wp:more -->

<!-- wp:image {"id":6566} -->

![](@assets/images/posts/2017-02-quick_tip_banner.jpg)

<!-- /wp:image -->

<!-- wp:paragraph -->

I'm a big fan of using a custom local domain for development work. It makes it much easier to enable SSL and can also eliminate certain headaches with platforms such as Google login that won't recognize localhost as a valid request source.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

The first step is to update your `docker-compose.yml` file to have your container listening for a specific hostname. Add this to your angular/services/web section (depending on what you named it):

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

`hostname: epicsite.test`

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Additionally, you'll want to map your local port 80 to the container port 4200, since this is what the default Angular project runs out of:

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

`ports:`  
`- 80:4200`

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Finally, update your `Dockerfile` command to ignore specific IP addresses and leverage the "public host" parameter to indicate your custom domain:

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

`CMD ng serve --host 0.0.0.0 --public-host epicsite.test`

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

That's all there is to it. Rerun your `docker-compose build` and `docker-compose up` commands and you're now running your site on a local domain without the localhost shenanigans!

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Final note: make sure you update your hosts file so that your `epicsite.test` domain points to your loopback IP address (127.0.0.1). Alternatively (and what I prefer nowadays) you can use [dnsmasq](https://passingcuriosity.com/2013/dnsmasq-dev-osx/).

<!-- /wp:paragraph -->
---
title: How To Redirect Your Domain Or Subdomain To Your Windows Azure Website
description: Message Cube CNAME Example
published: 2014-03-31
image: images/posts/2014-03-messagecube_cname_sample.png
imageAlt: Message Cube CNAME Example
category: Default
tags: [links]
---

I've become quite a fan of Windows Azure, through both a personal project and a project I'm working on for a client. All the resources I need are at my fingertips, being able to do instant deployments from source control is a HUGE time saver, and the infrastructure is stable and scalable. One thing that was a little tricky at first was how to get my new subdomain to redirect to my Azure account, and here's how to make it happen.

<!--more-->

### TL;DR

For those that are familiar with all of this, you need to first create a CNAME record that points your domain to awverify.azurewebsite.com and let that be verified by Azure. This may take a few hours depending on domain propagation. After that, create an A record for your domain to point to the IP address listed in the "Manage Domains" section of your website settings and set the domain name associated with it.

### First Step: Verifying You Own the Domain

Before Azure will host your website under a domain name, it wants to verify you actually own the domain (or subdomain) name in question. To do this, we create a CNAME record for our domain in question that forwards to Azure's special "verification" domain of awverify.\[yoursubdomain].azurewebsites.net. You need to make sure the redirect is for "awverify" on both ends. For example, you create a CNAME record that points:

```
awverify.messagecube.cu.cc TO awverify.messagecube.azurewebsites.net
```

For added assistance, I go ahead and create a CNAME redirect for my main domains as well

```
messagecube.cu.cc TO messagecube.azurewebsites.net
```

Your screen will vary based on your domain provider, but mine looks like this:

![Message Cube CNAME Example](@assets/images/posts/2014-03-messagecube_cname_sample.png)

You can verify that this is working when doing a ping on your "awverify" domain resolves to the IP addresses listed in your "configure domain" settings on your website. This may take minutes or hours depending on how your particular domain provider propagates their changes and for them to spread.

![Message Cube IP Address Example](@assets/images/posts/2014-03-messagecube_ipaddress_sample.png)

### Second Step: Creating the A Record Redirect

Once you've verified that the CNAME record is propagating properly, now you can create an A record that will redirect the IP address of your domain to the Azure IP for your website (see screenshot above). The first step is to log in to your Azure website, go to the "Configure" section. Scroll down to the "domain names" section, and click the "Manage Domains" button. Type in the URL of your subdomain, and wait for the green checkbox to light up next to the domain name.

![Message Cube Domain Configuration.](@assets/images/posts/2014-03-messagecube_domain_verify.png)

Then, go back to your domain provider, and add an A name record that points your subdomain to the IP address of your Azure site:

![Message Cube A Record Example](@assets/images/posts/2014-03-messagecube_aname_sample.png)

That's it! Again, depending on how long your domain provider propagates the settings, it may take a few minutes to a couple of hours to finalize.

### Final Step: Check the redirect on the site.

Finally, open up your domain in the browser and make sure the redirects are working!

![Message Cube Redirect Sample](@assets/images/posts/2014-03-messagecube_final.png)

There you have it! Hopefully this gets you past any tricky ends you may have run into redirecting your subdomains to Windows Azure websites. Enjoy!
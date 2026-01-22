---
title: How To Test Fake Email Addresses
description: How To Test Fake Email Addresses
published: 2016-01-05
image: images/posts/how_to_test_fake_email_addresses.webp
imageAlt: How To Test Fake Email Addresses
category: Default
tags: [coding, email, faker, testing]
---

_…otherwise subtitled “Fake e-mail addresses aren’t so fake afterall…"_

As part of an ongoing project, we needed to setup a large amount of dummy accounts, to test workflow, messaging, and other critical aspects to the system. In order to do this, we used a standard “faker” type library that allows us to easily generate as many fake names, e-mail addresses, addresses, whatever you need. We then run our unit tests, which involve sending e-mail messages through Mandrill. This worked fine until...

<!--more-->

![](@assets/images/posts/2016-01-1452002376_1.jpg)

...one day we received an e-mail message from an actual person, wondering why they were getting a notification about Event X occurring. This was a genuine surprise, especially considering the “fake” e-mail address wasn’t attached to a hotmail or gmail domain, but to a randomized domain that was generated as well. Discovering this issue also led into some further investigation which showed that our Mandrill rating had been tarnished due to the large volume of “rejected” e-mails that the testing attempted to send. Mandrill does have a test mode, but we hadn’t turned this on.

So how can you do some form of proper e-mail testing without those complications. Here are two tricks that worked out for us.

### Use example.com domain

The example.com domain has been setup to automatically accept any e-mail messages that come to it. The e-mail is dropped, but for purposes of making sure Mandrill is functioning properly, or your internal mail code is delivering e-mail, you can create random accounts using the example.com domain and test away.

### Use Gmail +1 addresses

Another trick that helps is that if you have a Gmail account, you can send an e-mail to \[YourEmailId]+1@gmail.com and the message will be sent to your “main” email address. The +X works with nearly anything: joe+1, joe+test, joe+superrandomness, etc. All of these e-mails will all go to the main “joe" e-mail account. This also works for Google Apps hosted e-mail accounts.

Using the +1 addresses allows you to setup multiple accounts in your application that require e-mail addresses and use them beyond your unit tests. Typically the e-mail address must be unique for accounts, so this will give you the unique addresses you need and all of the important e-mails will be funnelled into a single account that you can use to verify/track notifications, workflow, etc. In addition, there is no need to sign up on multiple platforms (outlook, yahoo, etc.) just to do some basic testing.

Once we reconfigured our faker scripts to use example.com domains and setup multiple “working accounts” using the +1 tagging, our e-mail testing went a lot smoother.

Do you have any other tricks for app testing that requires e-mail, I’d love to hear them!
---
title: Getting Bamboo Build Notifications In Slack Using Zapier
description: Getting Bamboo Build Notifications In Slack Using Zapier
published: 2015-07-23
image: images/posts/2015-07-bambooslacknotification.webp
imageAlt: Getting Bamboo Build Notifications In Slack Using Zapier
category: Default
tags: [bamboo, build, coding, continuous-integration, email, integration, slack, zapier]
---

[Zapier](http://zapier.com/) to the rescue again!!! We’re using the [Bamboo](https://www.atlassian.com/software/bamboo/) continuous integration platform that Atlassian provides to verify our unit tests are running before we submit pull requests. With 5 developers on a project, each touching different aspects of the code, having a solid unit test foundation is key. While “cloud” bamboo hosting has a variety of notification options, posting to a Slack channel is not one of them. However, this trick will get you running in no time.

<!--more-->

![](@assets/images/posts/2015-07-bambooslacknotification.jpg)

I went into a little more detail about setting up Zapier in a [previous post](/getting-appharbor-build-messages-in-slack-using-zapier), so I’m going to keep this post a little more abbreviated and outline the structure, and you should be able to fill in the rest.

### The Recipe

For this integration we’re using a Zapier Email message as a trigger, which will then post to our Slack channel.

### Zapier Email

Bamboo allows you to send build notifications to e-mail addresses that are not users registered in the system. Zapier will give you a free e-mail address to send those messages to. Use the “Zapier Email” trigger option and give it a descriptive name, or use the default. There’s a handy copy button to copy the e-mail address to your clipboard. Do this and then click the “next” button to get ready to test things.

### Configure Bamboo

Back in Bamboo, go to your project settings and select the notifications tab. I decided to have all build statuses (pass and fail) go to my Zapier e-mail address. That was it. At this point, you’ll want to manually trigger a build so that the Zapier has some content to work with. Depending on your project, this may take a minute to complete.

### Finalize and Test

Once the build is done, go back to Zapier and use the test feature. It’ll show you the contents of the e-mail message stripped out into various parts. The options aren’t quite as robust as other zaps for what goes into the notification. I wound up using the “stripped text” option since it had the core results as well as the link to the actual build, which slack will convert to a clickable link. Click the final test button and voila, your build message is posted to your slack channel.

### Be Fruitful and Build/Test/Deploy!

That’s all there is to it. While Bamboo can send me individual notifications, having these get pushed into our team Slack channel allows us to communicate as a team a bit more. Maybe somebody else can jump in to see why the build failed and can fix it really quick, or I might need to merge in a successful build that I wasn’t on the notification list for. It’s quite handy.

Enjoy!
---
title: Dynamically Updating Environment Variables In Postman
description: quicktip
published: 2018-01-02
image: images/posts/dynamically_updating_environment_variables_in_postman.webp
imageAlt: quicktip
category: Default
tags: [api, coding, environment, postman, tools]
---

If you haven't used [Postman](https://www.getpostman.com) yet for your general development needs while building or consuming a REST (or SOAP!) API, go get this amazing tool NOW and then keep reading. Otherwise, here's a quick tip to make to help when dealing with frequently changing environment variables, such as session IDs or JWT tokens.

<!--more-->

![quicktip](../img_post/2018-01-02-dynamically-updating-environment-variables-in-postman/2018-01-quicktip.jpg)

As you may know, Postman includes this amazing feature called "environments". This allows you to setup variables that you can add into your API requests to make things easier. For example, you may have a variable called "server" in which you put the destination server to call. By doing this through environments, you can have one address, {{server}}/auth/login, but then simply reconfigure the server value to match the environment your in. No more copy/paste or retype nightmares.

Taking this one step further, Postman ALSO has a pre-request and post-request (also known as test) scripting possible This allows you to either do some advanced prep work before making your request, or do some testing of your API request to make sure things actually ran smoothly instead of having to inspect the details.

Taking this one step further, we can leverage this scripting to help with some tedious tasks. For a recent project I was on, we were using standard JWT authentication. After the login, we needed to resubmit the JWT token in all of our subsequent requests. Originally, my workflow looked something like this:

1. Execute login API endpoint.
2. Scroll down to results and find JWT value.
3. Copy JWT value (oh yeah, make sure you grab it all since it is rather long.
4. Open up environment configuration.
5. Paste updated JWT value (make sure you removed the old value completely first).
6. Save. Close. Move on to next command.

However, thanks to the scripting features. I added two simple lines of text to the "Tests" section of my API endpoint configuration:

https://gist.github.com/Dillie-O/bf745fa785e7e3cfcafa5894247589de

Just like that, every time I run the API call, my environment variable is updated automatically, saving me lots of time and tedium! Note that the 'jsonData.data.JWT' value will be different depending on the structure of your payload.

What Postman tricks do you use? I'd love to hear about them!
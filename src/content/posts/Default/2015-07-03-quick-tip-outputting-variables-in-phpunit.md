---
title: Quick Tip Outputting Variables In Phpunit
description: Quick Tip
published: 2015-07-03
image: images/posts/2011-12-quicktip.jpg
imageAlt: Quick Tip
category: Default
tags: [coding, debug, phpunit]
---

I've been running through PHPUnit a bit lately, and sometimes I need to track some of the variables as I'm going through the tests. I've found two tricks that have helped...

<!--more-->

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

### var_dump and --debug

If you add a var_dump(\$variable) to your unit test, you can use the --debug flag when running the unit tests to see the var_dump in the output. This is particularly helpful with arrays or objects.

### stderr output

If you need to output a single variable, or sometimes just a basic message, you can write to stderr, which in turn will push the message out to the screen

```fwrite(STDERR, print_r('Message', TRUE));```

That's it. Oh, and I like to use the --tap option for a little more verbose output when running the tests.

Enjoy!
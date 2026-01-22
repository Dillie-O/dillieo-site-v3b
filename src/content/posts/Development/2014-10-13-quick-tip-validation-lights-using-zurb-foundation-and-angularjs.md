---
title: Quick Tip Validation Lights Using Zurb Foundation And Angularjs
description: Quick Tip Validation Lights Using Zurb Foundation And Angularjs
published: 2014-10-13
category: Development
tags: [angularjs, coding, form, foundation, ui, ux, validation, zurb]
---

The more I play with [Zurb Foundation](http://foundation.zurb.com) and [AngularJS](http://angularjs.org), the more I love it. As a middle tier / backend developer, having these tools at my disposal gives me a nice looking app with powerful client side data binding / object manipulation with little work.

Here’s a little trick I came up with this weekend while working on a [pet project](https://prayerjournal.firebaseapp.com) to do form validation without taking up much space on the screen.

<!--more-->

I won’t go into much explanation here, I’ll let the CodePen do most of the talking. The trick here is to leverage the postfix form layout with Zurb (I’m actually using both prefix and postfix) in conjunction with angular’s validation and no-show / ng-hide directives to show or hide our error/valid span within the postfix.

This example doesn’t actually show the error messages, since I’m trying to optimize for a mobile layout, but you could easily display error messages below the inputs or potentially collate them all above/below the form entry.

Note that the create/cancel buttons don’t actually work, they are just there for show. You can see, however, that the create button will not be enabled until everything is valid.

I hope this helps! Enjoy!

http://codepen.io/Dillie-O/pen/vwDBL/

The more I play with [Zurb Foundation](http://foundation.zurb.com) and [AngularJS](http://angularjs.org), the more I love it. As a middle tier / backend developer, having these tools at my disposal gives me a nice looking app with powerful client side data binding / object manipulation with little work.

Here’s a little trick I came up with this weekend while working on a [pet project](https://prayerjournal.firebaseapp.com) to do form validation without taking up much space on the screen.

<!--more-->

I won’t go into much explanation here, I’ll let the CodePen do most of the talking. The trick here is to leverage the postfix form layout with Zurb (I’m actually using both prefix and postfix) in conjunction with angular’s validation and no-show / ng-hide directives to show or hide our error/valid span within the postfix.

This example doesn’t actually show the error messages, since I’m trying to optimize for a mobile layout, but you could easily display error messages below the inputs or potentially collate them all above/below the form entry.

Note that the create/cancel buttons don’t actually work, they are just there for show. You can see, however, that the create button will not be enabled until everything is valid.

I hope this helps! Enjoy!

http://codepen.io/Dillie-O/pen/vwDBL/
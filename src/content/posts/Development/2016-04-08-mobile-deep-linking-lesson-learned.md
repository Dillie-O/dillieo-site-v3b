---
title: Mobile Deep Linking Lesson Learned
description: deep_linking_mobile1-249x300
published: 2016-04-08
image: images/posts/2016-04-deep_linking_mobile1-249x300.png
imageAlt: deep_linking_mobile1-249x300
category: Development
tags: [coding, deep-linking, mobile]
---

You've probably heard of "deep linking" when it comes to mobile apps. These are the clever links that sit in your e-mail and launch your mobile app instead of going to a web page based. It's really slick and helpful, except there can be some hidden pitfalls.

<!--more-->

![deep_linking_mobile1-249x300](@assets/images/posts/2016-04-deep_linking_mobile1-249x300.png)

On one hand, deep links are pretty simple. You can install your mobile app and have it register a URI handler so that while "HTTP://" launches the web browser, "EPICAPP://" will launch your new epic app. You can add your own paths beyond that, for account activation, load an item, whatever you want.

The problem (as it came to full fruition today) is that a lot of mobile mail reading apps (I'm looking at you Gmail) will strip out that URI prefix because it isn't recognized as a "standard" one. As a result, your deep link are effectively nerfed since you'll lose a good chunk of your users.

What's the solution? One option is to use a service like [deeplink.me](http://deeplink.me). They allow you to setup a "standard" URL for your notifications that will detect what kind of device clicked the link (desktop, iPhone, Android Phone, etc.) and redirect the user to the appropriate location (your mobile app or the web browser). They can even provide analytics to see who is clicking on your links and which devices are in the most use.

If you're in a bind (like I was today) or don't quite have the budget to sign up for a service, you can setup a special path on your web app that does a redirect to your deep link. This will allow your mobile e-mail client to have a "proper" link. The user taps on it, which launches their mobile browser. The endpoint redirects the user to the applications deep link, and the browser will prompt you to open the link in that app. Problem solved. Sure it's a "double hop" but it's better than losing a lot of your users.

Oh, and if you're using Laravel, you can set this up quite easily in your routes.php file:

```php
\* Deep Link Redirect - For mobile redirect to application */ 
Route::group(['prefix' => 'mobile'], function() 
{
    Route::get('activate/{userId}/{key}', function($userId, $key) 
    { 
        return Redirect::to('epicapp://activate/key?userId=' . $userId . '&key=' . $key); 
        die(); 
    }); 
});
```

Here's my example: I have my mobile e-mail contain with a link to

```http://epicapp.com/activate/99/w00tk3y```

Larval will hit this and redirect to my special deep link

```epicapp://activate/key?userId=99&key=w00tk3y```

This prompts me to open the app and we're gravy!

Hope this helps!

You've probably heard of "deep linking" when it comes to mobile apps. These are the clever links that sit in your e-mail and launch your mobile app instead of going to a web page based. It's really slick and helpful, except there can be some hidden pitfalls.

<!--more-->

![deep_linking_mobile1-249x300](@assets/images/posts/2016-04-deep_linking_mobile1-249x300.png)

On one hand, deep links are pretty simple. You can install your mobile app and have it register a URI handler so that while "HTTP://" launches the web browser, "EPICAPP://" will launch your new epic app. You can add your own paths beyond that, for account activation, load an item, whatever you want.

The problem (as it came to full fruition today) is that a lot of mobile mail reading apps (I'm looking at you Gmail) will strip out that URI prefix because it isn't recognized as a "standard" one. As a result, your deep link are effectively nerfed since you'll lose a good chunk of your users.

What's the solution? One option is to use a service like [deeplink.me](http://deeplink.me). They allow you to setup a "standard" URL for your notifications that will detect what kind of device clicked the link (desktop, iPhone, Android Phone, etc.) and redirect the user to the appropriate location (your mobile app or the web browser). They can even provide analytics to see who is clicking on your links and which devices are in the most use.

If you're in a bind (like I was today) or don't quite have the budget to sign up for a service, you can setup a special path on your web app that does a redirect to your deep link. This will allow your mobile e-mail client to have a "proper" link. The user taps on it, which launches their mobile browser. The endpoint redirects the user to the applications deep link, and the browser will prompt you to open the link in that app. Problem solved. Sure it's a "double hop" but it's better than losing a lot of your users.

Oh, and if you're using Laravel, you can set this up quite easily in your routes.php file:

```php
\* Deep Link Redirect - For mobile redirect to application */ 
Route::group(['prefix' => 'mobile'], function() 
{
    Route::get('activate/{userId}/{key}', function($userId, $key) 
    { 
        return Redirect::to('epicapp://activate/key?userId=' . $userId . '&key=' . $key); 
        die(); 
    }); 
});
```

Here's my example: I have my mobile e-mail contain with a link to

```http://epicapp.com/activate/99/w00tk3y```

Larval will hit this and redirect to my special deep link

```epicapp://activate/key?userId=99&key=w00tk3y```

This prompts me to open the app and we're gravy!

Hope this helps!
---
title: Quick Tip Linking User Identity To Oauth Tokens In Webapi
description: Quick Tip Linking User Identity To Oauth Tokens In Webapi
published: 2015-02-02
image: images/posts/quick_tip_linking_user_identity_to_oauth_tokens_in_webapi.webp
imageAlt: Quick Tip Linking User Identity To Oauth Tokens In Webapi
category: Default
tags: [net, coding, identity, role, token, user, webapi]
---

In my [Zurb For Applications .Net Scaffolding](/sharing-the-love-zurb-foundation-for-apps-scaffolding-for-net-with-authentication), I setup a base .Net WebAPI project that uses oAuth tokens for a better form of authentication in a single page application model. Since the token provides any details about the user that you want to encode, here’s a quick trick to expose the User.Identity.Name and User.IsInRole methods to improve the authentication and authorization capabilities within your app.

<!--more-->

![](../img_post/2015-02-02-quick-tip-linking-user-identity-to-oauth-tokens-in-webapi/2015-02-quicktip_useridentitytoken1.png) The trick comes in the GrantResourceOwnerCredentials method that is used to verify the credentials and add return the oAuth context for the user logging in. Typically you see a new claim record created as such:

```cs
var identity = new ClaimsIdentity(context.Options.AuthenticationType); 
identity.AddClaim(new Claim("sub", context.UserName)); 
identity.AddClaim(new Claim("role", "user"));
```

The ClaimsIdentity constructor has several signatures available, and one that allows you to define which claim fields are to be used for the Identiy.Name and role properties for the object. What we can do is update the constructor to look something like this:

```cs
var identity = new ClaimsIdentity(context.Options.AuthenticationType, "id", "role"); 
identity.AddClaim(new Claim("sub", context.UserName)); 
identity.AddClaim(new Claim("username", context.UserName)); 
identity.AddClaim(new Claim("id", userId)); 
identity.AddClaim(new Claim("role", "user"));
```

From here you can see that I’ve identified the “id” claim and the “role” claim to be used. Now, after the user is logged in and you are processing a request from the WebApi, you can simply use:

```cs
var userId = User.Identity.Name;
```

…and the Id of the authenticated is available to you. This allows you to run user targeted requests and not have to worry about passing their unique Id in plain text, since it is encoded (and properly decoded) within the authentication token we are already using. In addition, executing:

```cs
var isUser = User.IsInRole(“user”);
```

…will return true since we’ve properly mapped the user role. Hope this helps!
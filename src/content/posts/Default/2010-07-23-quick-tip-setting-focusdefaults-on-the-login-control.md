---
title: Quick Tip Setting Focusdefaults On The Login Control
description: Quick Tip Setting Focusdefaults On The Login Control
published: 2010-07-23
image: images/posts/quick_tip_setting_focusdefaults_on_the_login_control.webp
imageAlt: Quick Tip Setting Focusdefaults On The Login Control
category: Default
tags: [aspnet, coding, configuration, controls, login, quick-tip]
---

When working with Forms Authentication on an ASP.Net application, its quite convenient that there is a Login web control already available for you. It has all the necessary buttons, and you can easily customize and add text to the login prompts. You can disable the remember password and reset options if you want as well.

The one problem though is that by default, the Username field doesn’t have focus, and pressing the Enter key doesn’t click the “Login” button for you. However, you can get both of these features in two simple lines of code. Assuming the name of your login control is “AppLogin”, simply add the following code to the Page_Load method of your login page:

https://gist.github.com/Dillie-O/5709773

That’s all you need. The odd naming convention when setting the default button is due to the fact that the control is going to be rendered at runtime, and ASP.Net likes to add some additional text to enforce that all controls are uniquely named. You may need to view your login page for the first time and search for the text “LoginButton” to find out how the control is uniquely named. In my case, I have my login page as a content page within a master template.

Hope this helps!
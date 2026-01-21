---
title: Accessing Ajax Rendered Controls Via Javascript
description: Accessing Ajax Rendered Controls Via Javascript
published: 2010-05-11
image: images/posts/accessing_ajax_rendered_controls_via_javascript.webp
imageAlt: Accessing Ajax Rendered Controls Via Javascript
category: Default
tags: [ajax, aspnet, coding, javascript]
---

The AJAX library and Control Toolkit provided for ASP.Net helps you do some really cool things that previously would have taken a lot of work. AutoComplete Textboxes (like when you start typing into Google's search box), rounded corners, post backs without the flicker, and even more become something you can be easily added into basic line of business apps that would often be reserved for front facing apps due to the time or complexity involved with them.

However, there is one gotcha with the way that the dynamic controls are created. In order to preserve the uniqueness of control Ids, the AJAX library will put a prefix in front of the Id you assign to a control, to make sure duplicates do not occur. Go ahead and take a peek at your AJAX enabled application, you'll find a lot of controls named

when you named your control

as its name. Sometimes you'll also run into this issue when you're dealing with a lot of master/child templates, especially when tossing in user controls into the mix.

Normally this isn't much of a problem. Most of the client side interaction is already handled by the dynamic JavaScript code AJAX generates for you. In addition, when you go to access the controls through your code behind page, you can get to them just fine using their original names.

The problem arises when you need to do some additional magic through JavaScript with these dynamically created control. For example, I created a simple employee search box for our internal applications that leverages the AutoCompleteExtender control. When you type in a partial last name, like Patt, it returns all employees in the list that match that last name. In my particular case, I had additional textboxes that contained the employee's first name and Id that I wanted populated into additional textboxes on the page.

The mechanics behind making this work isn't hard at all. The AutoCompleteExtender has an event called OnClientItemSelected that allows you to write your own client side code to handle what happens once the user selects an item. A little bit of work later and I had the following client side code:

function SetEmployeeDetails(source, eventArgs) { var RawData = eventArgs.get_value(); var RawDataRegex = /(\\d{5}):\\s(.+),\\s(\\w+)/; var EmployeeInfo = RawData.match(RawDataRegex);

$get('txtSearchEmployeeId').value = 'c' + EmployeeInfo\[1]; $get('txtSearchEmployeeLastName').value = EmployeeInfo\[2]; \$get('txtSearchEmployeeFirstName.ClientId').value = EmployeeInfo\[3]; }

The basic interpretation of the code is that the selected value is split into the individual fields and put into the textboxes.

The problem we run into is that when the AutoComplete controls are rendered, they are given the ctl00\_ type markup in front of the code. This breaks the JavaScript code listed above. One way to resolve this issue is to peek at your rendered page and then hard code the JavaScript code to the extended names. I've done this. It works. However, once you move this control to another page, or if you want to wrap your AutoComplete controls within a user control, the name changes and you are back to square one.

The answer to this is to escape your JavaScript code with a little bit of .Net code. This is how classic ASP works and there is a lot of .Net code (particularly when it comes to data binding GridView controls) that still leverages this trick. I personally don't like to escape code out of my ASPX pages, but I also code by the rule the right tool for the job and this is the case where it is the right tool. The other alternative would be to dynamically register a JavaScript block when the page (or control) is rendered, but in my opinion that would create more hassle than it is worth.

So in our case, we take advantage of the fact that each server control has a property called ClientId which contains the name of the control as it is rendered on the page. We can get at this value and escape it into our \$get() function to get our extended control name. When we do things this way, the code looks like this on our ASPX page:

function SetEmployeeDetails(source, eventArgs) { var RawData = eventArgs.get_value(); var RawDataRegex = /(\\d{5}):\\s(.+),\\s(\\w+)/; var EmployeeInfo = RawData.match(RawDataRegex);

$get('&lt;%= txtSearchEmployeeId.ClientId %>').value = 'c' + EmployeeInfo\[1]; $get('&lt;%= txtSearchEmployeeLastName.ClientId %>').value = EmployeeInfo\[2]; \$get('&lt;%= txtSearchEmployeeFirstName.ClientId %>').value = EmployeeInfo\[3]; }

When the page is rendered to the user, the &lt;%= %>sections will be processed before the HTML is written (just like our PHP/ASP works) and the server will inject the extended name of the control. From there, you can take this code to any page you need, or create as many controls as you need, and the page will make sure the proper Id is injected into the JavaScript code to be used with your method.

If you''ve found any other clever ways around this issue (with jQuery or anything else for that matter), share it here! I'm always looking for new tricks to add to my toolkit. Enjoy!
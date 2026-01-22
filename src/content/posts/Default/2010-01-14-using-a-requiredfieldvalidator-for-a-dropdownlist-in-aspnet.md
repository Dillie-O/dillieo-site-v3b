---
title: Using A Requiredfieldvalidator For A Dropdownlist In Aspnet
description: Using A Requiredfieldvalidator For A Dropdownlist In Aspnet
published: 2010-01-14
category: Default
tags: [aspnet, coding, dropdownlist, required, validator]
---

_Yes, chalk this up to a “well duh” moment since one has been out there for quite a while. But hey, never stop learning, right?_

Typically when I’m working with DropDownLists on my web pages, I like to add a “Select…” option to the list to prompt the user for a value. I could always specify a default value when loading the page, but more often than not it adds to the confusion for my end users. So the basic DropDownList looks like this:

One quick note, which I had discovered along the way. The **AppendDataBoundItems** property will take any statically created ListItems you have in the control and bind them to the DropDownList before your databound elements are added. This is nice because it prevents you from having to do any fancy data sorting tricks or manual code behind additions of ListItems. The only downside to this is that if you clear the DropDownList and rebind the control, (say to present a new set of options) you’ll lose the static items. But for most of your “one time” loads, this works great.

So lets attach a basic RequiredFieldValidator control to this DropDownList since we want to make sure a value has been specified:

This validator displays an \* next to the control itself and the error message is getting piped over to a ValidatorSummary control (not shown).

The problem with this configuration is that by default, the SelectedIndex is set to 0 for the DropDownList when it is databound. If you were to drop a simple RequiredFieldValidator and target the drop down list, it would evaluate as Valid every time you submitted, since it treats –1 as a legitimate value.

The trick to solving this problem is to use the **InitialValue** property that comes with the RequiredFieldValidator. The InitialValue property tells the validator what the state of the targeted control was at page load, so that the control is valid if it has data in it and its not equal to the initial value specified. Our updated RequiredFieldValidator looks like this:

And that’s all there is to it! No need to write any fancy client side validation, any custom server side validation controls, no special value tricks. Believe me, I’ve been through them all. You can customize your InitialValue however you like (even if you bind all of your data items dynamically) and you are set.
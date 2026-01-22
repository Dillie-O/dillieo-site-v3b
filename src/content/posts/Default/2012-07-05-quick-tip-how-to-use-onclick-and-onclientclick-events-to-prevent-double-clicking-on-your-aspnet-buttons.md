---
title: Quick Tip How To Use Onclick And Onclientclick Events To Prevent Double Clicking On Your Aspnet Buttons
description: Quick Tip
published: 2012-07-05
image: images/posts/2011-12-quicktip.webp
imageAlt: Quick Tip
category: Default
tags: [aspnet, button, coding, controls, disable, double-click, jquery, onclick, onclientclick, quick-tip, usesubmitbehavior]
---

![Quick Tip](@assets/images/posts/2011-12-quicktip.jpg)

While ASP.Net provides an excellent validator set of controls, sometimes you need to "roll your own" so to speak when creating your controls. In addition, if you have some AJAX processing with your buttons behind the scenes (for example, saving a record in a popup window) you run the risk of having "double saves" occurring when the user clicks on the button and nothing happens immediately.

Having struggled with this issue myself lately, it took a little more work than anticipated to get this to work properly. Here's how you get everything to play nicely together.

<!--more-->

The first step is to wire up your code behind event that does your processing. If you're doing this in C# you setup your OnClick event:

```<asp:Button ID="btnSave" runat="server" Text="Save" OnClick="btnSave_Click" />```

If you're doing this in VB.Net, there's no need to use the OnClick value in your button, you can go straight to the code behind, create your method name, and use the Handles keyword, specifying your buttons click event:

```Protected Void Sub btnSave_Click Handles btnSave.Click ' Code here End Sub```

The next step is to do our validation using Javascript (we're using jQuery in here).

```
function validatePage() { var check = true;

// Check only simple textbox for now if (\$("#txtImportant").val() == '') check = false;

if (!check) { alert('Missing data. Please complete'); return false; } else { $("#MainContent_btnSave").val('Processing...'); $("#MainContent_btnSave").attr("disabled", true); return true; } }
```

There are a couple of important notes to this function. The first is not to forget that ASP.Net by default likes to help uniquely name your server controls, hence the "MainContent\_" prefix on our save button. You can use the ClientIdMode property if you need to get around this. The next is that we prevent the user from double clicking the save button by disabling the button and changing it's text to say "Processing..." Finally, we only disable the button if the validation succeeds. This prevents us from having to disable and re-enable the button based on the results. Oddly enough it also makes sure that our return value in the HTML element processes correctly, which was probably one of the biggest glitches I ran across during this process.

Now we need to wire up the Javascript processing. To do this, we use the OnClientClick method that is available for most .Net server controls. While looking at our code above looks straightforward enough (return false to abort the script or true to continue with the post back) we do have to change our logic slightly. Having a "return true" statement doesn't let the button continue it's post back, it will cause it to stop processing (almost the same as a return false command). Instead, we let our logic only abort if our validation failed:

```<asp:Button ID="btnSave" runat="server" Text="Save" OnClick="btnSave_Click" OnClientClick="if (!validatePage()) {return false;}" />```

Finally, since we're overriding the HTML onClick event on the control (thanks to the OnCilentClick property) that even if your validation method succeeds, the code behind method won't fire off. To work around this, we use the UseSubmitBehavior property of the button control and set it to false. What this does is appends the appropriate \_\_doPostBack call after our Javascript code. The final code for your button looks like this:

```<asp:Button ID="btnSave" runat="server" Text="Save" OnClick="btnSave_Click" OnClientClick="if (!validatePage()) {return false;}" UseSubmitBehavior="false" />```

That's all there is to it. Now when you click on the button, if the validation fails, you'll get the alert box. Otherwise, the button will become disabled with a "processing" message and your code behind method will run.

A couple of final notes about this approach.

The first is that you're responsible for enabling the button again after the post back. In our case, it was sufficient enough to simply reload the page again, so we had a fresh set of data and the button was reset in that manner.

The second note is that depending on how your page is laid out, you may see your button automatically change from "Save" to "Processing..." to "Save" again. I ran into this issue. The reason for it was that we had a modal layer in which the save button was located. When the postback occurred, the ViewState was re-rendering the page with the modal layer in place. Then there was "RegisterClientScript" method injected that caused the page to reload. In my case, the solution was to edit the client script that was registered in the code behind to change the text and status label again. That way when the page was rendered again, the save button remained disabled and in a "processing" state:

```// Redirect to edit page with created id. ClientScript.RegisterStartupScript (GetType(), "Load", String.Format("<script type='text/javascript'>" + " $(\\"#MainContent_btnSave\\").val(\\"Processing...\\");" + " $(\\"#MainContent_btnSave\\").attr(\\"disabled\\", true);" + " window.parent.location.href = 'Edit.aspx?id={0}';" + "</script>", ourObject.id.ToString()));```

There's one quick note to make about ImageButtons. Since they don't have the "UseSubmitBehavior" available to them, you have to manually call the PostBack method within the Javascript in order to make it continue after disabling the button. For ImageButtons, your code will look something like this:

```<asp:ImageButton ID="imbSave" runat="server" Text="Save" CommandName = "DoImageButtonFunction" CommandArgument = "X" OnClientClick="if (!validatePage()) {return false;} else{\_\_doPostBack(this.name, '');}" />```

Hopefully this gets your through some headaches in your more complex data validation/processing situations. If you have any better tricks, please send them by!
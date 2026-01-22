---
title: Soup To Nuts Creating A Timeout Notifier In Aspnet Using Ajax Toolkit Or Jquery
description: TimeoutSampleToolkit
published: 2011-04-05
image: images/posts/2011-04-timeoutsampletoolkit.webp
imageAlt: TimeoutSampleToolkit
category: Default
tags: [ajax, coding, javascript, jquery, session, timeout]
---

## The Quandary

One of those "gotchas" that a new developer faces when working with ASP.Net is that the SessionTimeout variable you find in the web.config only applies to the server side end of things, not the client. The problem with this is that if the client's session has ended, they won't know it, and the next time they post back to the server, they'll either run into an error, or have their forms blanked out (if they were working on them) and not know why.

The trick is to develop a solution that will track the timeout value on the client end (browser) as well as make the appropriate updates to the server end. Fortunately, anytime that a post back is made to the server, or a new page is loaded, ASP.Net automatically handles our session processing. Our main focus will be on developing the client end.

In order to prevent the user from accidentally clicking elsewhere and bypassing the warning, we'll present the warning as a modal popup window that they'll be forced to interact with. As the title says, I'll show you how to implement this using either the AJAX Control Toolkit or jQuery (leveraging jQueryUI), so you can implement it in whatever system you're more comfortable with.

<!--more-->

## The Algorithm

On the client end, our logic is going to work like this.

1. We create a flag called DoLogout that indicates whether or not to log the user out.
2. Every X amount of minutes (we'll call it TimeoutMinutes) we check to see if the DoLogout flag is set to 1. If so, we process our logout. If not, we'll reset the flag and check again later. We'll also do an arbitrary post back to the server so that we can make sure the server side session timeout is reset as well.
3. Every Y amount of minutes, we warn the user (we'll call it WarnMinutes) that they are about to time out, and ask them if they want to keep their session alive. If they say yes, then we set the DoLogout flag to 0, and we'll warn the user again later.

## Implementing the Client Processing

We'll create a separate JavaScript file called TimeoutMethods.js and put all of our functionality in there. Here's what it looks like:

var DoLogout = 1; var WarnMills; var TimeoutMills var RedirectURL;

function StartTimeout(TimeoutValue, WarnValue, URLValue) { TimeoutMills = TimeoutValue; WarnMills = WarnValue; RedirectURL = URLValue; setTimeout('UserTimeout()', TimeoutMills); setTimeout('WarnTimeout()', WarnMills); }

function UserTimeout() { if (DoLogout == 1) { top.location.href = RedirectURL; } else { DoLogout = 1; setTimeout('UserTimeout()', TimeoutMills); setTimeout('WarnTimeout()', WarnMills); } }

function WarnTimeout() { // To be updated later }

function PreserveSession() { DoLogout = 0; \_\_doPostBack('btnPreserveSession', ''); }

Note: I'm leaving the WarnTimeout() function blank for now, because this function will differ slightly based on your AJAX or jQuery implementation. Notice how our StartTimeout function serves as the gateway to our timeout implementation. This allows us to easily register a single JavaScript code block and to configure out timeout variables in a web.config file.

## Configuring and Registering the Timeout Code

In our web.config file, we add the following application settings in order to appSettings section so we can reconfigure things on the fly:

Notice that you can effectively disable the warning event (should you desire) by setting the value larger than the timeout value. This is helpful if you just want to log the user out of the application without warning.

Since the JavaScript code is in an external file, we need to make sure that it is properly loaded on the page. It is best to load it using the ScriptManager that is provided in ASP.Net AJAX WebApplications. You'll find it right below the &lt;form> tag in the web page you create, and you simply update the section accordingly:

The final step is to register the timeout code to run when the page is loaded. Update your Page_Load method accordingly.

Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load Dim AppTimeout As Integer Dim WarnTimeout As Integer Dim AppURL As String

If Not Request.Path.Contains(&amp;amp;quot;Login.aspx&amp;amp;quot;) AndAlso \_ Not Request.Path.Contains(&amp;amp;quot;Logout.aspx&amp;amp;quot;) Then

AppTimeout = Convert.ToInt32(ConfigurationManager.AppSettings(&amp;amp;quot;AppTimeoutMinutes&amp;amp;quot;)) WarnTimeout = Convert.ToInt32(ConfigurationManager.AppSettings(&amp;amp;quot;AppWarnMinutes&amp;amp;quot;)) AppURL = ConfigurationManager.AppSettings(&amp;amp;quot;AppLogoutURL&amp;amp;quot;)

lblTimeoutCount.Text = (AppTimeout - WarnTimeout).ToString()

Page.ClientScript.RegisterStartupScript \_ (Me.GetType, &amp;amp;quot;InitTimeout&amp;amp;quot;, &amp;amp;quot;StartTimeout(&amp;amp;quot; &amp;amp;amp; AppTimeout \* 60000 &amp;amp;amp; &amp;amp;quot;,&amp;amp;quot; &amp;amp;amp; WarnTimeout \* 60000 &amp;amp;amp; &amp;amp;quot;,'&amp;amp;quot; &amp;amp;amp; AppURL &amp;amp;amp; &amp;amp;quot;');&amp;amp;quot;, True) End If End Sub

Note that since JavaScript processes the timeout calculation in milliseconds, we need to pass it millisecond values to the StartTimeout method.

You'll notice a couple of odd things here. First is why we're checking to see if the request path is Login.aspx or Logout.aspx. This code is here to demonstrate how you can use this as part of a MasterPage type setup. That way you can keep your Login/Logout pages using the same template as the rest of your application, but avoid having the timeout scripts run. The second is the lblTimeoutCount.Text statement in there. We'll get to that shortly.

Now that the script is ready to go, the final step is to setup our modal warning box, based on the display framework we want to use.

## Warning Box using AJAX Control Toolkit

What we need to do is create a panel that contains our warning message and then attach a ModalPopupExtender to this panel. If it hasn't been done already, the AJAX Control Toolkit is added as a reference to the application and we make sure the assembly is registered at the top of our page.

We add this to the bottom of the page, before the closing &lt;form> tag, and you can see the stylesheet for the styling done to the popup:

&amp;quot;&amp;gt;&amp;lt;/asp:Label&amp;gt; minutes due to inactivity. &amp;lt;br /&amp;gt;&amp;lt;br /&amp;gt; Please click the button below if you are still using the application. &amp;lt;/p&amp;gt;

&amp;lt;p style=&amp;quot;text-align: center;&amp;quot;&amp;gt; &amp;lt;asp:Button ID=&amp;quot;btnPreserveSession&amp;quot; runat=&amp;quot;server&amp;quot; CausesValidation=&amp;quot;false&amp;quot; Text=&amp;quot;Preserve Session&amp;quot; /&amp;gt; &amp;lt;/p&amp;gt; &amp;lt;/asp:Panel&amp;gt; &amp;lt;cc1:ModalPopupExtender ID=&amp;quot;mpeSessionTimeout&amp;quot; runat=&amp;quot;server&amp;quot; TargetControlID=&amp;quot;pnlSessionTimeout&amp;quot; BackgroundCssClass=&amp;quot;TimeoutBackground&amp;quot; BehaviorID=&amp;quot;mdlSessionTimeout&amp;quot; DropShadow=&amp;quot;true&amp;quot; OkControlID=&amp;quot;btnPreserveSession&amp;quot; OnOkScript=&amp;quot;PreserveSession()&amp;quot; PopupControlID=&amp;quot;pnlSessionTimeout&amp;quot;&amp;gt; &amp;lt;/cc1:ModalPopupExtender&amp;gt;

From here, we update our WarnTimeout method in our JavaScript file to include the following method to trigger our modal popup:

You're all set! Build the app, navigate to the page and wait for the notification to appear:

![TimeoutSampleToolkit](@assets/images/posts/2011-04-timeoutsampletoolkit.png)

## Warning Box using jQuery

The jQuery and jQueryUI libraries already have a modal dialog plugin that operates simple as well. After downloading the two libraries and placing them within your application (don't forget the image files that comes as part of jQueryUI) make sure to reference them accordingly.

In our Scripts section of our ScriptManager we add:

In the &lt;head> section of our page we add:

Then we add a div section to the bottom of the page, before the closing &lt;form> tag, and there is no need to use stylesheets thanks to the styling built into jQueryUI

&amp;quot;&amp;gt;&amp;lt;/asp:Label&amp;gt; minutes due to inactivity. &amp;lt;br /&amp;gt;&amp;lt;br /&amp;gt; Please click the button below if you are still using the application. &amp;lt;/p&amp;gt;

&amp;lt;p style=&amp;quot;text-align: center;&amp;quot;&amp;gt; &amp;lt;asp:Button ID=&amp;quot;btnPreserveSession&amp;quot; runat=&amp;quot;server&amp;quot; CausesValidation=&amp;quot;false&amp;quot; Text=&amp;quot;Preserve Session&amp;quot; OnClientClick=&amp;quot;PreserveSession()&amp;quot; /&amp;gt; &amp;lt;/p&amp;gt; &amp;lt;/div&amp;gt;

Finally, we update our WarnTimeout method in our JavaScript file to include the following method to trigger our modal popup:

You're all set! Build the app, navigate to the page and wait for the notification to appear:

![TimeoutSamplejquery](@assets/images/posts/2011-04-timeoutsamplejquery.png)

## Conclusion

I hope this bit of code helps you get your own sites off the ground that need a Timeout mechanism for it. Its tricky keeping track of the session on the client and server end, and this script does the job nicely. Attached below is a full project for you to build and work with. It runs in VB.Net, but there's only about 3 lines of code behind involved and is easily converted to C#.

Download Project Files:

Visual Studio 2008 - [Download](http://1drv.ms/1GvtJTW)

Visual Studio 2010 - [Download](http://1drv.ms/1IKBr0d)
---
title: Simple Global Andamp Editable Application Settings In Winforms Applications
description: Simple Global Andamp Editable Application Settings In Winforms Applications
published: 2009-10-02
category: Development
tags: [application, coding, configuration, settings, winforms]
---

Global application settings are a great way to store those pieces of an application that might need to change through the life of an application, such as a client Id number, but not be stored differently for every user of the application, such as the preferred color to display items.

There has always been the AppSettings part of the app.config file, but with the release of .Net 2.0 Framework, a nice new Settings class was added that made easy to get strongly-typed settings variables within your application. It also allowed you to define categorizations or groups for these variables, which allowed for additional organization. The only glitch to this is that the Application scoped variables are set to a read-only format. The thought process behind this is that the application variables would be modified by a developer or experienced person, but done outside of runtime through Notepad or something.

I've been wearing my Googlian Monk robes over the past couple days in deep meditation trying to find a way to fix this issue and there isn't one that is easy to implement. However, there **is** a simple way to get Application scoped variables that are easily modifed by going back to our simple, yet friendly, AppSettings section that exists in our app.config file.

To do this, simply add an &lt;appSections> section in your app.config file: &lt;?xml version="1.0" encoding="utf-8" ?> &lt;configuration> &lt;configSections> &lt;/configSections>

&lt;appSettings> &lt;add key="ClientId" value="5017" /> &lt;add key="LocationCode" value="01"/> &lt;/appSettings>

Now this is the "tricky" part. By default, in an ASP.Net web application, the System.Configuration.dll file is automatically added to the references section of a new project. Oddly enough, this file is **not** added in a new Winforms application. I spent a good day beating my head against a wall to discover this. It could be that the file is not referenced since a different approach is used to create the strongly-typed settings objects it you take the standard approach. But that is some sleuthing for another day. Add a reference to the file in your project and the hard work is done! You now have quick and easy access to your application level settings via code. You can see where my SettingsBox_Load function reads the settings and where my btnSave_Click method writes the updated settings to the file:

```vb
Imports System.Configuration

Public Class SettingsBox

Private Sub SettingsBox_Load(ByVal sender As Object, _ ByVal e As System.EventArgs) _ Handles Me.Load txtClientId.Text = ConfigurationManager.AppSettings("ClientId").ToString txtLocation.Text = ConfigurationManager.AppSettings("LocationCode").ToString

End Sub

Private Sub btnSave_Click(ByVal sender As System.Object, _ ByVal e As System.EventArgs) Handles btnSave.Click

Dim MyConfig As Configuration

If Not String.IsNullOrEmpty(txtClientId.Text) AndAlso _ Not String.IsNullOrEmpty(txtLocation.Text) Then

MyConfig = ConfigurationManager.OpenExeConfiguration _ (ConfigurationUserLevel.None)

MyConfig.AppSettings.Settings("ClientId").Value = txtClientId.Text MyConfig.AppSettings.Settings("LocationCode").Value = txtLocation.Text MyConfig.Save(ConfigurationSaveMode.Modified) ConfigurationManager.RefreshSection("appSettings")

MessageBox.Show("Settings Saved.", "Success", _ MessageBoxButtons.OK, MessageBoxIcon.Information)

End If

End Sub End Class
```

That's all there is to it! The one caveat to all of this is that the executable must have priviliges to modify files in its own directory. If there are some unique circumstances in the folder where the application is running, then you may need to modfiy privileges accordingly. I hope this saves you time on your next Winforms app that you need global variables for. I know it will for me!

Global application settings are a great way to store those pieces of an application that might need to change through the life of an application, such as a client Id number, but not be stored differently for every user of the application, such as the preferred color to display items.

There has always been the AppSettings part of the app.config file, but with the release of .Net 2.0 Framework, a nice new Settings class was added that made easy to get strongly-typed settings variables within your application. It also allowed you to define categorizations or groups for these variables, which allowed for additional organization. The only glitch to this is that the Application scoped variables are set to a read-only format. The thought process behind this is that the application variables would be modified by a developer or experienced person, but done outside of runtime through Notepad or something.

I've been wearing my Googlian Monk robes over the past couple days in deep meditation trying to find a way to fix this issue and there isn't one that is easy to implement. However, there **is** a simple way to get Application scoped variables that are easily modifed by going back to our simple, yet friendly, AppSettings section that exists in our app.config file.

To do this, simply add an &lt;appSections> section in your app.config file: &lt;?xml version="1.0" encoding="utf-8" ?> &lt;configuration> &lt;configSections> &lt;/configSections>

&lt;appSettings> &lt;add key="ClientId" value="5017" /> &lt;add key="LocationCode" value="01"/> &lt;/appSettings>

Now this is the "tricky" part. By default, in an ASP.Net web application, the System.Configuration.dll file is automatically added to the references section of a new project. Oddly enough, this file is **not** added in a new Winforms application. I spent a good day beating my head against a wall to discover this. It could be that the file is not referenced since a different approach is used to create the strongly-typed settings objects it you take the standard approach. But that is some sleuthing for another day. Add a reference to the file in your project and the hard work is done! You now have quick and easy access to your application level settings via code. You can see where my SettingsBox_Load function reads the settings and where my btnSave_Click method writes the updated settings to the file:

```vb
Imports System.Configuration

Public Class SettingsBox

Private Sub SettingsBox_Load(ByVal sender As Object, _ ByVal e As System.EventArgs) _ Handles Me.Load txtClientId.Text = ConfigurationManager.AppSettings("ClientId").ToString txtLocation.Text = ConfigurationManager.AppSettings("LocationCode").ToString

End Sub

Private Sub btnSave_Click(ByVal sender As System.Object, _ ByVal e As System.EventArgs) Handles btnSave.Click

Dim MyConfig As Configuration

If Not String.IsNullOrEmpty(txtClientId.Text) AndAlso _ Not String.IsNullOrEmpty(txtLocation.Text) Then

MyConfig = ConfigurationManager.OpenExeConfiguration _ (ConfigurationUserLevel.None)

MyConfig.AppSettings.Settings("ClientId").Value = txtClientId.Text MyConfig.AppSettings.Settings("LocationCode").Value = txtLocation.Text MyConfig.Save(ConfigurationSaveMode.Modified) ConfigurationManager.RefreshSection("appSettings")

MessageBox.Show("Settings Saved.", "Success", _ MessageBoxButtons.OK, MessageBoxIcon.Information)

End If

End Sub End Class
```

That's all there is to it! The one caveat to all of this is that the executable must have priviliges to modify files in its own directory. If there are some unique circumstances in the folder where the application is running, then you may need to modfiy privileges accordingly. I hope this saves you time on your next Winforms app that you need global variables for. I know it will for me!
---
title: Quick Tip Persisting Dynamic Controls In Aspnet
description: Quick Tip Persisting Dynamic Controls In Aspnet
published: 2010-08-23
category: Development
tags: [aspnet, coding, controls, dynamic, quick-tip]
---

All of the fundamental pieces to this process are out there on this topic:

- You can dynamically create controls (drop down lists, textboxes, AJAX Editors) on the fly using the friendly Controls.Add() command to any objects that will support it (Panels, PlaceHolders, Page).
- The ViewState is enabled by default, and any controls that are rendered have their property details stored there (hence why it can be evil if abused).
- When a post back occurs, the dynamic controls are lost because that's just it, they were created dynamically. You have to recreate them during every post back in order to interact with them.
- The ViewState identifies controls by their Id.

After running into numerous issues, and finding all these pieces lying around the Internet, I was finally able to get my dynamic controls to survive the trip to the server and back. Here's the quick rundown:

1. When creating your dynamic controls, make sure to set the ID property to something that is unique.
2. Use the Controls.Add() method to add your controls to the page within the appropriate container.
3. Use the PreLoad() event in your page to call the proper method(s) to generate your dynamic controls.

By the time the Page_Load event fires, your dynamic controls will exist in the page structure, and since the controls have the same Id as they did during the previous rendering of the page, the ViewState will be able to properly apply the properties to the control, allowing them to persist it's state between post backs.

Voila! Dynamic Controls that persist their properties after a post back.

All of the fundamental pieces to this process are out there on this topic:

- You can dynamically create controls (drop down lists, textboxes, AJAX Editors) on the fly using the friendly Controls.Add() command to any objects that will support it (Panels, PlaceHolders, Page).
- The ViewState is enabled by default, and any controls that are rendered have their property details stored there (hence why it can be evil if abused).
- When a post back occurs, the dynamic controls are lost because that's just it, they were created dynamically. You have to recreate them during every post back in order to interact with them.
- The ViewState identifies controls by their Id.

After running into numerous issues, and finding all these pieces lying around the Internet, I was finally able to get my dynamic controls to survive the trip to the server and back. Here's the quick rundown:

1. When creating your dynamic controls, make sure to set the ID property to something that is unique.
2. Use the Controls.Add() method to add your controls to the page within the appropriate container.
3. Use the PreLoad() event in your page to call the proper method(s) to generate your dynamic controls.

By the time the Page_Load event fires, your dynamic controls will exist in the page structure, and since the controls have the same Id as they did during the previous rendering of the page, the ViewState will be able to properly apply the properties to the control, allowing them to persist it's state between post backs.

Voila! Dynamic Controls that persist their properties after a post back.
---
title: How To Fix Path Conflicts In Wsl Bash On Ubuntu On Windows
description: quicktip
published: 2018-01-05
image: images/posts/2018-01-quicktip.jpg
imageAlt: quicktip
category: Development
tags: [Bash, configuration, environment, geekery, path, windows, wsl, zsh]
---

WSL (also known as Bash on Ubuntu on Windows) has been a game changer for me with my web development. For a lot of our front end related coding, we take advantage of certain tools such as npm, grunt, bower, and at this point they still run a little smoother in my Mac environment than they do in my Windows 10 environment (though they are getting better). Having WSL available allows me to use these tools effectively and still retain my Win10 goodies. I recently ran into a problem with some path conflicts and here is the trick to solve them.

<!--more-->

### ![quicktip](@assets/images/posts/2018-01-quicktip.jpg)

### The problem...

Certain bower / gulp / grunt commands (particularly those dealing with SASS) have dependencies on Ruby in order to do their magic. However, the build of Ruby on UNIX and the build of Ruby on Windows seem to have some variations, or at least enough to cause havoc within WSL. WSL appears to want to access the Windows version, and then it complains about having a .exe and missing support libraries.

### The diagnosis...

What's happening is that when WSL starts up, the default environment setup adds all of the windows paths into the environment path. I suspect this is to help you get access to some of your tools (like Visual Studio Code) from both environments, but it can cause conflicts. if you type "echo \$PATH" you'll see what I mean:

![Cursor_and_Win10x64-Fresh2018](@assets/images/posts/2018-01-cursor_and_win10x64-fresh2018.png)

### The solution...

After poking around a bit, I discovered that the best solution would be to follow Mr. Miyagi's old saying of "best block no be there". Thanks to the scripting powers of unix, I simply added the following line into my .zshrc (yes, running zsh) script that executes when I start up the environment:

https://gist.github.com/Dillie-O/1f8670b3f7ecc0a8c5f5a662919dcdd1

You can just as easily run this in your .bashrc if you're using bash.

The next time you start up your environment, you can check and verify that the Ruby path is gone:

![Cursor_and_Win10x64-Fresh2018](@assets/images/posts/2018-01-cursor_and_win10x64-fresh20181.png)

Voila! The problem is solved. Everything should build nice and friendly for you now as before. You can easily update this statement to include other paths as needed.

If you know any other shell script tricks, let me know. I'm always on the hunt!

WSL (also known as Bash on Ubuntu on Windows) has been a game changer for me with my web development. For a lot of our front end related coding, we take advantage of certain tools such as npm, grunt, bower, and at this point they still run a little smoother in my Mac environment than they do in my Windows 10 environment (though they are getting better). Having WSL available allows me to use these tools effectively and still retain my Win10 goodies. I recently ran into a problem with some path conflicts and here is the trick to solve them.

<!--more-->

### ![quicktip](@assets/images/posts/2018-01-quicktip.jpg)

### The problem...

Certain bower / gulp / grunt commands (particularly those dealing with SASS) have dependencies on Ruby in order to do their magic. However, the build of Ruby on UNIX and the build of Ruby on Windows seem to have some variations, or at least enough to cause havoc within WSL. WSL appears to want to access the Windows version, and then it complains about having a .exe and missing support libraries.

### The diagnosis...

What's happening is that when WSL starts up, the default environment setup adds all of the windows paths into the environment path. I suspect this is to help you get access to some of your tools (like Visual Studio Code) from both environments, but it can cause conflicts. if you type "echo \$PATH" you'll see what I mean:

![Cursor_and_Win10x64-Fresh2018](@assets/images/posts/2018-01-cursor_and_win10x64-fresh2018.png)

### The solution...

After poking around a bit, I discovered that the best solution would be to follow Mr. Miyagi's old saying of "best block no be there". Thanks to the scripting powers of unix, I simply added the following line into my .zshrc (yes, running zsh) script that executes when I start up the environment:

https://gist.github.com/Dillie-O/1f8670b3f7ecc0a8c5f5a662919dcdd1

You can just as easily run this in your .bashrc if you're using bash.

The next time you start up your environment, you can check and verify that the Ruby path is gone:

![Cursor_and_Win10x64-Fresh2018](@assets/images/posts/2018-01-cursor_and_win10x64-fresh20181.png)

Voila! The problem is solved. Everything should build nice and friendly for you now as before. You can easily update this statement to include other paths as needed.

If you know any other shell script tricks, let me know. I'm always on the hunt!
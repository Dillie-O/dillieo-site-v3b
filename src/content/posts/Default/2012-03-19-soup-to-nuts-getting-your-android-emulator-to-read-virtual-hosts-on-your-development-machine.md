---
title: Soup To Nuts Getting Your Android Emulator To Read Virtual Hosts On Your Development Machine
description: ADV Results
published: 2012-03-19
image: images/posts/2012-03-advresults.webp
imageAlt: ADV Results
category: Default
tags: [android, apache, emulator, geekery, ios, mobile, virtual-host]
---

![ADV Results](@assets/images/posts/2012-03-advresults.png)

So you're setting up a new website, and need to test out your mobile functionality. Sadly you don't have a development server in which you can push everything up to and test that way. Instead, you need to take the "localhost" route. In addition, you do a lot of web development, so you have your websites setup using virtual hosts in Apache. So to get your site, you type in something like "demopyrocms.localhost" to access your individual sites. Here's a breakdown of what you need to do to get everything running smooth.

<!--more-->

If you're using a Mac, you'll kick up your iOS simulator, type in your url, and you're all set:

![iOS Screenshot](@assets/images/posts/2012-03-iosscreenshot.png "iOS Screenshot")

However, if you start up your Android emulator, and try the same thing, you'll get something like this:

![AVD Screenshot](@assets/images/posts/2012-03-avdscreenshot.png "AVD Screenshot")

The reason for this, is that unlike the iPad / iPhone emulators, which are simply simulated, the Android emulators are truly emulated, so they get their own networking environment. The Android environment does provide a workaround for this. They setup the address 10.0.2.2 as a "redirect" of sorts to localhost on the development machine that you're working on. This works great if you have a single site.

However, as mentioned before, I'm running multiple sites, and I'm using the virtual hosts feature. When you type the address in above, it looks on the device itself, and obviously the website isn't there. The solution is to update the hosts file on the device with a record that has our virtual host address that points to 10.0.2.2. Here's how to make that happen.

### 1. Starting up the Emulator

The first step is to fire up the virtual machine and give it a little extra space on the SD drive to handle the larger file size. Otherwise you'll get an "out of memory" or different type of error later on. You can't do this through the AVD manager, you have to do it through the command prompt. AVD uses special device IDs for the emulators that you have created. If you don't know the name of your device, you can execute the following command to get a list of them:

```./android list avd```

And you'll get a listing something like this:

![Android Device List](@assets/images/posts/2012-03-androiddevicelist.png "Android Device List")

The android program will be in the "tools" directory within your install path. For me it's ~/Applications/android-sdk/tools. Most likely it'll be different for you. Once you know the name of the device you need, you can start it up from the command prompt:

```./emulator -avd \[AvdName] -partition-size 128```

The emulator program will be in the "tools" directory within your install path. For me it's ~/Applications/android-sdk/tools. Most likely it'll be different for you.

### 2. Mount the emulator

Once the emulator is up and running, we need to mount it through into the debugger so we can update the hosts file. First we need to get the special id of the device:

```./adb devices```

The adb program will be in the "platform-tools" directory within your install path. For me it's ~/Applications/android-sdk/platform-tools. Most likely it'll be different for you.

Sometimes the adb manager may be running, but has not properly detected the emulator. To do this you simply need to stop and restart the adb server:

```./adb kill-server ./adb start-server```

Your device list will look something like this:

![ADB Screenshot](@assets/images/posts/2012-03-adbscreenshot.png "ADB Screenshot")

Now that you have the ID of the device, you need to mount it to the debugger:

```./adb -s \[DeviceID] remount```

You'll get a confirmation that the device has been mounted:

![ADB Remount](@assets/images/posts/2012-03-adbremount.png "ADB Remount")

### 3. Update the hosts file

From here, there are two way you can update your hosts file. If one doesn't work, try the other.

### Option 1: Pull/Push a copy of the hosts file from the emulator.

Grab a copy of the hosts file from the emulator with the following command:

```./adb -s \[DeviceID] pull /etc/hosts \[YourLocalPath]```

The \[YourLocalPath] value can be anywhere that is easy for you to access. Then edit the file and add the following line:

```10.0.2.2 \[YourVirtualHostName]```

Then push it back on to the emulator:

```./adb -s \[DeviceID] push \[YourLocalPath]/hosts /etc/```

It'll look something like this through your command prompt:

![ADB Pull/Push](@assets/images/posts/2012-03-adbpullpush.png "ADB Pull/Push")

### Option 2: Edit the hosts file through the ADB shell.

Open up a shell prompt on the device through the following command:

```./adb -s \[DeviceID] shell```

From there, write the virtual host name directly into the hosts file:

```echo '10.0.2.2 \[YourVirtualHostName]' >> /etc/hosts```

Then exit out of the shell.

```exit```

Iti'll look something like this through the command prompt:

![ADB Echo](@assets/images/posts/2012-03-adbecho.png "ADB Echo")

_Note:_ After some additional testing, I've found that your emulators will vary as to the location of your hosts file. Some devices like to store it in /system/etc/, some like to store it in /etc/. If one path doesn't work, try the other.

### 4. Verify the results

Open up the browser and load up the site. You should now be able to see it through the emulator:

![ADV Results](@assets/images/posts/2012-03-advresults.png "ADV Results")

There you have it! Now you can do some local testing with your Android emulator. I haven't tried it yet, but I believe if you plug in your Android phone and load it up through ADB, you can do the same thing. I'll try to report back on that a little later.

### Hat Tips Galore

I wouldn't be doing right by people if I didn't list the links that helps me piece this all together. There were plenty of sites that had 2 or 3 pieces of the puzzle, but didn't account for an error I ran into, so I'd go to another place. So here's the HT list that helped me out.

- [Android Developers ADB Guide](http://developer.android.com/guide/developing/tools/adb.html)
- [Restarting ADB Server to see devices](http://stackoverflow.com/questions/7502011/emulator-not-showing-in-adb-devices)
- [Pull/Push hosts file on emulator](http://stackoverflow.com/questions/5141724/access-a-virtual-host-from-the-android-emulator)
- [Starting emulator through command prompt to increase partition size](http://www.cuteandroid.com/tips-for-android-developer-failed-to-copy-file-to-system)
- [Using shell to modify hosts file directly (comments)](http://www.bradcurtis.com/2011/02/13/hosts-file-google-android-emulator/#comment-278511155)

Enjoy!
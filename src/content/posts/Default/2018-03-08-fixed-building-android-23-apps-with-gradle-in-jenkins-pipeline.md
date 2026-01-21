---
title: Fixed Building Android 23 Apps With Gradle In Jenkins Pipeline
description: jenkins_android
published: 2018-03-08
image: images/posts/fixed_building_android_23_apps_with_gradle_in_jenkins_pipeline.webp
imageAlt: jenkins_android
category: Default
tags: [aapt, android, build, coding, gradle, jenkins, pipeline, troubleshooting]
---

I'm working with a team who is building a mobile app using React Native. Everything builds nicely in our local environments (both Mac and PC) and now we've been working on setting up our Jenkins pipeline to create a fresh build with each merge request, and publish that out to a location that allows our dev teams to install at anytime. Everything was working great for this... until it wasn't

<!--more-->

![jenkins_android](../img_post/2018-03-08-fixed-building-android-23-apps-with-gradle-in-jenkins-pipeline/2018-03-jenkins_android.jpg)

After the initial configuration was in place, our Jenkins build continued to fail. Digging into the lengthy console log, there was one particular line in question that seemed to be the cause. Your paths may vary slightly:

```
[ERROR] [org.gradle.BuildExceptionReporter] Caused by: java.io.IOException: Cannot run program "/opt/android-sdk-linux/build-tools/23.0.1/aapt" (in directory "/var/lib/jenkins/workspace/tt-suite-mobile-fe-MR-test/node_modules/react-native-config/android"): error=2, No such file or directory
```

I'll avoid writing the next 50 paragraphs of head banging with various attempts to diagnose, track, google, and debug the issue and simply provide the answer in hopes that it is the root cause for you.

It turns out that `aapt` is a 32 bit application. The machine we're building with is a 64 bit RedHat/CentOS image in AWS. By default it wasn't installing the 32 bit resources, which included `aapt` and that was causing our problem.

The solution then was pretty simple. We ssh'd into our Jenkins server and ran the following command:

```
​sudo yum install zlib.i686 ncurses-lib.i686 compat-libstdc++-33.i686
```

Replace `sudo yum install` with the package manager that relates to the OS you're running. Additionally, you can replace the `-33` with `-*` in some environments to make sure you have the latest version of the `libstdc++` library.

Alternatively, you could add a similar command to your docker scripts (should you be doing some container fun) or any other image initialization process you go through.

After that you should be set!

Amazing kudos and HT to [Brian Duncan](https://www.linkedin.com/in/brian-duncan-932035a8/) for doing most of the heavy lifting with this!
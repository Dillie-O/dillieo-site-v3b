---
title: Build Your Own Netflix With Plex
description: Build Your Own Netflix With Plex
published: 2015-09-07
image: images/posts/2015-09-plex-logo1.webp
imageAlt: Build Your Own Netflix With Plex
category: Default
tags: [geekery, home-media, movies, plex, roku, server]
---

We have a decently sized collection of DVDs. It’s large enough that often times when we want to watch something, we can’t find it. It’s either in the “archive” of old movies downstairs, or it’s in one of the travel cases that we used for a road trip. We also have a growing music collection, and being able to setup playlists or listen to tunes without having to connect to Pandora, Google, iTunes, Spotify is handy at times as well. TV shows? Oh yeah, I have a season or two of Lost that would be nice to catch up on again as well. Fortunately, there is a great tool out there called [Plex](https://plex.tv) that gives you all of this, and more!

<!--more-->

![](@assets/images/posts/2015-09-plex-logo1.jpg)

### Get It!

[Plex](http://plex.tv) is a FREE media server platform that is available for nearly any device you can imagine. The server itself doesn’t have any crazy requirements. I installed it on an old Windows 7 machine that was sitting in the garage. You can [download](https://plex.tv/downloads) the server app for Windows, Mac, Linux, FreeBSD, and even NAS devices. The biggest concern you’ll have is storage space for your media, but there are plenty of options for that (see below). Setup was easy. A couple of clicks and I was done.

### Add Your Media!

Once you’ve installed the server, you can launch the server admin tool, which loads up in a web browser. Clicking the + icon in the sidebar will allow you to add a new library to the system.

![](@assets/images/posts/2015-09-6_5_4_3_2_1_plex-admin.jpg)

You have variety of libraries to add: movies, tv shows, home movies, music, photos.

![](@assets/images/posts/2015-09-4_3_2_1_plex-libraries.jpg)

Next you select a folder where that type of media is stored and Plex does the rest! For items like movies, Plex will analyze the movie and try to provide “cover” images that you see in the first screen shot. Plex recommends that you follow their [naming guidelines](https://support.plex.tv/hc/en-us/categories/200028098-Media-Preparation) in order best integrate with the server, but it will work with what it can. I took the time to rename all of my movie files and I think it was worth it. I already had my music stored in artist/album/track type format, so I didn’t change that up. Depending on the size of your library, this may take a while. You can still watch your movies while things are indexing, but depending on your computer, there maybe a little bit of stuttering

### Watch Your Stuff!

Once your media is all set, now you can watch/listen to it! This is where you exit from the free to paid range within Plex, depending on your needs.

**Web:** If you’ve configured things properly, you can always open the Plex site in your web browser from another computer, and start watching movies that way. The interface is nice and easily searchable.

**Streaming Server:** Plex is a RTSP streaming server. If you have a device (such as our BluRay player) that supports this protocol, your server should show up there shortly after things are in place. The program you have will most likely need to index (take inventory of) all of your media onto it, so this may take a while.

**Mobile:** Plex offers a standalone apps for both [Android](https://plex.tv/android) and [iOS](https://plex.tv/ios). This gives you a convenient way to watch your movies on your tablet, and even Chromecast them to your TV if you happen to have one. These apps will cost you \$5 per device, but that isn’t too bad if you’re only running a single device or are using a shared account.

**Roku:** Our preferred means of interacting with our movies is through our [Roku Box](https://www.roku.com). We already have Netflix and Hulu on it, so adding a Plex channel was easy to do. After a one month trial, we were required to pay a one time \$5 fee to unlock things permanently. Since the fee is tied to the Roku account, we were able to add the Plex channel to our other Roku in the bedroom without a second fee.

![](@assets/images/posts/2015-09-3_2_1_20150907_150721661_ios.jpg)

**Plex Pass:** For those of you that are REALLY into your personal media options, Plex has a ton of features available. If you purchase a [Plex Pass](https://plex.tv/subscription/about) (\$15 a month), you unlock access to any device you want for viewing. In addition, you can have your plex box available over the web, so you can view your movies while you’re away from home, without having to download them. The Plex server is smart enough to transcode the movies on the fly based on your device, so you’re not sending down a huge 1080p large resolution movie to your 7 inch tablet that is going to ignore most of those bits and potentially stutter anyway. I haven’t found the need for the Plex Pass myself, but down the road it may be worthwhile.

### Tips

As I’ve been working on getting my Plex server up and running, here are a few tips/tricks to help along the way:

**Digitizing:** The biggest step will be to get all of your DVDs digitized. While you could potentially go to the torrent networks, I take the time to use the [Handbrake](https://handbrake.fr) application (free) since it is easy to use and has presets in place. I use the “High Profile” preset to get a good quality resolution for our TV.

**Network:** While I don’t have any hard statistics on the issue, I found that connecting the Plex server to the network router using a LAN cable (instead of going wireless) gave the best streaming performance. It didn’t matter that the Roku devices access the server over WiFi, having the server directly onto the network to push media out worked the best.

**Storage:** You’ll run out of space fast! I’ve been helping my father in law get his Plex server setup and he has already filled a 2TB hard drive. Each movie will vary, but currently a “High Profile” movie ripped using Handbrake fills about 1GB of space for an hour and half movie. The nice thing is that your storage devices don’t have to be “directly” connected to the computer. We have his storage connected via USB3 drives and haven’t had any performance issues. I recently ran out of space with my old 100GB drives, so I reconfigured my Plex server to read the movies from the shared network drive (plugged into the router) and I haven’t had any issues with playback. Ideally you’ll have a lovely 8TB SATA drive plugged directly into your server, but it’s nice to know that you can work around that if needed.

### Enjoy!

Plex has a phrase to enjoy “rediscovering your media” and it is definitely true. We had forgotten about a lot of movies we had previously ripped for vacations and it’s been fun to pull up some of those old movies and watch them for fun. We have an old DVD player in the bedroom, but it typically goes unused since we can start a movie in the living room, and then finish it off in the bedroom on those late nights.

While I was fortunate enough to have an extra computer around, you can get this setup yourself for surprisingly cheap. Then raid your discount movie bin and build up your old library, and add new ones as you go! We really love our Plex setup and I think you will to.
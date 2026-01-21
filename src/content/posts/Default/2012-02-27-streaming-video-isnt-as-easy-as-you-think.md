---
title: Streaming Video Isnt As Easy As You Think
description: Codec Confusion
published: 2012-02-27
image: images/posts/streaming_video_isnt_as_easy_as_you_think.webp
imageAlt: Codec Confusion
category: Default
tags: [android, codec, geekery, ios, ipad, kindle-fire, mobile, streaming, tablet, video]
---

![Codec Confusion](../img_post/2012-02-27-streaming-video-isnt-as-easy-as-you-think/2012-02-codec-confusion.jpg)

Last week I was working on a video streaming solution that would work on mobile devices as well as browsers. With all the amazing new technology we have these days, you would think that this would be pretty straightforward. Sadly it isn't there yet.

<!--more-->

The streaming solution in place already was using standard Flash encoded videos and a Flash player, which allowed for a custom "skinned" control bar, logos, and video ads to be displayed. Given that nearly every computer out there has Flash installed, this works just fine for both our on demand and live streams.

However, when we get into the mobile space, things really start getting crazy.

For starters, as most people already know, Apple decided that it wasn't going to support Flash in it's iOS, but it would support the new HTML5 &lt;video> tag. This means you can use H.264 encoded videos, with the video tag, and Apple will kick up it's own video player to play the video. I also discovered that while iOS is supposed to support H.264 videos that have MP3 audio encoding within them, this doesn't appear to work for on demand video or live streaming video. You have to encode your video using the AAC audio format or it won't work (having tested on an iPad Simulator, iPhone Simulator (both running iOS 5.0) and on my 4th Generation iPod Touch (running iOS 5.0.1)). If you're using the free Adobe Flash Media Live Encoder application, you get AAC out of the box. If you're running a PC (which the broadcasters are), then you need to drop \$180 a pop for a license.

Next come Android. It's not necessarily as bad, I've seen both AAC and MP3 encoded video streams work on my HTC Thunderbolt. However, tests with both a Galaxy Tab emulator (Android 2.2) and a Motorola Xoom emulator (Android 3.0) don't like either version of the video. I also snuck a peek at the video on a borrowed Kindle Fire with no luck. I'll admit I think my Thunderbolt is actually running Flash instead, so the browser must be detecting that instead of doing the HTML5 fallback. So there's a good chance that would fail too. According to documentation, Android devices prefer the RTSP protocol, which is different than RTMP (Flash's primary).

I never did make it to Windows 7 mobile devices, and that's another story in itself I'm sure. Oh, and there's another video standard called WebM slowly creeping out for &lt;video> tag support as well, but only some browsers support that as well.

Oh, another helpful feature is to have a better QoS (quality of service) of your streams by detecting what kind of "pipe" they're running on (nice super fast broadband at home vs. simple mobile phone 3G Internet) and tailor the video size/quality to meet the needs accordingly. You don't want to shove HD down the face of a mobile phone out in the boonies, because it'll get maybe a few frames and nothing else. VERY aggravating for them.

So what turned out to be a simple two day "update the video player so that it will handle mobile devices" type task turned into a crazy 3 and a half day testing/debugging/implementing type task that didn't reach completion. Just when you had a solution up, you found that it didn't work on one protocol or platform, and the fix to it broke the other protocol/platform. Sometimes that is just the way tech works, especially with newer technologies and companies that like to play by their own rules.

That said, there's a concept out there that looks very promising, called "transcoding". It does all the heavy lifting for you. You upload your video in whatever format you want, and it will to the proper conversion to whatever format/encoding/protocol/bandwidth you need for your client. In our case this required an additional module to be purchased for the streaming server, so we're looking into it now and we'll see if this can eliminate a lot of headaches.

Just in case you're stuck in the middle of video streaming to the masses, here are a few links that have proved helpful for me along the way:

- [iOS Live Streaming Overview](https://developer.apple.com/library/ios/#documentation/networkinginternet/conceptual/streamingmediaguide/FrequentlyAskedQuestions/FrequentlyAskedQuestions.html#//apple_ref/doc/uid/TP40008332-CH103-SW1)
- [Video Streaming Overview](http://www.longtailvideo.com/support/blog/19578/what-is-video-streaming) (helps identify the various platforms and their support)
- [Wowza Support Forums](http://www.wowza.com/forums/) (this is the media server we're running, but there are some cross posts to other players/plugins that helped)
- [JW Player](http://www.longtailvideo.com/players/) (the media player we're using currently)
- [Media Element JS](http://mediaelementjs.com/) (another media player I've looked at in the past and does a great job and handling this confusion)

If you find anything additional, don't hesitate to leave a comment and let me know.
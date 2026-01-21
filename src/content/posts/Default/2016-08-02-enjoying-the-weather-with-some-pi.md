---
title: Enjoying The Weather With Some Pi
description: weather station
published: 2016-08-02
image: images/posts/enjoying_the_weather_with_some_pi.webp
imageAlt: weather station
category: Default
tags: [acurite, geekery, raspberry-pi, weather, weather-station, weewx]
---

A little over a year ago, I was able to get my [personal weather station](/unboxing-and-initial-review-acurite-2032crm-pro-weather-station) up and running and I’ve been enjoying it thoroughly. This year, I was able to take it to the next level and get the weather station up on the cloud thanks to some gifts and a little geekish knowhow.

<!--more-->

![weather station](../img_post/2016-08-02-enjoying-the-weather-with-some-pi/2016-08-1_20160802_131847000_ios.jpg)

A couple of weeks back I picked up a [Raspberry Pi](https://www.raspberrypi.org/). If you haven’t heard of one, it is an amazing piece of technology. It a full blown computer: HDMI, Wifi, Bluetooth, 4 USB ports, a 40 pin IO interface, and more! All of this fits on something the size of a credit card. Yep, if you look above, that’s my Pi sitting next to my weather station display. The computer isn’t robust enough for doing any heavy gaming, but it really shines for learning some basic programming as well as a TON of hobby projects of various shapes and sizes (robotics, media centers, etc.) In my case, “weather reporter” was what it was assembled to do. There is a large, and growing, community of kids and adults using their Pis for various tasks, and it’s not hard to find something to inspire you.

The Pi comes with a Linux based operating system called “Raspian” that I installed and configured for my network in no time. After the initial install, I can access the machine over SSH, so I was able to tuck the machine away (on my wall) and access it without all the hassle of the cables. I’ll admit though, having a 24 inch display of a computer that is a fraction of the size was fun and odd to see considering I remember when the reverse was the norm.

Next came the software. The Acurite weather station has a USB connection and will output its data frequently through it. They have their own software that will aggregate the data for this, but I wasn’t interested at all in using it. Instead, I found a great open source program called [weewx](http://weewx.com/). It is Linux based, doesn’t require a lot of resources, and runs as a service without any direct interaction. All of this is perfect for the Pi. Installation was simple, and after a simple configuraiton update, I was reporting things to my new [Weather Underground PWS](https://www.wunderground.com/personal-weather-station/dashboard?ID=KAZPRESC176)!

So what do I get with all of this? For starters, I can track the weather at my house now wherever I may be through a web page provided by WU.

![](../img_post/2016-08-02-enjoying-the-weather-with-some-pi/2016-08-wu_home.png)

In addition, I can track it through the Android and iPhone apps that WU provides as well.

![](../img_post/2016-08-02-enjoying-the-weather-with-some-pi/2016-08-20160802_133119000_ios.png)

![](../img_post/2016-08-02-enjoying-the-weather-with-some-pi/2016-08-weather_android.png)

I’m quite a data junkie as well, so with WU, I’ll have all of my data online and aggregated, so I can start looking at weather trends over time, track hottest/coldest days, and lots of things that the standard aggregation on the weather station itself won’t retain.

![](../img_post/2016-08-02-enjoying-the-weather-with-some-pi/2016-08-wu_stats.png)

All of this data is stored on the Pi as well thanks to weewx, so I have a backup of it should something happen online! It’s amazing how technology has come a long way to enable simple, yet powerful, setups for hobbyists like me.

What’s next? I’m really interested in building a similar app to weewx to run on Windows 10 IoT, since they have made it free to use and compatible with the Raspberry Pi devices. That may take some time though, especially with the nuances of reading and parsing weather data though a generic USB driver, but I’ll be looking forward to the challenge!
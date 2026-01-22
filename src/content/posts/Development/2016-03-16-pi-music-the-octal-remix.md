---
title: Pi Music The Octal Remix
description: pi-music
published: 2016-03-16
image: images/posts/2016-03-pi-music.png
imageAlt: pi-music
category: Development
tags: [life, music, pi]
---

Man! Seems like I just can't get enough of this stuff lately. A tool and a simple script can go a long way these day! Two days ago was Pi Day, and I [found some fun music](/pi-music) to go with it. However, not quite happy with the results, I decided to try and make the music more "authentic" by building out [Pi music using a decatonic scale](/pi-music-decatonic-style).

Listening to the mysterious (and potentially haunting) music kept me thinking and pondering a bit more. Then I had an interesting idea on my run this morning. The decatonic scale is more accurate to the base 10 nature of our Pi digits, but what if we were able to make the Pi digits more accurate to the traditional 8 note scale. What came next I call the "Octal Remix".

<!--more-->

![pi-music](@assets/images/posts/2016-03-pi-music.png)

### TLDR;

Interestingly enough, converting pi to an octal base lends nicely to a standard 8 note scale and gives us lots of "tweaking" options through [Sonic Pi](http://sonic-pi.net/). Here's a key of Bb rendition (a HT to my tuba roots 8^D) of Pi.

https://soundcloud.com/dillie-o/octal-pi-remix

### The Math

Instead of refactoring our music scale to a 10 note scale, better representing the decimal or base 10 system of numbers the pi uses, we want to refactor pi to be based on an 8 digit number system. Sounds kind of weird right? That's what binary is, a two number system (0, 1). There are a few different number systems in use. Hexadecimal (base 16) is used a lot for color codes and other things. Fortunately, another rather popular number base is the Octal system, which is an 8 digit system, 0 through 7. This maps up nicely to our 8 note scale. Fortunately, it's quite easy to convert from decimal to octal.

### Composing the Music

Thanks to the amazing [Sonic Pi](http://sonic-pi.net/), there is already a quick way to select a scale to use and play notes with it. Since our octal numbers are 0 based, we don't have to worry about shifting any numbers. In this case, 0 is our "low" number, so it may be worth refactoring our decatonic scale to put the 0 at the bottom. Here's what the script file looks like. It's a lot simpler:

https://gist.github.com/a5b1e9a38739341c3d76

### Listen Away

The great thing about having a standard scale is that we can really start doing some additional tweaks to the output. What does pi sound like when its using a minor key. Do we want to try to and transpose it? Sonic Pi also has "beat machines" and other fun scripts to setup. I just might be able to make my "symphony" of sorts. Lots of options here.

So for today, enjoy Pi music in the key of Bb ("B Flat") , giving a slight homage to my days as the "Tubanator". Note how using a more standardized scale gives the music a more "whimsical" feel. Is this true to form? I might have to double check my numbers a bit more. Who know's what's next down the pipe 8^D

Man! Seems like I just can't get enough of this stuff lately. A tool and a simple script can go a long way these day! Two days ago was Pi Day, and I [found some fun music](/pi-music) to go with it. However, not quite happy with the results, I decided to try and make the music more "authentic" by building out [Pi music using a decatonic scale](/pi-music-decatonic-style).

Listening to the mysterious (and potentially haunting) music kept me thinking and pondering a bit more. Then I had an interesting idea on my run this morning. The decatonic scale is more accurate to the base 10 nature of our Pi digits, but what if we were able to make the Pi digits more accurate to the traditional 8 note scale. What came next I call the "Octal Remix".

<!--more-->

![pi-music](@assets/images/posts/2016-03-pi-music.png)

### TLDR;

Interestingly enough, converting pi to an octal base lends nicely to a standard 8 note scale and gives us lots of "tweaking" options through [Sonic Pi](http://sonic-pi.net/). Here's a key of Bb rendition (a HT to my tuba roots 8^D) of Pi.

https://soundcloud.com/dillie-o/octal-pi-remix

### The Math

Instead of refactoring our music scale to a 10 note scale, better representing the decimal or base 10 system of numbers the pi uses, we want to refactor pi to be based on an 8 digit number system. Sounds kind of weird right? That's what binary is, a two number system (0, 1). There are a few different number systems in use. Hexadecimal (base 16) is used a lot for color codes and other things. Fortunately, another rather popular number base is the Octal system, which is an 8 digit system, 0 through 7. This maps up nicely to our 8 note scale. Fortunately, it's quite easy to convert from decimal to octal.

### Composing the Music

Thanks to the amazing [Sonic Pi](http://sonic-pi.net/), there is already a quick way to select a scale to use and play notes with it. Since our octal numbers are 0 based, we don't have to worry about shifting any numbers. In this case, 0 is our "low" number, so it may be worth refactoring our decatonic scale to put the 0 at the bottom. Here's what the script file looks like. It's a lot simpler:

https://gist.github.com/a5b1e9a38739341c3d76

### Listen Away

The great thing about having a standard scale is that we can really start doing some additional tweaks to the output. What does pi sound like when its using a minor key. Do we want to try to and transpose it? Sonic Pi also has "beat machines" and other fun scripts to setup. I just might be able to make my "symphony" of sorts. Lots of options here.

So for today, enjoy Pi music in the key of Bb ("B Flat") , giving a slight homage to my days as the "Tubanator". Note how using a more standardized scale gives the music a more "whimsical" feel. Is this true to form? I might have to double check my numbers a bit more. Who know's what's next down the pipe 8^D
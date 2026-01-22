---
title: Pi Music Decatonic Style
description: pi-music
published: 2016-03-15
image: images/posts/2016-03-pi-music.png
imageAlt: pi-music
category: Default
tags: [equation, formula, life, music, pi, scale, sonic-pi]
---

Yesterday was [Pi day](/pi-music), and while I enjoyed the links to the music I shared, there was one thing that was bugging me a little, and that was the use of the melodic scale. Since the typical scale has 8 notes between octaves, why not use a 10 note (or decatonic) scale in order to compose this music. Doing so would reflect the base 10 number system that the digits of pi use. So that's what I did...

<!--more-->

![pi-music](@assets/images/posts/2016-03-pi-music.png)

### TL;DR;

Here's the slightly mysterious (and maybe haunting) music that Pi sounds like when we equate the digits of a base 10 nature to a melodic scale of a base 10 nature. If you're interested in how I did it, read on. Regardless, listen away.

https://soundcloud.com/dillie-o/decatonic-pi-2

### The Math

We break down music notes to simple sine waves and their frequencies. Middle C (C4) on the piano comes in at a lovely 261 Hz. The C one octave above (C5) registers at 523 Hz. If we want to calculate the approximate frequency between notes, we can use the following formula:

> (523-261) / 8 = 32.75 HZ between notes

If we test this out, we calculate that the D note above middle C would be 261 + 32.75 = 293.75 HZ. This just so happens to be the case according to [Wikipedia](https://en.wikipedia.org/wiki/Piano_key_frequencies). Taking this formula into consideration, we can then break out our scale into 10 notes as follows:

### (523-261) / 10 = 26.2 HZ between notes

Now that we had our formula. Its time to make some music!

### Composing the Music

Now that I knew my frequencies, I simply needed to convert each digit of pi to be a "note" on my scale and output the frequency involved. There are plenty of synthesizer type apps out there, but most of them let you play notes, and not frequencies. Fortunately, there is this AMAZING (and free) app out there called [Sonic Pi](http://sonic-pi.net) that is a "live coding synth". It has a simple code editor interface (it uses Ruby) and makes it really easy to play around with music notes, beats, and the like. Most importantly, it has this great function that allows you to input a frequency (instead of a note) and it I'll play that accordingly. Here's the script file I created:

https://gist.github.com/2ed76b997539e0002a4a

Admittedly there is some testing code in there to verify the sound, but you can see where I've generated my own method to calculate the frequency of the note and play it. We have 400 digits worth of Pi in there, so it makes for an interesting melody.

### Listen Away

There we have it, a kind of haunting and mysterious melody that Pi plays on a decatonic scale. If you're a music person, and have a better way of generating the decatonic scale, I'd love to hear about it. Something seems a little off to me during the "test scale" and I'm not sure if I'm not getting a "pure" translation of the Hz to the Midi notes as the documentation outlines. I might have to keep playing with this more and have some fun, now that I can add beats, new synthesizer sounds, and other goodies.

Enjoy!

For more listening, check out the [Pi Music: The Octal Remix](/pi-music-the-octal-remix)
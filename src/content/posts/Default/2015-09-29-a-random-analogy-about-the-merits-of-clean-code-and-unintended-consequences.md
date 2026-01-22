---
title: A Random Analogy About The Merits Of Clean Code And Unintended Consequences
description: A Random Analogy About The Merits Of Clean Code And Unintended Consequences
published: 2015-09-29
image: images/posts/a_random_analogy_about_the_merits_of_clean_code_and_unintended_consequences.webp
imageAlt: A Random Analogy About The Merits Of Clean Code And Unintended Consequences
category: Default
tags: [coding]
---

Last week after having the kids an overview on how they can [make their own record player](/simple-and-fun-diy-record-player), we decided to pull out our old record player from the garage. Since our receiver for the record player is long gone, I went into “hacker” mode and started piecing things together.

<!--more-->

I picked up a phono preamp on Amazon so that our turntable would have a strong enough signal to plug into any audio source we had (until I get my long awaited sound bar). I then grabbed an extra set of 2.1 speakers (two speakers and a subwoofer) we had and started to hook things up.

Working on the fly, I was looking for something that would convert my RCA audio output to the 3.5mm (headphone jack) input required by the speakers. I went to my drawer and pulled out the AV cable we use for our Roku box on occasion.

![](@assets/images/posts/2015-09-roku_av_cable1.jpg)

Since there was no “video” signal from the record player, I simply didn’t bother to put anything on there. The plug fit, the audio connections were there, and things were working.

Well, not exactly. The sound was barely audible coming out of the speakers (even at full volume) and there was a buzzing noise clearly heard, especially if the subwoofer was turned up. It turns out that even though there was no video signal, the connector was causing some noise on the line with some drastic consequences. I purchased a proper cable, plugged things in, and voila, things were soundingly beautiful.

So where’s the programming analogy in all of this? Sometimes as we build out a new application, we have a ton of methods, variables, or database columns that we create. As the requirements of the application change, some of those fields may no longer be deemed necessary. In the rush to finsh the project, sometimes we simply leave those artifacts in the program. We think that maybe that feature will come back and those columns will already be there, or that since nothing is actually calling the code that we’re aware of, those “empty plugs” will be just fine.

That’s not always true. An extra database column might cause the search results to come back differently or the indexing optimizations might not be quite right. Another developer may see those extra methods/variables in the code and start to use them, much to the detriment of the app. There may be lingering unit tests in the app no longer required, creating extra “buzz” or performance degradation to build. Those “simple” or “innocuous” things can add up, often when you don’t expect it.

Writing good code is hard. Writing clean code is just as hard (maybe harder). Take the time to keep your code clean so that those “unused video cables” in your app don’t cause undue noise or problems with your app.
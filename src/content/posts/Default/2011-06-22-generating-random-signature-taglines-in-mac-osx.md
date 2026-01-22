---
title: Generating Random Signature Taglines In Mac Osx
description: Generating Random Signature Taglines In Mac Osx
published: 2011-06-22
category: Default
tags: [geekery, mac, quotes, shell-script]
---

One of the things I miss most from my old job was my tag line generating program I had. Oddly enough, all of these old QWK Mail BBS tag lines I had randomly inserted into my e-mails made a lot of people happy. Then I'd post some of them on Facebook Twitter and get a few more chuckles, or looks of bewilderment (yes, you CAN feel those through the matrix when you've been around as long as I have).

<!--more-->

So here I am on a Mac wondering how I can get this to happen since most of my e-mail is done on the web now (still lots of love goes to [Threadsy](http://threadsy.com)) and even the program I used to use went on the fritz when Win7 came out and the security got tighter.

Fortunately for me, Mac has a Linux base (Free BSD, whatever) and you have easy access to your shell scripts. And waaaaaaay back in my Tandem (then Compaq, now HP) days I got to live on a Unix machine for a while and had a few things creep in, thanks to the Internet.

The first step is to create a simple shell script type application that will read my tagline file (just a simple text file with one line per tag) and grab a line at random for me. After some digging, I found and tweaked the following code to make it my own:

```bash
#!/bin/sh

LINES=\`wc -l $1 | awk '{ print ($1 + 1) }'\` RANDSEED=\`date '+%S%M%I'\` LINE=\`cat $1 | awk -v COUNT=$LINES -v SEED=$RANDSEED 'BEGIN { srand(SEED); \\ i=int(rand()\*COUNT) } FNR==i { print $0 }'\` echo $LINE | pbcopy echo $LINE
```

Now you'll notice that second to last line echos the line and pipes it into the pbcopy command. I discovered this is the default clipboard app that is running on the Mac, and all I had to do was pipe the text to there. I do a second echo command so that I could see what the tagline was, in case I wanted to generate another.

I saved this little script to a file called randline.sh in the home directory of my profile. Now I needed a simple way to run this command on demand. The script above takes a file an input parameter (in case I want to use a different file later) and I didn't want to have to type a lot of stuff every time. This is where the profile script comes to the rescue! I didn't have one yet, so I created a simple file called .bash_profile in my home directory and gave it an edit. I added the following line:

```bash
alias tag="~/randline.sh ~/Documents/UltimateTagList.txt"
```

You can put your tag file anywhere really. Start up your terminal again, which will reload the profile, and simply type in "tag" to see what random item you get. I love it. I combine this with a couple signature designs I whipped up in [WiseStamp](http://www.wisestamp.com/) and life is good! I just paste the tag into my placeholder in my signature and things are done in a matter of seconds.

Eventually I'll try to get around to writing (or finding) and app that will simply import my tags and generate my random signatures, but this was great fun for me, as sick as it sounds. If you're interested in getting your own started, use the code above at the "ultimate tag line list" I threw together and enjoy!
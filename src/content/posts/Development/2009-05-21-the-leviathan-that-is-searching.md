---
title: The Leviathan That Is Searching
description: The Leviathan That Is Searching
published: 2009-05-21
category: Development
tags: [coding]
---

I realize I'm jumping ahead a little bit in the chronological sequence of the Toolkit history, but I wanted to segue a bit to reflect upon an aspect of the toolkit that has probably been the most significant issue in the whole toolkit: searching for cards.

While writing Deck Studio, I knew searching for cards was a very important feature. I knew that RONIN already had a search feature built into it, but I personally found it a little difficult to work with. So I decided to start from scratch and take my own search approach.

The first thing I did was say "Self, when you're building your latest and greatest fiend deck, how are you getting your cards?"

Then one of my 13 personalites began to chime in. "Well, you already know the general idea of the deck..." ..."so lets put in the cards you know you're using."

Good. That makes sense. That's what the card index is for. So I immediately use the handy auto-complete to put in Bad Reaction to Simochi, Giant Germ, and Dark Ruler Ha Des for posterity.

Then the next thing I did was say "Okay self, that didn't get us much, now what?"

Another personality chimes in: "Well, now we need to find any cards that increase you opponents life points, since Simochi will reverse that."

...and that's how the search panel was born. What I wanted to do is try to present the user with a "natural" type interface that steps the user though a couple of steps to perform the search. After displaying/hiding options based on the search, the results are displayed right below the parameters, and the user can see the details of each card.

Without conciously doing so, this search is the complete opposite of the search used in RONIN. Some people love it, some people hate it, and it had made for some good discussion along the lifecycle of the toolkit, especially when netrep 2.0 was coming online.

RONIN uses what I call a "loose" search. It will search for cards that match ANY of the criteria specified. That's why you see everything checked when you pull up the advanced search in RONIN. You'll whiddle out what you don't want to see.

Deck Studio uses what I call a "strict" search. It will search for cards that match ALL of the criteria specified. That's why nothing is checked when you pull up the search in Deck Studio. You start out very selective and see just a few options.

There are pros and cons to both. The nuances are intense. From a usability standpoint, it is definitely easier to check only a few options, as opposed to many. Depending on the deck you're trying to build, you may need a broad or small range of cards to add to the deck, and each search mechanism can get you the desired results easier. I started frying out my brain trying to figure out the various permutations of the different searches in trying to come up with a good algorithm for it all. Soon I came to the conclusion that there really was not a single best way to approach this.

Starting with netrep 2.0, and being finalized in Deck Studio 1.8, you now have the option of both. Ultimately what you get is a "grid" of options for the various attributes the cards can have, and you can select which ones you want. More importantly, you select the loose or strict style of searching, click search, and get the results you need. A key factor in this is easily allowing the user to select or deselect groups of search options, to tie in with the loose or strict model you're searching with. Down the road, I'm even debating about allowing users to use a "SQL" style approach to all of this, for those extreme users that have a grasp on how these concepts work.

Implementing this search in a clean and consistent manner is a whole different story, and a topic for another day.

I realize I'm jumping ahead a little bit in the chronological sequence of the Toolkit history, but I wanted to segue a bit to reflect upon an aspect of the toolkit that has probably been the most significant issue in the whole toolkit: searching for cards.

While writing Deck Studio, I knew searching for cards was a very important feature. I knew that RONIN already had a search feature built into it, but I personally found it a little difficult to work with. So I decided to start from scratch and take my own search approach.

The first thing I did was say "Self, when you're building your latest and greatest fiend deck, how are you getting your cards?"

Then one of my 13 personalites began to chime in. "Well, you already know the general idea of the deck..." ..."so lets put in the cards you know you're using."

Good. That makes sense. That's what the card index is for. So I immediately use the handy auto-complete to put in Bad Reaction to Simochi, Giant Germ, and Dark Ruler Ha Des for posterity.

Then the next thing I did was say "Okay self, that didn't get us much, now what?"

Another personality chimes in: "Well, now we need to find any cards that increase you opponents life points, since Simochi will reverse that."

...and that's how the search panel was born. What I wanted to do is try to present the user with a "natural" type interface that steps the user though a couple of steps to perform the search. After displaying/hiding options based on the search, the results are displayed right below the parameters, and the user can see the details of each card.

Without conciously doing so, this search is the complete opposite of the search used in RONIN. Some people love it, some people hate it, and it had made for some good discussion along the lifecycle of the toolkit, especially when netrep 2.0 was coming online.

RONIN uses what I call a "loose" search. It will search for cards that match ANY of the criteria specified. That's why you see everything checked when you pull up the advanced search in RONIN. You'll whiddle out what you don't want to see.

Deck Studio uses what I call a "strict" search. It will search for cards that match ALL of the criteria specified. That's why nothing is checked when you pull up the search in Deck Studio. You start out very selective and see just a few options.

There are pros and cons to both. The nuances are intense. From a usability standpoint, it is definitely easier to check only a few options, as opposed to many. Depending on the deck you're trying to build, you may need a broad or small range of cards to add to the deck, and each search mechanism can get you the desired results easier. I started frying out my brain trying to figure out the various permutations of the different searches in trying to come up with a good algorithm for it all. Soon I came to the conclusion that there really was not a single best way to approach this.

Starting with netrep 2.0, and being finalized in Deck Studio 1.8, you now have the option of both. Ultimately what you get is a "grid" of options for the various attributes the cards can have, and you can select which ones you want. More importantly, you select the loose or strict style of searching, click search, and get the results you need. A key factor in this is easily allowing the user to select or deselect groups of search options, to tie in with the loose or strict model you're searching with. Down the road, I'm even debating about allowing users to use a "SQL" style approach to all of this, for those extreme users that have a grasp on how these concepts work.

Implementing this search in a clean and consistent manner is a whole different story, and a topic for another day.
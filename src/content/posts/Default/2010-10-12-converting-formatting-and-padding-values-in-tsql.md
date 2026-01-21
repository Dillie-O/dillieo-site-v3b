---
title: Converting Formatting And Padding Values In Tsql
description: Converting Formatting And Padding Values In Tsql
published: 2010-10-12
image: images/posts/converting_formatting_and_padding_values_in_tsql.webp
imageAlt: Converting Formatting And Padding Values In Tsql
category: Default
tags: [coding, conversion, formatting, padding, sql, t-sql]
---

This is another hat tip (HT) to my fellow coffee drinker co-worker Anne for some hard work in figuring out some tricky code.

Anne is working on a data conversion project between two systems. She needs to take some data and convert it to decimal format, round the value to remove the decimal places, and then pad it to the left to 9 places, to have leading 0s in front of the data.

While this task isn't difficult, this is a little tricky, especially considering you have to convert the values to various types in order to to parse into other data types and do the padding. PL/SQL has a nice LPAD function for padding strings that T-SQL is currently lacking.

After a bit of testing, tweaking, and brain mungling (a technical term) the following solution was found:

See, LOTS of casting and wrapping and converting, but it works, and I'm keeping dibs on this for the next time I have to deal with something similar.
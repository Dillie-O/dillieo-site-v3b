---
title: Refactored Creating Dynamicconfigurable Parameterized Queries In Entity Framework
description: Refactored Creating Dynamicconfigurable Parameterized Queries In Entity Framework
published: 2013-05-30
category: Development
tags: [net, adonet-entity-framework, c, coding, Database, ef, entity, entity-framework, model, parameterized-queries, parameters, programming, searching]
---

A little while back [I posted about a technique I was using](/creating-dynamicconfigurable-parameterized-queries-in-entity-framework) to setup parameterized queries using Entity Framework. I had posted to the .Net group on Google+ and received some amazing feed back from [Dan Nemec](https://plus.google.com/101363865895447068906/posts) and [Chris McCall](https://plus.google.com/109392919130815889444/posts) and refactored the code. It's cleaner, easier to work with, and hopefully a bit more optimized too. Here's what's different.

<!--more-->

### Fewer (and a few renamed) Variables

Originally I was coding with the "human reading" element in mind. That way if I had to modify some of the "From/To" type variables or change types, I could see it all right there. This really wasn't necessary. I'm never going to find cases where I'm doing a range query between an integer and a date (SQL won't like me 8^D) and it isn't that difficult to update the code to add the "@" character in front of my WHERE clause parameter names. I was already appending numbers to my parameter names when doing multiple search terms. Additionally, having the parameter type as a string opened too many doors to parsing problems. It was easy enough to declare the type in the object initializer anyway (more about generics in a bit). With all that in mind, here's what our new class looks like:

\[gist]5679216

### No Constructors

My constructors weren't really doing anything. In addition, there were a LOT of them. .Net allows you to use object initializers, so that you can declare new objects and set their parameters at the same time. Now you have something looking like this:

\[gist]5679296

### Updated Processing

With our new object in place, our processing becomes a little more "complex" but that's the way we want it. The "user end" simply sets up a few parameters and the "processing end" does all the hard work. We use the VariableName property and append the appropriate variables based on ranged, multiple, or single values. In addition, there is no "GetType" method to call since we already have the type there. Here's what our processing script looks like now:

\[gist]5679454

### What about Generics?

Dan had made an excellent suggestion about using generics with my SearchParameter object in order to avoid the issues that arose by using a simple string for the parameter type. This would allow me to simply declare my SearchParameter&lt;int> or SearchParameter&lt;DateTime> and create a read only property in the project that returns typeof(T).

This worked out great initially, but I ran into problems due to the fact that my dictionary collection, a generic collection in itself, was essentially holding generic objects itself, and being able to pass this kind of object around wasn't working in the compiler. At one point I was using a basic Dictionary&lt;string, SearchParameter&lt;object>> to hold my parameters, but in the code that built the parameters, it didn't like to have specific types getting pushe into the object. However, a lot of obstacles went away when using the Type type instead of a string, and I was still able to have "compiler verifiable" code to work with when building my search parameter collections.

### Conclusion

So there you have it. A much cleaner and functional system to work with and I'm finalizing off my code to use this new system much faster that was with the previous iteration. It never hurts to refactor when you get the chance. 8^D

A little while back [I posted about a technique I was using](/creating-dynamicconfigurable-parameterized-queries-in-entity-framework) to setup parameterized queries using Entity Framework. I had posted to the .Net group on Google+ and received some amazing feed back from [Dan Nemec](https://plus.google.com/101363865895447068906/posts) and [Chris McCall](https://plus.google.com/109392919130815889444/posts) and refactored the code. It's cleaner, easier to work with, and hopefully a bit more optimized too. Here's what's different.

<!--more-->

### Fewer (and a few renamed) Variables

Originally I was coding with the "human reading" element in mind. That way if I had to modify some of the "From/To" type variables or change types, I could see it all right there. This really wasn't necessary. I'm never going to find cases where I'm doing a range query between an integer and a date (SQL won't like me 8^D) and it isn't that difficult to update the code to add the "@" character in front of my WHERE clause parameter names. I was already appending numbers to my parameter names when doing multiple search terms. Additionally, having the parameter type as a string opened too many doors to parsing problems. It was easy enough to declare the type in the object initializer anyway (more about generics in a bit). With all that in mind, here's what our new class looks like:

\[gist]5679216

### No Constructors

My constructors weren't really doing anything. In addition, there were a LOT of them. .Net allows you to use object initializers, so that you can declare new objects and set their parameters at the same time. Now you have something looking like this:

\[gist]5679296

### Updated Processing

With our new object in place, our processing becomes a little more "complex" but that's the way we want it. The "user end" simply sets up a few parameters and the "processing end" does all the hard work. We use the VariableName property and append the appropriate variables based on ranged, multiple, or single values. In addition, there is no "GetType" method to call since we already have the type there. Here's what our processing script looks like now:

\[gist]5679454

### What about Generics?

Dan had made an excellent suggestion about using generics with my SearchParameter object in order to avoid the issues that arose by using a simple string for the parameter type. This would allow me to simply declare my SearchParameter&lt;int> or SearchParameter&lt;DateTime> and create a read only property in the project that returns typeof(T).

This worked out great initially, but I ran into problems due to the fact that my dictionary collection, a generic collection in itself, was essentially holding generic objects itself, and being able to pass this kind of object around wasn't working in the compiler. At one point I was using a basic Dictionary&lt;string, SearchParameter&lt;object>> to hold my parameters, but in the code that built the parameters, it didn't like to have specific types getting pushe into the object. However, a lot of obstacles went away when using the Type type instead of a string, and I was still able to have "compiler verifiable" code to work with when building my search parameter collections.

### Conclusion

So there you have it. A much cleaner and functional system to work with and I'm finalizing off my code to use this new system much faster that was with the previous iteration. It never hurts to refactor when you get the chance. 8^D
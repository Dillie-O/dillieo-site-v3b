---
title: On Writing Maintainable Code
description: Matrix Code Tunnel
published: 2016-02-19
image: images/posts/2010-09-matrixmini.jpg
imageAlt: Matrix Code Tunnel
category: Default
tags: [coding, coding, convention, maintenance, standards]
---

One of the things that I’ve been asked about over at [WiseLike](https://wiselike.com/sean-patterson) and the one thing I think is most important in my career as a software engineer is the ability of writing maintainable code.

<!--more-->

![Matrix Code Tunnel](@assets/images/posts/2010-09-matrixmini.jpg)

I’m swiftly approaching the 15 year mark as a software engineer and I’ve worked with a lot of code of various sizes and languages. A lot of this code has been the “one and done” type projects. However, I’m writing \_(or leading) \_more and more code that I either revisit a few years later (an application is ready to be updated/refactored) or a project that is of a large enough scale that we have several people working on it and active development time is more than just a few months.

Some of these visits to the code are joyful reunions where we sit and reflect on past days with big smiles. We head forward, hand in hand, skipping through the digital matrix, making it do our bidding, as we do bigger and better things. Some of these visits are quite the opposite. They are awkward reunions where we don’t know much about each other. More impactfully, I’m here to help an ailing patient and I still don’t really know where their sickness is. Much time is lost poking and prodding and we drag each other through the digital matrix, just trying to stand up again.

Compilers and scripting engines are smart enough nowadays that you can put code nearly anywhere within your project and it will pick it up and run with it without a problem. This enabled RAD coding \_(no, not the 80’s thing, but rapid application development) \_which helps projects get done faster, but can make your code look like a huge pile of mismatched socks for you (or even more importantly, somebody else) down the road. With that in mind, here are some tips, tricks, and principles that I’ve done my best to use to keep my code as maintainable as possible.

### Don’t worry about coding standards, as long as it’s consistent.

camelCase, PascalCase, underscored_spaced_naming, LOUD_CONTANT. All of these kinds of conventions have been subject to loud heated discussions (and online trolling) through the years. Sadly I took part in a few, especially when I was transitioning from one job to another when the “ideals" had changed. I learned that ultimately, they don’t matter. The compiler converts it all into assembly or binary or CLR anyway. They are there to make things easier to grok when you’re scanning through the code. The important thing is that you keep it consitent within your team and you outline that somewhere. That way when you’re starting to work on Joe’s code, or Joe is working on yours, you both have the common understanding of what means what.

One of the major benefits of having a consistent coding standard is that you can leverage code scanning tools to help you enforce it. [ReSharper](https://www.jetbrains.com/resharper/) and [Visual Studio Refactoring Essentials](http://vsrefactoringessentials.com) will both provide prompts (and quick hotkey fixes) to rename your variables if they don’t match a standard, and allow you to defines rules. Similarly, [PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer) can do the same thing for you, and there are various plugins if you wish to use it with an IDE. Even if you’re coding by yourself, these tools have a baseline standard that is widely accepted by the community at large and can keep you coding consistently for yourself.

Along those lines, when it comes to updating somebody else’s code, try to use their style/conventions as much as possible. Yes, you may use the inline constructor instead of declaring a new object and adding the parameters one by one and that may be a few nanoseconds faster when it comes to code execution. However, having that break in consistency makes the code a little more awkward to read for the next user. If you are going to refactor to your own style, make sure you do it everywhere. Most likely you won’t have that kind of time (or might break something), so keeping to the existing standard is beneficial.

### Make your variable names meaningful.

Long gone are the days of x, y, i, j, s variable names. Memory and disk space are cheap, so spending a few extra characters to define your variable “address" or “firstName" instead of “a" or “fn” go a long way to maintaining your code, especially if you get an e-mail 6 months later from another developer who is working on your code and they send you only the snippet asking why “a \* x % z” is throwing an exception. I’m confused now just reading back one sentence. Remember not to go overboard on the opposite extreme as well. “authorizedSecondaryPostalCodeWhenUserSpecifiedInternationalAddress” is indeed descriptive, but probably too much so. Some browsers will probably try to word wrap that variable and we’re not even compiling it. My blog editor just did! Meaningful variable names will also go a long way to help your code be self documenting.

### Organize by structure or feature.

One of the really nice things I like about .Net MVC architecture (as well as others) is that a typical scaffolded project keeps folders aptly named “Models”, “Views”, and “Controllers”. Providing additional benefits through “coding by convention”, you can use the default routing scheme and the “HomeController.cs” file in the controllers folder will automatically be wired up to the /Home route and the various actions will automatically look for the HTML templates in the /Views/Home folder. When you come back to this code later on, you know exactly where to find things for repair or improvement.

Another really nice design I’ve seen in some AngularJS code is what is can be referred to as organization by feature. In this layout, each feature has a folder, and the appropriate templates, services, and controllers are all stored in the same folder. The required “top level” needs are often stored in a “globals” folder or something similar. That way, if you need to update the profile feature, you aren’t jumping around between model/controller/view folders, it is all in one place. This can be quite nice when you have a lot of features (and subsequent files) in an application.

You can apply this to any project that doesn’t have any coding by convention features built in. Early on, I found a huge benefit from structuring my web applications into BLL (business logic layer) and DAL (data access layer) folders the appropriate classes built in. This also helped me keep my code separated by function, so that future updates could be pieced out easier.

### Make a readme file, and use it!

One thing that I have to thank Github and BitBucket for is their feature that if you put a readme.md file (formatted in markdown) at the root of your project, it will automatically render this file on the repository home page in the browser. Some projects don’t make much use of this feature, but we’ve used this feature to provide an overview and springboard to getting a new developer up and running with the project. Typically we outline a few things:

- A quick summary of the project
- Project requirements
- Step by step on getting the project up and running locally
- Packaging and deployment procedures
- Any special “gotchas” or development notes

When done right, we can point a new developer to the repo, and they can get the code up and running on their machine. Then we can sit down with them and outline any special needs or point them to the task to be completed. This is especially important when a project has special software that needs to be installed and can save hours of HBAK (head banging against keyboard) time.

### Reuse! Reuse! Reuse!

If you have a chunk of code that is around 5 lines of code or longer and it is used more than once, extract it out to a “Helper” class and make it a function. Do this early and often. On one had it may make your code seem a little more scattered, but with large teams or projects, you’d be surprised at how frequenly the same code process (fetch the records from the lookup table and put them into a list) winds up being duplicated. Worse yet, it gets duplicated with subtle differences, based on the coder’s style, and thus causes problems when that process needs to refine itself and you have to change it in 5 different places.

### Code to 80 characters.

Wow, that’s a little harsh. Yeah, I know. Honestly I have a hard time sticking to this one myself. I wrote a [blog post about this](/coding-to-80-columns) quite a while ago and I think the concepts and merits are still the same. Keeping your code at 80 columns allows you to easily view your code on the screen without the hassles of horizontal scroll or awkward word wrap. Nowadays retina displays and huge monitors will eliminate this problem. From a maintainability perspective, keeping code to 80 characters will force you to make sure your variable names aren’t too long _(oh wait, I mentioned that above, see what I did there)_. It’ll also help you think about whether or not you need those 8 different conditions to process your if statement. Maybe you do. In that case, splitting them out in a multiline style will help you identify the various statement evaluations, which will help you target the bug in your logic, instead of the ugly horizonal scrolling or word wrapping, which I mentioned above.

With the complexity of some of the code needed these days (or even referencing the object types for declaration) it is often hard to stick to 80, so I typically let my code drift to 100 columns and if for some reason I hit 120, I take a step back and see what I’m doing. A lot of times it can’t be helped, but as much as possible crafting the code to those conventions is very helpful. Plus having a large chunk of code that is crafted succintly and can self document itself is a piece of beautiful code that can stand many years of use and refactoring.

### What else?!

If I’ve learning anything over the years, it’s never stop learning! What tricks do you use to keep your code maintainable? Let me know!
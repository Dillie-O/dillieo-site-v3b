---
title: Integrating The Nivo Slider Into A Codeigniter Site
description: Soup to Nuts - The Complete Package
published: 2011-08-18
image: images/posts/2011-08-soup2nuts.jpg
imageAlt: Soup to Nuts - The Complete Package
category: Default
tags: [codeigniter, coding, javascript, jquery, nivo, php, slider]
---

![Soup to Nuts - The Complete Package](@assets/images/posts/2011-08-soup2nuts.jpg)

Yesterday's adventure in coding involved getting a slider type control integrated into the site we're redesigning. We're taking the old system that was PHP based with its own "templating" sytem and putting into [CodeIgniter](http://codeigniter.com), which is the MVC framework that [PyroCMS](http://pyrocms.com) is based off of (if you remember [my post from last week](/soup-to-nuts-extending-the-user-module-in-pyrocms)).

This new site features a lot of video, and there is a "slider" on the front of the page that cycles through the recent videos available. The current slider we have is functional, but out of date, and since we have [jQuery](http://jquery.com) at our disposal with the new site, I figured getting an existing solution that was easy to integrate and modify was in order.

Enter the [Nivo Slider](http://nivo.dev7studios.com/). I've worked with this slider at my old job, and really liked how you could get a basic slider off the ground really quick, but also had a lot of easy ways to extend and customize it, by using your own stylesheets or even writing your own Javascript code through some triggered events, such as when a new slide came in.

In order to make this MVC friendly to go with CodeIgniter, then plan is to create a View that has our slider HTML code in it. We can then use our video model to retrieve the videos we need. The controller on which our page resides simply needs to retrieve the desired videos and put them in the template data. Since our video objects have lots of details in them, and our image code needs a few indexing keywords in it, I decided to create a helper class that would do the "processing" of our videos in order to generate the appropriate image and caption content. That way if we needed to do some extra manipulation down the road, we only have to worry about the helper and not anything else.

Off to the code!!!!

So the meat of all of this lies in the view and the helper. Our view contains our slider code, like this:

&lt;?php \$this->load->helper('slider'); ?>

&lt;!-- Load slider resources --> &lt;link rel="stylesheet" href="/css/nivo-slider.css" type="text/css" media="screen" /> &lt;link rel="stylesheet" href="/css/nivo-slider-my-style.css" type="text/css" media="screen" /> &lt;script src="/js/jquery.nivo.slider.pack.js" type="text/javascript">&lt;/script>

&lt;div class="slider-wrapper"> &lt;div id="slider"> &lt;?php foreach(get_video_image_code($slider_videos) as $image) { echo(\$image); } ?> &lt;/div>

&lt;?php foreach(get_video_caption_code($slider_videos) as $caption) { echo(\$caption); } ?> &lt;/div>

&lt;script type="text/javascript"> $(window).load(function() { $('#slider').nivoSlider({ effect:'fold', // Specify sets like: 'fold,fade,sliceDown' slices:15, // For slice animations boxCols: 8, // For box animations boxRows: 4, // For box animations animSpeed:500, // Slide transition speed pauseTime:6000, // How long each slide will show startSlide:0, // Set starting Slide (0 index) directionNav:true, // Next & Prev navigation directionNavHide:true, // Only show on hover controlNav:true, // 1,2,3... navigation controlNavThumbs:false, // Use thumbnails for Control Nav controlNavThumbsFromRel:false, // Use image rel for thumbs controlNavThumbsSearch: '.jpg', // Replace this with... controlNavThumbsReplace: '\_thumb.jpg', // ...this in thumb Image src keyboardNav:true, // Use left & right arrows pauseOnHover:true, // Stop animation while hovering manualAdvance:false, // Force manual transitions captionOpacity:0.8, // Universal caption opacity prevText: 'Prev', // Prev directionNav text nextText: 'Next', // Next directionNav text beforeChange: function(){}, // Triggers before a slide transition afterChange: function(){}, // Triggers after a slide transition slideshowEnd: function(){}, // Triggers after all slides have been shown lastSlide: function(){}, // Triggers when last slide is shown afterLoad: function(){} // Triggers when slider has loaded }); }); &lt;/script>

This is pretty much the standard way the Nivo slider is setup. I've chosen to take all the "default" styling required to make things work and put them into a separate stylesheet for easier maintenance. I've also replaced the image and content sections with some PHP code that calls our helper method. Let's take a look at that now.

function get_video_image_code($videos) { $results = array(); \$caption_count = 0;

foreach($videos as $video) { $image_code = ''; $img_path = $\_SERVER\['DOCUMENT_ROOT'] . '/images/videos/' . $video->id . '.jpg';

if ($video->imageid == 0 || !file_exists($img_path)) { $img_path = '/images/videos/default_video.jpg'; } else { $img_path = '/images/videos/' . \$video->id . '.jpg'; }

$image_code .= '&lt;a href="/videos/' . $video->id . '"> &lt;img src="' . $img_path . '" alt="" title="#caption' . $caption_count . '" /> &lt;/a>';

$results\[] = $image_code; \$caption_count++; }

return \$results; }

function get_video_caption_code($videos) { $results = array(); \$caption_count = 0;

foreach($videos as $video) { $caption_code = '&lt;div id="caption' . $caption_count . '" class="nivo-html-caption"> &lt;span class="CaptionTitle">' . $video->title_billboard . '&lt;/span> &lt;br/> &lt;span class="CaptionDescription">' . nl2br($video->description) . '&lt;/span> &lt;/div> ';

$results\[] = $caption_code; \$caption_count++; }

return \$results; }

You'll notice that both methods have a caption count, which allows us to make sure our captions line up with our video images. You'll also notice that the helpers take an array of videos as its input, because if we did our data query here, we risk the chance of a new video slipping in between method calls and then things are out of sync.

In our video model here, our slider images are named with the same Id as the video Id itself. In the event that our video images folder doesn't have the image, or our Id specified is 0, we fall back to our default video image. One word of note. CodeIgniter's application folder is locked out to the public, so you need to make sure that all of your CSS, Javascript, and image files reside under your public_html folder. Because of this issue, I like to use the server's DocumentRoot property when building the file path for me to check. All the image references themselves can remain relative to the public_html folder.

In our video model, we're using the caption field to display both the title and the description of the video they can link to. I wanted to be able to customize these a bit further than what would typically be seen, so I went ahead and wrapped each section up in a SPAN tag and gave them the class of CaptionTitle and CaptionDescription. Then in the "my-style" CSS file I can design this out a bit further.

Within our controller, we load the videos we need and call the View to render it.

$this->load->model('video_model'); $this->template_data\['slider_videos'] = \$this->video_model->get_recent_videos(5);

For those of you not familiar with CodeIgniter (I'm still fresh to it myself) the template_data array is what is passed down and parsed to the View for it to do its presentation with. That is why in the View code at the top it passes in the variable \$slider_videos in order to process. It's a simple "hand me down" type process, but very handy because the template_data is flushed out on every page load (preventing old data from lingering around) and handled automatically.

That's how it all works! I wish I could put an entire "soup to nuts" functional solution here for you, but that would involved getting a lot of CodeIgniter stuff in place. However, I am including my view, helper, and the supporting image/slider files here so you should be able to modify and get this going on your own site pretty quickly. Code will be coming soon.

Enjoy!!!
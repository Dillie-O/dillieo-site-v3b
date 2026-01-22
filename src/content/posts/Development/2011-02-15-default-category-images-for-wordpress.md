---
title: Default Category Images For Wordpress
description: Site without categories
published: 2011-02-15
image: images/posts/2011-02-categories_before_thumb.png
imageAlt: Site without categories
category: Development
tags: [categories, coding, images, wordpress]
---

I’ve been working on a news oriented WordPress site lately. One of the nice things with WordPress 2.9 and above was that they created a “thumbnail” feature, also known as “featured image” in 3.0+. With this feature you could display an image related to the article to help preview it. Most sites you see now use this in conjunction with a “slider” on their home page.

In the site I’m working on, there isn’t a featured image for every single news item available. Sometimes the news item is simply a repeat of a notice from another source. Since the home page of the site looked for an image to display in its list, the page became unattractive since there were a lot of “no image available” boxes scattered on the page:

![Site without categories](@assets/images/posts/2011-02-categories_before_thumb.png "categories_before")

The idea then arose about having an icon or default image for each category, and displaying that when an image was not available. Since I’m still honing my WordPress chops, so I needed to develop a solution that didn’t involve creating plugins and wasn’t too deeply embedded within the site that it would make it hard to update down the road. The home page has several widgets that retrieve the featured image in various formats (full, medium, small) so I needed to find a single point of entry in which to return the image, and let the theme do its own resizing.

The first step was to create the category images and place them into a folder called “category-images” under my “wp-content” folder of the site. The key here is to name the images the same as the “nice name” values for each of the categories. This typically means using all lower case and putting a “-“ in place of spaces, such as “prescribed-burns”. This makes it easier to generate the URL to the images in the code.

The next step is to find the code in my theme where the featured images were being retrieved for a given post. This is where you’re going to have to venture out on your own to implement this solution. \_\[Psst, hey WordPress theme developers, this would be a great time to implement this into your theme so no fancy hackery is needed!] \_After some digging, I found the function that served as the central point for retrieving images that were displayed on the home page widgets:

function get_images($iPostID,$img_size='thumb')

{ $arrImages =& get_children('order=ASC&orderby=menu_order ID&post_type=attachment&post_mime_type=image&post_parent=' . $iPostID ); \$return_arr = array();

if($arrImages) { foreach($arrImages as $key=>$val) { $id = $val->ID;

if($img_size == 'large') { $img_arr = wp_get_attachment_image_src($id,'full'); $return_arr\[] = $img_arr\[0]; } elseif($img_size == 'medium') { $img_arr = wp_get_attachment_image_src($id, 'medium'); $return_arr\[] = $img_arr\[0]; } elseif($img_size == 'thumb') { $img_arr = wp_get_attachment_image_src($id, 'thumbnail'); $return_arr\[] = \$img_arr\[0]; } } }

return \$return_arr; }

The trick to making this work was to add some additional code so that the category image URL would be generated in the even no images where found. The final code looks like this:

```
<span style="font-family:Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif;font-size:13px;line-height:19px;white-space:normal;">
[code lang="php"]
function get_images($iPostID,$img_size='thumb')

{
   $arrImages =& get_children('order=ASC&orderby=menu_order ID&post_type=attachment&post_mime_type=image&post_parent=' . $iPostID );
   $return_arr = array();

   if($arrImages)
   {
      foreach($arrImages as $key=>$val)
      {
         $id = $val->ID;

         if($img_size == 'large')
         {
            $img_arr = wp_get_attachment_image_src($id,'full');
            $return_arr[] = $img_arr[0];
         }
         elseif($img_size == 'medium')
         {
            $img_arr = wp_get_attachment_image_src($id, 'medium');
            $return_arr[] = $img_arr[0];
         }
         elseif($img_size == 'thumb')
         {
            $img_arr = wp_get_attachment_image_src($id, 'thumbnail');
            $return_arr[] = $img_arr[0];
         }
      }
   }
   else
   {
      $category = get_the_category($iPostID);

      // if the category has no parents, use its nicename for a proper URL, otherwise use the parent category name (such as fires)
      if ($category[0]->category_parent == 0)
      {
         $return_arr[0] = site_url('/wp-content/category-images/', '') . $category[0]->category_nicename . '.jpg';
      }
      else
      {
         $parent = get_category($category[0]->category_parent);
         $return_arr[0] = site_url('/wp-content/category-images/', '') . $parent->category_nicename . '.jpg';
      }
   }

   return $return_arr;
}
[/code]

 </span> <span style="font-family:Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif;font-size:13px;line-height:19px;white-space:normal;">WordPress makes it easy to retrieve category, and even parent category information for the post, and we use as much built in methods as possible so that the URL to the images changes easily if the site changes.</span>
```

![Site with categories.](@assets/images/posts/2011-02-categories_after_thumb.png "categories_after")

I’ve seen a few WordPress plugins to assign images to a category, but they were going to be more trouble than it was worth to integrate it into the current theme. Hopefully this gives you a direction to look at if you need to setup category images for your site, or maybe it’ll inspire a WordPress theme creator out there to build this in to the next theme they create. I’m sure there are plenty of sites that can benefit from this.

I’ve been working on a news oriented WordPress site lately. One of the nice things with WordPress 2.9 and above was that they created a “thumbnail” feature, also known as “featured image” in 3.0+. With this feature you could display an image related to the article to help preview it. Most sites you see now use this in conjunction with a “slider” on their home page.

In the site I’m working on, there isn’t a featured image for every single news item available. Sometimes the news item is simply a repeat of a notice from another source. Since the home page of the site looked for an image to display in its list, the page became unattractive since there were a lot of “no image available” boxes scattered on the page:

![Site without categories](@assets/images/posts/2011-02-categories_before_thumb.png "categories_before")

The idea then arose about having an icon or default image for each category, and displaying that when an image was not available. Since I’m still honing my WordPress chops, so I needed to develop a solution that didn’t involve creating plugins and wasn’t too deeply embedded within the site that it would make it hard to update down the road. The home page has several widgets that retrieve the featured image in various formats (full, medium, small) so I needed to find a single point of entry in which to return the image, and let the theme do its own resizing.

The first step was to create the category images and place them into a folder called “category-images” under my “wp-content” folder of the site. The key here is to name the images the same as the “nice name” values for each of the categories. This typically means using all lower case and putting a “-“ in place of spaces, such as “prescribed-burns”. This makes it easier to generate the URL to the images in the code.

The next step is to find the code in my theme where the featured images were being retrieved for a given post. This is where you’re going to have to venture out on your own to implement this solution. \_\[Psst, hey WordPress theme developers, this would be a great time to implement this into your theme so no fancy hackery is needed!] \_After some digging, I found the function that served as the central point for retrieving images that were displayed on the home page widgets:

function get_images($iPostID,$img_size='thumb')

{ $arrImages =& get_children('order=ASC&orderby=menu_order ID&post_type=attachment&post_mime_type=image&post_parent=' . $iPostID ); \$return_arr = array();

if($arrImages) { foreach($arrImages as $key=>$val) { $id = $val->ID;

if($img_size == 'large') { $img_arr = wp_get_attachment_image_src($id,'full'); $return_arr\[] = $img_arr\[0]; } elseif($img_size == 'medium') { $img_arr = wp_get_attachment_image_src($id, 'medium'); $return_arr\[] = $img_arr\[0]; } elseif($img_size == 'thumb') { $img_arr = wp_get_attachment_image_src($id, 'thumbnail'); $return_arr\[] = \$img_arr\[0]; } } }

return \$return_arr; }

The trick to making this work was to add some additional code so that the category image URL would be generated in the even no images where found. The final code looks like this:

```
<span style="font-family:Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif;font-size:13px;line-height:19px;white-space:normal;">
[code lang="php"]
function get_images($iPostID,$img_size='thumb')

{
   $arrImages =& get_children('order=ASC&orderby=menu_order ID&post_type=attachment&post_mime_type=image&post_parent=' . $iPostID );
   $return_arr = array();

   if($arrImages)
   {
      foreach($arrImages as $key=>$val)
      {
         $id = $val->ID;

         if($img_size == 'large')
         {
            $img_arr = wp_get_attachment_image_src($id,'full');
            $return_arr[] = $img_arr[0];
         }
         elseif($img_size == 'medium')
         {
            $img_arr = wp_get_attachment_image_src($id, 'medium');
            $return_arr[] = $img_arr[0];
         }
         elseif($img_size == 'thumb')
         {
            $img_arr = wp_get_attachment_image_src($id, 'thumbnail');
            $return_arr[] = $img_arr[0];
         }
      }
   }
   else
   {
      $category = get_the_category($iPostID);

      // if the category has no parents, use its nicename for a proper URL, otherwise use the parent category name (such as fires)
      if ($category[0]->category_parent == 0)
      {
         $return_arr[0] = site_url('/wp-content/category-images/', '') . $category[0]->category_nicename . '.jpg';
      }
      else
      {
         $parent = get_category($category[0]->category_parent);
         $return_arr[0] = site_url('/wp-content/category-images/', '') . $parent->category_nicename . '.jpg';
      }
   }

   return $return_arr;
}
[/code]

 </span> <span style="font-family:Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif;font-size:13px;line-height:19px;white-space:normal;">WordPress makes it easy to retrieve category, and even parent category information for the post, and we use as much built in methods as possible so that the URL to the images changes easily if the site changes.</span>
```

![Site with categories.](@assets/images/posts/2011-02-categories_after_thumb.png "categories_after")

I’ve seen a few WordPress plugins to assign images to a category, but they were going to be more trouble than it was worth to integrate it into the current theme. Hopefully this gives you a direction to look at if you need to setup category images for your site, or maybe it’ll inspire a WordPress theme creator out there to build this in to the next theme they create. I’m sure there are plenty of sites that can benefit from this.
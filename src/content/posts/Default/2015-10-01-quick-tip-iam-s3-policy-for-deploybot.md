---
title: Quick Tip Iam S3 Policy For Deploybot
description: Quick Tip
published: 2015-10-01
image: images/posts/quick_tip_iam_s3_policy_for_deploybot.webp
imageAlt: Quick Tip
category: Default
tags: [aws, coding, deploybot, iam, policy, s3, security]
---

For one of the projects I’m working on, we’re using [DeployBot](http://www.deploybot.com) to handle deploying our code from our bitbucket repository to an AWS S3 bucket. For security reasons, we want to keep the IAM policy a restrictive as possible, so that it can only add/remove files in that bucket. However, DeployBot needs to be able to connect to S3 and get a list of buckets to provide a list for you to choose from in the deployment wizard. After a little bit of tweaking, this is the IAM policy that worked for me.

<!--more-->

![Quick Tip](../img_post/2015-10-01-quick-tip-iam-s3-policy-for-deploybot/2011-12-quicktip.jpg)

You can build this using the “Inline Policy” feature in AWS IAM. If you had a S3 bucket named “bucket-of-fish”, your policy would look like this:

```{ "Version": "2012-10-17", "Statement": \[ { "Effect": "Allow", "Action": \[ "s3:ListAllMyBuckets", "s3:GetBucketLocation" ], "Resource": \[ "arn:aws:s3:::\*" ] }, { "Effect": "Allow", "Action": \[ "s3:\*" ], "Resource": \[ "arn:aws:s3:::bucket-of-fish" ] }, { "Effect": "Allow", "Action": \[ "s3:\*" ], "Resource": \[ "arn:aws:s3:::bucket-of-fish/\*" ] } ] }```

From what I’ve read, you need to have actions at the root and at the sub-levels of your bucket, which is why we have those two resource entries. The top level one is for simple login / bucket list retrieval.

Enjoy!
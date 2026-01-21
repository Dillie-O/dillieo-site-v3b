---
title: Qakbot Diagnosis And Removal
description: Qakbot Diagnosis And Removal
published: 2011-05-02
image: images/posts/qakbot_diagnosis_and_removal.webp
imageAlt: Qakbot Diagnosis And Removal
category: Default
tags: [geekery, qakbot, virus]
---

Having been through my own wild adventure of a Qakbot infection on a large internal network (see Day 1 if you're looking for a "dramatic" reading of things), I thought it might be helpful to provide more of a "data sheet" approach to Qakbot if you're looking for just the facts.

<!--more-->

I'm sure there is more to it than what I encountered, so please add more facts/info if you've run into it or found valuable information. Hopefully nobody else will be caught so off guard as we were. It is a good chance we suffered a Zero Day attack of it.

## Synopsis

Qakbot is currently in a third generation variant of itself. It consists of a trojan that typically comes down through a web page or file attachment. Once infected, Qakbot will "dial home" and retrieve additional modules to:

- Scan and retrieve financial information from the system
- Spread itself out to other machines, typically through network shares
- Protect itself by disabling virus protection software and blocking access to files/registry settings when removal is attempted.
- Install a backdoor for future access/use by the intruder.

We encountered the following variants of the virus. There are trojans and backdoor versions of them all:

- Win32.Qakbot.B
- Win32.Qakbot.!genB
- Win32.Qakbot.F
- Win32.Qakbot.arc3

It should be noted that Qakbot is VERY intelligent at protecting itself once it has infected a system. We had found instances where current virus definitions stated the virus was cleaned, but upon restart the system had been reinfected, even while disconnected from the network. One reader of my blog (thanks Terry) noted that the virus had created a scheduled task to reinfect itself every 4 hours.

We had noted in our own tests that anytime a new network connection was made, or an existing one pinged, the virus attempted to ride that connection and infect the source/destination system. We found one instance where a fresh virus scan was being run on an infected server, and the virus attempted to reach out again, almost knowing that it was about to be removed. The virus also removes critical ACL (access control list) access to virus scanning and administrative services, so doing a manual removal of the virus becomes difficult, if not impossible.

## Signs

We encountered a few "signs" when examining systems that indicated a system had been infected:

A folder with a random file name (typically about 8 characters long) that resides in one of the following locations:

- Root of a USB thumb drive.
- In the C:\\ProgramData folder in Windows 7
- In the "C:\\Documents and Settings\\All Users\\Application Data" folder in Windows XP

Upon right clicking the "My Computer" icon to change settings (in both Win7 and WinXP) the Symantec installer immediately fired up an "install" process. It typically took 3 consecutive cancel commands to make it go away.

A brief "malfunction" status of the virus scanner and then a sudden change to "normal"

## Articles

Here are a few noteworthy articles, dealing with the third generation variant, or some additional details about the third variant, mixed in with the older variants.

[Detailed Qakbot Analysis by Symantec](http://www.symantec.com/content/en/us/enterprise/media/security_response/whitepapers/w32_qakbot_in_detail.pdf) (PDF Format)

[Trend Micro Article about 3rd Generation](http://blog.trendmicro.com/third-generation-qakbot-repackaged-with-improved-propagation/)

[Visual diagram of how Qakbot works (Trend Micro)](http://about-threats.trendmicro.com/RelatedThreats.aspx?language=us&name=QAKBOT%3A+A+Prevalent+Infostealing+Malware)

[Symantec Profile, including some browser exploits it uses to get onto the system, as well as sites it dials home to (some old)](http://www.symantec.com/security_response/writeup.jsp?docid=2009-050707-0639-99&tabid=2)

[Symantec best practice document for Qakbot removal.](http://www.symantec.com/business/support/index?page=content&id=TECH158678)

## Removal

We were originally using Symantec Antivirus, and while we abandoned the software, they had released a tool that will restore ACL access to the system. After running the ACL fix tool, it is assumed you can then update your virus definions and rescan the system. We were not able to do this successfully. The tool can be downloaded [here](http://www.symantec.com/security_response/writeup.jsp?docid=2011-042105-0220-99).

Trend Micro also provides a "HouseCall" application that has to connect to the Internet, but was proven to be able to find and clean out Qakbot. You can get the tool [here](http://housecall.trendmicro.com/).

Our solution involved disconnecting the computer from the network, uninstalling any existing virus scanning software, and installing Microsoft Forefront Endpoint Protection. This is the "corporate" version of Microsoft Security Essentials, which has also been reported to protect and clean Qakbot. We also installed the latest definitions and intrusion scanner updates (while disconnected) and then ran a full scan of the machine, letting it fully clean before rebotting the system and repeating the process. In some instances when a clean uninstall of our old software didn't work, FEP could forcefully remove it for us.

You can download FEP [here](http://www.microsoft.com/forefront/endpoint-protection/en/us/default.aspx) or MSE [here](http://www.microsoft.com/security/pc-security/mse.aspx).

Definitions/Updates can be found through the directions [here](http://www.microsoft.com/security/portal/Definitions/HowToForeFront.aspx).

In some instances, we had difficulties installing on Windows XP due to a missing "filter pack" The KB reference (and file) that fixes this information can be found [here](http://support.microsoft.com/kb/914882).

## Conclusion

If you have any other details to contribute, please help others and add it here. Hopefully we can prevent others from the mayhem we went through here.
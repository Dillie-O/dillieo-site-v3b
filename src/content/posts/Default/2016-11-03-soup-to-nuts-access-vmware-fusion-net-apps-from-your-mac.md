---
title: Soup To Nuts Access Vmware Fusion Net Apps From Your Mac
description: vmware_network_settings
published: 2016-11-03
image: images/posts/soup_to_nuts_access_vmware_fusion_net_apps_from_your_mac.webp
imageAlt: vmware_network_settings
category: Default
tags: [coding, debugging, development, network, visual-studio, vmware, vmware-fusion]
---

I typically spend at least half of my day developing .Net apps from within Visual Studio on a Mac. I do this thanks to the power of VMWare Fusion. Most of the time I run my tests in [Blisk](https://blisk.io) or Edge, but there are times where I need to verify functionality in Safari without pushing my code up to a test server. While access isn't immediately available, here are the steps you need to make it happen.

<!--more-->

## 1. Get your App Up and Running

The first step is to have you app up and running. To make things easier, you'll want to be running your app over the standard 80/443 ports with a custom URL. If you don't know how to set that up, check out [my post](/soup-to-nuts-custom-domains-and-ssl-in-iis-express) on how to configure that (it's easier than you think).

## 2. Enable Bridged Networking and get your MAC Address

In order for your host machine (Mac) to talk to your guest machine (VM), you'll need to make sure that bridged networking is setup in the settings for your virtual machine, that way it shows up as a separate device on your network and has it's own IP address. Simply open up the settings, select network, and use one of the Bridged options.

You also need to expand the "Advanced" section and make note of the MAC address for your VM. We'll need this to find the IP address of the VM

![vmware_network_settings](@assets/images/posts/2016-11-vmware_network_settings.png)

## 3. Get VM IP Address and Update Hosts File

Back on your host machine, open up the terminal and enter the following command:

```arp -a```

This will bring up the list of IP addresses and the attached MAC addresses on your machine. Find the one that matches the IP of your VM

![vmware_network_ipaddress](@assets/images/posts/2016-11-vmware_network_ipaddress.png)

Once you have this, you can modify your hosts file to include your app URL and the IP address for proper DNS resolution:

![vmware_network_hosts](@assets/images/posts/2016-11-vmware_network_hosts.png)

## 4. Update Windows Firewall

By default, the standard web ports are closed off for external access. You need to open the Windows Firewall control panel, go to Advanced Settings, select Inbound Rules, and then create a new inbound rule.

![vmware_network_firewall](@assets/images/posts/2016-11-vmware_network_firewall.png)

Once you start the Inbound Rule wizard, you want to use the following settings:

- Rule Type - Port
- Port Settings - TCP / Specific Local Port: 80
- Action - Allow Connection
- Profile - Domain / Private / Public (all checked)
- Name - Inbound HTTP 80 (or something you'd recognize)

If you're running your site over HTTPS, repeat this using local port 443

## 5. Test Away!

With these settings in place you can fire up Safari, load up your custom domain, and see the site served up with no hassles.

![vmware_network_safari](@assets/images/posts/2016-11-vmware_network_safari.png)

You can continue to use the debugger and everything else you may need as well.

Enjoy!
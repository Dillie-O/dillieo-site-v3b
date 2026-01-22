---
title: Encrypt That Connection String Pronto
description: Encrypt That Connection String Pronto
published: 2010-04-23
category: Default
tags: [aspnet, coding, connection-strings, encryption, security, webconfig]
---

I?m pulling this one out of the ?oldie but a goodie? based on a deployment I was doing today.

If you have a database connection string that has the password sitting in clear text in your web.config file, you might have some security woes. Granted IIS does a good job and making sure end users can?t get to your web.config file through the browser, you may wind up having other security holes that would expose this data.

I distinctly remember back in the 1.1 days working out a scheme with some fellow developers to protect out connection strings by actually having them sit in a separate file on the server (our ever beloved homer.ini file) and writing a library that would find this mystery file, do some fancy decryption, create a connection object, and return it to the calling code. It was a nice solution, but tricky to establish and even trickier to maintain.

The .Net Framework 2.0 came out a short time later and eliminated all of these woes by creating an executable that will encrypt your connection strings for you! In order to do this, simply log on to the server, open the command prompt, and enter the following command:

_Note: Even if you?re using the 3.0 or the 3.5 Framework, you?ll still want to reference your version 2.0 folder for the encryption, since the 2.0 core is still used for the subsequent versions of the framework._

_Note: If the physical path to your application directory has any spaces in it, you?ll want to wrap the path around quotation marks._

That?s all there is to it! There are a lot of great benefits to using this encryption:

- IIS will use a key unique to the server, so that even if somebody gets ahold of the encrypted web.config file, they won?t be able to decrypt the section.
- Your .Net will automatically decrypt the connection string on the fly, so you don?t need to modify any of your code that digs into the connectionStrings section of your web.config file to retrieve it.
- You can use this same process to encrypt other sections of your web.config file as well (have some appSettings values you don?t want anybody to see?). Simply change the ?connectionStrings? parameter to the appropriate section.

If you need to decrypt the connection string to verify/modify any settings, the command is identical, except you change the ?pef parameter to ?pdf:

No provider details needed on the decryption.

If the server unique encryption key is insufficient, or you need a more global way of managing your encryption, you can also use your own RSA generated keys to manage the encryption/decryption. More details on that can be found [here](http://msdn.microsoft.com/en-us/library/zhhddkxy.aspx).

Enjoy your hassle free encrypted connection strings!
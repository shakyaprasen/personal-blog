---
title: Implementing push notification using Amazon's SNS
description: How I implemented push notification system using Amazon's SNS 
tags:
  - how to
  - Amazon SNS
  - push notification
  - AWS
  - mobile development
  - iOS
  - Android
author: Prasen Shakya 
authorTwitter: ShakyaPrasen
date: "2023-04-14T08:47:44.103Z"
image: https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CnDNKwfCi_BIMBYOinToNAHaCr%26pid%3DApi&f=1&ipt=2ab0fcc6f3aa539bc1529ded427113b5bc575b6d72cd7b457fe441046ee63657&ipo=images
category: development
---
Instead of the normal technical article, I want to structure this as a short "story" - my story - of how I struggled and eventually succeeded in using Simple Notification Service(SNS) to use for push notification. 

While trying to use SNS to easily send push notifications, I found it difficult to find good resources detailing the use of SNS + Firebase Cloud Messaging (hence onwards referred to as FCM) on the big ol' internet. I'm writing this story so that lost souls like me will have a relatively easier time implementing it.

But, before I bombard you with the technical mumbo-jumbo, let's start with the question "Why use SNS for push notification?". If you know about push notifications or have implemented push notifications before, you might be thinking "Why not just use FCM directly", instead of using an additional layer on top FCM. And to that I say, "huh, good question". 

My team decided early on, before starting any work on push notification, to try and minimize external dependencies. Adding to the fact that all of the infrastructure was hosted on AWS and we were already using other AWS services such as S3, SES, etc. it was a conscious choice made to better the developer experience and easy onboarding of other developers to the feature.

So, I started my journey to implement push notification in the application I was working on (Side note: the application and the domain do not have any significant impact to the story so I'll leave it vague). I only had a basic idea of what push notification even was. So, off I went googling "What is push notification" and "How to implement push notification in SNS".

This was the first mistake I made, specifically searching "How to implement push notification in SNS". Skimming through the result I found myself thinking "Sweet, this is easy SNS can directly send a push notification to the mobile phone, this should be easy". I follow a few steps that I found in the docs and reach my first hurdle. While creating a platform application endpoint, it asks for the push notification platform. 

I'm thinking I made a mistake as I don't see this being mentioned in other articles as well. That's when I find out SNS in isolation cannot send push notifications by itself but another service like Apple Push Notification (APN) Service or FCM sends the push to the devices.

With this knowledge in hand, I continue to follow the steps detailed in the AWS SNS documentation. I first setup a test Firebase account and add my mobile app to the firebase project, following the instructions of the google documentation. I then use the server key from the cloud messaging tab to the create platform application screen in amazon SNS.

![FCM setup](https://imgur.com/lkEuesl.png)

Well that's all well and done, now all there's left is to add the device token (Unique device id to identify each device) and send the push notification.

![Push tests](https://imgur.com/Vlh9TQ5.png)

Now, the next thing left to do was just send a message using the AWS sdk to SNS and the SNS should in theory forward it to Google Cloud Messaging (GCM), and it should handle the rest.

While sending the message to GCM, AWS documentation gives lots of options for message formatting for each type of platform(iOS and Android). I had to find out the hard way that since we are sending the push notification first to GCM and only then to the user's device, I needed to send the message to GCM specifically without regard to the platform. 

The final message needed to be JSON stringified before sending and looked something like this:

```javascript
    const gcm = {
      notification: {
        body: messageOptions.message,
        title: messageOptions.title || 'Untapped notification.',
      },
    };
    const payload = {
      default: messageOptions.message,
      GCM: JSON.stringify(gcm),
    };

    const stringifiedPayload = JSON.stringify(payload);
```

I was almost done with the push notification well, not quite. Installing the application to an Android phone and testing the feature through the new notification option under cloud messaging in Firebase console and seemed to work. But, making it work on iOS devices was a whole another story for next time.




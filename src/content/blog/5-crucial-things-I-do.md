---
title: 5 crucial things that I do before deploying my code
description: There's a simple secret to building a faster website — just ship less.
tags:
  - programming habits
  - productivity
  - steps
author: Prasen Shakya 
authorTwitter: ShakyaPrasen
date: "2023-03-08T10:23:31.210Z"
image: https://cdn-images-1.medium.com/v2/resize:fit:800/1*hnKi5SeEFNhI3c2fAUbh3Q.jpeg
category: development
---

On my tech journey, I have tried to learn everything I can. Though my journey has not been too long, I have developed some habits - some subconsciously, some deliberately, some good, some let's say… not so good. Not only me, but I have observed this to be true of my peers and friends as well. Thinking about this led me to write a short blog about one of the many habits that I have delivered on my journey to become a developer.

First things first, every developer has something to do before deploying their code. So, here I am writing about the 5 things I do before deploying my code.

*Here is the tldr:*

*The 5 steps I follow before deploying any code:*

- *Check if the finished code fulfills the requirements/user story*
- *Compare the changes to the code*
- *Test the functionality on local/ staging server*
- *Make sure all the code review comments are addressed*
- *Make sure the automated tests have passed*


## Check if the finished code fulfills the requirements/user story
The first thing that I always do before even thinking about committing and pushing my code is making sure my code works as intended. Even before testing edge cases, I make sure that my code fulfills the users requirements or user story.

## Compare the changes to the code
After the first step, I compare the changes to every file that I have made. This step helps me spot any errors like typos or missed console logs as well as re-evaluate any logic/ statements - so that I can make it cleaner/ simpler.

## Test the functionality on local/ staging server
Immediately after rechecking, I push my code to the cloud and test the functionality on the staging server to check if any thing might be broken on non-local environment.

## Make sure all the code review comments are addressed
Meanwhile, in between steps 2 and 3, I always keep the comments in the code review in mind and address them. Sometimes, I learn new things and ways to better my code, other times I find things that i have missed.

## Make sure the automated tests have passed
Finally, before deploying-merging I check to see if the CI tests like those of Code Climate have passed. These CI tests make sure that the code adheres to the standards of the project.

So, these are the sort of the general checklists that I follow before deploying my code. Different people might have different checklists or things that they do and these things might differ based on the tech stack or between organizations or even between individuals.



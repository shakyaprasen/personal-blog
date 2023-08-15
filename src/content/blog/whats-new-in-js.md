---
title: What's new in Javascript
description: Find out what is new and interesting in the world of Javascript
tags:
  - javascript
  - frontend
  - react
author: Prasen Shakya 
authorTwitter: ShakyaPrasen
date: "2023-08-13T13:53:24.193Z"
image: https://i.imgur.com/fAwP1DP.png
category: development
---

# What's new in JS

I am always on the lookout for new and interesting things happening in the Javascript ecosystem. So, I have listed three things 
that I am on the lookout for:

## Valibot

Let's start with [Valibot](https://valibot.dev/). Valibot is a library used to validate data in Javascript. It uses schemas to define types of data that can be validated within the runtime.
Talking about types, Valibot schemas are similar to Typescript types but are executed at runtime since Typescript types are a build-time feature. This allows validation of type for unknown data and guarantee type safety. It boasts a 98% smaller bundle size compared to Zod and can be used with form validation libraries like Modular Forms and vee-validate.

You might be thinking other libraries do the same like Zod, Yup, etc. And the answer would be yes there are others but I prefer Valibot for the following reasons

- Modular design  
	Valibot is written as a combination of small and independent functions with a single job. This makes the code easy to understand and test.
	
- Smaller size  
	Due to the modular design, the Valibot code is tree-shakeable i.e. only the code that is used is packaged into the final bundle. This results in a significantly smaller bundle size in comparison to other schema libraries.
	
- Typescript Similarities/Type Inference  
	Another feature of Valibot is that typescript types can be inferred from a Valibot Schema. You can use the *Input* or *Output* function on a Schema to get the type of the input/output respectively. You could do *Output<typeof PersonSchema>* to get a Typescript type derived from the PersonSchema. Additionally, Typescript options like Partial, Pick, Omit, Required, etc also have their counterparts in Valibot as partial, pick, omit, and required respectively.


### Is it production ready?
The documentation for Valibot is currently still in progress and Valibot is currently on v.0.12.0. I would suggest using [Zod](https://zod.dev/) for the meanwhile.

## Million.js

[Million.js](https://million.dev/) is created by Aiden Bai. It is a drop in virtual DOM replacement for React. Speed is the name of the game for Million.js as it boasts up to 70% performance improvement for React Components. 
It is lightweight <4kb and uses an optimized virtual DOM to reduce the overhead of React. It works by using Higher Order Components (HOC) it calls *Blocks*. Blocks are HOCs hyper-optimized for rendering speed. 

Currently, you can use Million.js in two modes Automatic and Manual. Use automatic mode when you want Million.js to automatically analyze your components and figure out which ones it needs to optimize.  
If you want fine-tuned control over which components you want Million.js to speed up. Using this mode requires you to know and use its concepts like *Blocks*, *For*, *Macro*, etc. 

### Is it production ready?
Million.js is currently on v.2.5.13 with 66 contributors and regular updates with good documentation and support for major React frameworks like Next.js, Astro, etc as well as other bundlers/compilers like Vite, Webpack, Rollup, etc. Use Million.js if you want to improve render speed for your React components with React 18 and up.

## Additional reading
[Dive into virtual DOM in React and Million](https://million.dev/blog/virtual-dom)  
[Behind the block()](https://million.dev/blog/behind-the-block)  

## React Server Components (RSC)

RSC is a new paradigm in the React ecosystem. This model for building applications allows different parts of your application to be rendered/managed on either the client side or the server side. This might sound a bit confusing, normally we either do full Single Page Applications (SPAs) or do Server Side Rendering(SSR) which are concerned with either client side or server side respectively. 
Server Components allow parts of an application to be rendered on the server with rehydration and other interactive parts to be rendered in the client's browser.   

### Server Component   
Let's think of it this way, a simple component that fetches data and renders it in a list would be a prime candidate for a server component. Since the server is closer to the database, the initial load times are faster. The bundle size is also smaller since the server renders the list and sends it to the client.  
  
### Client Component  
On the other hand, if you want to create a search bar that searches the rendered list then, a client component is the way to go. Since the search bar is interactive i.e. can be dynamically populated at runtime we would better handle the events on the client side. 
  
The server components i.e. the list can still be a server component, as after searching we can re-render the list component with the search params. React Server Component can dynamically update just the list portion of the application even after the search terms have been updated.

![Client and server components example](https://i.imgur.com/C0TOBky.png)

### Some advantages:  
Even though it adds a mental overhead for the developers, it provides the following advantages as well:
- Less code delivered to the client reducing bundle size.
- Faster data fetching as your server is closer to the database.
- Better User Experience(UX) for the client due to data streaming and Suspense.


### Is it production ready?
React Server Components is usable from React 18. It is recommended to use a meta-framework for React to use server components instead of directly using RSC from React. Frameworks like Next.js as well as Hydrogen support and provide a great interface to use server components. 
If you can justify the tradeoff between the development/mental overhead against the listed advantages then you can start using React Server Components today.

## Additional reading
[Server Components From Scratch - Dan Abramov](https://github.com/reactwg/server-components/discussions/5)  
[Initial demo/talk for React Server Components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components)  
[Next.js server components doc](https://nextjs.org/docs/getting-started/react-essentials#server-components)  

---
title: Create composable components
description: A straightforward way to improve your frontend components and make them reactive.
tags:
  - frontend
  - components
  - vue
  - react
author: Prasen Shakya 
authorTwitter: ShakyaPrasen
date: "2023-05-06T08:04:52.245Z"
image: https://i.imgur.com/DP4jVqp.jpg
category: frontend
---

## Background

I started my software journey from the frontend. There has been a lot of struggles, learnings and hardships
in this journey. Even though I hear most people say frontend is easy and backend is harder, I struggled quite
a bit on frontend when starting out. At the time I would search for articles, blogs and tutorials to make my life
as a frontend developer easier. This is one such post which would have helped me and I hope will help someone else
at a similar place in their career.  

With the background out of the way, let's start with 'why the *"Composable components"* topic?'. I see a lot of junior
developers starting out in full-stack development and walk into similar problems on the frontend side. So, this is an
article which aims to help those developers look at frontend development from a different perspective.

## The Problem

One of the things that I see repeated during code reviews and pair programming sessions with junior developers on the frontend
side is use of what I like to call *if/else components*.  

Let me start off with an example,  

  ```html
    //SimpleButtonComponent.vue
      <button type="button" @click="handleClick">
        Click me!
        <SomeIcon />
      </button>
  ```

As you can see, it is a simple button component with a text and an icon after. Seems like a simple enough button. Now
let's say your Project Manager gives you a new requirement: instead of SomeIcon use AnotherIcon components 
in a couple of places. To solve this requirement I have seen a lot of junior devs do something like :


  ```html
    //SimpleButtonComponent.vue
      <button type="button" @click="handleClick">
        Click me!
        {{ isSomeIcon ? <SomeIcon /> : <AnotherIcon /> }}
      </button>
  ```
Here isSomeIcon is a prop based on which either SomeIcon or AnotherIcon is used. Now the name *if/else components* might make
more sense. While inherently there is nothing wrong with this components or even this type of solution to the problem, when an
additional requirement like a third icon or move the icon before the text pops up then it becomes a problem.
I have seen this solution compound into components with many if/else or switch statements all over the place.  

Some additional problems which can prop up (no pun intended) due to this:
  - Hard to use components
  - Increased code complexity from increased number of conditions
  - Massive number of props
  - Prop drilling

## The solution

An elegant solution to this problem is a technique called *"Component Composition"*. Component composition simply means creating
your components with the help of other components. Another good way of thinking about component composition is thinking that the
component and parts inside of the components as blocks(or Lego blocks). Like with Lego blocks, one block can be added to many types
of other Lego blocks and create entirely different kind of output.  

## Component Composition in Action

Let's demonstrate composition with a diagram

<img src="https://i.imgur.com/5MudrAZ.png" width="300" alt="Simple dropdown">

We can see a simple dropdown component with an icon on the right in the image above. Let's say that we are to create this component in 
a composable way. How would I go about it? The way I would start creating the component is by visualizing the component it into sensible blocks.

<img src="https://i.imgur.com/B9fNKEo.png" width="300" alt="Diagram showing component composition">


I would have four blocks of smaller component to create the whole dropdown component. 
Additionally, I would add *slots* in Vue and *render props* in React to these four components so that any one of them can be easily replaced with 
a different component. 
*In Vue, [slot](https://vuejs.org/guide/components/slots.html#slots) and in 
React, [render props](https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering) can be used to 
achieve component composition.*
The functionality however would be handled by the encompassing dropdown component as a whole. for example:

  ```html
    //DropdownComponent.vue
    <div>
      <slot name="selected">
        <span>{{ selectedValue }}</span>
      </slot>
      <slot name="icon">
        <DownIcon />
      </slot>
    </div>
    <slot name="list-wrapper">
      <ItemListWrapper >
        <ItemList v-for="item in items" >
          <slot name="list-item">
            <button @click="() => selectItem(item)">{{ item }}</button>
          </slot>
        </ItemList>
      </ItemListWrapper>
    </slot>
  ```

As you can see adding four slots in the Vue components has made it so that the parent using the DropdownComponent can use it as is (with
the defaults used or can override any or all of the slots with any other component). This gives the parent freedom to modify the UI without
having to add additional props or even changing the Dropdown component.

In addition to slots and render props as a simple placeholder for components, they can also be used to create Headless components i.e. 
components which do not provide any UI but only act as a wrapper which provide functionality. One such instance that I have used headless component 
in the past is a lazy loader component which lazy loads any media like images, audio, etc only after the component gets close to the viewport. 
This lazy loader component did not have any UI but only had the functionality of loading the content after it entered the viewport.


[Scoped slots](https://vuejs.org/guide/components/slots.html#scoped-slots) allow you to pass data from the child to the parent for additional
help in customization for Vue while passing a functin to a render prop which accepts arguments is a way to do the same in React.

## Further Reading

  - [Patterns.dev](https://www.patterns.dev/posts/render-props-pattern)  
    A great dive into render props pattern and how to use it to compose components in React

  - [BinarCode Article](https://medium.com/binarcode/understanding-scoped-slots-in-vue-js-db5315a42391)  
    A clear explanation of scoped slots in Vue and how it can be used to create a composable and flexible table. This is close to something
    that I myself have implemented for creating a flexible table from scratch in Vue.



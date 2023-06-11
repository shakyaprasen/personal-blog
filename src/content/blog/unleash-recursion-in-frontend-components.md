---
title: Unleash the Power of Recursion in Frontend Component Creation 
description: This blog post explains the use of recursive components in frontend 
tags:
  - frontend
  - components
  - recursion
author: Prasen Shakya 
authorTwitter: ShakyaPrasen
date: "2023-06-11T14:43:25.580Z"
image: https://i.imgur.com/rvfomXR.jpg 
category: development
---

# Unleash the Power of Recursion in Frontend Component Creation

## The artistry of component creation

 I think component creation in frontend programming is something akin to art rather than science. Given a problem, the types of components that will be created will be proportional to the number of frontend engineers who try to solve it. How a component is structured, the types of props which are accepted, the breakdown of the number of UI elements to different components, the events which the component will emit, whether the component state will be handled by itself or will it offload some or all state management to the component implementing its interface will all differ. 
 Some might make their components easily composable, some might make their components non-extensible. The artistry in frontend component creation cannot be denied. 


## Background

A couple of weeks back, I stumbled upon a particular problem in the realm of Frontend development: "How can I make a Navigation bar with an arbitrary level of depth?". 

The nested-route structure would look something like (*depth arbitrary*):

```bash
├── Route 1
│   ├── Subroute 1
│   │   └── Nested Subroute 1
│   ├── Subroute 2
│   ├── SubRoute 3
│   │   └── Nested subroute 1
│   │       ├── Super nested subroute 1
│   │       └── Super nested subroute 1
│   │           └──....
│   └── Subroute 4
├── Route 2
│   ├── Subroute 1
│   ├── SubRoute 2
│   └── Subroute 3
│       └── Nested Subroute 1
└── Route 3
```

I had the data structure for the routes in an array in JS which directly mapped to the above structure.

After some thinking, the first naïve solution that came to my mind was to get/derive the maximum depth of nested routes and run a for loop on the number. After writing out it in pseudo-code, I came to the obvious conclusion that a branch of a nested route could be rendered in such a way, for other branches/sub-routes it would be a headache if they had differing depths.

Going back to the drawing board, I had to create a component that would have a relatively simple interface but also be flexible enough to handle any level of depth. The solution I reached for this time was dreaded; *at least by me*, **Recursion**. There was only one problem, I hadn't done any recursion on the component side of things and was not aware of how to even get started.

## Unraveling the magic

So, you might say *"How does recursion help create a nested navbar with arbitrary depth"*. Let's think of the above problems in terms of components. In the structure previously mentioned, there are Routes inside which are routes themselves and subroutes. Subroutes with further nested routes are nothing else but the same as top-level routes and so on. 

So, it seems there are 2 major cases:
1. Routes -> Subroutes(without further nested routes)
2. Routes -> Subroutes(with further nested routes)

Looking at the second case, it seems that the subroute will have the top-level route itself. All the cases for further nesting are then covered by the above two cases. So, we need to have a way for a component to use itself which is what recursion is.

Now that we're done with figuring out what we have to do, we'll need to do it. Modern frontend frameworks like Vue.js and React it's relatively simple you just call the component itself from within itself.

```vue
// RecursiveComponent.vue
<template>
  <RecursiveComponent />
</template>
```

```jsx
const RecursiveComponent = () => ({
  <div>
    { <RecursiveComponent /> }
  </div>
})
```

*Note: Do not use the above example. No terminal condition is specified so the component will recurse infinitely or till the browser terminates it.*

So, let's start with the html for a base route:

```vue
// NavList.vue
<template>
  <div v-for="(route, idx) in routes" :key="idx" v-bind="$attrs">
    <template v-if="route.type === 'route'">
      <button
        type="button"
        role="link"
      >
        {{ route.label }}
      </button>
    </template>
  </div>
</template>
```

This will render all the base routes with the type "route" i.e. routes that have no subroutes (in our case only Route 3). Now we need to handle the case for base routes that have sub routes(i.e. Route 1 and Route 2):

```vue
// NavList.vue
    <template v-else>
      <div
      >
        {{ route.label }}
      </div>
      <NavList
        :routes="route.subRoute"
        :style="padding-left: 20px;"
      />
    </template>
```

We add an else condition for base routes with subroute which we'll want to be unclickable so we'll put the label inside a div tag. Now we will have to render the subroutes for this condition which are inside the "subRoute" key. Then we add a NavList component which is the component itself passing the subroutes in the route key which will contain all the subroutes which may or may not have further nested subroutes (Subroute 1, 2, 3 4 and all their nested subroutes for Route 1). 

This will render the component itself however with the subroutes. For Subroute 1 from Route 1, since it has subroutes, it will satisfy the else condition. and then again send its nested subroutes contained in its "subRoute" key to another instance of NavList. Since Nested Subroute 1 for Subroute 1 from Route 1 does not further have nested routes, it will then satisfy the if condition. The recursion then will exit after rendering a button and move onto Subroute 2 from Route 1. This will again satisfy the if condition and render a button and move on to the next Subroute and so on.

Even though it is hard to grasp recursion at the start once you have a grasp of it does get easier. So, the final Navlist.vue Component is:

```vue
<template>
  <div v-for="(route, idx) in routes" :key="idx" v-bind="$attrs">
    <template v-if="route.type === 'route'">
      <button
        type="button"
        role="link"
      >
        {{ route.label }}
      </button>
    </template>
	<template v-else>
      <div
      >
        {{ route.label }}
      </div>
      <NavList
        :routes="route.subRoute"
        :style="padding-left: 20px;"
      />
    </template>
  </div>
</template>
```

## Best practices for recursion

There are some things to be considered when doing anything related to recursion. If you miss any condition or don't think through iterations, the result might not be what you expect. And as we all know it is very difficult to debug recursion code. 
Some things to keep in mind to minimize headaches when working with recursion are:

1. Clearly define component boundaries
	Recursive components will need proper boundaries about what the component being recursed does and what can be done by the parent component. For the above example, the component only has the responsibility of rendering the Navigation items and labels.
	
2. Proper termination conditions
	Termination conditions or base cases also should be properly considered. If you miss a case for terminating the recursion then it will result in an error. So, I always suggest writing the termination condition first to be crystal clear on the base case.

3. Implement with care and understanding
	You'll have bugs in your code so take your time implementing recursion and try to go through the loops in the recursion in your head or written somewhere.

## Use case

In addition to the case mentioned above, there are some other use cases for using recursion in components:

1. Tree-like structures(navigation menus, file explorers)
2. Hierarchical data visualization



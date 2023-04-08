import type{ NavItems } from './types'

export const NAV_ITEMS: NavItems = {
    home: {
        path: '/',
        title: 'home'
    },
    blog: {
        path: '/blog',
        title: 'blog'
    },
    tags: {
        path: '/tags',
        title: 'tags'
    },
    // media: {
    //     path: '/media',
    //     title: 'media'
    // },
    about: {
        path: '/about',
        title: 'about'
    }
}

export const SITE = {
    // Your site's detail?
    name: "Prasen's blog",
    title: "Prasen Shakya's Blog",
    description: 'This is my personal blog site',
    url: 'https://astro-ink.vercel.app',
    githubUrl: 'https://github.com/shakyaprasen/personal-blog',
    listDrafts: true,
    image: 'https://avatars.githubusercontent.com/u/44523852?v=4',
    // YT video channel Id (used in media.astro)
    ytChannelId: '',
    // Optional, user/author settings (example)
    // Author: name
    author: 'Prasen Shakya', // Example: Fred K. Schott
    // Author: Twitter handler
    authorTwitter: 'ShakyaPrasen', // Example: FredKSchott
    // Author: Image external source
    authorImage: 'https://avatars.githubusercontent.com/u/44523852?v=4', // Example: https://pbs.twimg.com/profile_images/1272979356529221632/sxvncugt_400x400.jpg, https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png
    // Author: Bio
    authorBio: 'Mostly a curious javascript developer surfing these treacherous technology waters.'
}

// Ink - Theme configuration
export const PAGE_SIZE = 8
export const USE_POST_IMG_OVERLAY = false
export const USE_MEDIA_THUMBNAIL = true

export const USE_AUTHOR_CARD = true
export const USE_SUBSCRIPTION = false /* works only when USE_AUTHOR_CARD is true */

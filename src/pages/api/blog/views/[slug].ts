import type { APIRoute } from 'astro'
import { createClient } from '@supabase/supabase-js'
// import Redis from 'ioredis'
// In development/HMR, you can accidentally make this call numerous times and exceed your quota...
// const client = new Redis(import.meta.env.REDIS_URI)
// so you can replace the above line with...
const supabaseUrl = import.meta.env.SUPABASE_URL 
const supabaseKey = import.meta.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// the API surface we've used is largely equal

// PostgreSQL, Redis
// Supabase,
const getViewsBySlug = async (slug: string): Promise<number> =>  {
    if(slug) {
        try {
        const viewsTable = await supabase.from('views').select().eq('slug', slug)
        if (!viewsTable.data.length) {
          const res = await supabase.from('views').insert({ slug, views: 1 })
          console.log(res)
          return 1
        }
        const prevValue = viewsTable.data[0].views
        const newValue = prevValue + 1
        const response = await supabase.from('views').update({ views: newValue }).eq('slug', slug)
        console.log(response)
        return newValue
      } catch(e) {
        console.error(e)
        return 0
      }
    } else {
        return 0
    }
}

export const get: APIRoute = async ({ params, request}) => {
    return {
        body: JSON.stringify({
            views: await getViewsBySlug(params.slug!)
        })
    }
}

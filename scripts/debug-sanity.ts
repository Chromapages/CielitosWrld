
import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

const { createClient } = require('next-sanity')
const { apiVersion, dataset, projectId } = require('../sanity/env')
const { HOME_PAGE_QUERY } = require('../sanity/lib/queries')

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
})

async function debug() {
    try {
        console.log('Connected to project:', projectId)
        console.log('Connected to dataset:', dataset)

        console.log('Testing about query...')

        const aboutData = await client.fetch(`
            *[_type == "homeAbout"][0] {
                "title": heading,
                "content": bio,
                "image": profileImage { asset->{ _id, url, metadata { dimensions, lqip } } },
                "backgroundImage": backgroundImage { asset->{ _id, url, metadata { dimensions, lqip } } }
            }
        `)
        console.log('About Data:', JSON.stringify(aboutData, null, 2))
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

debug()

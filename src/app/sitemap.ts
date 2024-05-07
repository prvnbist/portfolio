import fs from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.prvnbist.com'

const directory = path.join(process.cwd(), 'src/articles')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const paths: MetadataRoute.Sitemap = []

   fs.readdirSync(directory).forEach(async file => {
      if (file.endsWith('.mdx')) {
         paths.push({
            url: `${BASE_URL}/blog/${file.replace('.mdx', '')}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
         })
      }
   })

   return [
      {
         url: BASE_URL,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 1,
      },
      {
         url: `${BASE_URL}/code`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.8,
      },
      {
         url: `${BASE_URL}/design`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.8,
      },
      {
         url: `${BASE_URL}/blog`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.8,
      },
      ...paths,
   ]
}

import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { blogSitemapQuery, mosaicQuery } from '@/sanity/lib/queries'
import type { MosaicItemData } from '@/sanity/types'
import { getYouTubeId, getYouTubeThumbnail } from '@/lib/youtube'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }

  try {
    const mosaicItems = await client.fetch<MosaicItemData[]>(mosaicQuery)
    const videos = mosaicItems
      .filter((item) => item.mediaType === 'youtube')
      .map((item) => {
        const id = getYouTubeId(item.youtubeUrl)
        if (!id) return null
        return {
          title: item.caption ?? 'CrossStrat retail placement video',
          description: item.caption ?? 'Behind-the-scenes retail placement video from CrossStrat.',
          thumbnail_loc: getYouTubeThumbnail(id),
          player_loc: `https://www.youtube.com/embed/${id}`,
          publication_date: item.uploadDate,
        }
      })
      .filter((v): v is NonNullable<typeof v> => v !== null)
    if (videos.length) blogEntry.videos = videos
  } catch (err) {
    console.error('sitemap: failed to fetch mosaic videos, omitting video sitemap entries', err)
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    blogEntry,
  ]

  try {
    const posts = await client.fetch<{ slug: string; _updatedAt: string }[]>(blogSitemapQuery)
    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
    return [...staticPages, ...blogPages]
  } catch (err) {
    console.error('sitemap: failed to fetch blog posts, falling back to static pages only', err)
    return staticPages
  }
}

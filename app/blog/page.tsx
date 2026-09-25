import type { Metadata } from 'next'
import { stegaClean } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { blogListQuery, blogPageQuery, mosaicQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { FALLBACK_BLOG_POSTS, FALLBACK_BLOG_CATEGORIES, FALLBACK_BLOG_PAGE, withFallback } from '@/lib/fallbacks'
import type { BlogCategoryData, BlogPageData, BlogPostSummary, MosaicItemData, SiteSettingsData } from '@/sanity/types'
import BlogSearch from '@/components/blog/BlogSearch'
import MediaMosaic from '@/components/blog/MediaMosaic'
import JsonLd from '@/components/JsonLd'
import AnimateIn from '@/components/AnimateIn'
import { SITE_URL, DEFAULT_OG_IMAGE, metaDescription } from '@/lib/site'
import { getYouTubeId, getYouTubeThumbnail } from '@/lib/youtube'

// Sanity's webhook revalidates on publish; this is the safety net if it misfires.
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const settings: SiteSettingsData = stegaClean((await client.fetch(siteSettingsQuery)) ?? {})
  const page: BlogPageData = stegaClean((await client.fetch<BlogPageData>(blogPageQuery)) ?? {})
  const ownerName = settings.ownerName ?? 'CrossStrat'
  const seo = page.seo ?? {}

  const description =
    metaDescription(seo.description) ??
    'Tactics, frameworks, and firsthand insights on getting Amazon and DTC brands onto retail shelves at Walmart, Target, Whole Foods, and beyond.'
  const title = seo.title ?? `Retail Insights Content | ${ownerName} — Retail Placement Consultant`
  const ogImage = seo.ogImage
    ? {
        url: urlFor(seo.ogImage).width(1200).height(630).fit('crop').auto('format').url(),
        width: 1200,
        height: 630,
        alt: seo.ogImage.alt ?? title,
      }
    : { ...DEFAULT_OG_IMAGE, alt: `Retail Insights — ${ownerName}` }

  return {
    title,
    description,
    alternates: {
      canonical: seo.canonical || '/blog',
      types: { 'application/rss+xml': `${SITE_URL}/blog/feed.xml` },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/blog`,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
    robots: seo.noindex ? { index: false, follow: false } : undefined,
  }
}

export default async function BlogPage() {
  let posts: BlogPostSummary[] = FALLBACK_BLOG_POSTS
  let categories: BlogCategoryData[] = FALLBACK_BLOG_CATEGORIES
  let mosaicItems: MosaicItemData[] = []

  const settings: SiteSettingsData = stegaClean((await client.fetch(siteSettingsQuery)) ?? {})
  const ownerName = settings.ownerName ?? '[Owner Name]'
  const page = withFallback(
    FALLBACK_BLOG_PAGE,
    stegaClean((await client.fetch<BlogPageData>(blogPageQuery)) ?? {}),
  )

  try {
    const { data: rawData } = await sanityFetch({ query: blogListQuery })
    const data = rawData as { posts: BlogPostSummary[]; categories: BlogCategoryData[] } | null
    if (data?.posts?.length) posts = data.posts
    if (data?.categories?.length) categories = data.categories
  } catch {
    // use fallbacks
  }

  try {
    const { data: rawMosaic } = await sanityFetch({ query: mosaicQuery })
    mosaicItems = (rawMosaic as MosaicItemData[] | null) ?? []
  } catch {
    // no mosaic items
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Retail Insights — ${ownerName}`,
    description:
      'Tactics, frameworks, and firsthand insights on getting consumer brands into major retail chains.',
    url: `${SITE_URL}/blog`,
    author: {
      '@type': 'Person',
      name: ownerName,
      url: SITE_URL,
      jobTitle: settings.ownerTitle ?? 'Retail Placement Consultant',
    },
    publisher: {
      '@type': 'Organization',
      name: settings.logoText ?? settings.ownerName ?? 'CrossStrat',
      url: SITE_URL,
    },
  }

  const videoItems = mosaicItems
    .filter((item) => item.mediaType === 'youtube')
    .map((item) => {
      const id = getYouTubeId(item.youtubeUrl)
      return id ? { item, id } : null
    })
    .filter((v): v is { item: MosaicItemData; id: string } => v !== null)

  const videoSchema = videoItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: videoItems.map(({ item, id }, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'VideoObject',
            name: item.caption ?? `${ownerName} retail placement video`,
            description: item.caption ?? 'Behind-the-scenes retail placement video.',
            thumbnailUrl: getYouTubeThumbnail(id),
            embedUrl: `https://www.youtube.com/embed/${id}`,
            url: item.youtubeUrl,
          },
        })),
      }
    : null

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Retail Insights Articles',
    url: `${SITE_URL}/blog`,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/blog/${post.slug.current}`,
      name: post.title,
    })),
  }

  return (
    <main>
      <JsonLd schema={blogSchema} />
      <JsonLd schema={itemListSchema} />
      {videoSchema && <JsonLd schema={videoSchema} />}

      {/* ── Blog header ── */}
      <section
        className="bg-brand-jet-black pt-32 pb-16 px-6 lg:px-12 border-b border-brand-silver/15"
        aria-label="Retail Insights Content"
      >
        <AnimateIn className="max-w-7xl mx-auto">
          <p className="font-barlow font-bold text-brand-dim-grey tracking-widest text-xs uppercase mb-4 fade-up-item stagger-1">
            {page.eyebrow}
          </p>
          <h1 className="font-playfair text-display-lg md:text-display-xl leading-none mb-5 fade-up-item stagger-2">
            <span className="text-brand-red">{page.headline}</span>
            <span className="text-brand-alabaster"> {page.headlineAccent}</span>
          </h1>
          <p className="font-barlow text-brand-silver text-body max-w-2xl leading-relaxed fade-up-item stagger-3">
            {page.subheadline}
          </p>
        </AnimateIn>
      </section>

      {/* ── Search + grid ── */}
      <BlogSearch posts={posts} categories={categories} labels={page} />

      {/* ── Media mosaic ── */}
      <MediaMosaic
        items={mosaicItems}
        eyebrow={page.mosaicEyebrow}
        headline={page.mosaicHeadline}
        headlineAccent={page.mosaicHeadlineAccent}
      />
    </main>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { BlogListLabels, BlogPostSummary } from '@/sanity/types'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function postNum(index: number) {
  return String(index).padStart(2, '0')
}

interface Props {
  post: BlogPostSummary
  variant?: 'featured-main' | 'featured-secondary' | 'grid'
  index?: number
  labels: Pick<BlogListLabels, 'readLabel' | 'minReadLabel'>
}

export default function BlogCard({ post, variant = 'grid', index, labels }: Props) {
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage)
        .width(variant === 'featured-main' ? 1200 : 800)
        .height(variant === 'featured-main' ? 800 : 450)
        .fit('crop')
        .auto('format')
        .url()
    : null

  const firstCategory = post.categories?.[0]

  /* ── featured-main: tall left card, content pinned to bottom ── */
  if (variant === 'featured-main') {
    return (
      <article className="group relative h-full overflow-hidden bg-brand-jet-black">
        {/* background image fills card */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={(post.coverImage as { alt?: string })?.alt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-jet-black via-brand-jet-black/60 to-transparent" />

        {/* faint post number */}
        {index != null && (
          <span className="absolute top-4 left-5 font-barlow text-7xl font-bold text-brand-alabaster/10 leading-none select-none pointer-events-none">
            {postNum(index)}
          </span>
        )}

        {/* content pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {firstCategory && (
            <p className="font-barlow font-semibold text-brand-red text-xs tracking-widest uppercase mb-2">
              {firstCategory.title}
            </p>
          )}
          <h2 className="font-playfair text-brand-alabaster text-stat md:text-display-sm leading-tight mb-4">
            <Link href={`/blog/${post.slug.current}`} className="hover:no-underline">
              {post.title}
            </Link>
          </h2>
          <div className="flex items-center gap-4">
            {post.readingTime && (
              <span className="font-barlow text-brand-silver/60 text-xs tracking-wide">
                {post.readingTime} {labels.minReadLabel}
              </span>
            )}
            {post.publishedAt && (
              <span className="font-barlow text-brand-silver/60 text-xs tracking-wide">
                {formatDate(post.publishedAt)}
              </span>
            )}
            <Link
              href={`/blog/${post.slug.current}`}
              className="ml-auto font-barlow font-semibold text-brand-red text-xs tracking-widest uppercase hover:text-brand-alabaster transition-colors"
              aria-label={`Read article: ${post.title}`}
            >
              {labels.readLabel}
            </Link>
          </div>
        </div>
      </article>
    )
  }

  /* ── featured-secondary: stacked right cards ── */
  if (variant === 'featured-secondary') {
    return (
      <article className="group relative h-full overflow-hidden bg-brand-jet-black flex flex-col">
        {/* image top half */}
        <div className="relative flex-none h-[55%] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={(post.coverImage as { alt?: string })?.alt ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
          {/* faint post number */}
          {index != null && (
            <span className="absolute top-3 left-4 font-barlow text-5xl font-bold text-brand-alabaster/10 leading-none select-none pointer-events-none">
              {postNum(index)}
            </span>
          )}
        </div>

        {/* content */}
        <div className="flex flex-col flex-1 p-5">
          {firstCategory && (
            <p className="font-barlow font-semibold text-brand-red text-xs tracking-widest uppercase mb-1.5">
              {firstCategory.title}
            </p>
          )}
          <h2 className="font-playfair text-brand-alabaster text-subheadline leading-tight mb-3 line-clamp-2">
            <Link href={`/blog/${post.slug.current}`} className="hover:no-underline">
              {post.title}
            </Link>
          </h2>
          <div className="flex items-center gap-3 mt-auto">
            {post.readingTime && (
              <span className="font-barlow text-brand-silver/60 text-xs tracking-wide">
                {post.readingTime} {labels.minReadLabel}
              </span>
            )}
            {post.publishedAt && (
              <span className="font-barlow text-brand-silver/60 text-xs tracking-wide">
                {formatDate(post.publishedAt)}
              </span>
            )}
            <Link
              href={`/blog/${post.slug.current}`}
              className="ml-auto font-barlow font-semibold text-brand-red text-xs tracking-widest uppercase hover:text-brand-alabaster transition-colors"
              aria-label={`Read article: ${post.title}`}
            >
              {labels.readLabel}
            </Link>
          </div>
        </div>
      </article>
    )
  }

  /* ── grid: rolling grid cards + related posts default ── */
  return (
    <article className="blog-card group flex flex-col h-full bg-brand-jet-black">
      {/* optional image */}
      {imageUrl && (
        <div className="relative overflow-hidden flex-none h-[180px]">
          <Image
            src={imageUrl}
            alt={(post.coverImage as { alt?: string })?.alt ?? post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {index != null && (
            <span className="absolute top-3 left-4 font-barlow text-5xl font-bold text-brand-alabaster/10 leading-none select-none pointer-events-none">
              {postNum(index)}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {firstCategory && (
          <p className="font-barlow font-semibold text-brand-red text-xs tracking-widest uppercase mb-2">
            {firstCategory.title}
          </p>
        )}

        <h2 className="font-playfair text-brand-alabaster text-subheadline leading-tight mb-3">
          <Link href={`/blog/${post.slug.current}`} className="hover:no-underline">
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="font-barlow text-brand-silver text-label leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 mt-auto pt-4">
          {post.readingTime && (
            <span className="font-barlow text-brand-silver/60 text-xs tracking-wide">
              {post.readingTime} {labels.minReadLabel}
            </span>
          )}
          {post.publishedAt && (
            <span className="font-barlow text-brand-silver/60 text-xs tracking-wide">
              {formatDate(post.publishedAt)}
            </span>
          )}
          <Link
            href={`/blog/${post.slug.current}`}
            className="ml-auto font-barlow font-semibold text-brand-red text-xs tracking-widest uppercase hover:text-brand-alabaster transition-colors"
            aria-label={`Read article: ${post.title}`}
          >
            {labels.readLabel}
          </Link>
        </div>
      </div>
    </article>
  )
}

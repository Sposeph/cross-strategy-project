import BlogCard from './BlogCard'
import type { BlogListLabels, BlogPostSummary } from '@/sanity/types'

interface Props {
  posts: BlogPostSummary[]
  labels: BlogListLabels
}

export default function BlogGrid({ posts, labels }: Props) {
  if (posts.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-px bg-brand-dim-grey mx-auto mb-6" aria-hidden="true" />
        <p className="font-playfair text-brand-dim-grey text-display-sm">{labels.noResultsTitle}</p>
        <p className="font-barlow text-brand-silver text-label mt-3">
          {labels.noResultsBody}
        </p>
      </div>
    )
  }

  const featuredMain = posts[0]
  const featuredSide = posts.slice(1, 3)
  const rollingPosts = posts.slice(3)

  return (
    <div className="border border-brand-silver/15">
      {/* ── Featured mosaic — layout depends on post count ── */}
      {featuredSide.length === 0 ? (
        /* 1 post: full-width */
        <div className="h-[480px] md:h-[560px] relative transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:z-10">
          <BlogCard post={featuredMain} variant="featured-main" index={1} labels={labels} />
        </div>
      ) : featuredSide.length === 1 ? (
        /* 2 posts: side-by-side, equal height */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-dim-grey/20">
          <div className="h-[420px] relative transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:z-10">
            <BlogCard post={featuredMain} variant="featured-main" index={1} labels={labels} />
          </div>
          <div className="h-[420px] relative transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:z-10">
            <BlogCard post={featuredSide[0]} variant="featured-secondary" index={2} labels={labels} />
          </div>
        </div>
      ) : (
        /* 3+ posts: tall left, stacked right */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-dim-grey/20">
          <div className="md:row-span-2 h-[480px] md:h-auto relative transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:z-10">
            <BlogCard post={featuredMain} variant="featured-main" index={1} labels={labels} />
          </div>
          {featuredSide.map((post, i) => (
            <div key={post._id} className="h-[340px] relative transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:z-10">
              <BlogCard post={post} variant="featured-secondary" index={i + 2} labels={labels} />
            </div>
          ))}
        </div>
      )}

      {/* ── Rolling 3-col grid ── */}
      {rollingPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-dim-grey/20 border-t border-brand-silver/15">
          {rollingPosts.map((post, i) => {
            const isLast = i === rollingPosts.length - 1
            const rem3 = rollingPosts.length % 3
            const rem2 = rollingPosts.length % 2
            const spanClass = isLast
              ? `${rem3 === 1 ? 'lg:col-span-3' : ''} ${rem2 === 1 ? 'sm:col-span-2' : ''}`.trim()
              : ''
            return (
              <div key={post._id} className={`bg-brand-jet-black relative transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:z-10 ${spanClass}`.trim()}>
                <BlogCard post={post} variant="grid" index={i + 4} labels={labels} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

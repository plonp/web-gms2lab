import { useParams, Link } from 'react-router-dom'
import { useCopy } from '../hooks/useCopy'
import { useFavorites } from '../hooks/useFavorites'
import { BLOG_POSTS } from '../data/blogs'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [copiedId, copy] = useCopy()
  const { toggleFavorite, isFavorite } = useFavorites()

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug)
  const post = BLOG_POSTS[currentIndex]

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Tutorial Not Found</h1>
        <p className="mt-2 text-sm text-gm-muted">The blog post or guide you are looking for does not exist.</p>
        <Link to="/blogs" className="mt-6 inline-block rounded border border-gm-green bg-gm-card px-4 py-2 text-xs font-semibold text-gm-green hover:bg-gm-card-hover">Back to Blogs</Link>
      </div>
    )
  }

  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6">
        <Link to="/blogs" className="inline-flex items-center gap-1.5 text-xs text-gm-muted hover:text-gm-green transition-colors">&larr; Back to all tutorials</Link>
      </div>

      <header className="border-b border-gm-border pb-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`font-semibold ${post.categoryColor || 'text-gm-orange'}`}>{post.category}</span>
            <span className="text-gm-muted">&bull;</span>
            <span className="text-gm-muted font-mono">{post.readTime}</span>
            <span className="text-gm-muted">&bull;</span>
            <span className="text-gm-muted font-mono">{post.date}</span>
          </div>
          <button type="button" onClick={() => toggleFavorite(post.slug)} className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-medium transition-colors ${isFavorite(post.slug) ? 'border-yellow-400/50 bg-yellow-400/10 text-yellow-400' : 'border-gm-border bg-gm-code text-gm-muted hover:text-white hover:border-gm-border-light'}`}><span>{isFavorite(post.slug) ? '★' : '☆'}</span><span>{isFavorite(post.slug) ? 'Favorited' : 'Add to Favorites'}</span></button>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">{post.title}</h1>
        <p className="mt-3 text-sm sm:text-base text-gm-text leading-relaxed">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => <span key={tag} className="rounded bg-gm-code px-2 py-0.5 text-[11px] text-gm-muted border border-gm-border">#{tag}</span>)}
        </div>
      </header>

      {post.overview && (
        <section className="rounded-lg border border-gm-border bg-gm-card p-5 mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gm-green mb-2">Overview</h2>
          <p className="text-xs sm:text-sm text-gm-text leading-relaxed">{post.overview}</p>
        </section>
      )}

      {post.sections && post.sections.length > 1 && (
        <nav aria-label="Table of Contents" className="rounded-lg border border-gm-border bg-gm-card p-5 mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">Table of Contents</h2>
          <ul className="space-y-1 text-xs">
            {post.sections.map((sec, idx) => (
              <li key={sec.id || idx}>
                <a href={`#${sec.id || `section-${idx}`}`} className="text-gm-muted hover:text-gm-green transition-colors">{sec.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="space-y-10">
        {post.sections.map((sec, idx) => {
          const sectionId = sec.id || `section-${idx}`
          return (
            <section key={sectionId} id={sectionId} className="scroll-mt-16">
              <h2 className="text-xl font-bold text-white mb-3">{sec.title}</h2>
              {sec.content && <p className="text-xs sm:text-sm text-gm-text leading-relaxed mb-4">{sec.content}</p>}

              {sec.steps && (
                <ol className="mb-4 list-decimal list-inside space-y-2 text-xs sm:text-sm text-gm-text">
                  {sec.steps.map((st, sIdx) => <li key={sIdx} className="leading-relaxed pl-1"><span className="text-white">{st}</span></li>)}
                </ol>
              )}

              {sec.code && (
                <div className="relative mb-4">
                  <pre className="overflow-x-auto rounded border border-gm-border bg-gm-code p-3 pr-24 font-mono text-xs text-gm-text leading-relaxed"><code>{sec.code}</code></pre>
                  <button type="button" onClick={() => copy(sec.code, sectionId)} className={`absolute right-2 top-2 rounded border px-2 py-1 text-[11px] ${copiedId === sectionId ? 'border-gm-green bg-gm-card text-gm-green' : 'border-gm-border bg-gm-card text-gm-muted hover:border-gm-green hover:text-gm-green'}`}>{copiedId === sectionId ? 'Copied!' : 'Copy Code'}</button>
                </div>
              )}

              {sec.callout && (
                <div className={`rounded-lg border p-4 text-xs leading-relaxed ${sec.callout.type === 'important' ? 'border-gm-orange/40 bg-gm-code text-gm-text' : 'border-gm-green/40 bg-gm-code text-gm-text'}`}>
                  <strong className={sec.callout.type === 'important' ? 'text-gm-orange block mb-1' : 'text-gm-green block mb-1'}>{sec.callout.title}</strong>
                  <span>{sec.callout.text}</span>
                </div>
              )}

              {sec.accordion && (
                <details className="mt-4 rounded-lg border border-gm-border bg-gm-card p-4 text-xs">
                  <summary className="cursor-pointer font-semibold text-gm-green hover:text-white select-none">{sec.accordion.title}</summary>
                  <div className="mt-3 pt-3 border-t border-gm-border text-gm-text space-y-3">
                    {sec.accordion.content && <p className="leading-relaxed">{sec.accordion.content}</p>}
                    {sec.accordion.steps && (
                      <ol className="list-decimal list-inside space-y-2 text-xs text-gm-text">
                        {sec.accordion.steps.map((st, sIdx) => <li key={sIdx} className="leading-relaxed pl-1"><span className="text-white">{st}</span></li>)}
                      </ol>
                    )}
                    {sec.accordion.code && (
                      <div className="relative mt-3">
                        <pre className="overflow-x-auto rounded border border-gm-border bg-gm-code p-3 pr-24 font-mono text-xs text-gm-text leading-relaxed"><code>{sec.accordion.code}</code></pre>
                        <button type="button" onClick={() => copy(sec.accordion.code, `${sectionId}-accordion`)} className={`absolute right-2 top-2 rounded border px-2 py-1 text-[11px] ${copiedId === `${sectionId}-accordion` ? 'border-gm-green bg-gm-card text-gm-green' : 'border-gm-border bg-gm-card text-gm-muted hover:border-gm-green hover:text-gm-green'}`}>{copiedId === `${sectionId}-accordion` ? 'Copied!' : 'Copy Code'}</button>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </section>
          )
        })}
      </div>

      <nav aria-label="Tutorial Navigation" className="mt-12 pt-8 border-t border-gm-border flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevPost ? (
          <Link to={`/blogs/${prevPost.slug}`} className="w-full sm:w-auto text-left rounded border border-gm-border bg-gm-card p-3 hover:border-gm-border-light transition-colors">
            <span className="block text-[10px] uppercase text-gm-muted font-bold">Previous Guide</span>
            <span className="text-xs font-semibold text-white hover:text-gm-green">{prevPost.title}</span>
          </Link>
        ) : <div />}
        {nextPost && (
          <Link to={`/blogs/${nextPost.slug}`} className="w-full sm:w-auto text-right rounded border border-gm-border bg-gm-card p-3 hover:border-gm-border-light transition-colors">
            <span className="block text-[10px] uppercase text-gm-muted font-bold">Next Guide</span>
            <span className="text-xs font-semibold text-white hover:text-gm-green">{nextPost.title}</span>
          </Link>
        )}
      </nav>
    </div>
  )
}

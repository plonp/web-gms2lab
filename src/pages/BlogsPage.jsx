import { useState } from 'react'
import { Link } from 'react-router-dom'

const BLOG_POSTS = Object.entries(import.meta.glob('../blogs/*.js', { eager: true })).map(([path, mod]) => {
  const data = mod.default || mod, id = path.split('/').pop().replace(/\.[^/.]+$/, '')
  return { ...data, slug: data.slug || id.replace(/_/g, '-') }
})

const CATEGORIES = ['All', ...new Set(BLOG_POSTS.map((b) => b.category))]

export default function BlogsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const q = search.trim().toLowerCase()
  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = !q || `${post.title} ${post.description} ${post.category} ${post.tags.join(' ')}`.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="border-b border-gm-border pb-8 mb-8">
        <h1 className="text-3xl font-bold text-white">GameMaker Blogs &amp; Tutorials</h1>
        <p className="mt-2 text-sm text-gm-muted">Step-by-step guides, third-party API implementations, and practical game architecture for GameMaker Studio 2.3+.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tutorials by title, tag, or topic..." className="w-full rounded-lg border border-gm-border bg-gm-code px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-gm-green focus:outline-none" />
            {search && <button type="button" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gm-muted hover:text-white">Clear</button>}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`rounded px-2.5 py-1 text-xs font-medium border ${selectedCategory === cat ? 'border-gm-green bg-gm-card text-gm-green font-semibold' : 'border-gm-border bg-gm-code text-gm-muted hover:text-white hover:border-gm-border-light'}`}>{cat}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-gm-border bg-gm-card p-8 text-center">
          <p className="text-sm text-gm-muted">No tutorials found matching your criteria.</p>
          <button type="button" onClick={() => { setSearch(''); setSelectedCategory('All') }} className="mt-3 text-xs text-gm-green hover:underline">Reset Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filtered.map((post) => (
            <article key={post.slug} className="rounded-lg border border-gm-border bg-gm-card p-6 flex flex-col justify-between hover:border-gm-border-light transition-colors">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2.5">
                  <span className={`font-semibold ${post.categoryColor || 'text-gm-orange'}`}>{post.category}</span>
                  <div className="flex items-center gap-3 text-gm-muted font-mono">
                    <span>{post.readTime}</span>
                    <span>&bull;</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <Link to={`/blogs/${post.slug}`} className="group block">
                  <h2 className="text-xl font-bold text-white group-hover:text-gm-green transition-colors">{post.title}</h2>
                </Link>
                <p className="mt-2.5 text-xs sm:text-sm text-gm-text leading-relaxed">{post.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => <span key={tag} className="rounded bg-gm-code px-2 py-0.5 text-[11px] text-gm-muted border border-gm-border">#{tag}</span>)}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gm-border pt-4 text-xs">
                <span className="text-gm-muted">By {post.author}</span>
                <Link to={`/blogs/${post.slug}`} className="inline-flex items-center gap-1 font-semibold text-gm-green hover:underline">Read Tutorial &rarr;</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

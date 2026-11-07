import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

const BLOG_POSTS = Object.entries(import.meta.glob('../blogs/*.js', { eager: true })).map(([path, mod]) => {
  const data = mod.default || mod, id = path.split('/').pop().replace(/\.[^/.]+$/, '')
  const sectionsText = (data.sections || []).map((s) => `${s.title} ${s.content || ''} ${s.code || ''}`).join(' ')
  const searchText = `${data.title} ${data.category} ${data.description} ${(data.tags || []).join(' ')} ${data.overview || ''} ${sectionsText}`.toLowerCase()
  return { ...data, slug: data.slug || id.replace(/_/g, '-'), searchText }
})

const BASE_CATEGORIES = ['All', ...new Set(BLOG_POSTS.map((b) => b.category))]

export default function BlogsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const q = search.trim().toLowerCase()
  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'All' ? true : selectedCategory === 'Starred' ? isFavorite(post.slug) : post.category === selectedCategory
    const matchesSearch = !q || post.searchText.includes(q)
    return matchesCat && matchesSearch
  })

  // Display starred entries at the top before other entries
  const sorted = [...filtered].sort((a, b) => {
    const aFav = isFavorite(a.slug) ? 1 : 0
    const bFav = isFavorite(b.slug) ? 1 : 0
    return bFav - aFav
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="border-b border-gm-border pb-8 mb-8">
        <h1 className="text-3xl font-bold text-white">GameMaker Blogs &amp; Tutorials</h1>
        <p className="mt-2 text-sm text-gm-muted">Step-by-step guides, third-party API implementations, and practical game architecture for GameMaker Studio 2.3+.</p>
        <div className="mt-6">
          <div className="relative">
            <input id="search-input" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tutorials by title, category, code, tags..." className="w-full rounded-lg border border-gm-border bg-gm-code px-4 py-2.5 pr-12 text-sm text-white placeholder-neutral-500 focus:border-gm-green focus:outline-none" />
            {search ? (
              <button type="button" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gm-muted hover:text-white">Clear</button>
            ) : (
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gm-border bg-gm-card px-1.5 py-0.5 font-mono text-[11px] text-gm-muted" title="Press / to search">/</kbd>
            )}
          </div>
          <p className="mt-2 text-left text-xs text-gm-muted">{search ? `${filtered.length} of ${BLOG_POSTS.length} tutorials found` : `${BLOG_POSTS.length} tutorials available (Press / to search)`}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {BASE_CATEGORIES.map((cat) => (
            <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`rounded px-2.5 py-1 text-xs font-medium border ${selectedCategory === cat ? 'border-gm-green bg-gm-card text-gm-green font-semibold' : 'border-gm-border bg-gm-code text-gm-muted hover:text-white hover:border-gm-border-light'}`}>{cat}</button>
          ))}
          <button type="button" onClick={() => setSelectedCategory('Starred')} className={`rounded px-2.5 py-1 text-xs font-medium border ${selectedCategory === 'Starred' ? 'border-yellow-400 bg-gm-card text-yellow-400 font-semibold' : 'border-gm-border bg-gm-code text-gm-muted hover:text-yellow-400 hover:border-yellow-400/50'}`}>★ Starred ({favorites.length})</button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-lg border border-gm-border bg-gm-card p-8 text-center">
          <p className="text-sm text-gm-muted">{search ? `No tutorials match "${search}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.` : (selectedCategory === 'Starred' ? 'No starred tutorials yet. Click the star icon on any tutorial to bookmark it!' : 'No tutorials found matching your criteria.')}</p>
          <button type="button" onClick={() => { setSearch(''); setSelectedCategory('All') }} className="mt-3 text-xs text-gm-green hover:underline">Clear Search &amp; Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {sorted.map((post) => {
            const starred = isFavorite(post.slug)
            return (
              <article key={post.slug} className={`rounded-lg border bg-gm-card p-6 flex flex-col justify-between transition-colors ${starred ? 'border-yellow-400/40 hover:border-yellow-400/70' : 'border-gm-border hover:border-gm-border-light'}`}>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${post.categoryColor || 'text-gm-orange'}`}>{post.category}</span>
                      {starred && <span className="inline-flex items-center gap-1 rounded bg-yellow-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-400 border border-yellow-400/30">★ Starred</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3 text-gm-muted font-mono">
                        <span>{post.readTime}</span>
                        <span>&bull;</span>
                        <span>{post.date}</span>
                      </div>
                      <button type="button" onClick={(e) => { e.preventDefault(); toggleFavorite(post.slug) }} title={starred ? 'Remove from favorites' : 'Add to favorites'} className={`rounded p-1 text-base leading-none transition-colors ${starred ? 'text-yellow-400 hover:text-yellow-300' : 'text-neutral-500 hover:text-neutral-300'}`}>{starred ? '★' : '☆'}</button>
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
            )
          })}
        </div>
      )}
    </div>
  )
}

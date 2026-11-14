import { useState } from 'react'
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogs'
import BlogCard from '../components/BlogCard'

const PAGE_SIZE = 10

export default function BlogsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const q = search.trim().toLowerCase()
  const filtered = BLOG_POSTS.filter((p) => {
    const matchTab = activeTab === 'all' ? (category === 'All' || p.category === category) : p.highlight
    return matchTab && (!q || p.searchText.includes(q))
  })

  // Display highlighted entries at the top before other entries
  const sorted = [...filtered].sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE) || 1
  const validPage = Math.min(Math.max(1, page), totalPages)
  const paginated = sorted.slice((validPage - 1) * PAGE_SIZE, validPage * PAGE_SIZE)

  const goTo = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const onSearch = (v) => { setSearch(v); setPage(1) }
  const onCategory = (c) => { setCategory(c); setPage(1) }
  const onTab = (t) => { setActiveTab(t); setPage(1) }
  const onReset = () => { setSearch(''); setCategory('All'); setActiveTab('all'); setPage(1) }

  const pages = totalPages <= 7
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : validPage <= 4
    ? [1, 2, 3, 4, 5, '...', totalPages]
    : validPage >= totalPages - 3
    ? [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    : [1, '...', validPage - 1, validPage, validPage + 1, '...', totalPages]

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="border-b border-gm-border pb-8 mb-8">
        <h1 className="text-3xl font-bold text-white">GameMaker Blogs &amp; Tutorials</h1>
        <p className="mt-2 text-sm text-gm-muted">Step-by-step guides, third-party API implementations, and practical game architecture for GameMaker Studio 2.3+.</p>
        
        <div className="mt-6 flex items-center gap-6 border-b border-gm-border text-sm">
          <button type="button" onClick={() => onTab('all')} className={`pb-3 font-semibold border-b-2 -mb-px transition-colors ${activeTab === 'all' ? 'border-gm-green text-gm-green' : 'border-transparent text-gm-muted hover:text-white'}`}>All</button>
          <button type="button" onClick={() => onTab('highlights')} className={`pb-3 font-semibold border-b-2 -mb-px transition-colors ${activeTab === 'highlights' ? 'border-gm-green text-gm-green' : 'border-transparent text-gm-muted hover:text-white'}`}>Highlights</button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <input id="search-input" type="text" value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search tutorials by title, category, code, tags..." className="w-full rounded-lg border border-gm-border bg-gm-code px-4 py-2.5 pr-12 text-sm text-white placeholder-neutral-500 focus:border-gm-green focus:outline-none" />
            {search ? (
              <button type="button" onClick={() => onSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gm-muted hover:text-white">Clear</button>
            ) : (
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gm-border bg-gm-card px-1.5 py-0.5 font-mono text-[11px] text-gm-muted" title="Press / to search">/</kbd>
            )}
          </div>
          <p className="mt-2 text-left text-xs text-gm-muted">{search ? `${filtered.length} of ${BLOG_POSTS.length} tutorials found` : `${filtered.length} tutorials available (Press / to search)`}</p>
        </div>

        {activeTab === 'all' && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {BLOG_CATEGORIES.map((cat) => (
              <button key={cat} type="button" onClick={() => onCategory(cat)} className={`rounded px-2.5 py-1 text-xs font-medium border ${category === cat ? 'border-gm-green bg-gm-card text-gm-green font-semibold' : 'border-gm-border bg-gm-code text-gm-muted hover:text-white hover:border-gm-border-light'}`}>{cat}</button>
            ))}
          </div>
        )}
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-lg border border-gm-border bg-gm-card p-8 text-center">
          <p className="text-sm text-gm-muted">{search ? `No tutorials match "${search}"${activeTab === 'all' && category !== 'All' ? ` in ${category}` : ''}.` : (activeTab === 'highlights' ? 'No highlight tutorials found.' : 'No tutorials found matching your criteria.')}</p>
          <button type="button" onClick={onReset} className="mt-3 text-xs text-gm-green hover:underline">Clear Search &amp; Filters</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {paginated.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gm-border pt-6 text-xs">
              <span className="text-gm-muted">Showing {(validPage - 1) * PAGE_SIZE + 1}–{Math.min(validPage * PAGE_SIZE, sorted.length)} of {sorted.length} tutorials</span>
              <div className="flex items-center gap-1.5">
                <button type="button" disabled={validPage <= 1} onClick={() => goTo(validPage - 1)} className={`rounded px-3 py-1.5 border font-medium ${validPage <= 1 ? 'border-gm-border bg-gm-code text-gm-muted opacity-40 cursor-not-allowed' : 'border-gm-border bg-gm-code text-gm-muted hover:text-white hover:border-gm-border-light'}`}>&larr; Prev</button>
                {pages.map((num, i) => (
                  num === '...' ? (
                    <span key={`dots-${i}`} className="px-2 py-1 text-gm-muted select-none">&hellip;</span>
                  ) : (
                    <button key={num} type="button" onClick={() => goTo(num)} className={`rounded min-w-[32px] px-2 py-1.5 border font-medium ${validPage === num ? 'border-gm-green bg-gm-card text-gm-green font-semibold' : 'border-gm-border bg-gm-code text-gm-muted hover:text-white hover:border-gm-border-light'}`}>{num}</button>
                  )
                ))}
                <button type="button" disabled={validPage >= totalPages} onClick={() => goTo(validPage + 1)} className={`rounded px-3 py-1.5 border font-medium ${validPage >= totalPages ? 'border-gm-border bg-gm-code text-gm-muted opacity-40 cursor-not-allowed' : 'border-gm-border bg-gm-code text-gm-muted hover:text-white hover:border-gm-border-light'}`}>Next &rarr;</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

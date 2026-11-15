import { useState } from 'react'
import { useCopy } from '../hooks/useCopy'
import { DIRECTORY_ITEMS } from '../data/directoryData'
import { UI_SCREEN_AND_HUD_GUIDE } from '../data/guidesData'
import GuideCard from '../components/GuideCard'

const GUIDES = [
  {
    title: '1. Structs & Constructors (GML 2.3+)',
    desc: 'GameMaker 2.3 introduced lightweight data structures called Structs and Constructor functions. Unlike classic DS Maps, structs are garbage-collected automatically and support static member functions.',
    code: 'function PlayerInventory() constructor {\n    items = [];\n    static add_item = function(_id, _count = 1) {\n        array_push(items, { id: _id, count: _count });\n    };\n}',
  },
  {
    title: '2. Delta Time & Frame Independence',
    desc: 'To ensure game physics run consistently across monitors with 60Hz, 144Hz, or variable refresh rates, scale per-step movements by the fraction of a second elapsed.',
    code: '// In Step Event:\nvar _dt = delta_time / 1000000;\nx += (move_speed * 60) * _dt;',
  },
  {
    ...UI_SCREEN_AND_HUD_GUIDE,
    title: '3. Major UI Screen Types & HUD Elements',
  },
]

export default function DocsPage() {
  const [search, setSearch] = useState('')
  const [copiedId, copy] = useCopy()
  const q = search.trim().toLowerCase()
  const filtered = q ? DIRECTORY_ITEMS.filter((i) => `${i.title} ${i.description} ${i.categoryLabel} ${i.tags}`.toLowerCase().includes(q)) : DIRECTORY_ITEMS

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="border-b border-gm-border pb-8 mb-8">
        <h1 className="text-3xl font-bold text-white">Documentation &amp; Directory</h1>
        <p className="mt-2 text-sm text-gm-muted">Core architectural patterns, drawing pipelines, best practices, and resource directory for GameMaker Studio 2.3+.</p>
      </div>

      <div className="space-y-8">
        {GUIDES.map((g) => <GuideCard key={g.title} guide={g} />)}

        <section className="pt-6 border-t border-gm-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Resource Directory</h2>
              <p className="text-xs text-gm-muted mt-1">Reusable systems, snippets, and math algorithms.</p>
            </div>
            <div className="w-full sm:w-72">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter directory snippets..." className="w-full rounded-lg border border-gm-border bg-gm-code px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-gm-green focus:outline-none" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-lg border border-gm-border bg-gm-card p-8 text-center">
              <p className="text-sm text-gm-muted">No resources match &ldquo;{search}&rdquo;.</p>
              <button type="button" onClick={() => setSearch('')} className="mt-3 text-xs text-gm-green hover:underline">Clear Search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((item) => (
                <article key={item.id} className="flex flex-col justify-between rounded-lg border border-gm-border bg-gm-card p-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-2">
                      <span className="font-semibold text-gm-orange">{item.categoryLabel}</span>
                      <span className="text-gm-muted font-mono">{item.version}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-xs text-gm-text leading-relaxed">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.tags.map((tag) => <span key={tag} className="rounded bg-gm-code px-1.5 py-0.5 text-[10px] text-gm-muted border border-gm-border">#{tag}</span>)}
                    </div>
                    <details className="mt-3 text-xs">
                      <summary className="cursor-pointer text-gm-muted hover:text-gm-green select-none">View Code Snippet</summary>
                      <pre className="mt-2 overflow-x-auto rounded border border-gm-border bg-gm-code p-2.5 font-mono text-[11px] text-gm-text"><code>{item.snippet}</code></pre>
                    </details>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-gm-border pt-3 text-xs">
                    <span className="text-gm-muted">{item.type}</span>
                    <button type="button" onClick={() => copy(item.snippet, item.id)} className={`rounded border px-2 py-1 ${copiedId === item.id ? 'border-gm-green bg-gm-card text-gm-green' : 'border-gm-border bg-gm-card text-gm-muted hover:border-gm-green hover:text-gm-green'}`}>{copiedId === item.id ? 'Copied!' : 'Copy Code'}</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}



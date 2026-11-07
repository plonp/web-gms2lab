import { useState } from 'react'
import ScriptCard from '../components/ScriptCard'

const loadedScripts = Object.entries(import.meta.glob('../gms2scripts/*.js', { eager: true })).map(([path, mod]) => {
  const data = mod.default || mod, id = path.split('/').pop().replace(/\.[^/.]+$/, '')
  return { id, name: data.name || id, category: data.category || 'General', explanation: data.explanation || '', code: data.code || '' }
})

export default function ScriptsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const q = searchQuery.trim().toLowerCase()
  const filtered = q ? loadedScripts.filter((s) => `${s.name} ${s.category} ${s.explanation} ${s.code}`.toLowerCase().includes(q)) : loadedScripts

  return (
    <>
      <section className="border-b border-gm-border bg-gm-header py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">GameMaker Script Library</h1>
          <p className="mt-2 text-sm text-gm-muted">Essential drop-in GameMaker functions, algorithms, and scripts for GMS 2.3+.</p>
          <div className="mt-6">
            <div className="relative">
              <input id="search-input" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search scripts by name, category, code..." className="w-full rounded-lg border border-gm-border bg-gm-code px-4 py-2.5 pr-12 text-sm text-white placeholder-neutral-500 focus:border-gm-green focus:outline-none" />
              {searchQuery ? (
                <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gm-muted hover:text-white">Clear</button>
              ) : (
                <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gm-border bg-gm-card px-1.5 py-0.5 font-mono text-[11px] text-gm-muted" title="Press / to search">/</kbd>
              )}
            </div>
            <p className="mt-2 text-left text-xs text-gm-muted">{searchQuery ? `${filtered.length} of ${loadedScripts.length} scripts found` : `${loadedScripts.length} scripts available (Press / to search)`}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-gm-border bg-gm-card p-8 text-center">
            <p className="text-sm text-gm-muted">No scripts match &ldquo;{searchQuery}&rdquo;.</p>
            <button type="button" onClick={() => setSearchQuery('')} className="mt-3 text-xs text-gm-green hover:underline">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filtered.map((script) => <ScriptCard key={script.id} script={script} />)}
          </div>
        )}
      </div>
    </>
  )
}



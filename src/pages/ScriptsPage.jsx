import { useState, useMemo } from 'react'
import ScriptCard from '../components/ScriptCard'

const scriptModules = import.meta.glob('../gms2scripts/*.js', { eager: true })

const loadedScripts = Object.entries(scriptModules).map(([path, mod]) => {
  const data = mod.default || mod
  const filename = path.split('/').pop().replace(/\.[^/.]+$/, '')
  return {
    id: filename,
    name: data.name || filename,
    category: data.category || 'General',
    explanation: data.explanation || '',
    code: data.code || '',
  }
})

export default function ScriptsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return loadedScripts
    return loadedScripts.filter((s) => (
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.explanation.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q)
    ))
  }, [searchQuery])

  return (
    <>
      <section className="border-b border-slate-800 bg-slate-950 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">GameMaker Script Library</h1>
          <p className="mt-2 text-sm text-slate-400">Essential drop-in GameMaker functions, algorithms, and scripts for GMS 2.3+.</p>

          <div className="mt-6">
            <div className="relative">
              <input id="search-input" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search scripts by name, category, code..." className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 pr-12 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none" />
              {searchQuery ? (
                <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white">Clear</button>
              ) : (
                <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] text-slate-400" title="Press / to search">/</kbd>
              )}
            </div>
            <p className="mt-2 text-left text-xs text-slate-500">{searchQuery ? `${filtered.length} of ${loadedScripts.length} scripts found` : `${loadedScripts.length} scripts available (Press / to search)`}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-sm text-slate-400">No scripts match &ldquo;{searchQuery}&rdquo;.</p>
            <button type="button" onClick={() => setSearchQuery('')} className="mt-3 text-xs text-indigo-400 hover:underline">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filtered.map((script) => (
              <ScriptCard key={script.id} script={script} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}


import { useState, useMemo } from 'react'
import { useCopy } from '../hooks/useCopy'
import { DIRECTORY_ITEMS } from '../data/directoryData'

export default function DocsPage() {
  const [search, setSearch] = useState('')
  const [copiedId, copy] = useCopy()

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return DIRECTORY_ITEMS
    return DIRECTORY_ITEMS.filter((item) => (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q)) ||
      item.categoryLabel.toLowerCase().includes(q)
    ))
  }, [search])

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="border-b border-slate-800 pb-8 mb-8">
        <h1 className="text-3xl font-bold text-white">Documentation &amp; Directory</h1>
        <p className="mt-2 text-sm text-slate-400">Core architectural patterns, drawing pipelines, best practices, and resource directory for GameMaker Studio 2.3+.</p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-indigo-400">1. Structs &amp; Constructors (GML 2.3+)</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">GameMaker 2.3 introduced lightweight data structures called Structs and Constructor functions. Unlike classic DS Maps, structs are garbage-collected automatically and support static member functions.</p>
          <pre className="mt-3 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200"><code>{`function PlayerInventory() constructor {
    items = [];
    static add_item = function(_id, _count = 1) {
        array_push(items, { id: _id, count: _count });
    };
}`}</code></pre>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-indigo-400">2. Draw Event vs. Draw GUI Event</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">Understanding the distinction between room coordinates and screen GUI coordinates is critical for clean UI rendering.</p>
          <ul className="mt-2 text-xs sm:text-sm text-slate-300 list-disc list-inside space-y-1">
            <li><strong className="text-white">Draw Event:</strong> Renders within world space, transformed by the active viewport and camera angle/zoom.</li>
            <li><strong className="text-white">Draw GUI Event:</strong> Renders in display screen space independent of camera movement. Use for HUD, text overlays, and healthbars.</li>
          </ul>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-indigo-400">3. Delta Time &amp; Frame Independence</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">To ensure game physics run consistently across monitors with 60Hz, 144Hz, or variable refresh rates, scale per-step movements by the fraction of a second elapsed.</p>
          <pre className="mt-3 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200"><code>{`// In Step Event:
var _dt = delta_time / 1000000;
x += (move_speed * 60) * _dt;`}</code></pre>
        </section>

        <section className="pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Resource Directory</h2>
              <p className="text-xs text-slate-400 mt-1">Reusable systems, snippets, and math algorithms.</p>
            </div>
            <div className="w-full sm:w-72">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter directory snippets..." className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none" />
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 text-center">
              <p className="text-sm text-slate-400">No resources match &ldquo;{search}&rdquo;.</p>
              <button type="button" onClick={() => setSearch('')} className="mt-3 text-xs text-indigo-400 hover:underline">Clear Search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredItems.map((item) => (
                <article key={item.id} className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-2">
                      <span className="font-semibold text-indigo-400">{item.categoryLabel}</span>
                      <span className="text-slate-500 font-mono">{item.version}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.tags.map((tag) => <span key={tag} className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">#{tag}</span>)}
                    </div>
                    <details className="mt-3 text-xs">
                      <summary className="cursor-pointer text-slate-400 hover:text-white select-none">View Code Snippet</summary>
                      <pre className="mt-2 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-2.5 font-mono text-[11px] text-slate-300"><code>{item.snippet}</code></pre>
                    </details>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
                    <span className="text-slate-500">{item.type}</span>
                    <button type="button" onClick={() => copy(item.snippet, item.id)} className="rounded border border-slate-700 px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white">{copiedId === item.id ? 'Copied!' : 'Copy Code'}</button>
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


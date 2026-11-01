import { useState } from 'react'

export default function DirectoryGrid({ items, searchQuery, onClearSearch }) {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <section id="directory" className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Directory</h2>
        {searchQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            Reset search
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-sm text-slate-400">
            No resources match &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-3 text-xs text-indigo-400 hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-900 p-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-2">
                  <span className="font-semibold text-indigo-400">{item.categoryLabel}</span>
                  <span className="text-slate-500 font-mono">{item.version}</span>
                </div>

                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <details className="mt-3 text-xs">
                  <summary className="cursor-pointer text-slate-400 hover:text-white select-none">
                    View Code Snippet
                  </summary>
                  <pre className="mt-2 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-2.5 font-mono text-[11px] text-slate-300">
                    <code>{item.snippet}</code>
                  </pre>
                </details>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
                <span className="text-slate-500">{item.type}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.snippet)}
                  className="rounded border border-slate-700 px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  {copiedId === item.id ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
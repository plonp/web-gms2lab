import { useCopy } from '../hooks/useCopy'

export default function ScriptCard({ script }) {
  const [copied, copy] = useCopy()

  return (
    <article className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="font-mono text-base font-bold text-indigo-400">{script.name}</span>
        {script.category && <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400 border border-slate-700">{script.category}</span>}
      </div>
      <p className="text-xs text-slate-300 mb-3">{script.explanation}</p>
      <div className="relative">
        <pre className="overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 pr-20 font-mono text-xs text-slate-200"><code>{script.code}</code></pre>
        <button type="button" onClick={() => copy(script.code)} className="absolute right-2 top-2 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-800 hover:text-white">{copied ? 'Copied!' : 'Copy GML'}</button>
      </div>
    </article>
  )
}

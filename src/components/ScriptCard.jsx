import { useCopy } from '../hooks/useCopy'

export default function ScriptCard({ script }) {
  const [copied, copy] = useCopy()

  return (
    <article className="rounded-lg border border-gm-border bg-gm-card p-5">
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="font-mono text-base font-bold text-gm-green">{script.name}</span>
        {script.category && <span className="rounded bg-gm-code px-2 py-0.5 text-[11px] font-medium text-gm-orange border border-gm-border">{script.category}</span>}
      </div>
      <p className="text-xs text-gm-text mb-3">{script.explanation}</p>
      <div className="relative">
        <pre className="overflow-x-auto rounded border border-gm-border bg-gm-code p-3 pr-20 font-mono text-xs text-gm-text"><code>{script.code}</code></pre>
        <button type="button" onClick={() => copy(script.code)} className={`absolute right-2 top-2 rounded border px-2 py-1 text-[11px] ${copied ? 'border-gm-green bg-gm-card text-gm-green' : 'border-gm-border bg-gm-card text-gm-muted hover:border-gm-green hover:text-gm-green'}`}>{copied ? 'Copied!' : 'Copy GML'}</button>
      </div>
    </article>
  )
}

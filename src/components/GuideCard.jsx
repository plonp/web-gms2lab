export default function GuideCard({ guide }) {
  return (
    <section className="rounded-lg border border-gm-border bg-gm-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-gm-green">{guide.title}</h2>
        {guide.badge && <span className="inline-flex items-center rounded bg-gm-green/10 px-2 py-0.5 text-[11px] font-semibold text-gm-green border border-gm-green/30">{guide.badge}</span>}
      </div>
      {guide.desc && <p className="mt-2 text-xs sm:text-sm text-gm-text leading-relaxed">{guide.desc}</p>}
      {guide.links && (
        <div className="mt-4 space-y-2">
          {guide.links.map((link) => (
            <div key={link.url} className="flex flex-wrap items-center justify-between gap-3 rounded border border-gm-border bg-gm-code px-4 py-3">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">{link.label}</p>
                {link.note && <p className="text-[11px] font-mono text-gm-muted mt-0.5">{link.note}</p>}
              </div>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded border border-gm-green bg-gm-card px-3 py-1.5 text-xs font-semibold text-gm-green hover:bg-gm-card-hover">Open Resource &rarr;</a>
            </div>
          ))}
        </div>
      )}
      {guide.code && <pre className="mt-3 overflow-x-auto rounded border border-gm-border bg-gm-code p-3 font-mono text-xs text-gm-text"><code>{guide.code}</code></pre>}
      {guide.list && (
        <ul className="mt-2 text-xs sm:text-sm text-gm-text list-disc list-inside space-y-1">
          {guide.list.map((li) => <li key={li.label}><strong className="text-white">{li.label}:</strong> {li.text}</li>)}
        </ul>
      )}
      {guide.subsections && (
        <div className="mt-5 space-y-6">
          {guide.subsections.map((sub) => (
            <div key={sub.subtitle} className="border-t border-gm-border pt-4">
              <h3 className="text-base font-semibold text-white">{sub.subtitle}</h3>
              {sub.desc && <p className="mt-1 text-xs sm:text-sm text-gm-text leading-relaxed">{sub.desc}</p>}
              {sub.list && (
                <ul className="mt-2 text-xs sm:text-sm text-gm-text list-disc list-inside space-y-1">
                  {sub.list.map((li) => <li key={li.label}><strong className="text-white">{li.label}:</strong> {li.text}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

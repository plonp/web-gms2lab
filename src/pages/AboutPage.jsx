export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="border-b border-gm-border pb-8 mb-8">
        <h1 className="text-3xl font-bold text-white">About GMS2Lab</h1>
        <p className="mt-2 text-sm text-gm-muted">A high-performance directory and documentation hub for GameMaker developers.</p>
      </div>

      <div className="space-y-6">
        <section className="rounded-lg border border-gm-border bg-gm-card p-6">
          <h2 className="text-lg font-bold text-white mb-2">Project Mission</h2>
          <p className="text-xs sm:text-sm text-gm-text leading-relaxed">
            GMS2Lab is designed to be an ultra-fast, clutter-free utility repository and reference tool for GameMaker Studio 2.3+ developers. It brings together modular scripts, shaders, mathematical algorithms, and architecture patterns with zero bloat.
          </p>
        </section>

        <section className="rounded-lg border border-gm-border bg-gm-card p-6">
          <h2 className="text-lg font-bold text-white mb-2">Key Principles</h2>
          <ul className="text-xs sm:text-sm text-gm-text list-disc list-inside space-y-2">
            <li><strong className="text-gm-green">Fast Navigation:</strong> Instant keyboard-driven lookup with the <kbd className="rounded border border-gm-border bg-gm-code px-1 py-0.5 font-mono text-[11px] text-gm-muted">/</kbd> shortcut.</li>
            <li><strong className="text-gm-green">Modern GML:</strong> Standardized on modern constructor patterns, structs, methods, and clean GML standards.</li>
            <li><strong className="text-gm-green">Lightweight Architecture:</strong> Built without heavy animation libraries, blur filters, or excessive bundles to guarantee instant loads.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
export default function HeroSearch({ searchQuery, setSearchQuery, resultsCount, totalCount }) {
  return (
    <section className="border-b border-slate-800 bg-slate-950 py-12">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          GameMaker Directory &amp; Docs
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Search scripts, shaders, algorithms, and documentation for GMS 2.3+.
        </p>

        <div className="mt-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scripts, shaders, camera, state machine..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <p className="mt-2 text-left text-xs text-slate-500">
            {searchQuery ? `${resultsCount} of ${totalCount} items found` : `${totalCount} resources available`}
          </p>
        </div>
      </div>
    </section>
  )
}
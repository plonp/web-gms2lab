import { useState } from 'react'
import { useCopy } from '../hooks/useCopy'
import { DIRECTORY_ITEMS } from '../data/directoryData'

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
    title: '3. Major UI Screen Types & HUD Elements',
    desc: 'Architectural classifications for game interfaces, covering full-screen menu flows and persistent in-game heads-up displays.',
    subsections: [
      {
        subtitle: 'Major UI Screen Types (Menus & Flow)',
        desc: 'Standard architectural classification of game interface screens, menus, and flow states for navigation state machines.',
        list: [
          { label: 'Start Screen / Title Screen', text: 'The initial entry point featuring the game logo, start/resume options, and options access.' },
          { label: 'Lobby / Home / Directory', text: 'The central hub where players select game modes, view profiles, or queue for matches.' },
          { label: 'Character Select / Customization Screen', text: 'Where players choose or edit their hero, avatar, skin, decals, or loadouts.' },
          { label: 'Level Select / Stage Select', text: 'The map or menu used to pick missions, campaigns, or chapters.' },
          { label: 'Information Hub / Area Map', text: 'World maps, quest logs, active missions, and objectives.' },
          { label: 'Inventory & Equipment Screen', text: 'Where players inspect, equip, drop, or trade items and gear.' },
          { label: 'Skill Tree / Upgrading Screen', text: 'Menus for spending experience points or upgrading stats and abilities.' },
          { label: 'Store / Shop Screen', text: 'Microtransactions, in-game currency purchases, or vendor-buying menus.' },
          { label: 'Settings / Options Screen', text: 'Audio, video, controls, keybindings, and accessibility configurations.' },
          { label: 'Pause / Game Menu', text: 'Quick-access menu during active play to resume, adjust settings, or quit.' },
          { label: 'Scoreboard / Match Stats Screen', text: 'Live or post-match performance tracking and leaderboards.' },
          { label: 'Game Over / Victory / Results Screen', text: 'End-of-round summaries showing rewards, XP earned, and stats.' },
        ],
      },
      {
        subtitle: 'In-Game HUD (Heads-Up Display) Elements',
        desc: 'The HUD stays active during live gameplay around the screen edges:',
        list: [
          { label: 'Health / Vital Status Indicator', text: 'Bars or numbers showing player or unit life.' },
          { label: 'Mana / Energy / Stamina Meter', text: 'Secondary resource bars for skills or running.' },
          { label: 'Ammo Display & Weapon Wheel', text: 'Bullet counts, active guns, or quick-select gear wheels.' },
          { label: 'Mini-map / Compass', text: 'Directional orientation and radar showing nearby threats or goals.' },
          { label: 'Objective Markers & Quest Tray', text: 'Floating or edge-locked icons guiding the player to the next goal.' },
          { label: 'Reticle / Crosshair', text: 'Center-screen aiming aid.' },
          { label: 'Button Prompts', text: 'Contextual hints showing which button to press to open a door, loot, or interact.' },
          { label: 'Kill Feed / Subtitles', text: 'On-screen text logging recent eliminations or character dialogue.' },
        ],
      },
    ],
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
        {GUIDES.map((g) => (
          <section key={g.title} className="rounded-lg border border-gm-border bg-gm-card p-6">
            <h2 className="text-xl font-bold text-gm-green">{g.title}</h2>
            <p className="mt-2 text-xs sm:text-sm text-gm-text leading-relaxed">{g.desc}</p>
            {g.code && <pre className="mt-3 overflow-x-auto rounded border border-gm-border bg-gm-code p-3 font-mono text-xs text-gm-text"><code>{g.code}</code></pre>}
            {g.list && (
              <ul className="mt-2 text-xs sm:text-sm text-gm-text list-disc list-inside space-y-1">
                {g.list.map((li) => <li key={li.label}><strong className="text-white">{li.label}:</strong> {li.text}</li>)}
              </ul>
            )}
            {g.subsections && (
              <div className="mt-5 space-y-6">
                {g.subsections.map((sub) => (
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
        ))}

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



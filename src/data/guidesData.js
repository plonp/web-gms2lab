export const UI_SCREEN_AND_HUD_GUIDE = {
  title: 'Major UI Screen Types & HUD Elements',
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
}

export const VERIFIED_GUIDES = [
  {
    title: '1. GameMaker MCP Server (Resource)',
    badge: 'MCP Resource',
    desc: 'Verified Model Context Protocol (MCP) server resource for connecting AI assistants and development tooling directly with GameMaker workflows.',
    links: [
      { label: 'GameMaker MCP Server on MCP Market', url: 'https://mcpmarket.com/server/gamemaker', note: 'mcpmarket.com/server/gamemaker' },
    ],
  },
  {
    ...UI_SCREEN_AND_HUD_GUIDE,
    title: '2. Major UI Screen Types & HUD Elements',
    badge: 'UI Reference',
  },
]

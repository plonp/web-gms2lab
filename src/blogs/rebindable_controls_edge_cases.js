export default {
  "slug": "rebindable-controls-edge-cases",
  "title": "Bulletproof Control Rebinding: Handling Mouse Clicks, Modifier Keys, and Controller Disconnections",
  "description": "Avoid softlocking players in settings menus. How to design control rebinding that prevents conflicting duplicates and provides instant emergency reset shortcuts.",
  "category": "Accessibility & Polish",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "May 2025",
  "tags": [
    "input",
    "rebinding",
    "controls",
    "accessibility",
    "gamepad"
  ],
  "author": "GMS2Lab Team",
  "overview": "Allowing a player to accidentally bind \"Escape\" or \"Confirm\" to an unmapped key locks them out of the menu permanently. Robust rebinding reserves default navigation keys and detects conflicts.",
  "sections": [
    {
      "id": "conflict-swap-logic",
      "title": "1. Conflict Swap Resolution",
      "content": "If Action A is bound to Key X and the player assigns Key X to Action B, swap Action A to Action B's previous key rather than leaving it blank."
    }
  ]
}

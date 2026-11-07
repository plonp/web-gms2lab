export default {
  "slug": "hitstop-freeze-frame-psychology",
  "title": "Hitstop & Impact Freezes: Why Pausing the Game Sells Heavy Hits",
  "description": "Explore the psychological illusion of physical resistance created by freezing character animation and world simulation for 3 to 10 frames upon strike impact.",
  "category": "Game Feel & Juice",
  "categoryColor": "text-gm-orange",
  "readTime": "7 min read",
  "date": "May 2025",
  "tags": [
    "hitstop",
    "impact",
    "combat",
    "game-feel",
    "animation"
  ],
  "author": "GMS2Lab Team",
  "overview": "When a blade cuts into metal, physical resistance impedes blade velocity. Simulating this by freezing entity animation frames (hitstop) conveys immense weapon weight without altering weapon movement speeds.",
  "sections": [
    {
      "id": "hitstop-duration-rules",
      "title": "1. Scaling Hitstop Duration by Strike Weight",
      "content": "Light jabs require 2 to 3 frames (33-50ms), heavy greatswords require 6 to 8 frames (100-133ms), and fatal boss deathblows demand 12 to 20 frames (200-333ms).",
      "callout": {
        "type": "important",
        "title": "Asymmetric Hitstop",
        "text": "Freeze the defender for slightly longer than the attacker (e.g. 6 frames vs 4 frames). This grants the player an innate recovery advantage while amplifying the feeling of target stagger."
      }
    }
  ]
}

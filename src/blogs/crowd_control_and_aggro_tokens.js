export default {
  "slug": "crowd-control-and-aggro-tokens",
  "title": "Crowd AI Management: Attack Token Distribution to Prevent Unfair Ganks",
  "description": "How games like Doom and God of War manage swarms of 20 enemies by distributing limited attack tokens so only 2 enemies strike simultaneously.",
  "category": "Game Design Theory",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "May 2025",
  "tags": [
    "ai",
    "combat-design",
    "attack-tokens",
    "crowd-ai",
    "game-theory"
  ],
  "author": "GMS2Lab Team",
  "overview": "When 10 enemies attack on independent timers, they inevitably strike on the exact same frame, instantly deleting the player without counterplay. Attack token managers limit simultaneous attackers.",
  "sections": [
    {
      "id": "attack-token-system",
      "title": "1. Structuring the Attack Token Pool",
      "content": "Enemies must request a token from the combat director before launching attacks; un-tokened enemies circle menacingly.",
      "code": "function CombatDirector() constructor {\n    max_melee_tokens = 2;\n    active_tokens = 0;\n\n    static request_token = function() {\n        if (active_tokens < max_melee_tokens) {\n            active_tokens++;\n            return true;\n        }\n        return false;\n    };\n\n    static release_token = function() {\n        active_tokens = max(0, active_tokens - 1);\n    };\n}"
    }
  ]
}

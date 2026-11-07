export default {
  "slug": "drop-rates-pity-timers-and-prng",
  "title": "Pseudo-Random Distribution (PRNG): Using Pity Counters to Eliminate Bad Luck Streaks",
  "description": "Why true random number generation (RNG) frustrates players. Implement Warcraft III/Dota-style PRNG and gacha pity counters in GML.",
  "category": "Economy & Progression",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "May 2025",
  "tags": [
    "prng",
    "probability",
    "pity-timer",
    "loot-tables",
    "fairness"
  ],
  "author": "GMS2Lab Team",
  "overview": "With a 10% drop rate, 1 in 100 players will defeat 45 bosses without seeing a drop under pure RNG. Pseudo-Random Distribution starts base chance low and increments chance on every whiff until a drop is guaranteed.",
  "sections": [
    {
      "id": "prng-implementation",
      "title": "1. Progressive Probability Increment in GML",
      "content": "Increment drop odds after every failure, resetting to base probability upon success.",
      "code": "function roll_pity_loot(_pity_tracker) {\n    var _roll = random(1.0);\n    if (_roll < _pity_tracker.current_chance) {\n        _pity_tracker.current_chance = _pity_tracker.base_chance;\n        return true; // Success!\n    } else {\n        _pity_tracker.current_chance += _pity_tracker.increment_step;\n        return false;\n    }\n}"
    }
  ]
}

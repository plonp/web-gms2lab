export default {
  "slug": "diminishing-returns-and-soft-caps",
  "title": "Soft Caps & Diminishing Returns: Mathematical Formulas for Balanced Build Variety",
  "description": "Prevent players from dumping all stat points into a single overpowered attribute by implementing asymptotic soft caps and diminishing return curves.",
  "category": "Economy & Progression",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "May 2025",
  "tags": [
    "soft-caps",
    "diminishing-returns",
    "math",
    "rpg-balance",
    "progression"
  ],
  "author": "GMS2Lab Team",
  "overview": "Without diminishing returns, min-maxing a single stat (e.g. 100% Critical Strike Chance) breaks combat encounters. Asymptotic formulas ensure stats approach limits without exceeding them.",
  "sections": [
    {
      "id": "asymptotic-formula",
      "title": "1. The Hyperbolic Diminishing Returns Formula",
      "content": "Effective Armor Reduction = Armor / (Armor + K). Each additional point grants less marginal damage reduction.",
      "code": "function calculate_armor_reduction(_armor_points) {\n    var _k = 100; // Scaling constant\n    return _armor_points / (_armor_points + _k); // Output [0.0 - 1.0)\n}"
    }
  ]
}

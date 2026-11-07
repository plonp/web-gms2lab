export default {
  "slug": "convex-hull-monotone-chain",
  "title": "Generating Hitbox Polygons via Andrew's Monotone Chain Convex Hull",
  "description": "Compute minimal enclosing convex polygon boundaries around arbitrary vertex clusters for custom physics collision hitboxes in O(N log N) time.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "convex-hull",
    "geometry",
    "physics",
    "hitbox",
    "math"
  ],
  "author": "GMS2Lab Team",
  "overview": "Generating tight physics hulls around pixel sprites or bone clusters requires finding the convex boundary. Andrew's monotone chain algorithm sorts vertices lexicographically and builds upper and lower hull sequences.",
  "sections": [
    {
      "id": "cross-product-turn",
      "title": "1. 2D Cross Product Turn Direction",
      "content": "Determine whether three points form a clockwise or counter-clockwise turn.",
      "code": "function cross_product_2d(_o, _a, _b) {\n    return (_a.x - _o.x) * (_b.y - _o.y) - (_a.y - _o.y) * (_b.x - _o.x);\n}"
    }
  ]
}

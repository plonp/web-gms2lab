export default {
  "slug": "raycast-reflection-laser-bouncing",
  "title": "Multi-Bounce Laser & Projectile Reflections using Vector Math & Dot Products",
  "description": "Implement bouncing laser beams, ricocheting projectiles, and mirror reflections using vector reflection formulas in GML.",
  "category": "Physics & Math",
  "categoryColor": "text-gm-blue",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "lasers",
    "reflection",
    "vector-math",
    "raycasting",
    "math"
  ],
  "author": "GMS2Lab Team",
  "overview": "Reflecting a vector V off a surface normal N uses the reflection formula: R = V - 2 * (V . N) * N. Repeating this across raycast hit points creates multi-bounce laser puzzles.",
  "sections": [
    {
      "id": "vector-reflection-func",
      "title": "1. The Vector Reflection Function",
      "content": "Reflect velocity off a surface normal vector.",
      "code": "function vector_reflect(_vx, _vy, _nx, _ny) {\n    var _dot = (_vx * _nx) + (_vy * _ny);\n    var _rx = _vx - 2 * _dot * _nx;\n    var _ry = _vy - 2 * _dot * _ny;\n    return { x: _rx, y: _ry };\n}"
    }
  ]
}

export default {
  "slug": "quadtree-sparse-spatial-partitioning",
  "title": "Quadtree Spatial Partitioning for Massive Open-World 2D Maps",
  "description": "Scale spatial queries across sparse, sprawling game worlds by recursively subdividing regions with Quadtrees in modern GML.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "quadtree",
    "spatial-partitioning",
    "optimization",
    "collision",
    "algorithms"
  ],
  "author": "GMS2Lab Team",
  "overview": "Unlike uniform spatial hashing (which wastes memory on empty space in sparse worlds), a Quadtree only subdivides areas where entity density exceeds a threshold capacity.",
  "sections": [
    {
      "id": "quadtree-struct",
      "title": "1. Quadtree Subdivision & Insertion",
      "content": "Subdivide into North-West, North-East, South-West, and South-East quadrants upon reaching capacity.",
      "code": "function Quadtree(_boundary, _capacity) constructor {\n    boundary = _boundary; // { x, y, w, h }\n    capacity = _capacity;\n    points = [];\n    divided = false;\n\n    static subdivide = function() {\n        var _hw = boundary.w * 0.5;\n        var _hh = boundary.h * 0.5;\n        nw = new Quadtree({ x: boundary.x, y: boundary.y, w: _hw, h: _hh }, capacity);\n        ne = new Quadtree({ x: boundary.x + _hw, y: boundary.y, w: _hw, h: _hh }, capacity);\n        sw = new Quadtree({ x: boundary.x, y: boundary.y + _hh, w: _hw, h: _hh }, capacity);\n        se = new Quadtree({ x: boundary.x + _hw, y: boundary.y + _hh, w: _hw, h: _hh }, capacity);\n        divided = true;\n    };\n}"
    }
  ]
}

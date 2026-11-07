export default {
  "slug": "fast-poisson-disk-sampling",
  "title": "Blue Noise Entity Placement via Poisson Disk Sampling in GML",
  "description": "Distribute trees, rocks, and item spawns naturally across 2D maps with minimum separation radii using Bridson's Poisson Disk Sampling algorithm.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "poisson-disk",
    "procedural-generation",
    "blue-noise",
    "math",
    "algorithms"
  ],
  "author": "GMS2Lab Team",
  "overview": "Uniform random number generation causes unnatural clumps and empty voids. Bridson's O(N) Poisson Disk Sampling guarantees blue-noise distributions where every point maintains a strictly enforced minimum distance from neighbors.",
  "sections": [
    {
      "id": "poisson-bridson-check",
      "title": "1. Candidate Point Validation",
      "content": "Verify candidate points against neighboring acceleration grid cells.",
      "code": "function poisson_is_valid(_pt, _min_dist, _accel_grid, _cell_size) {\n    var _cx = floor(_pt.x / _cell_size);\n    var _cy = floor(_pt.y / _cell_size);\n\n    for (var i = -2; i <= 2; i++) {\n        for (var j = -2; j <= 2; j++) {\n            var _neighbor = _accel_grid[$ string(_cx+i) + \"_\" + string(_cy+j)];\n            if (!is_undefined(_neighbor)) {\n                if (point_distance(_pt.x, _pt.y, _neighbor.x, _neighbor.y) < _min_dist) {\n                    return false;\n                }\n            }\n        }\n    }\n    return true;\n}"
    }
  ]
}

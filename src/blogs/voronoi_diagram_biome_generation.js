export default {
  "slug": "voronoi-diagram-biome-generation",
  "title": "World Biome Generation via Manhattan & Euclidean Voronoi Diagrams",
  "description": "Carve procedural game worlds into distinct biomes (desert, tundra, swamp, volcanic) by mapping coordinates to the nearest Voronoi seed points.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "voronoi",
    "procedural-generation",
    "biomes",
    "world-gen",
    "math"
  ],
  "author": "GMS2Lab Team",
  "overview": "Voronoi diagrams partition space into cells based on distance to specified seed points. Evaluating distance metrics generates realistic geopolitical borders, tectonic plates, and ecological biome zones.",
  "sections": [
    {
      "id": "voronoi-biome-lookup",
      "title": "1. Sampling Biome Seed Points",
      "content": "Find the closest seed to assign terrain type.",
      "code": "function get_biome_at_coord(_x, _y, _seeds) {\n    var _min_dist = 99999999;\n    var _nearest_biome = \"grassland\";\n\n    var _len = array_length(_seeds);\n    for (var i = 0; i < _len; i++) {\n        var _s = _seeds[i];\n        var _dist = point_distance(_x, _y, _s.x, _s.y);\n        if (_dist < _min_dist) {\n            _min_dist = _dist;\n            _nearest_biome = _s.type;\n        }\n    }\n    return _nearest_biome;\n}"
    }
  ]
}

export default {
  "slug": "wave-function-collapse-2d-tiles",
  "title": "2D Tilemap Auto-Generation using Simple Wave Function Collapse (WFC)",
  "description": "Generate seamless terrain and seamless city tilemaps using constraint-based Wave Function Collapse algorithms in GML.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "wfc",
    "procedural-generation",
    "tilemap",
    "algorithms",
    "constraints"
  ],
  "author": "GMS2Lab Team",
  "overview": "Wave Function Collapse models tiles as probability states with adjacency rules. By continuously collapsing the lowest-entropy cell and propagating valid neighbor constraints, complex valid maps form automatically.",
  "sections": [
    {
      "id": "wfc-entropy-check",
      "title": "1. Finding Lowest Entropy Cell",
      "content": "Locate the uncollapsed cell with the fewest remaining candidate tile options.",
      "code": "function wfc_find_lowest_entropy(_grid, _width, _height) {\n    var _min_entropy = 999999;\n    var _best_cell = undefined;\n\n    for (var _x = 0; _x < _width; _x++) {\n        for (var _y = 0; _y < _height; _y++) {\n            var _c = _grid[_x][_y];\n            if (!_c.collapsed && array_length(_c.options) < _min_entropy) {\n                _min_entropy = array_length(_c.options);\n                _best_cell = _c;\n            }\n        }\n    }\n    return _best_cell;\n}"
    }
  ]
}

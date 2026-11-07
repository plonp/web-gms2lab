export default {
  "slug": "bsp-dungeon-procedural-generation",
  "title": "Procedural Dungeon Generation via Binary Space Partitioning (BSP) Trees",
  "description": "Generate classic Roguelike dungeon layouts by recursively partitioning 2D space into BSP tree nodes, carving rooms, and connecting hallways with L-shaped corridors.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "procedural-generation",
    "bsp",
    "dungeon",
    "roguelike",
    "algorithms"
  ],
  "author": "GMS2Lab Team",
  "overview": "Binary Space Partitioning (BSP) divides a rectangular level into two smaller sub-rectangles recursively until reaching a minimum room size. Each leaf node carves an interior room, and sibling pairs connect with corridors.",
  "sections": [
    {
      "id": "bsp-node-split",
      "title": "1. Recursive Sub-Node Splitting",
      "content": "Split horizontally or vertically based on aspect ratio.",
      "code": "function BSPNode(_x, _y, _w, _h) constructor {\n    x = _x; y = _y; w = _w; h = _h;\n    left = undefined;\n    right = undefined;\n    room_rect = undefined;\n\n    static split = function(_min_size) {\n        if (!is_undefined(left) || !is_undefined(right)) return false;\n\n        var _split_h = (w > h) ? false : (h > w ? true : (irandom(1) == 0));\n        var _max = (_split_h ? h : w) - _min_size;\n        if (_max <= _min_size) return false;\n\n        var _split_pos = irandom_range(_min_size, _max);\n        if (_split_h) {\n            left  = new BSPNode(x, y, w, _split_pos);\n            right = new BSPNode(x, y + _split_pos, w, h - _split_pos);\n        } else {\n            left  = new BSPNode(x, y, _split_pos, h);\n            right = new BSPNode(x + _split_pos, y, w - _split_pos, h);\n        }\n        return true;\n    };\n}"
    }
  ]
}

export default {
  "slug": "bitwise-tetris-inventory-packing",
  "title": "Diablo-Style Grid Inventory Packing with 64-Bit Integer Bitboards",
  "description": "Implement grid-based inventory systems where items occupy irregular shapes (2x1, 2x3, 1x4) using 64-bit integer bitmasks for instant O(1) collision testing.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "inventory",
    "bitboard",
    "bitmasks",
    "diablo",
    "data-structures"
  ],
  "author": "GMS2Lab Team",
  "overview": "Checking whether a 2x3 broadsword fits into an 8x8 inventory grid using 2D nested array loops is slow and verbose. Modeling the grid and item footprints as 64-bit integer bitboards allows checking validity with a single bitwise AND operation: (grid_mask & item_mask) == 0.",
  "sections": [
    {
      "id": "bitboard-packing-math",
      "title": "1. Instant Fit Check with Bitwise AND",
      "content": "Shift item mask to slot position and test against grid occupancy mask.",
      "code": "function can_place_item(_grid_bitmask, _item_bitmask, _slot_x, _slot_y) {\n    var _shift = _slot_y * 8 + _slot_x;\n    var _shifted_item = _item_bitmask << _shift;\n\n    // If intersection is 0, slot is completely clear\n    return ((_grid_bitmask & _shifted_item) == 0);\n}\n\nfunction commit_place_item(_grid_bitmask, _item_bitmask, _slot_x, _slot_y) {\n    var _shift = _slot_y * 8 + _slot_x;\n    return (_grid_bitmask | (_item_bitmask << _shift));\n}"
    }
  ]
}

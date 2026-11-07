export default {
  "slug": "isometric-grid-coordinate-transforms",
  "title": "High-Speed Isometric Grid Math: Screen-to-World and Depth Sorting",
  "description": "Transform 2D Cartesian tile coordinates into diamond isometric views, with mouse picking ray projection and dynamic Y-depth sorting.",
  "category": "Physics & Math",
  "categoryColor": "text-gm-blue",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "isometric",
    "coordinates",
    "depth-sorting",
    "math",
    "rpg"
  ],
  "author": "GMS2Lab Team",
  "overview": "Isometric projection projects square tile grids onto 2:1 ratio diamond planes. Fast transformation math allows converting screen mouse clicks back to grid tile coordinates.",
  "sections": [
    {
      "id": "isometric-transforms",
      "title": "1. Grid to Screen & Screen to Grid Conversions",
      "content": "Bidirectional coordinate transformations for 2:1 isometric tiles.",
      "code": "function iso_to_screen(_gx, _gy, _tile_w, _tile_h) {\n    var _sx = (_gx - _gy) * (_tile_w * 0.5);\n    var _sy = (_gx + _gy) * (_tile_h * 0.5);\n    return { x: _sx, y: _sy };\n}\n\nfunction screen_to_iso(_sx, _sy, _tile_w, _tile_h) {\n    var _gx = (_sx / (_tile_w * 0.5) + _sy / (_tile_h * 0.5)) * 0.5;\n    var _gy = (_sy / (_tile_h * 0.5) - _sx / (_tile_w * 0.5)) * 0.5;\n    return { gx: floor(_gx), gy: floor(_gy) };\n}"
    }
  ]
}

export default {
  "slug": "ui-flexbox-anchoring-system",
  "title": "Lightweight Resolution-Independent UI Layout & Flexbox Anchoring Engine",
  "description": "Build responsive in-game UI layouts that adapt cleanly across 16:9, 16:10 (Steam Deck), and 21:9 ultrawide screens with nine-slice anchor math.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "ui",
    "flexbox",
    "anchoring",
    "responsive",
    "steam-deck"
  ],
  "author": "GMS2Lab Team",
  "overview": "Hardcoding UI coordinates (x = 1800, y = 50) breaks on Steam Deck (1280x800) or 4K screens. An anchor system pins element corners to normalized screen coordinates [0.0 - 1.0] with pixel offsets.",
  "sections": [
    {
      "id": "ui-anchor-math",
      "title": "1. Normalized Anchor Calculation",
      "content": "Calculate screen bounds using GUI dimensions and anchor fractions.",
      "code": "function UIElement(_anchor_x, _anchor_y, _offset_x, _offset_y, _w, _h) constructor {\n    anchor_x = _anchor_x; // 0.0 = left, 0.5 = center, 1.0 = right\n    anchor_y = _anchor_y; // 0.0 = top, 0.5 = middle, 1.0 = bottom\n    offset_x = _offset_x;\n    offset_y = _offset_y;\n    width = _w;\n    height = _h;\n\n    static get_bounds = function() {\n        var _screen_w = display_get_gui_width();\n        var _screen_h = display_get_gui_height();\n        var _bx = (_screen_w * anchor_x) + offset_x;\n        var _by = (_screen_h * anchor_y) + offset_y;\n        return { x1: _bx, y1: _by, x2: _bx + width, y2: _by + height };\n    };\n}"
    }
  ]
}

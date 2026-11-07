export default {
  "slug": "dynamic-input-glyph-remapping",
  "title": "Gamepad Hot-Plugging & Dynamic Controller Glyph Detection (Xbox/PS/Switch)",
  "description": "Detect connected controller types via gamepad_get_description() and dynamically display Xbox, PlayStation, or Nintendo Switch button icons on tutorial UI prompts.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "gamepad",
    "input",
    "glyphs",
    "ui",
    "steam-deck"
  ],
  "author": "GMS2Lab Team",
  "overview": "Nothing breaks immersion faster than showing an Xbox \"A\" prompt to a player holding a DualSense controller with an \"X\" button. Querying the gamepad description identifies controller hardware and swaps icon sprites automatically.",
  "sections": [
    {
      "id": "controller-type-detection",
      "title": "1. Parsing Controller Hardware Types",
      "content": "Examine gamepad device strings to classify controller vendor.",
      "code": "function detect_gamepad_type(_pad_index) {\n    var _desc = string_lower(gamepad_get_description(_pad_index));\n    if (string_pos(\"ps4\", _desc) > 0 || string_pos(\"ps5\", _desc) > 0 || string_pos(\"dualshock\", _desc) > 0 || string_pos(\"dualsense\", _desc) > 0) {\n        return \"playstation\";\n    }\n    if (string_pos(\"switch\", _desc) > 0 || string_pos(\"pro controller\", _desc) > 0) {\n        return \"switch\";\n    }\n    return \"xbox\"; // Default PC fallback\n}"
    }
  ]
}

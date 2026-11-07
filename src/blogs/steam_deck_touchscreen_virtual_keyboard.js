export default {
  "slug": "steam-deck-touchscreen-virtual-keyboard",
  "title": "Steam Deck Optimization: Virtual Keyboard Invocation & Touch Controls",
  "description": "Trigger the native Steam OS on-screen virtual keyboard programmatically when text inputs are focused and handle multi-touch gestures.",
  "category": "Platform & Tooling",
  "categoryColor": "text-gm-orange",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "steam-deck",
    "steamworks",
    "touch",
    "virtual-keyboard",
    "ui"
  ],
  "author": "GMS2Lab Team",
  "overview": "Passing Steam Deck verification requires games with text inputs (player name, seed input) to automatically pop up the native on-screen virtual keyboard instead of requiring manual STEAM + X shortcuts.",
  "sections": [
    {
      "id": "steam-keyboard-invocation",
      "title": "1. Invoking Steam OS Virtual Keyboard",
      "content": "Call steam_utils_show_floating_gamepad_text_input() when text fields are clicked.",
      "code": "function prompt_virtual_keyboard(_desc, _existing_text) {\n    if (steam_utils_is_steam_running_on_steam_deck()) {\n        steam_utils_show_floating_gamepad_text_input(\n            steam_floating_gamepad_text_input_mode_single_line,\n            0, 0, 800, 300\n        );\n    }\n}"
    }
  ]
}

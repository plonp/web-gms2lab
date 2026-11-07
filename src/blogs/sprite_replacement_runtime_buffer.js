export default {
  "slug": "sprite-replacement-runtime-buffer",
  "title": "Loading External Custom PNG Textures into Buffers at Runtime",
  "description": "Enable Steam Workshop skins and user modding by loading external PNG files into dynamic runtime sprites via buffer_load() and sprite_add().",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "modding",
    "textures",
    "sprite-add",
    "buffers",
    "steam-workshop"
  ],
  "author": "GMS2Lab Team",
  "overview": "Allowing players to skin characters requires dynamically loading arbitrary PNG files at runtime without bundling them into texture pages during compilation.",
  "sections": [
    {
      "id": "runtime-sprite-add",
      "title": "1. Safe Dynamic Sprite Loading",
      "content": "Load external image paths with custom origins and smooth filtering.",
      "code": "function load_custom_skin(_filepath) {\n    if (!file_exists(_filepath)) return -1;\n\n    // Load sprite with 1 sub-image, centered origin\n    var _spr = sprite_add(_filepath, 1, false, false, 0, 0);\n    if (_spr != -1) {\n        var _w = sprite_get_width(_spr);\n        var _h = sprite_get_height(_spr);\n        sprite_set_offset(_spr, _w * 0.5, _h * 0.5);\n    }\n    return _spr;\n}"
    }
  ]
}

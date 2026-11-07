export default {
  "slug": "game-settings-binary-ini-hybrid",
  "title": "Zero-Lag Player Configuration: High-Speed Buffer INI Parsing",
  "description": "Replace slow disk-thrashing ini_open() and ini_close() with in-memory buffer parsing for seamless 60 FPS options screen adjustments.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "settings",
    "ini",
    "buffers",
    "optimization",
    "file-io"
  ],
  "author": "GMS2Lab Team",
  "overview": "GameMaker's built-in INI functions write synchronously to disk on every ini_close(), creating micro-stutter when sliders (e.g. Master Volume) are adjusted. Storing settings in a RAM struct and flushing only on menu exit resolves this.",
  "sections": [
    {
      "id": "in-memory-settings-manager",
      "title": "1. Memory-First Settings Store",
      "content": "Mutate settings in RAM, marking a dirty flag to save only on save trigger.",
      "code": "global.settings = {\n    master_vol: 0.8,\n    sfx_vol: 1.0,\n    fullscreen: true,\n    dirty: false\n};\n\nfunction settings_set_volume(_val) {\n    global.settings.master_vol = clamp(_val, 0.0, 1.0);\n    audio_master_gain(global.settings.master_vol);\n    global.settings.dirty = true;\n}\n\nfunction settings_flush_to_disk() {\n    if (!global.settings.dirty) return;\n    var _json = json_stringify(global.settings);\n    var _buf = buffer_create(string_byte_length(_json), buffer_fixed, 1);\n    buffer_write(_buf, buffer_text, _json);\n    buffer_save(_buf, \"settings.json\");\n    buffer_delete(_buf);\n    global.settings.dirty = false;\n}"
    }
  ]
}

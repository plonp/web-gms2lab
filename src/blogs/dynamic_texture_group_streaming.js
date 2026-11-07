export default {
  "slug": "dynamic-texture-group-streaming",
  "title": "Asynchronous Texture Group Paging & VRAM Memory Budgeting",
  "description": "Prevent out-of-memory crashes on consoles and low-end mobile devices by dynamically streaming texture groups in and out of GPU VRAM asynchronously.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "textures",
    "vram",
    "streaming",
    "memory",
    "optimization"
  ],
  "author": "GMS2Lab Team",
  "overview": "Loading all game assets on startup easily exceeds the 2GB VRAM budget of integrated graphics and mobile chips. GameMaker provides texturegroup_load() and texturegroup_unload() to asynchronously page sprites into GPU memory right before level transitions.",
  "sections": [
    {
      "id": "texture-streaming-code",
      "title": "1. Asynchronous Texture Group Paging",
      "content": "Dispatch asynchronous load requests and monitor completion in the Async - Save / Load event.",
      "code": "function load_dungeon_textures() {\n    // Unload menu textures first\n    texturegroup_unload(\"MenuTextures\");\n\n    // Load dungeon textures asynchronously\n    async_load_id = texturegroup_load(\"DungeonTextures\", true);\n}\n\n// In Async - Save / Load Event:\nif (async_load[? \"id\"] == async_load_id) {\n    if (async_load[? \"status\"]) {\n        show_debug_message(\"Dungeon texture group successfully loaded into VRAM!\");\n        room_goto(rm_dungeon);\n    }\n}"
    }
  ]
}

export default {
  "slug": "in-game-level-editor-serialization",
  "title": "Building an In-Game Tile & Prop Editor with Binary Room Exporting",
  "description": "Implement a runtime level editor with object placement, grid snapping, and compact binary map exporting for community custom maps.",
  "category": "Platform & Tooling",
  "categoryColor": "text-gm-orange",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "level-editor",
    "serialization",
    "modding",
    "tools",
    "binary"
  ],
  "author": "GMS2Lab Team",
  "overview": "Community content extends game longevity. Building an in-game editor with mouse-placed tile snapping and saving to custom .map files enables seamless community level sharing.",
  "sections": [
    {
      "id": "level-saver-buffer",
      "title": "1. Serializing Placed Entity Maps",
      "content": "Iterate over placed entities and serialize coordinates into a compact binary buffer.",
      "code": "function editor_save_custom_map(_filename) {\n    var _buf = buffer_create(1024, buffer_grow, 1);\n    buffer_write(_buf, buffer_string, \"GMAP\"); // Magic signature\n\n    var _count = instance_number(par_editor_prop);\n    buffer_write(_buf, buffer_u32, _count);\n\n    with (par_editor_prop) {\n        buffer_write(_buf, buffer_u16, object_index);\n        buffer_write(_buf, buffer_f32, x);\n        buffer_write(_buf, buffer_f32, y);\n    }\n\n    buffer_save(_buf, _filename);\n    buffer_delete(_buf);\n}"
    }
  ]
}

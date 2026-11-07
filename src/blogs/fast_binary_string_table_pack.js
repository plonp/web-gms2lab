export default {
  "slug": "fast-binary-string-table-pack",
  "title": "Compacting Dialogue and Text with Binary String Tables & Byte Offsets",
  "description": "Store thousands of localization strings and RPG dialogue lines in a compact binary string table with fixed 32-bit seek pointers for instant O(1) text lookup.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "binary",
    "buffers",
    "localization",
    "string-table",
    "rpg"
  ],
  "author": "GMS2Lab Team",
  "overview": "Parsing thousands of JSON strings on startup consumes megabytes of RAM. A binary string table stores string offsets in a compact header array followed by raw null-terminated UTF-8 bytes, allowing direct buffer seeking without string parsing.",
  "sections": [
    {
      "id": "string-table-reader",
      "title": "1. O(1) Seek and Read by String ID",
      "content": "Read string offset from the index header and seek straight to the text.",
      "code": "function read_string_by_id(_str_buffer, _id) {\n    // Each index table entry is a 32-bit offset (4 bytes)\n    buffer_seek(_str_buffer, buffer_seek_start, _id * 4);\n    var _offset = buffer_read(_str_buffer, buffer_u32);\n\n    // Seek directly to UTF-8 null-terminated text\n    buffer_seek(_str_buffer, buffer_seek_start, _offset);\n    return buffer_read(_str_buffer, buffer_string);\n}"
    }
  ]
}

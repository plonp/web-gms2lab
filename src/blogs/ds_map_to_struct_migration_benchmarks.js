export default {
  "slug": "ds-map-to-struct-migration-benchmarks",
  "title": "High-Speed Memory Serialization: Modern Structs vs Deprecated ds_* Maps",
  "description": "Benchmark and migrate legacy ds_map and ds_list structures to modern GML structs and arrays, eliminating manual destruction boilerplate and dangling pointer crashes.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "structs",
    "ds-map",
    "benchmarking",
    "garbage-collection",
    "performance"
  ],
  "author": "GMS2Lab Team",
  "overview": "Prior to GMS 2.3, developers relied on ds_map_create() and ds_list_create(), which leaked memory if ds_*_destroy() was missed. Structs and arrays are natively garbage collected, support dot-syntax, and parse with json_stringify() at 3x the speed.",
  "sections": [
    {
      "id": "modern-syntax-comparison",
      "title": "1. Direct Dot Access vs Accessors",
      "content": "Replace ds_map_add and question-mark accessors with modern native dot syntax.",
      "code": "// Legacy DS Map (Manual memory management required):\nvar _map = ds_map_create();\nds_map_add(_map, \"score\", 100);\nvar _s = _map[? \"score\"];\nds_map_destroy(_map); // Must free manually!\n\n// Modern GML Struct (Garbage collected automatically):\nvar _struct = { score: 100 };\nvar _s = _struct.score; // Fast, clean, safe"
    }
  ]
}

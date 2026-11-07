export default {
  "slug": "reusable-struct-pooler",
  "title": "Object Pooling for High-Frequency Structs to Eliminate GC Spikes",
  "description": "Spawning thousands of short-lived structs (floating combat text, particle data, projectile coordinates) causes periodic garbage collection stutter. Implement high-speed struct recycling pools.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "object-pool",
    "optimization",
    "garbage-collection",
    "memory",
    "performance"
  ],
  "author": "GMS2Lab Team",
  "overview": "While modern GML garbage collection is fast, discarding 10,000 damage number structs per minute forces frequent mark-and-sweep cycles. A pooler recycles allocated structs via an array stack, dropping GC allocation pressure to zero.",
  "sections": [
    {
      "id": "struct-pool-constructor",
      "title": "1. The Generic StructPool Implementation",
      "content": "Maintain a stack array of pre-allocated objects, providing obtain() and release() methods.",
      "code": "function StructPool(_factory_fn, _initial_size) constructor {\n    factory = _factory_fn;\n    pool = array_create(_initial_size);\n    for (var i = 0; i < _initial_size; i++) {\n        pool[i] = factory();\n    }\n\n    static obtain = function() {\n        if (array_length(pool) > 0) {\n            return array_pop(pool);\n        }\n        return factory();\n    };\n\n    static release = function(_struct) {\n        array_push(pool, _struct);\n    };\n}"
    }
  ]
}

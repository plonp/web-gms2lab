export default {
  "slug": "weak-references-garbage-collection",
  "title": "Preventing Memory Leaks in Event Listeners with weak_ref_create()",
  "description": "Stop dangling struct references from preventing garbage collection. Master weak_ref_create() and weak_ref_alive() for event subscriber patterns.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "garbage-collection",
    "weak-ref",
    "memory-leaks",
    "structs",
    "architecture"
  ],
  "author": "GMS2Lab Team",
  "overview": "When a UI element or enemy subscribes its method to a global event dispatcher, the dispatcher retains a strong reference. Even if instance_destroy() is called, the GML garbage collector cannot free the underlying struct, creating memory leaks. Weak references solve this completely.",
  "sections": [
    {
      "id": "weak-ref-subscriber",
      "title": "1. Subscribing via Weak References",
      "content": "Store subscriber instances as weak references, checking weak_ref_alive() before firing callbacks.",
      "code": "function EventBus() constructor {\n    listeners = [];\n\n    static subscribe = function(_instance, _method) {\n        array_push(listeners, {\n            ref: weak_ref_create(_instance),\n            callback: _method\n        });\n    };\n\n    static emit = function(_data) {\n        for (var i = array_length(listeners) - 1; i >= 0; i--) {\n            var _item = listeners[i];\n            if (weak_ref_alive(_item.ref)) {\n                _item.callback(_data);\n            } else {\n                // Garbage collected instance; prune listener\n                array_delete(listeners, i, 1);\n            }\n        }\n    };\n}"
    }
  ]
}

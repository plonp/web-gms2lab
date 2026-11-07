export default {
  "slug": "min-max-heap-priority-queue",
  "title": "Native Binary Heap Data Structure in GML for Task Scheduling",
  "description": "Implement a zero-allocation binary min-heap array in modern GML for event scheduling, timers, and pathfinding queues without legacy ds_priority overhead.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "binary-heap",
    "priority-queue",
    "data-structures",
    "optimization",
    "scheduling"
  ],
  "author": "GMS2Lab Team",
  "overview": "While ds_priority exists in GameMaker, it cannot be passed by reference cleanly in struct architectures and requires manual destruction. An array-backed binary heap operates natively in garbage-collected memory.",
  "sections": [
    {
      "id": "heap-sift-up-down",
      "title": "1. Sift-Up and Sift-Down Array Indexing",
      "content": "Maintain heap invariants via parent-child index math in flat arrays.",
      "code": "function BinaryMinHeap() constructor {\n    heap = [];\n\n    static push = function(_item, _priority) {\n        array_push(heap, { item: _item, priority: _priority });\n        var _idx = array_length(heap) - 1;\n        while (_idx > 0) {\n            var _parent = floor((_idx - 1) * 0.5);\n            if (heap[_idx].priority < heap[_parent].priority) {\n                var _tmp = heap[_idx];\n                heap[_idx] = heap[_parent];\n                heap[_parent] = _tmp;\n                _idx = _parent;\n            } else break;\n        }\n    };\n}"
    }
  ]
}

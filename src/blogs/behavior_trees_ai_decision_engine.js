export default {
  "slug": "behavior-trees-ai-decision-engine",
  "title": "Modular AI: Building Behavior Trees with Composite & Decorator Structs",
  "description": "Upgrade beyond fragile finite state machines by building hierarchical Behavior Trees with Selector, Sequence, and Condition nodes in modern GML.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "behavior-tree",
    "ai",
    "architecture",
    "structs",
    "boss-ai"
  ],
  "author": "GMS2Lab Team",
  "overview": "Complex boss fights with branching priorities quickly become unmanageable in switch-case state machines. Behavior trees evaluate prioritized sequences of tasks (e.g., Check Health -> Retreat -> Find Cover) using composable structs returning SUCCESS, FAILURE, or RUNNING.",
  "sections": [
    {
      "id": "node-status-enum",
      "title": "1. Task Execution Statuses",
      "content": "Nodes return one of three states on evaluation tick.",
      "code": "enum BT_STATUS {\n    SUCCESS,\n    FAILURE,\n    RUNNING\n}\n\nfunction BTSelector(_children) constructor {\n    children = _children;\n    static tick = function(_actor) {\n        var _len = array_length(children);\n        for (var i = 0; i < _len; i++) {\n            var _status = children[i].tick(_actor);\n            if (_status != BT_STATUS.FAILURE) return _status;\n        }\n        return BT_STATUS.FAILURE;\n    };\n}"
    }
  ]
}

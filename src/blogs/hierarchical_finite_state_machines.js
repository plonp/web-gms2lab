export default {
  "slug": "hierarchical-finite-state-machines",
  "title": "Hierarchical State Machines (HSM) with Superstates & Transition Hooks",
  "description": "Organize complex player movement mechanics into nested sub-states (e.g. Grounded -> Idle/Run/Skid) with inherited enter and exit hooks.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "state-machine",
    "hsm",
    "architecture",
    "gameplay",
    "structs"
  ],
  "author": "GMS2Lab Team",
  "overview": "Flat state machines duplicate logic across similar states (e.g., checking for fall damage across 10 different airborne attacks). Hierarchical state machines allow states to inherit behavior from parent superstates.",
  "sections": [
    {
      "id": "hsm-state-struct",
      "title": "1. Structs with Superstate Pointers",
      "content": "Forward unhandled events up the state hierarchy tree.",
      "code": "function HSMState(_name, _parent) constructor {\n    name = _name;\n    parent = _parent;\n    on_enter = undefined;\n    on_exit = undefined;\n    on_step = undefined;\n\n    static step = function(_actor) {\n        if (!is_undefined(on_step)) on_step(_actor);\n        if (!is_undefined(parent)) parent.step(_actor);\n    };\n}"
    }
  ]
}

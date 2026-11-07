export default {
  "slug": "command-pattern-undo-redo",
  "title": "Turn-Based Undo/Redo Engine using the Command Pattern and Action Stacks",
  "description": "Implement seamless multi-step undo and redo capabilities for puzzle and turn-based tactics games using encapsulated Command structs.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "command-pattern",
    "undo-redo",
    "tactics",
    "puzzle",
    "architecture"
  ],
  "author": "GMS2Lab Team",
  "overview": "Supporting undo in puzzle games (like Sokoban or Into the Breach) by saving whole game states wastes memory. Encapsulating each action into an object with execute() and unexecute() methods enables limitless undo/redo histories.",
  "sections": [
    {
      "id": "command-history-manager",
      "title": "1. The Command Stack Engine",
      "content": "Maintain undo and redo array stacks.",
      "code": "function CommandManager() constructor {\n    undo_stack = [];\n    redo_stack = [];\n\n    static execute_cmd = function(_cmd) {\n        _cmd.execute();\n        array_push(undo_stack, _cmd);\n        redo_stack = []; // Clear redos on new action\n    };\n\n    static undo = function() {\n        if (array_length(undo_stack) == 0) return;\n        var _cmd = array_pop(undo_stack);\n        _cmd.unexecute();\n        array_push(redo_stack, _cmd);\n    };\n}"
    }
  ]
}

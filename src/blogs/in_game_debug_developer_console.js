export default {
  "slug": "in-game-debug-developer-console",
  "title": "In-Game Quake-Style Developer Console with Auto-Complete & Command Reflection",
  "description": "Build an expandable drop-down debug console in GML with command registration, string argument parsing, and auto-completion.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "developer-console",
    "debugging",
    "tools",
    "architecture",
    "commands"
  ],
  "author": "GMS2Lab Team",
  "overview": "Pausing the game and recompiling code to test variable values wastes developer time. A Quake-style drop-down developer console allows spawning items, toggling god mode, and warping between rooms on the fly.",
  "sections": [
    {
      "id": "console-command-runner",
      "title": "1. Registering and Parsing Console Commands",
      "content": "Split typed strings by space and dispatch to registered method handlers.",
      "code": "function DebugConsole() constructor {\n    commands = {};\n\n    static register = function(_name, _handler) {\n        commands[$ string_lower(_name)] = _handler;\n    };\n\n    static execute = function(_input_str) {\n        var _tokens = string_split(_input_str, \" \");\n        if (array_length(_tokens) == 0) return;\n        var _cmd = string_lower(_tokens[0]);\n        if (struct_exists(commands, _cmd)) {\n            array_delete(_tokens, 0, 1); // Remaining elements are arguments\n            commands[$ _cmd](_tokens);\n        }\n    };\n}"
    }
  ]
}

export default {
  "slug": "astar-pathfinding-priority-queue",
  "title": "A* Grid Pathfinding with ds_priority and Diagonal Slicing Rules",
  "description": "Implement a custom, fast A* pathfinding algorithm from scratch in modern GML with diagonal corner-cutting prevention and terrain traversal costs.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "pathfinding",
    "astar",
    "algorithms",
    "ai",
    "priority-queue"
  ],
  "author": "GMS2Lab Team",
  "overview": "GameMaker's built-in mp_grid functions lack support for variable terrain movement costs (e.g., mud slowing movement) and custom corner-cutting prevention. Implementing A* with an open set priority queue (ds_priority) gives full control over path generation.",
  "sections": [
    {
      "id": "heuristic-and-node",
      "title": "1. Manhattan & Euclidean Heuristics",
      "content": "Calculate estimated distance from current cell to target.",
      "code": "function heuristic_euclidean(_x1, _y1, _x2, _y2) {\n    return point_distance(_x1, _y1, _x2, _y2);\n}\n\nfunction heuristic_manhattan(_x1, _y1, _x2, _y2) {\n    return abs(_x1 - _x2) + abs(_y1 - _y2);\n}"
    },
    {
      "id": "astar-core-loop",
      "title": "2. The Priority Queue Open Set Loop",
      "content": "Pop lowest estimated cost nodes and expand valid 8-directional neighbors.",
      "code": "function astar_find_path(_grid, _start_x, _start_y, _goal_x, _goal_y) {\n    var _open_set = ds_priority_create();\n    var _came_from = {};\n    var _g_score = {};\n\n    var _start_key = string(_start_x) + \"_\" + string(_start_y);\n    _g_score[$ _start_key] = 0;\n\n    ds_priority_add(_open_set, { x: _start_x, y: _start_y }, 0);\n\n    while (!ds_priority_empty(_open_set)) {\n        var _current = ds_priority_delete_min(_open_set);\n        if (_current.x == _goal_x && _current.y == _goal_y) {\n            ds_priority_destroy(_open_set);\n            return reconstruct_path(_came_from, _current);\n        }\n        // Expand neighbors...\n    }\n\n    ds_priority_destroy(_open_set);\n    return []; // No path found\n}"
    }
  ]
}

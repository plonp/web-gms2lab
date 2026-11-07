export default {
  "slug": "dijkstra-flood-flowfield-pathfinding",
  "title": "Crowd Navigation: Generating Flow Fields via Dijkstra Flood Fill",
  "description": "Direct 5,000 RTS units or zombie horde swarms toward target goals using a single pre-calculated vector flow field grid.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "flowfield",
    "pathfinding",
    "dijkstra",
    "crowd-ai",
    "ai"
  ],
  "author": "GMS2Lab Team",
  "overview": "Running individual A* path requests for 1,000 zombies kills CPU performance. Instead, compute a Dijkstra integration field outward from the player once, generating a grid of movement vector angles that all units read in O(1) time.",
  "sections": [
    {
      "id": "flowfield-sampling",
      "title": "1. Unit Movement via Flow Field Lookup",
      "content": "Units simply sample their grid cell vector and apply velocity.",
      "code": "function unit_follow_flowfield(_grid, _cell_size) {\n    var _cx = floor(x / _cell_size);\n    var _cy = floor(y / _cell_size);\n\n    var _dir = _grid[_cx][_cy].angle;\n    x += lengthdir_x(move_speed, _dir);\n    y += lengthdir_y(move_speed, _dir);\n}"
    }
  ]
}

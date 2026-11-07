export default {
  "slug": "separating-axis-theorem-sat-2d",
  "title": "Precise Rotated Box & Polygon Collisions using the Separating Axis Theorem (SAT)",
  "description": "Detect collisions and extract minimum translation vectors (MTV) between arbitrarily rotated convex polygons and boxes in 2D using SAT math.",
  "category": "Physics & Math",
  "categoryColor": "text-gm-blue",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "sat",
    "collision-detection",
    "physics",
    "polygon",
    "math"
  ],
  "author": "GMS2Lab Team",
  "overview": "GameMaker's built-in collision functions struggle with rotated non-axis-aligned bounding boxes. The Separating Axis Theorem states that if two convex shapes do not overlap, there exists an axis onto which their projections are completely disjoint.",
  "sections": [
    {
      "id": "sat-projection-math",
      "title": "1. Projecting Polygon Vertices onto Normal Axes",
      "content": "Calculate the 1D interval projection of a polygon along a normalized test axis.",
      "code": "function project_polygon(_axis, _vertices) {\n    var _min = dot_product(_axis.x, _axis.y, _vertices[0].x, _vertices[0].y);\n    var _max = _min;\n    var _count = array_length(_vertices);\n\n    for (var i = 1; i < _count; i++) {\n        var _p = dot_product(_axis.x, _axis.y, _vertices[i].x, _vertices[i].y);\n        if (_p < _min) _min = _p;\n        if (_p > _max) _max = _p;\n    }\n    return { min_val: _min, max_val: _max };\n}"
    }
  ]
}

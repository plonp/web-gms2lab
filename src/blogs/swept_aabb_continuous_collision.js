export default {
  "slug": "swept-aabb-continuous-collision",
  "title": "Swept AABB Continuous Collision: Preventing High-Speed Bullet Tunnelling",
  "description": "Stop fast projectiles and high-speed characters from tunnelling through thin walls by casting sweeping bounding boxes along movement vectors.",
  "category": "Physics & Math",
  "categoryColor": "text-gm-blue",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "swept-aabb",
    "ccd",
    "continuous-collision",
    "physics",
    "math"
  ],
  "author": "GMS2Lab Team",
  "overview": "Discrete collision checks (place_meeting) fail when velocity exceeds object thickness, as entities teleport straight past colliders. Swept AABB checks the entire swept volume of the motion vector, finding exact contact time [0.0 - 1.0].",
  "sections": [
    {
      "id": "swept-aabb-algorithm",
      "title": "1. Entry & Exit Time Calculation",
      "content": "Calculate entry and exit collision times across X and Y axes.",
      "code": "function swept_aabb(_b1, _vx, _vy, _b2) {\n    var _x_entry, _x_exit, _y_entry, _y_exit;\n\n    if (_vx > 0) {\n        _x_entry = _b2.x1 - _b1.x2;\n        _x_exit  = _b2.x2 - _b1.x1;\n    } else {\n        _x_entry = _b2.x2 - _b1.x1;\n        _x_exit  = _b2.x1 - _b1.x2;\n    }\n\n    var _entry_time_x = (_vx == 0) ? -999999 : _x_entry / _vx;\n    var _exit_time_x  = (_vx == 0) ?  999999 : _x_exit / _vx;\n\n    // Return earliest collision time fraction [0.0 - 1.0]\n    return max(_entry_time_x, 0.0);\n}"
    }
  ]
}

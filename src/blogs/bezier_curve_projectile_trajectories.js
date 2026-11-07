export default {
  "slug": "bezier-curve-projectile-trajectories",
  "title": "Quadratic & Cubic Bézier Curves for Homing Missiles and Arc Trajectories",
  "description": "Calculate smooth grenade arcs, curved laser beams, and swarming homing missile trajectories using quadratic and cubic Bézier curve math.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "bezier",
    "curves",
    "math",
    "projectiles",
    "physics"
  ],
  "author": "GMS2Lab Team",
  "overview": "Bézier curves define smooth parametric paths using control points. Quadratic curves (3 points) are ideal for artillery shell trajectories, while Cubic curves (4 points) yield cinematic S-curves for guided missiles.",
  "sections": [
    {
      "id": "bezier-functions",
      "title": "1. Quadratic and Cubic Evaluators",
      "content": "Evaluate Bézier positions as progress t advances from 0.0 to 1.0.",
      "code": "function bezier_quadratic(_p0, _p1, _p2, _t) {\n    var _omt = 1.0 - _t;\n    var _x = (_omt * _omt * _p0.x) + (2.0 * _omt * _t * _p1.x) + (_t * _t * _p2.x);\n    var _y = (_omt * _omt * _p0.y) + (2.0 * _omt * _t * _p1.y) + (_t * _t * _p2.y);\n    return { x: _x, y: _y };\n}\n\nfunction bezier_cubic(_p0, _p1, _p2, _p3, _t) {\n    var _omt = 1.0 - _t;\n    var _omt2 = _omt * _omt;\n    var _t2 = _t * _t;\n    var _x = (_omt2 * _omt * _p0.x) + (3.0 * _omt2 * _t * _p1.x) + (3.0 * _omt * _t2 * _p2.x) + (_t2 * _t * _p3.x);\n    var _y = (_omt2 * _omt * _p0.y) + (3.0 * _omt2 * _t * _p1.y) + (3.0 * _omt * _t2 * _p2.y) + (_t2 * _t * _p3.y);\n    return { x: _x, y: _y };\n}"
    }
  ]
}

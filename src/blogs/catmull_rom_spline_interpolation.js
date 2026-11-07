export default {
  "slug": "catmull-rom-spline-interpolation",
  "title": "Smooth Camera & Projectile Curves via Catmull-Rom Spline Math",
  "description": "Interpolate smooth cinematic camera tracks and homing projectile flight paths through arbitrary control points with C1 continuity using Catmull-Rom splines.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "splines",
    "curves",
    "camera",
    "math",
    "interpolation"
  ],
  "author": "GMS2Lab Team",
  "overview": "Standard linear interpolation (lerp) produces abrupt direction changes at waypoints. Catmull-Rom splines pass directly through each specified control point while maintaining continuous velocity tangents.",
  "sections": [
    {
      "id": "catmull-rom-formula",
      "title": "1. The Catmull-Rom Equation",
      "content": "Compute the interpolated point given four consecutive control points and progress t [0.0 - 1.0].",
      "code": "function catmull_rom_point(_p0, _p1, _p2, _p3, _t) {\n    var _t2 = _t * _t;\n    var _t3 = _t2 * _t;\n\n    var _x = 0.5 * ((2 * _p1.x) + (-_p0.x + _p2.x) * _t + (2*_p0.x - 5*_p1.x + 4*_p2.x - _p3.x) * _t2 + (-_p0.x + 3*_p1.x - 3*_p2.x + _p3.x) * _t3);\n    var _y = 0.5 * ((2 * _p1.y) + (-_p0.y + _p2.y) * _t + (2*_p0.y - 5*_p1.y + 4*_p2.y - _p3.y) * _t2 + (-_p0.y + 3*_p1.y - 3*_p2.y + _p3.y) * _t3);\n\n    return { x: _x, y: _y };\n}"
    }
  ]
}

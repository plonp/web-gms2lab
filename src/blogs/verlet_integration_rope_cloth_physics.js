export default {
  "slug": "verlet-integration-rope-cloth-physics",
  "title": "Verlet Integration: Simulating Ropes, Chains, and Ragdoll Hair",
  "description": "Simulate realistic dangling ropes, swinging bridge planks, and flowing character capes using position-based Verlet integration and distance constraints.",
  "category": "Physics & Math",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "verlet",
    "physics",
    "rope",
    "cloth",
    "simulation"
  ],
  "author": "GMS2Lab Team",
  "overview": "Euler physics integration (v += a; x += v) becomes violently unstable when chaining stiff distance constraints. Verlet integration tracks previous and current positions directly, delivering unconditional stability for ropes and cloth.",
  "sections": [
    {
      "id": "verlet-point-step",
      "title": "1. Verlet Particle Movement",
      "content": "Update positions with inertia and gravity without explicit velocity variables.",
      "code": "function verlet_update_point(_p, _gravity) {\n    var _vx = _p.x - _p.old_x;\n    var _vy = _p.y - _p.old_y;\n\n    _p.old_x = _p.x;\n    _p.old_y = _p.y;\n\n    _p.x += _vx;\n    _p.y += _vy + _gravity;\n}\n\nfunction verlet_satisfy_constraint(_p1, _p2, _target_length) {\n    var _dx = _p2.x - _p1.x;\n    var _dy = _p2.y - _p1.y;\n    var _dist = sqrt(_dx*_dx + _dy*_dy);\n    var _diff = (_target_length - _dist) / (_dist + 0.0001) * 0.5;\n\n    _p1.x -= _dx * _diff;\n    _p1.y -= _dy * _diff;\n    _p2.x += _dx * _diff;\n    _p2.y += _dy * _diff;\n}"
    }
  ]
}

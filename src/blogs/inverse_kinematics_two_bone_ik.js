export default {
  "slug": "inverse-kinematics-two-bone-ik",
  "title": "Procedural Leg & Arm Animation using Analytic Two-Bone Inverse Kinematics (IK)",
  "description": "Calculate natural elbow and knee joint bending angles to plant character feet realistically on uneven terrain using analytic 2D trigonometry.",
  "category": "Physics & Math",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "inverse-kinematics",
    "ik",
    "procedural-animation",
    "trigonometry",
    "math"
  ],
  "author": "GMS2Lab Team",
  "overview": "Drawing separate walk animations for every slope and stair height is tedious. Two-bone IK calculates shoulder and elbow angles analytically using the Law of Cosines so hands or feet touch exact target coordinates.",
  "sections": [
    {
      "id": "law-of-cosines-ik",
      "title": "1. The Law of Cosines Solver",
      "content": "Compute joint bend angles given upper bone length L1, lower bone length L2, and target distance D.",
      "code": "function solve_two_bone_ik(_root_x, _root_y, _target_x, _target_y, _l1, _l2) {\n    var _dist = point_distance(_root_x, _root_y, _target_x, _target_y);\n    _dist = clamp(_dist, 0.001, _l1 + _l2 - 0.001); // Prevent geometric singularity\n\n    var _base_angle = point_direction(_root_x, _root_y, _target_x, _target_y);\n\n    // Law of cosines: c^2 = a^2 + b^2 - 2ab*cos(C)\n    var _cos_a1 = (_l1*_l1 + _dist*_dist - _l2*_l2) / (2 * _l1 * _dist);\n    var _angle1 = _base_angle + radtodeg(arccos(clamp(_cos_a1, -1.0, 1.0)));\n\n    var _joint_x = _root_x + lengthdir_x(_l1, _angle1);\n    var _joint_y = _root_y + lengthdir_y(_l1, _angle1);\n\n    var _angle2 = point_direction(_joint_x, _joint_y, _target_x, _target_y);\n\n    return { jx: _joint_x, jy: _joint_y, a1: _angle1, a2: _angle2 };\n}"
    }
  ]
}

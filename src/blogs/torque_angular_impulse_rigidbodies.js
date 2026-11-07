export default {
  "slug": "torque-angular-impulse-rigidbodies",
  "title": "2D Rotational Physics: Angular Velocity, Moment of Inertia & Torques",
  "description": "Simulate floating spaceship thrusters, tipping crates, and rotating physics debris using custom angular momentum equations.",
  "category": "Physics & Math",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "physics",
    "torque",
    "angular-velocity",
    "inertia",
    "math"
  ],
  "author": "GMS2Lab Team",
  "overview": "Applying force off-center creates rotational torque. Modeling moment of inertia (resistance to rotation) allows creating realistic spaceship handling and floating debris.",
  "sections": [
    {
      "id": "torque-calculation",
      "title": "1. Applying Off-Center Impulse Forces",
      "content": "Cross product of contact lever arm and applied force vector.",
      "code": "function apply_impulse_at_point(_rx, _ry, _fx, _fy) {\n    // 2D torque is cross product: rx * fy - ry * fx\n    var _torque = (_rx * _fy) - (_ry * _fx);\n    angular_velocity += _torque / moment_of_inertia;\n\n    vx += _fx / mass;\n    vy += _fy / mass;\n}"
    }
  ]
}

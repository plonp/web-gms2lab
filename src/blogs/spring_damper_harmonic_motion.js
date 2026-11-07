export default {
  "slug": "spring-damper-harmonic-motion",
  "title": "Damped Harmonic Oscillators: Squash & Stretch Physics for UI and Juice",
  "description": "Replace linear lerp animations with physical damped spring equations to achieve organic bounce, squish, and snappy UI responses.",
  "category": "Physics & Math",
  "categoryColor": "text-gm-blue",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "springs",
    "harmonic-motion",
    "physics",
    "game-feel",
    "animation"
  ],
  "author": "GMS2Lab Team",
  "overview": "Lerp decays smoothly but never overshoots. Damped harmonic springs overshoot and oscillate naturally around the equilibrium target, giving buttons and character landing squashes visceral weight.",
  "sections": [
    {
      "id": "spring-simulator-struct",
      "title": "1. The Spring Damper Struct",
      "content": "Simulate spring force based on Hooke's law and damping friction.",
      "code": "function SpringDamper(_stiffness, _damping) constructor {\n    pos = 0.0;\n    target = 0.0;\n    vel = 0.0;\n    k = _stiffness; // e.g. 0.2\n    d = _damping;   // e.g. 0.85\n\n    static update = function() {\n        var _force = -k * (pos - target);\n        vel = (vel + _force) * d;\n        pos += vel;\n    };\n}"
    }
  ]
}

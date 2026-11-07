export default {
  "slug": "screenshake-trauma-directional-vectors",
  "title": "Screenshake Done Right: Trauma Exponents vs Random Noise",
  "description": "Why naive random screenshake induces motion sickness and how polynomial trauma decay (Trauma²) produces punchy, readable screen impacts.",
  "category": "Game Feel & Juice",
  "categoryColor": "text-gm-orange",
  "readTime": "8 min read",
  "date": "May 2025",
  "tags": [
    "screenshake",
    "camera",
    "trauma",
    "game-feel",
    "math"
  ],
  "author": "GMS2Lab Team",
  "overview": "Linearly decaying screenshake feels jittery and floats awkwardly. By tracking a normalized trauma value [0.0 - 1.0] and squaring it to calculate screen offset (Shake = Trauma²), small hits cause subtle vibrations while massive bombs shake intensely before snapping back quickly.",
  "sections": [
    {
      "id": "trauma-squared-math",
      "title": "1. The Trauma² Formula",
      "content": "Squaring trauma creates an exponential curve that drops from violent shake to gentle settling.",
      "code": "// Camera step calculation:\nvar _shake_amount = power(trauma, 2) * max_shake_pixels;\nvar _angle_amount = power(trauma, 2) * max_roll_degrees;\n\nshake_offset_x = random_range(-_shake_amount, _shake_amount);\nshake_offset_y = random_range(-_shake_amount, _shake_amount);\ncamera_angle   = random_range(-_angle_amount, _angle_amount);\n\n// Linear trauma decay\ntrauma = max(0, trauma - decay_rate);"
    }
  ]
}

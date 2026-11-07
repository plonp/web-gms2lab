export default {
  "slug": "gamepad-rumble-haptics-controller",
  "title": "Fine-Grained Gamepad Vibration & Haptics Engine via gamepad_set_vibration",
  "description": "Deliver visceral tactile controller feedback by composing high-frequency and low-frequency motor rumble envelopes with decay curves.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "gamepad",
    "haptics",
    "rumble",
    "feedback",
    "game-feel"
  ],
  "author": "GMS2Lab Team",
  "overview": "Simply setting gamepad_set_vibration(0, 1, 1) and leaving it on produces a flat buzzing sensation. A proper haptics manager controls separate low-frequency (heavy thud) and high-frequency (buzz/tick) motor channels with attack and decay curves.",
  "sections": [
    {
      "id": "rumble-envelope-runner",
      "title": "1. Motor Envelope Decay Loop",
      "content": "Tick vibration strengths down over time in the step event.",
      "code": "function HapticManager() constructor {\n    motor_low = 0.0;\n    motor_high = 0.0;\n\n    static play = function(_low, _high) {\n        motor_low = max(motor_low, _low);\n        motor_high = max(motor_high, _high);\n    };\n\n    static update = function(_pad_idx) {\n        gamepad_set_vibration(_pad_idx, motor_low, motor_high);\n        motor_low = max(0, motor_low - 0.05);\n        motor_high = max(0, motor_high - 0.1);\n    };\n}"
    }
  ]
}

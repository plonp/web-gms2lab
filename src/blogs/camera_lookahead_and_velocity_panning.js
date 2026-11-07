export default {
  "slug": "camera-lookahead-and-velocity-panning",
  "title": "Velocity-Aware Camera Lookahead: Preventing Off-Screen Blindness",
  "description": "Pan the camera ahead of the player based on movement velocity and facing direction so players can anticipate approaching hazards at high speeds.",
  "category": "Game Feel & Juice",
  "categoryColor": "text-gm-orange",
  "readTime": "7 min read",
  "date": "May 2025",
  "tags": [
    "camera",
    "lookahead",
    "platformer",
    "game-feel",
    "math"
  ],
  "author": "GMS2Lab Team",
  "overview": "Centering the camera strictly on the player leaves 50% of screen real estate behind them—wasting space. Offsetting the camera forward along the player's velocity vector gives double the reaction time.",
  "sections": [
    {
      "id": "velocity-offset-code",
      "title": "1. Velocity Lookahead Math",
      "content": "Calculate smooth forward offset proportional to current velocity.",
      "code": "var _lookahead_dist = 80;\nvar _target_look_x = obj_player.vx * 15; // Shift forward by velocity\ncam_offset_x = lerp(cam_offset_x, clamp(_target_look_x, -_lookahead_dist, _lookahead_dist), 0.08);"
    }
  ]
}

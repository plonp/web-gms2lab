export default {
  "slug": "time-dilation-hitstop-controller",
  "title": "Independent Entity Time Scales: Global Hitstop & Slow-Motion Buffers",
  "description": "Implement hitstop frame freezing and cinematic bullet-time slow-motion without altering global room_speed or desynchronizing audio.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "hitstop",
    "slow-motion",
    "time-dilation",
    "game-feel",
    "combat"
  ],
  "author": "GMS2Lab Team",
  "overview": "Dropping room_speed to 10 FPS for hitstop breaks audio playback and makes UI menus unresponsive. Instead, maintain an entity timescale factor that scales physics velocities while UI runs at full 60 FPS.",
  "sections": [
    {
      "id": "hitstop-trigger-code",
      "title": "1. Hitstop Freeze Frame Trigger",
      "content": "Pause gameplay simulation for a fixed count of frames on heavy impacts.",
      "code": "function trigger_hitstop(_frames) {\n    global.hitstop_remaining = max(global.hitstop_remaining, _frames);\n}\n\n// In par_combat_entity Step Event:\nif (global.hitstop_remaining > 0) {\n    exit; // Skip animation and movement updates for this frame\n}"
    }
  ]
}

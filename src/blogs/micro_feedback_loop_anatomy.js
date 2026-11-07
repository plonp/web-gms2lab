export default {
  "slug": "micro-feedback-loop-anatomy",
  "title": "The Anatomy of Micro-Feedback: Visual, Auditory, and Haptic Triads",
  "description": "Break down the milliseconds that make actions feel visceral. Combine visual frames, layered audio, and subtle gamepad rumble into an interconnected feedback triad.",
  "category": "Game Feel & Juice",
  "categoryColor": "text-gm-orange",
  "readTime": "8 min read",
  "date": "May 2025",
  "tags": [
    "game-feel",
    "juice",
    "feedback",
    "design-theory",
    "combat"
  ],
  "author": "GMS2Lab Team",
  "overview": "Every interactive player action—from swinging a sword to jumping off a ledge—requires sensory confirmation. Without instantaneous micro-feedback within 1 to 3 frames, gameplay feels sluggish and disconnects the player from their avatar.",
  "sections": [
    {
      "id": "sensory-triad",
      "title": "1. The Sensory Feedback Triad",
      "content": "A satisfying action delivers feedback across three sensory channels simultaneously: visual deformation, acoustic impact, and tactile vibration.",
      "steps": [
        "Visual: Scale distortion (squash/stretch), directional particle bursts, and 1-frame bright silhouettes.",
        "Auditory: A multi-frequency transient (crisp high click + heavy mid punch + low sub-bass rumble).",
        "Tactile: A momentary high-frequency motor spike followed by decaying low-frequency vibration."
      ]
    },
    {
      "id": "timing-breakdown",
      "title": "2. Frame Timing in Micro-Feedback",
      "content": "Delayed feedback ruins game feel. The sensory punch must land within 16.6ms (frame 1) of collision confirmation.",
      "code": "// GML unified impact invocation\nfunction trigger_impact_triad(_x, _y, _intensity) {\n    // 1. Visual\n    instance_create_layer(_x, _y, \"VFX\", obj_impact_spark);\n    global.camera_shake = max(global.camera_shake, _intensity * 4);\n    \n    // 2. Audio\n    audio_play_sound(snd_hit_punch, 10, false, _intensity, 0, random_range(0.95, 1.05));\n    \n    // 3. Tactile\n    gamepad_set_vibration(0, _intensity * 0.5, _intensity * 0.8);\n}"
    }
  ]
}

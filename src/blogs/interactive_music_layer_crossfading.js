export default {
  "slug": "interactive-music-layer-crossfading",
  "title": "Dynamic Interactive Music: Stems, Multi-Track Crossfading, and Beat Sync",
  "description": "Synchronize and crossfade multiple stems (ambient, percussion, combat intensity) in real-time without losing beat synchronization using audio_sound_gain().",
  "category": "Audio & Sound",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "audio",
    "music",
    "adaptive-music",
    "stems",
    "crossfading"
  ],
  "author": "GMS2Lab Team",
  "overview": "Dynamic music elevates game tension by playing base melody and combat percussion simultaneously, fading drum tracks in and out seamlessly as danger increases.",
  "sections": [
    {
      "id": "stem-synchronization-code",
      "title": "1. Launching Synced Music Stems",
      "content": "Start all stems at the exact same sub-microsecond timestamp, setting silent stems to gain 0.",
      "code": "function init_adaptive_music() {\n    base_track = audio_play_sound(snd_bgm_base, 10, true);\n    combat_drums = audio_play_sound(snd_bgm_drums, 10, true);\n\n    // Mute drums initially\n    audio_sound_gain(combat_drums, 0.0, 0);\n    audio_sound_gain(base_track, 1.0, 0);\n}\n\nfunction set_combat_intensity(_in_combat) {\n    var _fade_ms = 1000;\n    audio_sound_gain(combat_drums, _in_combat ? 1.0 : 0.0, _fade_ms);\n}"
    }
  ]
}

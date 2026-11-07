export default {
  "slug": "audio-emitter-3d-attenuation",
  "title": "3D Spatial Audio: Falloff Curves, Obstacle Muffling, and Doppler Pitch",
  "description": "Position sound sources in 2D/3D space with distance attenuation models, stereo panning, and dynamic wall occlusion in GML.",
  "category": "Audio & Sound",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "audio",
    "3d-audio",
    "emitters",
    "attenuation",
    "game-feel"
  ],
  "author": "GMS2Lab Team",
  "overview": "GameMaker's audio emitters position sounds in continuous space, automatically panning left/right and dropping volume as listeners walk away.",
  "sections": [
    {
      "id": "emitter-setup-code",
      "title": "1. Emitter Initialization & Listener Updates",
      "content": "Set distance models and bind emitters to game entities.",
      "code": "// In obj_torch Create Event:\nemitter = audio_emitter_create();\naudio_emitter_position(emitter, x, y, 0);\naudio_emitter_falloff(emitter, 100, 600, 1.0);\naudio_play_sound_on(emitter, snd_fire_crackle, true, 5);\n\n// In obj_player Step Event:\naudio_listener_position(x, y, 0);\naudio_listener_orientation(0, -1, 0, 0, 0, 1);"
    }
  ]
}

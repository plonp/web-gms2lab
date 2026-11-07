export default {
  "slug": "dynamic-footstep-surface-audio",
  "title": "Material-Based Footstep Audio System: Raycasting Surface Types",
  "description": "Play contextual footstep sound effects (stone, gravel, wood, puddle) by sampling tilemaps and surface metadata beneath player characters.",
  "category": "Audio & Sound",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "audio",
    "footsteps",
    "sound-design",
    "materials",
    "gameplay"
  ],
  "author": "GMS2Lab Team",
  "overview": "Static footstep sounds break realism. Sampling the ground tile index or collision material at the character's feet triggers appropriate footstep audio pools.",
  "sections": [
    {
      "id": "footstep-material-lookup",
      "title": "1. Tilemap Surface Material Query",
      "content": "Sample tilemap IDs to select material audio pools.",
      "code": "function play_footstep_audio(_tilemap_id) {\n    var _tile_data = tilemap_get_at_pixel(_tilemap_id, x, y + 2);\n    var _tile_index = tile_get_index(_tile_data);\n\n    var _snd = snd_step_stone;\n    if (_tile_index >= 10 && _tile_index <= 20) _snd = snd_step_wood;\n    else if (_tile_index >= 21 && _tile_index <= 30) _snd = snd_step_grass;\n\n    audio_play_sound(_snd, 1, false, 1.0, 0, random_range(0.95, 1.05));\n}"
    }
  ]
}

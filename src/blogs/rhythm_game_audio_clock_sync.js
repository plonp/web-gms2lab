export default {
  "slug": "rhythm-game-audio-clock-sync",
  "title": "Frame-Accurate Audio Clock Synchronization for Rhythm & Beat Games",
  "description": "Synchronize note spawns and hit judgment windows to hardware audio playback positions using audio_sound_get_track_position().",
  "category": "Audio & Sound",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "rhythm-game",
    "audio-sync",
    "music",
    "timing",
    "gameplay"
  ],
  "author": "GMS2Lab Team",
  "overview": "Relying on frame counters (delta_time) in rhythm games causes drift when framerates fluctuate. Querying the exact song playback time from the audio driver maintains sub-millisecond sync.",
  "sections": [
    {
      "id": "audio-clock-sync",
      "title": "1. Hardware Audio Clock Reading",
      "content": "Drive song beat advancement using track position.",
      "code": "function get_current_beat(_music_sound_instance, _bpm, _offset_sec) {\n    var _track_pos = audio_sound_get_track_position(_music_sound_instance);\n    var _elapsed_sec = max(0, _track_pos - _offset_sec);\n    var _bps = _bpm / 60.0;\n    return _elapsed_sec * _bps;\n}"
    }
  ]
}

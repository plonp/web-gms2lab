export default {
  "slug": "audio-ducking-dialogue-compression",
  "title": "Automated Audio Ducking: Lowering BGM/SFX when Voice Dialogue Plays",
  "description": "Implement sidechain audio ducking to automatically reduce background music and sound effect volumes whenever voice lines play.",
  "category": "Audio & Sound",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "audio",
    "ducking",
    "dialogue",
    "mixing",
    "sound-design"
  ],
  "author": "GMS2Lab Team",
  "overview": "Clear dialogue is essential for storytelling. Audio ducking compresses BGM gain to 30% when voice lines trigger, smoothly restoring full volume when speech finishes.",
  "sections": [
    {
      "id": "ducking-manager",
      "title": "1. Automated Gain Ducking Controller",
      "content": "Fade BGM down when active dialogue is detected.",
      "code": "function play_voice_line(_snd) {\n    voice_inst = audio_play_sound(_snd, 100, false);\n    audio_sound_gain(global.bgm_instance, 0.3, 200); // Duck to 30% over 200ms\n}\n\n// In obj_audio_mixer Step Event:\nif (voice_inst != -1 && !audio_is_playing(voice_inst)) {\n    audio_sound_gain(global.bgm_instance, 1.0, 600); // Restore over 600ms\n    voice_inst = -1;\n}"
    }
  ]
}

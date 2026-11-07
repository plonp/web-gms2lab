export default {
  "slug": "procedural-sound-synthesis-buffers",
  "title": "Generating Procedural Chiptune Audio directly into Buffers",
  "description": "Synthesize square, triangle, and noise wave SFX programmatically into PCM audio buffers at runtime via audio_create_buffer_sound().",
  "category": "Audio & Sound",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "audio",
    "synthesis",
    "buffers",
    "chiptune",
    "procedural"
  ],
  "author": "GMS2Lab Team",
  "overview": "Generating retro chiptune sound effects (laser beeps, explosion noise) procedurally saves disk space and allows infinite randomized pitch and frequency modulation.",
  "sections": [
    {
      "id": "square-wave-generator",
      "title": "1. Generating Square Wave PCM Samples",
      "content": "Write alternating high and low 16-bit signed integer values into a buffer.",
      "code": "function generate_beep_sound(_freq, _duration_sec) {\n    var _sample_rate = 44100;\n    var _total_samples = floor(_sample_rate * _duration_sec);\n    var _buf = buffer_create(_total_samples * 2, buffer_fixed, 2);\n\n    var _period = _sample_rate / _freq;\n    for (var i = 0; i < _total_samples; i++) {\n        var _val = ((i % _period) < (_period * 0.5)) ? 16000 : -16000;\n        buffer_write(_buf, buffer_s16, _val);\n    }\n\n    var _snd = audio_create_buffer_sound(_buf, buffer_s16, _sample_rate, 0, _total_samples * 2, audio_mono);\n    return { sound_id: _snd, buffer_id: _buf };\n}"
    }
  ]
}

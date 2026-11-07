export default {
  "slug": "audio-filter-sweeps-resonance",
  "title": "Real-Time High-Pass & Low-Pass Filter Frequency Sweeps during Pauses",
  "description": "Create dramatic pause-screen audio effects by sweeping filter cutoff frequencies and resonance Q factors using audio bus effects in GML.",
  "category": "Audio & Sound",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "audio",
    "dsp",
    "filter-sweep",
    "effects",
    "pause-menu"
  ],
  "author": "GMS2Lab Team",
  "overview": "Smoothly sweeping a low-pass filter down to 400Hz creates a muffled underwater/pause aesthetic, signaling game state transitions to the player.",
  "sections": [
    {
      "id": "filter-sweep-step",
      "title": "1. Cutoff Interpolation in Step Loop",
      "content": "Lerp filter cutoff frequency toward target value.",
      "code": "function update_audio_sweep(_filter_effect, _target_hz) {\n    _filter_effect.cutoff = lerp(_filter_effect.cutoff, _target_hz, 0.15);\n}"
    }
  ]
}

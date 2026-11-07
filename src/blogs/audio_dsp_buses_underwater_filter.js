export default {
  "slug": "audio-dsp-buses-underwater-filter",
  "title": "Audio Buses, Dynamic Low-Pass Filters, and Reverb Sends via GM Audio Effects",
  "description": "Route game sounds into audio effect buses to apply real-time low-pass filters (muffled sound underwater or in menus) and spatial reverb.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "audio",
    "dsp",
    "filters",
    "reverb",
    "audio-bus"
  ],
  "author": "GMS2Lab Team",
  "overview": "Modern GameMaker includes native DSP audio buses. Routing sounds through an audio bus with an audio_effect_create(AudioEffectType.LPF2) filter allows smoothly sweeping cutoff frequencies when diving underwater.",
  "sections": [
    {
      "id": "lowpass-filter-setup",
      "title": "1. Creating the Low-Pass Filter Bus",
      "content": "Instantiate and attach a low-pass filter effect.",
      "code": "// Initialize audio bus and effect\nmain_bus = audio_bus_create();\nlpf_effect = audio_effect_create(AudioEffectType.LPF2);\nlpf_effect.cutoff = 20000; // Open (unfiltered) by default\n\nmain_bus.effects[0] = lpf_effect;\naudio_emitter_bus(global.sfx_emitter, main_bus);\n\nfunction set_underwater_muffle(_active) {\n    lpf_effect.cutoff = _active ? 800 : 20000;\n}"
    }
  ]
}

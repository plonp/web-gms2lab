export default {
  "slug": "custom-soundfont-midi-player",
  "title": "Parsing and Playing MIDI Events via Dynamic GML Audio Buffers",
  "description": "Parse standard MIDI file tracks (.mid) and trigger PCM synthesizer instruments dynamically in GameMaker.",
  "category": "Audio & Sound",
  "categoryColor": "text-gm-purple",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "midi",
    "audio",
    "soundfont",
    "buffers",
    "retro"
  ],
  "author": "GMS2Lab Team",
  "overview": "MIDI files pack complex musical compositions into tiny 20KB files. Parsing delta ticks, Note-On, and Note-Off events allows driving custom chiptune synthesizers.",
  "sections": [
    {
      "id": "midi-header-parsing",
      "title": "1. Reading MIDI File Headers",
      "content": "Verify MThd signature and extract track counts and division timing.",
      "code": "function parse_midi_header(_buf) {\n    var _tag = buffer_read(_buf, buffer_string); // \"MThd\"\n    var _len = buffer_read(_buf, buffer_u32);\n    var _format = buffer_read(_buf, buffer_u16);\n    var _tracks = buffer_read(_buf, buffer_u16);\n    var _division = buffer_read(_buf, buffer_u16);\n    return { format: _format, tracks: _tracks, division: _division };\n}"
    }
  ]
}

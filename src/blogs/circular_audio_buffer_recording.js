export default {
  "slug": "circular-audio-buffer-recording",
  "title": "Recording Microphone Audio into Circular Buffers via audio_start_recording",
  "description": "Capture real-time player voice or microphone input into circular PCM audio buffers for in-game voice chat or microphone-reactive gameplay.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "audio",
    "microphone",
    "buffers",
    "voice-chat",
    "recording"
  ],
  "author": "GMS2Lab Team",
  "overview": "GameMaker provides native microphone capture via audio_start_recording(). In the Audio Recording event, raw 16-bit PCM samples arrive as buffers that can be piped into network sockets or audio effects.",
  "sections": [
    {
      "id": "audio-record-listener",
      "title": "1. Capturing Microphone Packets",
      "content": "Read incoming audio buffer indices in the Audio Recording event.",
      "code": "// In obj_voice_chat Audio Recording Event:\nvar _channel = async_load[? \"channel_index\"];\nvar _buffer_id = async_load[? \"buffer_id\"];\nvar _length = async_load[? \"data_len\"];\n\nif (_length > 0) {\n    // Send raw PCM buffer across network or play back locally\n    network_send_raw(voice_socket, _buffer_id, _length);\n}"
    }
  ]
}

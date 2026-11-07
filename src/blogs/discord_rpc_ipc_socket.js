export default {
  "slug": "discord-rpc-ipc-socket",
  "title": "Native Discord Rich Presence via IPC Named Pipes & Sockets",
  "description": "Display in-game status, current party size, difficulty levels, and elapsed match timers on Discord profiles directly from GML without external wrapper executables.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "discord",
    "rich-presence",
    "ipc",
    "networking",
    "sockets"
  ],
  "author": "GMS2Lab Team",
  "overview": "Discord Rich Presence connects directly to the local Discord client via Windows Named Pipes (`\\\\.\\pipe\\discord-ipc-0`) or Unix domain sockets. By establishing an IPC connection and exchanging opcode-prefixed JSON handshake packets, GameMaker can update game presence in real time.",
  "sections": [
    {
      "id": "ipc-handshake-packet",
      "title": "1. IPC Frame Structure & Handshake",
      "content": "Every Discord IPC frame begins with an 8-byte header: a 32-bit unsigned integer opcode (0 = Handshake, 1 = Frame, 2 = Close, 3 = Ping, 4 = Pong), followed by a 32-bit little-endian integer payload length.",
      "code": "/// @function discord_ipc_send\n/// @param {Id.Socket} socket The open IPC socket\n/// @param {Real} opcode Opcode (0 for Handshake, 1 for Frame)\n/// @param {String} json_str The payload string\nfunction discord_ipc_send(_socket, _opcode, _json_str) {\n    var _len = string_byte_length(_json_str);\n    var _buf = buffer_create(8 + _len, buffer_fixed, 1);\n\n    buffer_write(_buf, buffer_u32, _opcode);\n    buffer_write(_buf, buffer_u32, _len);\n    buffer_write(_buf, buffer_text, _json_str);\n\n    network_send_raw(_socket, _buf, buffer_get_size(_buf));\n    buffer_delete(_buf);\n}"
    },
    {
      "id": "presence-payload",
      "title": "2. Dispatching the SET_ACTIVITY Payload",
      "content": "After completing the handshake, send opcode 1 with the rich presence activity details, party limits, and timestamp timestamps.",
      "code": "/// @function discord_update_activity\nfunction discord_update_activity(_socket, _client_id, _details, _state, _party_cur, _party_max) {\n    var _payload = {\n        cmd: \"SET_ACTIVITY\",\n        args: {\n            pid: 1337,\n            activity: {\n                details: _details,\n                state: _state,\n                timestamps: { start: floor(current_time / 1000) },\n                assets: {\n                    large_image: \"main_logo\",\n                    large_text: \"GMS2Lab Dungeon Crawler\"\n                },\n                party: {\n                    size: [_party_cur, _party_max]\n                }\n            }\n        },\n        nonce: string(irandom(1000000))\n    };\n\n    discord_ipc_send(_socket, 1, json_stringify(_payload));\n}"
    }
  ]
}

export default {
  "slug": "binary-websocket-client-serializer",
  "title": "High-Performance Binary WebSocket Client & Packet Serializer",
  "description": "Construct low-overhead binary WebSocket clients in GameMaker using network_create_socket and custom byte-level packet dispatching.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "websocket",
    "networking",
    "binary",
    "multiplayer",
    "buffers"
  ],
  "author": "GMS2Lab Team",
  "overview": "Text JSON over WebSockets creates severe serialization overhead and memory churn when sending 60 packet updates per second. Encoding packets as binary buffers with 1-byte opcode headers reduces network bandwidth by over 80%.",
  "sections": [
    {
      "id": "packet-opcodes",
      "title": "1. Opcode Enumeration & Struct Mapping",
      "content": "Define packet IDs and bind incoming opcodes to dedicated unpacker methods.",
      "code": "enum MSG_TYPE {\n    CONNECT = 1,\n    MOVE = 2,\n    ATTACK = 3,\n    SPAWN = 4,\n    DISCONNECT = 5\n}\n\nfunction PacketManager() constructor {\n    handlers = {};\n\n    static register = function(_opcode, _func) {\n        handlers[_opcode] = _func;\n    };\n\n    static parse = function(_buf) {\n        var _opcode = buffer_read(_buf, buffer_u8);\n        if (struct_exists(handlers, _opcode)) {\n            handlers[_opcode](_buf);\n        }\n    };\n}"
    },
    {
      "id": "movement-packet-packing",
      "title": "2. Packing High-Frequency Entity Transforms",
      "content": "Pack coordinates using 16-bit fixed-point integers to conserve bandwidth.",
      "code": "/// @function send_player_move\nfunction send_player_move(_socket, _x, _y, _angle) {\n    var _buf = buffer_create(7, buffer_fixed, 1);\n    buffer_write(_buf, buffer_u8, MSG_TYPE.MOVE);\n    buffer_write(_buf, buffer_u16, round(_x));       // 0-65535 coordinate space\n    buffer_write(_buf, buffer_u16, round(_y));\n    buffer_write(_buf, buffer_u16, round(_angle * (65535 / 360))); // Compressed angle\n\n    network_send_raw(_socket, _buf, buffer_get_size(_buf));\n    buffer_delete(_buf);\n}"
    }
  ]
}

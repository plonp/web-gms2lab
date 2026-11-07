export default {
  "slug": "delta-compressed-network-sync",
  "title": "Network Entity Synchronization with Delta Compression & Bitmasks",
  "description": "Drastically reduce multiplayer network traffic by transmitting only entity properties that changed since the last acknowledged server tick.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "multiplayer",
    "delta-compression",
    "networking",
    "bitmasks",
    "optimization"
  ],
  "author": "GMS2Lab Team",
  "overview": "Broadcasting full player states (x, y, vx, vy, hp, mana, angle, anim_frame) every tick wastes bandwidth. Delta compression compares current state to previous tick state, writing only modified fields guarded by a 1-byte field bitmask.",
  "sections": [
    {
      "id": "delta-packing-code",
      "title": "1. Bitmask Delta Serialization",
      "content": "Serialize only fields whose values changed since the previous snapshot.",
      "code": "function serialize_entity_delta(_buf, _cur, _prev) {\n    var _mask = 0;\n    if (_cur.x != _prev.x)       _mask |= (1 << 0);\n    if (_cur.y != _prev.y)       _mask |= (1 << 1);\n    if (_cur.hp != _prev.hp)     _mask |= (1 << 2);\n    if (_cur.angle != _prev.angle) _mask |= (1 << 3);\n\n    buffer_write(_buf, buffer_u8, _mask);\n\n    if (_mask & (1 << 0)) buffer_write(_buf, buffer_f32, _cur.x);\n    if (_mask & (1 << 1)) buffer_write(_buf, buffer_f32, _cur.y);\n    if (_mask & (1 << 2)) buffer_write(_buf, buffer_u16, _cur.hp);\n    if (_mask & (1 << 3)) buffer_write(_buf, buffer_u16, round(_cur.angle));\n}"
    }
  ]
}

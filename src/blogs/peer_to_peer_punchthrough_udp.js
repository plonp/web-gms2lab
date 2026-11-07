export default {
  "slug": "peer-to-peer-punchthrough-udp",
  "title": "UDP Hole Punching & STUN Address Discovery in GML",
  "description": "Connect two players directly over NAT routers without port forwarding using STUN discovery and UDP packet spraying.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "10 min read",
  "date": "April 2025",
  "tags": [
    "udp",
    "networking",
    "p2p",
    "stun",
    "nat-punchthrough"
  ],
  "author": "GMS2Lab Team",
  "overview": "Direct multiplayer connections usually fail because domestic routers block unsolicited incoming packets. By pinging a lightweight STUN server to discover external IP:Port pairings and simultaneously transmitting keepalive UDP packets, both routers open incoming firewall NAT states.",
  "sections": [
    {
      "id": "stun-binding-request",
      "title": "1. Sending RFC 5389 STUN Binding Requests",
      "content": "Send a 20-byte STUN header to a public STUN server (e.g. stun.l.google.com:19302) to discover external mapping.",
      "code": "function stun_request_public_ip(_socket, _stun_ip, _stun_port) {\n    var _buf = buffer_create(20, buffer_fixed, 1);\n    buffer_write(_buf, buffer_u16, 0x0001); // Binding Request\n    buffer_write(_buf, buffer_u16, 0x0000); // Message Length\n    buffer_write(_buf, buffer_u32, 0x2112A442); // Magic Cookie\n    // 12-byte Transaction ID\n    repeat(3) buffer_write(_buf, buffer_u32, irandom(0xFFFFFFFF));\n\n    network_send_udp_raw(_socket, _stun_ip, _stun_port, _buf, 20);\n    buffer_delete(_buf);\n}"
    }
  ]
}

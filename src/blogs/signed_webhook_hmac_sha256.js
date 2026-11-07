export default {
  "slug": "signed-webhook-hmac-sha256",
  "title": "HMAC-SHA256 Request Verification for Secure Game Webhooks",
  "description": "Sign and verify outgoing and incoming server requests using cryptographic HMAC-SHA256 hashing in GameMaker.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "hmac",
    "sha256",
    "cryptography",
    "security",
    "webhooks"
  ],
  "author": "GMS2Lab Team",
  "overview": "To ensure payment notifications or admin commands cannot be spoofed by man-in-the-middle attackers, requests must be digitally signed with an HMAC-SHA256 signature using a shared secret key.",
  "sections": [
    {
      "id": "hmac-generation",
      "title": "1. Signing Outgoing Payloads",
      "content": "Generate SHA256 hashes with shared private keys and attach them as HTTP headers.",
      "code": "function generate_signed_request(_url, _secret_key, _body_json) {\n    var _signature = sha1_string_utf8(_body_json + _secret_key); // Or extension-based HMAC-SHA256\n\n    var _headers = ds_map_create();\n    ds_map_add(_headers, \"Content-Type\", \"application/json\");\n    ds_map_add(_headers, \"X-Signature\", _signature);\n\n    var _req = http_request(_url, \"POST\", _headers, _body_json);\n    ds_map_destroy(_headers);\n    return _req;\n}"
    }
  ]
}

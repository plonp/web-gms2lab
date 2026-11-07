export default {
  "slug": "twitch-irc-chat-bot-integration",
  "title": "Connecting to Twitch IRC Chat via Raw TCP Sockets",
  "description": "Integrate live Twitch chat interaction directly into your game using raw TCP sockets, PASS tokens, and PRIVMSG command parsing.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "twitch",
    "irc",
    "tcp",
    "chat",
    "streaming"
  ],
  "author": "GMS2Lab Team",
  "overview": "Twitch chat operates on standard IRC over TLS or raw TCP on irc.chat.twitch.tv:6667. Opening a socket allows your game to listen to streamer chat commands (e.g. \"!spawn enemy\") to drive live community interaction.",
  "sections": [
    {
      "id": "irc-connect-gml",
      "title": "1. Authenticating to Twitch IRC",
      "content": "Connect to port 6667 and transmit PASS and NICK commands.",
      "code": "function twitch_irc_connect(_oauth_token, _channel) {\n    var _sock = network_create_socket(network_socket_tcp);\n    network_connect_raw(_sock, \"irc.chat.twitch.tv\", 6667);\n\n    var _login_str = \"PASS oauth:\" + _oauth_token + \"\\r\\n\" +\n                     \"NICK gms2lab_bot\\r\\n\" +\n                     \"JOIN #\" + string_lower(_channel) + \"\\r\\n\";\n\n    var _buf = buffer_create(string_byte_length(_login_str), buffer_fixed, 1);\n    buffer_write(_buf, buffer_text, _login_str);\n    network_send_raw(_sock, _buf, buffer_get_size(_buf));\n    buffer_delete(_buf);\n    return _sock;\n}"
    }
  ]
}

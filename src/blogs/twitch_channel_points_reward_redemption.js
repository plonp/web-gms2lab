export default {
  "slug": "twitch-channel-points-reward-redemption",
  "title": "Interactive Streaming: Triggering In-Game Events from Twitch Channel Points",
  "description": "Connect to Twitch EventSub WebSockets to listen for viewer channel point redemptions and spawn in-game boss spawns or mutators in real time.",
  "category": "Platform & Tooling",
  "categoryColor": "text-gm-orange",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "twitch",
    "streaming",
    "eventsub",
    "websocket",
    "community"
  ],
  "author": "GMS2Lab Team",
  "overview": "Twitch EventSub WebSockets notify games in real time when viewers spend channel points. Spawning elite enemies or activating gravity modifiers on viewer redemptions boosts streamer engagement.",
  "sections": [
    {
      "id": "eventsub-reward-handler",
      "title": "1. Handling Redemption Payloads",
      "content": "Parse reward title and viewer username from EventSub notifications.",
      "code": "function handle_twitch_reward(_json_data) {\n    var _title = _json_data.event.reward.title;\n    var _user = _json_data.event.user_name;\n\n    if (_title == \"Spawn Elite Boss\") {\n        instance_create_layer(x, y, \"Enemies\", obj_boss_minion);\n        show_notification(_user + \" spawned a boss!\");\n    }\n}"
    }
  ]
}

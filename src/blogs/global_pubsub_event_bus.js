export default {
  "slug": "global-pubsub-event-bus",
  "title": "Decoupled Game Architecture: Struct-Based Publish-Subscribe Event Bus",
  "description": "Eliminate hardcoded object dependencies like obj_player.hp -= 10 by broadcasting events through a central publish-subscribe message broker in GML.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "event-bus",
    "pub-sub",
    "architecture",
    "design-patterns",
    "decoupling"
  ],
  "author": "GMS2Lab Team",
  "overview": "Directly modifying external instance variables creates tightly coupled spaghetti code where changing one object breaks three others. A global event bus allows audio managers, quest trackers, and HUD widgets to respond to events without knowing what caused them.",
  "sections": [
    {
      "id": "event-bus-implementation",
      "title": "1. The EventBus Constructor",
      "content": "Store event listeners in arrays indexed by event string keys.",
      "code": "function EventBus() constructor {\n    topics = {};\n\n    static on = function(_event_name, _callback) {\n        if (!struct_exists(topics, _event_name)) {\n            topics[$ _event_name] = [];\n        }\n        array_push(topics[$ _event_name], _callback);\n    };\n\n    static emit = function(_event_name, _payload) {\n        if (!struct_exists(topics, _event_name)) return;\n        var _listeners = topics[$ _event_name];\n        var _len = array_length(_listeners);\n        for (var i = 0; i < _len; i++) {\n            _listeners[i](_payload);\n        }\n    };\n}"
    }
  ]
}

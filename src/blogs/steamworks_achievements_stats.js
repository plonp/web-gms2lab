export default {
  "slug": "steamworks-achievements-stats",
  "title": "Steamworks SDK: Unlocking Achievements & Tracking Encrypted Stats",
  "description": "Implement persistent Steam achievements, progressive stat increments, and visual popups in GML using native Steamworks functions.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "steamworks",
    "achievements",
    "stats",
    "valve",
    "steam"
  ],
  "author": "GMS2Lab Team",
  "overview": "Unlocking achievements via steam_set_achievement() and tracking progress (e.g. \"Kill 500 Skeletons\") with steam_set_stat_int() requires initializing the Steam API and checking unlock state before dispatching calls.",
  "sections": [
    {
      "id": "unlock-achievement-helper",
      "title": "1. Safe Achievement Dispatch Function",
      "content": "Query achievement unlock status before submitting API updates to avoid redundant network RPCs.",
      "code": "function steam_award_achievement(_id) {\n    if (!steam_initialised()) return;\n\n    if (!steam_get_achievement(_id)) {\n        steam_set_achievement(_id);\n        show_debug_message(\"Achievement awarded: \" + _id);\n    }\n}\n\nfunction steam_increment_stat(_stat_name, _amount) {\n    if (!steam_initialised()) return;\n\n    var _current = steam_get_stat_int(_stat_name);\n    steam_set_stat_int(_stat_name, _current + _amount);\n}"
    }
  ]
}

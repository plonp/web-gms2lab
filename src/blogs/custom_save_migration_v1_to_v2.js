export default {
  "slug": "custom-save-migration-v1-to-v2",
  "title": "Safe Schema Evolution: Non-Breaking Save Migrations Across Game Patches",
  "description": "Add new items, quest variables, and player stats in game updates without breaking or resetting existing player save files using automated schema migration steps.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "save-system",
    "migrations",
    "architecture",
    "serialization",
    "steam"
  ],
  "author": "GMS2Lab Team",
  "overview": "Releasing game updates that alter the save data schema often crashes older saves or corrupts player progress. A migration pipeline inspects save format versions and executes incremental patch functions sequentially.",
  "sections": [
    {
      "id": "migration-pipeline-code",
      "title": "1. Sequential Migration Runner",
      "content": "Apply migrations sequentially from the save version up to current version.",
      "code": "function migrate_save_data(_save_struct) {\n    var _version = _save_struct[$ \"version\"] ?? 1;\n\n    // Migration from v1 -> v2: Add mana and spell slots\n    if (_version == 1) {\n        _save_struct.mana = 100;\n        _save_struct.max_mana = 100;\n        _save_struct.spells = [];\n        _version = 2;\n    }\n\n    // Migration from v2 -> v3: Add difficulty modifier\n    if (_version == 2) {\n        _save_struct.difficulty = \"normal\";\n        _version = 3;\n    }\n\n    _save_struct.version = _version;\n    return _save_struct;\n}"
    }
  ]
}

export default {
  "slug": "steamworks-cloud-saves-integration",
  "title": "Steamworks SDK: Steam Cloud File Synchronization & Conflict Resolution",
  "description": "Integrate Valve Steam Cloud saves in GameMaker. Learn how to write, read, query quotas, and handle file conflicts across Steam Deck and PC.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "steamworks",
    "steam",
    "cloud-saves",
    "steam-deck",
    "save-system"
  ],
  "author": "GMS2Lab Team",
  "overview": "Players expect seamless continuity when transitioning between Steam Deck and PC. The Steamworks API exposes steam_file_write_buffer() and steam_file_read_buffer() for persistent, cloud-synchronized game saves with quota management.",
  "sections": [
    {
      "id": "steam-cloud-write",
      "title": "1. Writing Cloud Buffers with Quota Checks",
      "content": "Always verify remaining Steam Cloud storage quota before attempting to write save files.",
      "code": "function steam_cloud_save(_filename, _src_buffer) {\n    if (!steam_is_cloud_enabled_for_app() || !steam_is_cloud_enabled_for_account()) {\n        show_debug_message(\"Steam Cloud is disabled. Saving to local disk instead.\");\n        buffer_save(_src_buffer, _filename);\n        return false;\n    }\n\n    var _size = buffer_get_size(_src_buffer);\n    var _quota = steam_get_quota_free();\n    if (_quota < _size) {\n        show_debug_message(\"Steam Cloud quota exceeded!\");\n        return false;\n    }\n\n    // Write binary buffer to remote Steam storage\n    var _success = steam_file_write_buffer(_filename, _src_buffer, _size);\n    show_debug_message(\"Steam Cloud write status: \" + string(_success));\n    return _success;\n}"
    }
  ]
}

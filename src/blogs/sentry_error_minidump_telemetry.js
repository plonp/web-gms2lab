export default {
  "slug": "sentry-error-minidump-telemetry",
  "title": "Transmitting Structured Minidumps to Sentry via HTTP REST API",
  "description": "Report game crashes and unhandled exceptions to Sentry.io with stack traces, hardware tags, and memory logs using GML.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "sentry",
    "telemetry",
    "crash-reporter",
    "rest-api",
    "http"
  ],
  "author": "GMS2Lab Team",
  "overview": "Sentry processes real-time crash reports via the /api/<project_id>/envelope/ endpoint. Formatting GameMaker runtime errors into Sentry JSON payloads allows tracking release health and regressions.",
  "sections": [
    {
      "id": "sentry-envelope-format",
      "title": "1. Formatting Sentry Crash Payloads",
      "content": "Construct an event payload containing exception messages and release tags.",
      "code": "function sentry_capture_exception(_err_msg, _stacktrace) {\n    var _url = \"https://sentry.io/api/123456/store/\";\n    var _headers = ds_map_create();\n    ds_map_add(_headers, \"Content-Type\", \"application/json\");\n    ds_map_add(_headers, \"X-Sentry-Auth\", \"Sentry sentry_version=7, sentry_key=your_key, sentry_client=gms2lab/1.0\");\n\n    var _payload = {\n        event_id: md5_string_unicode(string(current_time) + _err_msg),\n        timestamp: date_datetime_string(date_current_datetime()),\n        platform: \"other\",\n        level: \"error\",\n        release: GM_version,\n        message: _err_msg,\n        extra: { stacktrace: _stacktrace, os: os_type }\n    };\n\n    http_request(_url, \"POST\", _headers, json_stringify(_payload));\n    ds_map_destroy(_headers);\n}"
    }
  ]
}

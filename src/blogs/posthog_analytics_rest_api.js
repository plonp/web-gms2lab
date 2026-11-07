export default {
  "slug": "posthog-analytics-rest-api",
  "title": "Ingesting Player Funnel Analytics via PostHog REST API",
  "description": "Track player death locations, session lengths, weapon upgrade choices, and churn points via PostHog open-source analytics using raw GML HTTP calls.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "analytics",
    "posthog",
    "telemetry",
    "rest-api",
    "http"
  ],
  "author": "GMS2Lab Team",
  "overview": "Integrating bulky native analytics SDKs into GameMaker is cumbersome and risks platform crashes. PostHog exposes a simple /capture HTTP REST endpoint that accepts standard JSON event batches with zero SDK overhead.",
  "sections": [
    {
      "id": "event-capture-call",
      "title": "1. Sending Custom In-Game Events",
      "content": "Construct an event payload and post it asynchronously to PostHog.",
      "code": "function analytics_track_event(_event_name, _properties) {\n    var _url = \"https://app.posthog.com/capture/\";\n    var _headers = ds_map_create();\n    ds_map_add(_headers, \"Content-Type\", \"application/json\");\n\n    var _payload = {\n        api_key: \"phc_your_project_api_key_here\",\n        event: _event_name,\n        distinct_id: global.player_guid,\n        properties: _properties,\n        timestamp: date_datetime_string(date_current_datetime())\n    };\n\n    var _body = json_stringify(_payload);\n    http_request(_url, \"POST\", _headers, _body);\n    ds_map_destroy(_headers);\n}"
    }
  ]
}

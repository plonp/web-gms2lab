export default {
  "slug": "rest-api-etag-caching",
  "title": "Bandwidth-Saving HTTP Request Caching with ETags and If-None-Match",
  "description": "Save player bandwidth and avoid redundant server roundtrips by caching REST API payloads and verifying ETags with 304 Not Modified responses.",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "http",
    "caching",
    "etag",
    "bandwidth",
    "rest-api"
  ],
  "author": "GMS2Lab Team",
  "overview": "Constantly re-downloading static data like daily shop items or item databases burns mobile data. Supplying an If-None-Match header allows the server to return 304 Not Modified when local cached data remains fresh.",
  "sections": [
    {
      "id": "etag-request-setup",
      "title": "1. Submitting the ETag Header",
      "content": "Store the ETag from previous responses and pass it in subsequent queries.",
      "code": "function fetch_shop_catalog_cached() {\n    var _headers = ds_map_create();\n    if (global.catalog_etag != \"\") {\n        ds_map_add(_headers, \"If-None-Match\", global.catalog_etag);\n    }\n\n    req_shop_id = http_request(\"https://api.yourgame.com/shop\", \"GET\", _headers, \"\");\n    ds_map_destroy(_headers);\n}"
    }
  ]
}

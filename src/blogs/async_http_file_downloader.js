export default {
  "slug": "async-http-file-downloader",
  "title": "Resumable Asynchronous HTTP File Downloader with Progress Callbacks",
  "description": "Download DLC expansion packs, community maps, and runtime patches with precise byte-progress bars using http_get_file().",
  "category": "Networking & Web",
  "categoryColor": "text-gm-orange",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "http",
    "download",
    "async",
    "files",
    "dlc"
  ],
  "author": "GMS2Lab Team",
  "overview": "GameMaker allows streaming remote files directly to disk via http_get_file(). In the Async - HTTP event, status codes report downloaded bytes versus total content length for accurate progress UI.",
  "sections": [
    {
      "id": "download-trigger",
      "title": "1. Triggering the Download",
      "content": "Start the download and record the async ID.",
      "code": "// In obj_patcher Create Event:\ndownload_id = http_get_file(\"https://cdn.yourgame.com/patch_v102.zip\", \"patch.zip\");\nbytes_downloaded = 0;\nbytes_total = 1;\nprogress_ratio = 0.0;"
    },
    {
      "id": "async-progress-listener",
      "title": "2. Tracking Progress in Async - HTTP Event",
      "content": "Read size_downloaded and contentLength from the async_load map.",
      "code": "if (async_load[? \"id\"] == download_id) {\n    var _status = async_load[? \"status\"];\n\n    // _status == 1 means download is in progress\n    if (_status == 1) {\n        bytes_downloaded = async_load[? \"sizeDownloaded\"];\n        bytes_total = async_load[? \"contentLength\"];\n        if (bytes_total > 0) {\n            progress_ratio = bytes_downloaded / bytes_total;\n        }\n    } \n    // _status == 0 means download finished\n    else if (_status == 0) {\n        show_debug_message(\"Download complete! File saved to patch.zip\");\n    }\n}"
    }
  ]
}

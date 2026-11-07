export default {
  "slug": "automated-screenshot-timelapse-tool",
  "title": "Developer Tooling: Automated In-Game High-Resolution Screenshots & GIF Recording",
  "description": "Build an internal marketing tool to capture uncompressed 4K gameplay screenshots and frame sequences directly to disk with hotkeys.",
  "category": "Platform & Tooling",
  "categoryColor": "text-gm-orange",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "tooling",
    "marketing",
    "screenshots",
    "surfaces",
    "developer-tools"
  ],
  "author": "GMS2Lab Team",
  "overview": "Capturing clean trailer footage and GIF updates requires precise frame-by-frame saving without UI clutter. Rendering game surfaces to disk with timestamped names automates press kit asset generation.",
  "sections": [
    {
      "id": "timelapse-capture-code",
      "title": "1. Surface Saving with Timestamp Formatting",
      "content": "Save raw application surfaces without compression artifacts.",
      "code": "function capture_marketing_screenshot() {\n    var _filename = \"capture_\" + string(current_year) + \"_\" + string(current_month) + \"_\" + string(current_day) + \"_\" + string(current_time) + \".png\";\n    surface_save(application_surface, _filename);\n    show_debug_message(\"Saved high-res capture: \" + _filename);\n}"
    }
  ]
}

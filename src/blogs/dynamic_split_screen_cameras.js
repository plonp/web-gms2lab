export default {
  "slug": "dynamic-split-screen-cameras",
  "title": "Seamless Dynamic Split-Screen Camera System for 2-Player Co-Op",
  "description": "Merge cameras into a single shared view when players are close, and seamlessly slice into vertical/horizontal split viewports when they diverge.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "camera",
    "split-screen",
    "co-op",
    "viewports",
    "multiplayer"
  ],
  "author": "GMS2Lab Team",
  "overview": "Dynamic split-screen keeps both co-op players oriented without forcing them onto the same screen or locking them into permanent tiny half-windows.",
  "sections": [
    {
      "id": "camera-viewport-slicing",
      "title": "1. Distance-Based Viewport Transition",
      "content": "Switch between 1 camera and 2 viewports based on distance thresholds.",
      "code": "function update_dynamic_splitscreen(_p1, _p2, _split_threshold) {\n    var _dist = point_distance(_p1.x, _p1.y, _p2.x, _p2.y);\n    if (_dist > _split_threshold) {\n        // Enable split viewports\n        view_set_visible(1, true);\n        camera_set_view_size(view_camera[0], 960, 1080);\n        camera_set_view_size(view_camera[1], 960, 1080);\n    } else {\n        // Merge into shared view\n        view_set_visible(1, false);\n        camera_set_view_size(view_camera[0], 1920, 1080);\n    }\n}"
    }
  ]
}

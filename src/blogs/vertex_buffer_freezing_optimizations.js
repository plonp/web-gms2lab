export default {
  "slug": "vertex-buffer-freezing-optimizations",
  "title": "Static Geometry Optimization: Pre-Freezing World Meshes via vertex_freeze()",
  "description": "Lock static level geometry, tilemaps, and collision meshes into read-only GPU VRAM buffers using vertex_freeze() for maximum draw throughput.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "vertex-buffers",
    "optimization",
    "gpu",
    "vram",
    "rendering"
  ],
  "author": "GMS2Lab Team",
  "overview": "When a vertex buffer is left unfrozen, GameMaker re-verifies buffer bounds and maintains CPU memory copies. Calling vertex_freeze() moves the buffer directly to static graphics hardware memory, dropping CPU overhead to near-zero.",
  "sections": [
    {
      "id": "freezing-static-mesh",
      "title": "1. Building and Freezing Level Meshes",
      "content": "Construct static level tiles once and freeze the buffer permanently.",
      "code": "// In obj_level_mesh Create Event:\nlevel_vbuffer = vertex_create_buffer();\nvertex_begin(level_vbuffer, global.world_format);\n\n// ... push all level geometry quads ...\n\nvertex_end(level_vbuffer);\n\n// Lock buffer into high-speed GPU memory\nvertex_freeze(level_vbuffer);"
    }
  ]
}

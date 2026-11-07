export default {
  "slug": "stencil-clipping-alpha-mask-shader",
  "title": "UI & Minimap Stencil Clipping using Alpha Mask Shaders",
  "description": "Clip scrollable UI panels, inventory windows, and circular minimaps using GPU alpha masking without expensive surface swapping.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "6 min read",
  "date": "April 2025",
  "tags": [
    "ui",
    "clipping",
    "stencil",
    "shaders",
    "minimap"
  ],
  "author": "GMS2Lab Team",
  "overview": "Standard GameMaker lacks native stencil buffer control. An alpha mask shader compares the world or UI position against a bounding box or mask sprite to discard pixels outside the viewport.",
  "sections": [
    {
      "id": "box-clipping-shader",
      "title": "1. Bounding Box Scissor Shader in GLSL",
      "content": "Discard fragments rendered outside the panel screen bounds.",
      "code": "// shd_clip_box.fsh\nvarying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nuniform vec4 u_clip_rect; // x1, y1, x2, y2 in GUI window coordinates\n\nvoid main() {\n    if (gl_FragCoord.x < u_clip_rect.x || gl_FragCoord.x > u_clip_rect.z ||\n        gl_FragCoord.y < u_clip_rect.y || gl_FragCoord.y > u_clip_rect.w) {\n        discard;\n    }\n\n    gl_FragColor = texture2D(gm_BaseTexture, v_vTexcoord) * v_vColour;\n}"
    }
  ]
}

export default {
  "slug": "radial-blur-speed-lines-shader",
  "title": "Screen-Space Radial Blur & Motion Streak Shader in GLSL ES",
  "description": "Simulate high-velocity dashing, boost pads, and anime-style speed lines using multi-sample radial motion blur on the GPU.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "6 min read",
  "date": "April 2025",
  "tags": [
    "shaders",
    "blur",
    "motion",
    "vfx",
    "glsl"
  ],
  "author": "GMS2Lab Team",
  "overview": "Radial blur samples the application surface repeatedly along vectors radiating from the player or screen focal center, creating high-speed rush effects.",
  "sections": [
    {
      "id": "radial-blur-fragment",
      "title": "1. Multi-Sample Radial Blur Shader",
      "content": "Sample 8 texture samples inward toward the focal center.",
      "code": "// shd_radial_blur.fsh\nvarying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nuniform vec2 u_focus_point; // Normalized screen position (e.g. 0.5, 0.5)\nuniform float u_blur_decay; // e.g. 0.08\n\nvoid main() {\n    vec2 dir = u_focus_point - v_vTexcoord;\n    vec4 sum = vec4(0.0);\n\n    for (int i = 0; i < 8; i++) {\n        float scale = 1.0 - u_blur_decay * (float(i) / 7.0);\n        sum += texture2D(gm_BaseTexture, u_focus_point - dir * scale);\n    }\n\n    gl_FragColor = (sum / 8.0) * v_vColour;\n}"
    }
  ]
}

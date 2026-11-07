export default {
  "slug": "chromatic-aberration-radial-distortion",
  "title": "Screen-Space Chromatic Aberration & Lens Distortion Shader",
  "description": "Simulate high-impact shockwaves and cinematic camera lenses by splitting red, green, and blue color channels across screen-space radial vectors.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "6 min read",
  "date": "April 2025",
  "tags": [
    "shaders",
    "chromatic-aberration",
    "vfx",
    "post-processing"
  ],
  "author": "GMS2Lab Team",
  "overview": "Chromatic aberration occurs in physical camera lenses when color wavelengths fail to focus at the same focal point. In games, applying radial channel offsets during explosions, critical strikes, or parries creates intense visceral feedback without expensive particle loads.",
  "sections": [
    {
      "id": "aberration-fragment",
      "title": "1. Radial Aberration Fragment Shader",
      "content": "The shader displaces the red and blue color samples along the vector pointing from the screen center.",
      "code": "// shd_chromatic_aberration.fsh\nvarying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nuniform float u_offset_intensity; // e.g. 0.015\n\nvoid main() {\n    vec2 dir = v_vTexcoord - 0.5;\n    float dist = length(dir);\n    vec2 offset = dir * dist * u_offset_intensity;\n\n    // Displace channels radially\n    float r = texture2D(gm_BaseTexture, v_vTexcoord - offset).r;\n    float g = texture2D(gm_BaseTexture, v_vTexcoord).g;\n    float b = texture2D(gm_BaseTexture, v_vTexcoord + offset).b;\n    float a = texture2D(gm_BaseTexture, v_vTexcoord).a;\n\n    gl_FragColor = vec4(r, g, b, a) * v_vColour;\n}"
    },
    {
      "id": "decay-and-trigger",
      "title": "2. Explosive Impact Trigger in GML",
      "content": "Trigger high intensity on hit and decay smoothly in the controller step event.",
      "code": "// In obj_post_process Create Event:\naberration_intensity = 0.0;\n\nfunction trigger_impact(_strength) {\n    aberration_intensity = max(aberration_intensity, _strength);\n}\n\n// In obj_post_process Step Event:\nif (aberration_intensity > 0.0001) {\n    aberration_intensity = lerp(aberration_intensity, 0, 0.15);\n}\n\n// In obj_post_process Draw GUI Event:\nif (aberration_intensity > 0.001) {\n    shader_set(shd_chromatic_aberration);\n    shader_set_uniform_f(shader_get_uniform(shd_chromatic_aberration, \"u_offset_intensity\"), aberration_intensity);\n    draw_surface_stretched(application_surface, 0, 0, display_get_gui_width(), display_get_gui_height());\n    shader_reset();\n}"
    }
  ]
}

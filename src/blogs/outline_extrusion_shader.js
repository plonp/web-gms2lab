export default {
  "slug": "outline-extrusion-shader",
  "title": "GPU Sprite Outlines via 4-Tap & 8-Tap Alpha Boundary Sampling",
  "description": "Highlight selected targets and draw crisp outline strokes around animated sprites on the GPU without manual art redraws.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "6 min read",
  "date": "April 2025",
  "tags": [
    "shaders",
    "outline",
    "ui",
    "sprite",
    "glsl"
  ],
  "author": "GMS2Lab Team",
  "overview": "Drawing outlines by rendering 4 or 8 offset copies of a sprite wastes GPU fillrate and multiplies draw batches. An outline fragment shader samples neighboring alpha values of the current pixel in a single pass; if the current pixel is transparent but any neighbor is opaque, it renders an outline pixel.",
  "sections": [
    {
      "id": "outline-fragment",
      "title": "1. 8-Tap Outline Fragment Shader",
      "content": "Here is the single-pass 8-tap GLSL ES shader computing outer strokes.",
      "code": "// shd_sprite_outline.fsh\nvarying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nuniform vec2 u_texel_size; // 1.0 / texture_width, 1.0 / texture_height\nuniform vec4 u_outline_color;\nuniform float u_thickness; // Thickness in pixels\n\nvoid main() {\n    vec4 current_color = texture2D(gm_BaseTexture, v_vTexcoord);\n\n    if (current_color.a > 0.1) {\n        gl_FragColor = current_color * v_vColour;\n        return;\n    }\n\n    vec2 offset = u_texel_size * u_thickness;\n    float max_alpha = 0.0;\n\n    // Sample 8 cardinal and diagonal directions\n    max_alpha = max(max_alpha, texture2D(gm_BaseTexture, v_vTexcoord + vec2(-offset.x, 0.0)).a);\n    max_alpha = max(max_alpha, texture2D(gm_BaseTexture, v_vTexcoord + vec2( offset.x, 0.0)).a);\n    max_alpha = max(max_alpha, texture2D(gm_BaseTexture, v_vTexcoord + vec2(0.0, -offset.y)).a);\n    max_alpha = max(max_alpha, texture2D(gm_BaseTexture, v_vTexcoord + vec2(0.0,  offset.y)).a);\n    max_alpha = max(max_alpha, texture2D(gm_BaseTexture, v_vTexcoord + vec2(-offset.x, -offset.y)).a);\n    max_alpha = max(max_alpha, texture2D(gm_BaseTexture, v_vTexcoord + vec2( offset.x, -offset.y)).a);\n    max_alpha = max(max_alpha, texture2D(gm_BaseTexture, v_vTexcoord + vec2(-offset.x,  offset.y)).a);\n    max_alpha = max(max_alpha, texture2D(gm_BaseTexture, v_vTexcoord + vec2( offset.x,  offset.y)).a);\n\n    if (max_alpha > 0.1) {\n        gl_FragColor = u_outline_color;\n    } else {\n        gl_FragColor = vec4(0.0);\n    }\n}"
    },
    {
      "id": "outline-gml",
      "title": "2. Setting Texel Dimensions in GML",
      "content": "Pass the sprite texture texel size to ensure outlines maintain exact 1px or 2px boundaries regardless of sprite scaling.",
      "code": "// In obj_interactable Draw Event:\nif (is_hovered) {\n    shader_set(shd_sprite_outline);\n    var _tex = sprite_get_texture(sprite_index, image_index);\n    var _u_texel = shader_get_uniform(shd_sprite_outline, \"u_texel_size\");\n    var _u_col   = shader_get_uniform(shd_sprite_outline, \"u_outline_color\");\n    var _u_thick = shader_get_uniform(shd_sprite_outline, \"u_thickness\");\n\n    shader_set_uniform_f(_u_texel, texture_get_texel_width(_tex), texture_get_texel_height(_tex));\n    shader_set_uniform_f(_u_col, 1.0, 1.0, 0.2, 1.0); // Bright gold outline\n    shader_set_uniform_f(_u_thick, 1.5);\n\n    draw_self();\n    shader_reset();\n} else {\n    draw_self();\n}"
    }
  ]
}

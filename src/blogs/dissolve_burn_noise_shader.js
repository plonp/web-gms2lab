export default {
  "slug": "dissolve-burn-noise-shader",
  "title": "Sprite Dissolve & Teleport Burn Shader via Perlin Noise Textures",
  "description": "Burn away enemies or teleport characters with dynamic noise thresholding, glowing ember edges, and HDR color boosts.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "6 min read",
  "date": "April 2025",
  "tags": [
    "shaders",
    "dissolve",
    "vfx",
    "glsl",
    "noise"
  ],
  "author": "GMS2Lab Team",
  "overview": "Dissolve shaders create a disintegration or spawn effect by comparing the pixel luminance of a grayscale noise texture against a progress threshold. Pixels below the threshold are discarded, while pixels near the boundary are replaced with a glowing combustion rim.",
  "sections": [
    {
      "id": "dissolve-fragment",
      "title": "1. The Dissolve Fragment Shader",
      "content": "The shader takes a dissolve float parameter between 0.0 (fully visible) and 1.0 (fully dissolved), plus an edge width and ember color.",
      "code": "// shd_dissolve_burn.fsh\nvarying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nuniform sampler2D u_noise_texture;\nuniform float u_dissolve_amount; // 0.0 = visible, 1.0 = dissolved\nuniform float u_edge_width;      // e.g. 0.05\nuniform vec3 u_burn_color;       // e.g. vec3(1.0, 0.35, 0.0)\n\nvoid main() {\n    vec4 base_color = texture2D(gm_BaseTexture, v_vTexcoord);\n    if (base_color.a <= 0.01) {\n        gl_FragColor = vec4(0.0);\n        return;\n    }\n\n    float noise_val = texture2D(u_noise_texture, v_vTexcoord).r;\n\n    // Discard pixels completely dissolved\n    if (noise_val < u_dissolve_amount) {\n        discard;\n    }\n\n    // Glowing combustion rim\n    if (noise_val < u_dissolve_amount + u_edge_width) {\n        gl_FragColor = vec4(u_burn_color * 1.5, base_color.a);\n    } else {\n        gl_FragColor = base_color * v_vColour;\n    }\n}"
    },
    {
      "id": "gml-integration",
      "title": "2. Controlling Dissolve State in GML",
      "content": "Drive the dissolve variable when an enemy dies or when a character teleports.",
      "code": "// In obj_enemy Create Event:\ndissolve_progress = 0.0;\nis_dying = false;\n\n// In obj_enemy Step Event:\nif (is_dying) {\n    dissolve_progress += 0.015;\n    if (dissolve_progress >= 1.0) instance_destroy();\n}\n\n// In obj_enemy Draw Event:\nif (is_dying) {\n    shader_set(shd_dissolve_burn);\n    var _u_amount = shader_get_uniform(shd_dissolve_burn, \"u_dissolve_amount\");\n    var _u_edge   = shader_get_uniform(shd_dissolve_burn, \"u_edge_width\");\n    var _u_col    = shader_get_uniform(shd_dissolve_burn, \"u_burn_color\");\n    var _u_noise  = shader_get_sampler_index(shd_dissolve_burn, \"u_noise_texture\");\n\n    shader_set_uniform_f(_u_amount, dissolve_progress);\n    shader_set_uniform_f(_u_edge, 0.06);\n    shader_set_uniform_f(_u_col, 1.0, 0.3, 0.05); // Fiery orange\n    texture_set_stage(_u_noise, sprite_get_texture(spr_perlin_noise, 0));\n\n    draw_self();\n    shader_reset();\n} else {\n    draw_self();\n}"
    }
  ]
}

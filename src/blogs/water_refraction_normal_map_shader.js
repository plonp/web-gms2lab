export default {
  "slug": "water-refraction-normal-map-shader",
  "title": "2D Water Distortion with Normal Maps & Dual-Texture Scrolling",
  "description": "Create fluid 2D water surfaces by sampling scrolling normal maps to refract underwater scenery with chromatic dispersion and specular highlights.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "shaders",
    "water",
    "normal-maps",
    "refraction",
    "glsl"
  ],
  "author": "GMS2Lab Team",
  "overview": "Realistic 2D water requires two layers: an underwater scene rendered to an offscreen surface, and a water surface mesh running a refraction shader. By scrolling two tangent-space normal maps in opposing directions and perturbing the underwater UV coordinates, water looks organic and continuous without procedural vertex simulation.",
  "sections": [
    {
      "id": "normal-map-sampling",
      "title": "1. Dual Normal Map Blending in GLSL",
      "content": "Two normal maps scrolling at differing speeds and angles prevent the repetition pattern from being noticed by the human eye.",
      "code": "// In shd_water_refraction.fsh\nvarying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nuniform sampler2D u_underwater_texture;\nuniform sampler2D u_normal_map;\nuniform vec2 u_time; // Time uniforms for dual scroll\nuniform float u_refraction_strength; // e.g. 0.03\n\nvoid main() {\n    // Scroll two layers of normal maps\n    vec2 uv_norm1 = v_vTexcoord * 3.0 + vec2(u_time.x * 0.05, u_time.x * 0.02);\n    vec2 uv_norm2 = v_vTexcoord * 2.0 - vec2(u_time.x * 0.03, u_time.x * 0.04);\n\n    vec3 n1 = texture2D(u_normal_map, uv_norm1).rgb * 2.0 - 1.0;\n    vec3 n2 = texture2D(u_normal_map, uv_norm2).rgb * 2.0 - 1.0;\n    vec2 combined_normal = normalize(n1 + n2).xy;\n\n    // Displace background refraction\n    vec2 displaced_uv = v_vTexcoord + combined_normal * u_refraction_strength;\n    vec4 underwater_col = texture2D(u_underwater_texture, displaced_uv);\n\n    // Tint water (e.g. turquoise)\n    vec4 water_tint = vec4(0.1, 0.4, 0.6, 1.0);\n    gl_FragColor = mix(underwater_col, water_tint, 0.35) * v_vColour;\n}"
    },
    {
      "id": "gml-surface-pipeline",
      "title": "2. Surface Setup & Render Pass",
      "content": "Isolate underwater entities onto an offscreen surface before drawing the water plane.",
      "code": "// In obj_water_controller Draw Event:\nif (!surface_exists(underwater_surface)) {\n    underwater_surface = surface_create(camera_get_view_width(view_camera[0]), camera_get_view_height(view_camera[0]));\n}\n\n// Draw underwater layer\nsurface_set_target(underwater_surface);\ndraw_clear_alpha(c_black, 0);\nwith (obj_underwater_prop) draw_self();\nwith (obj_sea_floor) draw_self();\nsurface_reset_target();\n\n// Draw refraction\nshader_set(shd_water_refraction);\ntexture_set_stage(shader_get_sampler_index(shd_water_refraction, \"u_underwater_texture\"), surface_get_texture(underwater_surface));\ntexture_set_stage(shader_get_sampler_index(shd_water_refraction, \"u_normal_map\"), sprite_get_texture(spr_water_normal, 0));\nshader_set_uniform_f(shader_get_uniform(shd_water_refraction, \"u_time\"), current_time * 0.001);\nshader_set_uniform_f(shader_get_uniform(shd_water_refraction, \"u_refraction_strength\"), 0.025);\n\ndraw_sprite_stretched(spr_water_body, 0, x, y, image_xscale * sprite_width, image_yscale * sprite_height);\nshader_reset();"
    }
  ]
}

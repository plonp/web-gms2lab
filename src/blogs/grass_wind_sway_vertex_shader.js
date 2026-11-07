export default {
  "slug": "grass-wind-sway-vertex-shader",
  "title": "GPU Foliage Wind Sway via Custom Vertex Shader Offsets",
  "description": "Animate thousands of grass and foliage sprites with fluid sinusoidal wind motion entirely on the GPU without CPU position math.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "vertex-shaders",
    "grass",
    "wind",
    "foliage",
    "optimization"
  ],
  "author": "GMS2Lab Team",
  "overview": "Iterating over thousands of grass instances in Step events to calculate sine-wave rotations is slow. By applying wind displacement in the vertex shader, the GPU displaces only the top vertices of each quad while anchoring bottom vertices to the ground.",
  "sections": [
    {
      "id": "vertex-shader-sway",
      "title": "1. The Wind Vertex Shader (shd_wind_sway.vsh)",
      "content": "Identify top vertices using texture UV coordinates (v_vTexcoord.y near 0.0) and offset their horizontal position by a sine wave based on world X and time.",
      "code": "// shd_wind_sway.vsh\nattribute vec3 in_Position;\nattribute vec4 in_Colour;\nattribute vec2 in_TextureCoord;\n\nvarying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nuniform float u_time;\nuniform float u_wind_speed;\nuniform float u_wind_strength;\n\nvoid main() {\n    vec4 object_space_pos = vec4(in_Position.x, in_Position.y, in_Position.z, 1.0);\n\n    // Height weight: 1.0 at top of sprite, 0.0 at base\n    float height_factor = 1.0 - in_TextureCoord.y;\n\n    // Displace X coordinate based on sine wave\n    float sway = sin(u_time * u_wind_speed + in_Position.x * 0.02) * u_wind_strength * height_factor;\n    object_space_pos.x += sway;\n\n    gl_Position = gm_Matrices[MATRIX_WORLD_VIEW_PROJECTION] * object_space_pos;\n    v_vColour = in_Colour;\n    v_vTexcoord = in_TextureCoord;\n}"
    },
    {
      "id": "batch-drawing-grass",
      "title": "2. Drawing Foliage Batches in GML",
      "content": "Bind the wind shader once and draw all foliage instances consecutively to maximize GPU batching efficiency.",
      "code": "// In obj_grass_renderer Draw Event:\nshader_set(shd_wind_sway);\nshader_set_uniform_f(shader_get_uniform(shd_wind_sway, \"u_time\"), current_time * 0.001);\nshader_set_uniform_f(shader_get_uniform(shd_wind_sway, \"u_wind_speed\"), 3.0);\nshader_set_uniform_f(shader_get_uniform(shd_wind_sway, \"u_wind_strength\"), 6.0); // 6px maximum sway\n\nwith (obj_grass) {\n    draw_self();\n}\n\nshader_reset();"
    }
  ]
}

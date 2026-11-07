export default {
  "slug": "raymarched-2d-dynamic-shadows",
  "title": "2D Dynamic Shadow Casting with 1D Shadow Map Surfaces",
  "description": "Implement GPU-accelerated 2D dynamic shadows in GameMaker using 1D polar shadow maps and 2-pass raymarching shaders.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "9 min read",
  "date": "April 2025",
  "tags": [
    "lighting",
    "shadows",
    "raymarching",
    "shaders",
    "gpu"
  ],
  "author": "GMS2Lab Team",
  "overview": "Traditional 2D shadow casting builds shadow geometry from polygon edges on the CPU, creating high CPU overhead. The 1D shadow mapping technique draws occluders to a square surface around each light, converts that square to a 1px-tall polar distance map in pass 1, and renders smooth penumbra shadows in pass 2 using a 1D raymarch.",
  "sections": [
    {
      "id": "polar-reduction-pass",
      "title": "1. Polar Coordinates Reduction Shader",
      "content": "The first shader reduces the 2D occluder box into a 1D radial distance buffer, storing the nearest occluder distance for every angle (0 to 360 degrees).",
      "code": "// shd_polar_reduction.fsh\nvarying vec2 v_vTexcoord;\nuniform float u_resolution; // e.g. 512.0\n\nconst float PI = 3.14159265359;\n\nvoid main() {\n    float angle = v_vTexcoord.x * 2.0 * PI;\n    vec2 ray_dir = vec2(cos(angle), sin(angle));\n\n    float min_dist = 1.0;\n    for (float step = 0.0; step < 1.0; step += 1.0 / 128.0) {\n        vec2 sample_pos = 0.5 + ray_dir * (step * 0.5);\n        float alpha = texture2D(gm_BaseTexture, sample_pos).a;\n        if (alpha > 0.5) {\n            min_dist = step;\n            break;\n        }\n    }\n\n    gl_FragColor = vec4(min_dist, min_dist, min_dist, 1.0);\n}"
    },
    {
      "id": "shadow-lighting-pass",
      "title": "2. Shadow Rendering Pass with Soft Penumbra",
      "content": "In pass 2, the lighting shader samples the 1D shadow map. If the current pixel distance exceeds the stored occluder distance, the pixel lies in shadow.",
      "code": "// shd_polar_shadow_render.fsh\nvarying vec2 v_vTexcoord;\nuniform sampler2D u_shadow_map; // The 1D polar texture\nconst float PI = 3.14159265359;\n\nvoid main() {\n    vec2 delta = v_vTexcoord - 0.5;\n    float dist = length(delta) * 2.0; // Distance from center [0.0 - 1.0]\n    float angle = atan(delta.y, delta.x);\n    if (angle < 0.0) angle += 2.0 * PI;\n\n    float shadow_u = angle / (2.0 * PI);\n    float occluder_dist = texture2D(u_shadow_map, vec2(shadow_u, 0.5)).r;\n\n    // Attenuation + Shadow test\n    float shadow = step(dist, occluder_dist);\n    float attenuation = clamp(1.0 - dist, 0.0, 1.0);\n\n    gl_FragColor = vec4(vec3(shadow * attenuation), 1.0);\n}"
    }
  ]
}

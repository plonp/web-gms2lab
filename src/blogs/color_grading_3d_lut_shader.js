export default {
  "slug": "color-grading-3d-lut-shader",
  "title": "Cinematic Color Grading via 3D/2D Flattened LUT Textures",
  "description": "Implement cinematic post-processing color grading in GameMaker using flattened 2D Look-Up Table (LUT) textures for instantaneous mood shifts.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "color-grading",
    "lut",
    "post-processing",
    "shaders",
    "graphics"
  ],
  "author": "GMS2Lab Team",
  "overview": "Color grading allows art directors to establish mood (e.g., cold blues for dungeons, warm ambers for sunsets) by remapping screen colors through a 3D color cube flattened into a standard 256×16 or 512×512 PNG.",
  "sections": [
    {
      "id": "lut-sampling-fragment",
      "title": "1. Sampling a 16x16x16 LUT Strip",
      "content": "The shader converts incoming Red and Green values to intra-cell UVs, and Blue to slice index lookups across the horizontal strip.",
      "code": "// shd_color_grade.fsh\nvarying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nuniform sampler2D u_lut_texture;\n\nvoid main() {\n    vec4 base_color = texture2D(gm_BaseTexture, v_vTexcoord);\n    float blue_val = base_color.b * 15.0; // 16 slices (0-15)\n\n    vec2 quad1;\n    quad1.y = floor(floor(blue_val) / 4.0);\n    quad1.x = floor(blue_val) - (quad1.y * 4.0);\n\n    vec2 quad2;\n    quad2.y = floor(ceil(blue_val) / 4.0);\n    quad2.x = ceil(blue_val) - (quad2.y * 4.0);\n\n    vec2 texPos1 = (quad1 * 16.0 + 0.5 + base_color.rg * 15.0) / 64.0;\n    vec2 texPos2 = (quad2 * 16.0 + 0.5 + base_color.rg * 15.0) / 64.0;\n\n    vec4 graded1 = texture2D(u_lut_texture, texPos1);\n    vec4 graded2 = texture2D(u_lut_texture, texPos2);\n\n    gl_FragColor = mix(graded1, graded2, fract(blue_val)) * v_vColour;\n}"
    }
  ]
}

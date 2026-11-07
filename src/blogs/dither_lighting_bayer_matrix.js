export default {
  "slug": "dither-lighting-bayer-matrix",
  "title": "Retro 1-Bit & 4-Bit Ordered Dithering via Bayer Matrix Shader",
  "description": "Render authentic PS1 and Obra Dinn style ordered dithering by comparing lighting luminance against a 4x4 or 8x8 Bayer matrix.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "shaders",
    "dithering",
    "retro",
    "bayer-matrix",
    "lighting"
  ],
  "author": "GMS2Lab Team",
  "overview": "Ordered dithering maps smooth lighting gradients into discrete cross-hatch patterns using matrix thresholds, delivering an authentic retro aesthetic while reducing banding.",
  "sections": [
    {
      "id": "bayer-matrix-shader",
      "title": "1. 4x4 Bayer Matrix Fragment Shader",
      "content": "Here is the 4x4 matrix implementation thresholding light levels.",
      "code": "// shd_bayer_dither.fsh\nvarying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nconst mat4 bayer4 = mat4(\n     0.0/16.0, 12.0/16.0,  3.0/16.0, 15.0/16.0,\n     8.0/16.0,  4.0/16.0, 11.0/16.0,  7.0/16.0,\n     2.0/16.0, 14.0/16.0,  1.0/16.0, 13.0/16.0,\n    10.0/16.0,  6.0/16.0,  9.0/16.0,  5.0/16.0\n);\n\nvoid main() {\n    vec4 col = texture2D(gm_BaseTexture, v_vTexcoord);\n    float luma = dot(col.rgb, vec3(0.299, 0.587, 0.114));\n\n    int x = int(mod(gl_FragCoord.x, 4.0));\n    int y = int(mod(gl_FragCoord.y, 4.0));\n    float threshold = bayer4[x][y];\n\n    float dithered = step(threshold, luma);\n    gl_FragColor = vec4(vec3(dithered), col.a) * v_vColour;\n}"
    }
  ]
}

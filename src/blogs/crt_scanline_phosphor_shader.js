export default {
  "slug": "crt-scanline-phosphor-shader",
  "title": "CRT Scanlines, Phosphor Grille & Vignette Shader in GLSL ES",
  "description": "Implement an authentic retro CRT display shader featuring curved barrel distortion, horizontal scanlines, RGB phosphor triad masks, and vignette edge falloff.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "shaders",
    "glsl",
    "crt",
    "retro",
    "post-processing"
  ],
  "author": "GMS2Lab Team",
  "overview": "Pixel art games often look sterile on modern 4K LCD monitors. A properly tuned CRT post-processing shader emulates the physical characteristics of cathode ray tubes—barrel curvature, scanlines, and RGB phosphor grids—in a single fullscreen draw call.",
  "sections": [
    {
      "id": "barrel-distortion-math",
      "title": "1. Barrel Curvature Coordinates",
      "content": "To simulate the curved glass of a CRT television, bend the normalized UV coordinates radially outward from the center (0.5, 0.5) using quadratic distortion.",
      "code": "// Inside GLSL ES fragment shader:\nvec2 curve_uv(vec2 uv, float bend) {\n    uv = (uv - 0.5) * 2.0;\n    uv *= 1.0 + pow((abs(uv.yx) / bend), vec2(2.0));\n    uv = (uv / 2.0) + 0.5;\n    return uv;\n}"
    },
    {
      "id": "scanline-and-phosphor-fragment",
      "title": "2. Complete CRT Fragment Shader (shd_crt.fsh)",
      "content": "Here is the complete fragment shader calculating barrel distortion, sinusoidal scanlines, and RGB subpixel vertical stripes.",
      "code": "varying vec2 v_vTexcoord;\nvarying vec4 v_vColour;\n\nuniform vec2 u_resolution;\nuniform float u_curvature; // e.g. 3.5\nuniform float u_scanline_intensity; // e.g. 0.25\n\nvec2 curve(vec2 uv) {\n    vec2 delta = uv - 0.5;\n    float delta2 = dot(delta, delta);\n    return 0.5 + delta * (1.0 + delta2 * u_curvature);\n}\n\nvoid main() {\n    vec2 uv = curve(v_vTexcoord);\n\n    // Black border outside curved tube\n    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        return;\n    }\n\n    vec4 color = texture2D(gm_BaseTexture, uv);\n\n    // Horizontal scanlines\n    float scanline = sin(uv.y * u_resolution.y * 3.14159) * 0.5 + 0.5;\n    color.rgb -= scanline * u_scanline_intensity;\n\n    // RGB Phosphor mask (every 3 horizontal pixels)\n    int pixel_x = int(mod(uv.x * u_resolution.x, 3.0));\n    vec3 mask = vec3(0.85);\n    if (pixel_x == 0) mask = vec3(1.1, 0.85, 0.85); // Red\n    else if (pixel_x == 1) mask = vec3(0.85, 1.1, 0.85); // Green\n    else mask = vec3(0.85, 0.85, 1.1); // Blue\n\n    // Vignette edge darkening\n    float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);\n    vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);\n\n    gl_FragColor = vec4(color.rgb * mask * vignette, color.a) * v_vColour;\n}"
    },
    {
      "id": "gml-draw-gui-setup",
      "title": "3. Invoking the Shader in Draw GUI",
      "content": "Apply the shader over the finished application surface in the Draw GUI or Post-Draw event.",
      "code": "// In obj_crt_post_process Draw GUI Event:\nshader_set(shd_crt);\n\nvar _u_res = shader_get_uniform(shd_crt, \"u_resolution\");\nvar _u_curv = shader_get_uniform(shd_crt, \"u_curvature\");\nvar _u_scan = shader_get_uniform(shd_crt, \"u_scanline_intensity\");\n\nshader_set_uniform_f(_u_res, window_get_width(), window_get_height());\nshader_set_uniform_f(_u_curv, 0.08);\nshader_set_uniform_f(_u_scan, 0.20);\n\ndraw_surface_stretched(application_surface, 0, 0, display_get_gui_width(), display_get_gui_height());\nshader_reset();"
    }
  ]
}

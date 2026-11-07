export default {
  slug: 'dynamic-surface-blur-downsampling',
  title: 'Fast Dual-Kawase Bloom & Surface Downsampling in GameMaker',
  description: 'Achieve high-performance fullscreen glow and depth-of-field without destroying GPU fillrate. Implement ping-pong downsampling and upsampling surfaces in GML.',
  category: 'Shaders & Graphics',
  categoryColor: 'text-gm-green',
  readTime: '8 min read',
  date: 'March 2025',
  tags: ['surfaces', 'bloom', 'blur', 'shaders', 'downsampling', 'optimization'],
  author: 'GMS2Lab Team',
  overview: 'Performing a 15-pixel Gaussian blur on a 1920×1080 surface requires 225 texture lookups per pixel, taking roughly 466 million samples per frame—instantly tanking frame rates on integrated GPUs. The Dual-Kawase blur algorithm bypasses this by progressively downsampling the surface to 1/2, 1/4, and 1/8 resolutions using tiny 4-tap box samples, then upsampling back up with hardware bilinear filtering.',
  sections: [
    {
      id: 'surface-pyramid',
      title: '1. The Surface Downsampling Pyramid',
      content: 'Allocate a progressive array of ping-pong surfaces, each half the size of the previous one. Ensure every surface allocation is guarded by surface_exists() to survive window resizing and Alt-Tabs.',
      code: `// In obj_bloom_controller Create Event:
base_w = 480; // Base render width (quarter resolution of 1080p)
base_h = 270;

// Setup 3 levels of downsampling
levels = 3;
surf_down = array_create(levels, -1);
surf_up   = array_create(levels, -1);

function ensure_surfaces() {
    var _w = base_w;
    var _h = base_h;
    for (var i = 0; i < levels; i++) {
        if (!surface_exists(surf_down[i])) {
            surf_down[i] = surface_create(_w, _h);
        }
        if (!surface_exists(surf_up[i])) {
            surf_up[i] = surface_create(_w, _h);
        }
        _w = max(1, floor(_w * 0.5));
        _h = max(1, floor(_h * 0.5));
    }
}`,
    },
    {
      id: 'downsample-shader',
      title: '2. The 4-Tap Downsample Shader (shd_kawase_down.fsh)',
      content: 'The downsampling pass takes 4 samples offset by half a texel diagonally, taking advantage of GPU texture interpolation.',
      code: `// shd_kawase_down.fsh
varying vec2 v_vTexcoord;
uniform vec2 u_texel_size; // 1.0 / surface_width, 1.0 / surface_height

void main() {
    vec2 half_tex = u_texel_size * 0.5;

    // 4 bilinear tap offsets
    vec4 col = vec4(0.0);
    col += texture2D(gm_BaseTexture, v_vTexcoord + vec2(-half_tex.x, -half_tex.y));
    col += texture2D(gm_BaseTexture, v_vTexcoord + vec2( half_tex.x, -half_tex.y));
    col += texture2D(gm_BaseTexture, v_vTexcoord + vec2(-half_tex.x,  half_tex.y));
    col += texture2D(gm_BaseTexture, v_vTexcoord + vec2( half_tex.x,  half_tex.y));

    gl_FragColor = col * 0.25;
}`,
    },
    {
      id: 'rendering-pass',
      title: '3. Executing the Downsample and Upsample Chain',
      content: 'In the Draw End event, extract emissive light, downsample down the pyramid, upsample back, and blend additively over the game view.',
      code: `// In obj_bloom_controller Draw End:
ensure_surfaces();

// 1. Initial blit into first downsample surface
surface_set_target(surf_down[0]);
draw_surface_stretched(application_surface, 0, 0, surface_get_width(surf_down[0]), surface_get_height(surf_down[0]));
surface_reset_target();

// 2. Downsample chain
shader_set(shd_kawase_down);
var _u_texel = shader_get_uniform(shd_kawase_down, "u_texel_size");

for (var i = 0; i < levels - 1; i++) {
    var _src = surf_down[i];
    var _dst = surf_down[i + 1];

    surface_set_target(_dst);
    shader_set_uniform_f(_u_texel, 1.0 / surface_get_width(_src), 1.0 / surface_get_height(_src));
    draw_surface_stretched(_src, 0, 0, surface_get_width(_dst), surface_get_height(_dst));
    surface_reset_target();
}
shader_reset();

// 3. Upsample and blend back to screen additively
gpu_set_blendmode(bm_add);
draw_surface_stretched_ext(surf_down[levels - 1], 0, 0, window_get_width(), window_get_height(), c_white, 0.6);
gpu_set_blendmode(bm_normal);`,
    },
    {
      id: 'surface-cleanup',
      title: '4. Clean Up Event',
      content: 'Always free allocated surfaces to avoid leaking video memory.',
      code: `// In obj_bloom_controller Clean Up Event:
for (var i = 0; i < levels; i++) {
    if (surface_exists(surf_down[i])) surface_free(surf_down[i]);
    if (surface_exists(surf_up[i]))   surface_free(surf_up[i]);
}`,
    },
  ],
}

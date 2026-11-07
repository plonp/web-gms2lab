export default {
  slug: 'glsl-palette-swapping-lut',
  title: 'GLSL ES Palette Swapping via 1D Texture Look-Up Tables (LUT)',
  description: 'Swap character color palettes dynamically without duplicating sprites or texture pages. Write an efficient GLSL ES fragment shader that maps sprite grayscale indices to a palette LUT texture.',
  category: 'Shaders & Graphics',
  categoryColor: 'text-gm-green',
  readTime: '7 min read',
  date: 'March 2025',
  tags: ['shaders', 'glsl', 'palette-swap', 'graphics', 'textures', 'vram'],
  author: 'GMS2Lab Team',
  overview: 'In fighting games, RPGs, or retro roguelikes, recoloring player outfits and enemy variants often leads to duplicated sprite sheets that bloat texture pages and memory. Using a GLSL ES fragment shader and a 1-pixel-tall palette texture (LUT), you can redraw sprites using index colors and dynamically swap palettes in real-time on the GPU.',
  sections: [
    {
      id: 'sprite-indexing-concept',
      title: '1. Indexing the Base Sprite',
      content: 'Draw your base sprite using stepped grayscale values. For example, shade with 0 (black), 32, 64, 96, 128, etc. In the fragment shader, the red channel of this grayscale sprite acts as an X coordinate to sample color from an external palette strip texture.',
    },
    {
      id: 'glsl-fragment-shader',
      title: '2. The Fragment Shader (shd_palette_swap.fsh)',
      content: 'Write the GLSL ES fragment shader. We sample the base sprite, read its red value, and sample the palette texture at that horizontal coordinate.',
      code: `// shd_palette_swap.fsh
varying vec2 v_vTexcoord;
varying vec4 v_vColour;

uniform sampler2D u_palette_texture;
uniform float u_palette_index; // Vertical row index for current palette
uniform float u_palette_tex_height; // Height of LUT in pixels (e.g., 4.0 palettes)

void main() {
    vec4 base_col = texture2D(gm_BaseTexture, v_vTexcoord);

    // If pixel is transparent, discard or pass through
    if (base_col.a <= 0.01) {
        gl_FragColor = vec4(0.0);
        return;
    }

    // Read index from red channel [0.0 - 1.0]
    float lut_x = base_col.r;

    // Compute Y coordinate centered in the row
    float lut_y = (u_palette_index + 0.5) / u_palette_tex_height;

    // Sample swapped color from palette texture
    vec4 swapped_col = texture2D(u_palette_texture, vec2(lut_x, lut_y));

    // Multiply by vertex color and preserve original alpha
    gl_FragColor = swapped_col * v_vColour * vec4(1.0, 1.0, 1.0, base_col.a);
}`,
    },
    {
      id: 'gml-shader-invocation',
      title: '3. Binding the Palette Texture in GML',
      content: 'In your draw event, bind the palette sprite\'s texture stage and set the palette index uniform.',
      code: `// In obj_player Create Event:
palette_sprite = spr_character_palettes; // A 256x4 sprite where each row is a palette
palette_index = 1; // 0 = default, 1 = alt blue, 2 = shadow, 3 = gold
palette_count = sprite_get_height(palette_sprite);

u_pal_tex   = shader_get_sampler_index(shd_palette_swap, "u_palette_texture");
u_pal_idx   = shader_get_uniform(shd_palette_swap, "u_palette_index");
u_pal_h     = shader_get_uniform(shd_palette_swap, "u_palette_tex_height");

// In obj_player Draw Event:
shader_set(shd_palette_swap);

// Pass uniforms
shader_set_uniform_f(u_pal_idx, palette_index);
shader_set_uniform_f(u_pal_h, palette_count);

// Bind palette texture to sampler stage 1
texture_set_stage(u_pal_tex, sprite_get_texture(palette_sprite, 0));

// Draw standard indexed sprite
draw_self();

shader_reset();`,
      callout: {
        type: 'important',
        title: 'Texture Interpolation Setting',
        text: 'Ensure texture filtering (linear interpolation) is disabled for the palette sprite in GameMaker\'s Texture Group settings, or sample colors will blend unnaturally between adjacent palette columns.',
      },
    },
  ],
}

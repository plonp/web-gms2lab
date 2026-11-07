export default {
  slug: 'custom-vertex-buffers-batching',
  title: 'Custom Vertex Buffers: Rendering 10,000+ Entities in a Single Draw Call',
  description: 'Bypass object instance overhead and draw-call bottlenecks. Learn how to build custom vertex formats, populate vertex buffers each frame, and render massive particle systems or bullet-hell projectiles in a single GPU submission.',
  category: 'Performance & Graphics',
  categoryColor: 'text-gm-green',
  readTime: '7 min read',
  date: 'March 2025',
  tags: ['vertex-buffers', 'optimization', 'performance', 'rendering', 'gpu', 'batching'],
  author: 'GMS2Lab Team',
  overview: 'Spawning thousands of standard GameMaker instances (instance_create_depth) cripples CPU framerates because each instance carries object overhead (variable maps, collision checks, event lookups, matrix transforms). By representing projectiles as lightweight structs and writing their quad coordinates into a single dynamic vertex buffer, you can push over 10,000 active bullets at a rock-solid 60 FPS in a single GPU draw call.',
  sections: [
    {
      id: 'vertex-format-definition',
      title: '1. Defining the Vertex Format',
      content: 'A vertex format dictates the memory layout of every point sent to the GPU shader pipeline. For 2D sprites, we define 3D Position (x, y, depth), Texture UV coordinates, and Color/Alpha.',
      code: `// In obj_bullet_manager Create Event:
// Initialize Vertex Format once globally or on creation
vertex_format_begin();
vertex_format_add_position_3d(); // x, y, z
vertex_format_add_texcoord();    // u, v
vertex_format_add_color();       // r, g, b, a
bullet_format = vertex_format_end();

// Create dynamic vertex buffer
bullet_vbuffer = vertex_create_buffer();

// Get sprite texture page UV bounds
var _sprite = spr_bullet;
var _uvs = sprite_get_uvs(_sprite, 0);
bullet_uv_left   = _uvs[0];
bullet_uv_top    = _uvs[1];
bullet_uv_right  = _uvs[2];
bullet_uv_bottom = _uvs[3];
bullet_texture   = sprite_get_texture(_sprite, 0);`,
      callout: {
        type: 'important',
        title: 'Reuse the Format Pointer',
        text: 'Never call vertex_format_begin() and vertex_format_end() inside Draw or Step loops. Vertex formats allocate native memory on the graphics driver and must only be initialized once.',
      },
    },
    {
      id: 'quad-construction-helper',
      title: '2. Building Quads in Memory',
      content: 'GameMaker renders geometry as triangles. To draw a 2D sprite quad, we push two triangles (6 vertices) with proper counter-clockwise winding order and pre-rotated vertex offsets.',
      code: `/// @function vertex_add_sprite_quad
function vertex_add_sprite_quad(_vbuf, _x, _y, _radius, _angle, _u0, _v0, _u1, _v1, _col, _alpha) {
    var _rad = degtorad(_angle);
    var _cos = cos(_rad) * _radius;
    var _sin = sin(_rad) * _radius;

    // Corner offsets rotated by _angle
    var _x0 = _x + (-_cos + _sin);
    var _y0 = _y + (-_sin - _cos);

    var _x1 = _x + ( _cos + _sin);
    var _y1 = _y + ( _sin - _cos);

    var _x2 = _x + ( _cos - _sin);
    var _y2 = _y + ( _sin + _cos);

    var _x3 = _x + (-_cos - _sin);
    var _y3 = _y + (-_sin + _cos);

    // Triangle 1: Top-Left -> Top-Right -> Bottom-Right (0 -> 1 -> 2)
    vertex_position_3d(_vbuf, _x0, _y0, 0);
    vertex_texcoord(_vbuf, _u0, _v0);
    vertex_color(_vbuf, _col, _alpha);

    vertex_position_3d(_vbuf, _x1, _y1, 0);
    vertex_texcoord(_vbuf, _u1, _v0);
    vertex_color(_vbuf, _col, _alpha);

    vertex_position_3d(_vbuf, _x2, _y2, 0);
    vertex_texcoord(_vbuf, _u2, _v1);
    vertex_color(_vbuf, _col, _alpha);

    // Triangle 2: Top-Left -> Bottom-Right -> Bottom-Left (0 -> 2 -> 3)
    vertex_position_3d(_vbuf, _x0, _y0, 0);
    vertex_texcoord(_vbuf, _u0, _v0);
    vertex_color(_vbuf, _col, _alpha);

    vertex_position_3d(_vbuf, _x2, _y2, 0);
    vertex_texcoord(_vbuf, _u1, _v1);
    vertex_color(_vbuf, _col, _alpha);

    vertex_position_3d(_vbuf, _x3, _y3, 0);
    vertex_texcoord(_vbuf, _u0, _v1);
    vertex_color(_vbuf, _col, _alpha);
}`,
    },
    {
      id: 'step-and-draw-pipeline',
      title: '3. Step Update & Single-Submission Draw Loop',
      content: 'Store bullets as flat structs in an array. In the Step event, update positions and cull out-of-bounds entities. In the Draw event, build the buffer and submit it in a single GPU call.',
      code: `// obj_bullet_manager Step Event:
var _count = array_length(bullets);
for (var i = _count - 1; i >= 0; i--) {
    var _b = bullets[i];
    _b.x += _b.vx;
    _b.y += _b.vy;
    _b.life--;

    // Cull dead bullets
    if (_b.life <= 0 || _b.x < -100 || _b.x > room_width + 100 || _b.y < -100 || _b.y > room_height + 100) {
        array_delete(bullets, i, 1);
    }
}

// obj_bullet_manager Draw Event:
var _active_count = array_length(bullets);
if (_active_count == 0) exit;

// Begin populating dynamic vertex buffer
vertex_begin(bullet_vbuffer, bullet_format);

for (var i = 0; i < _active_count; i++) {
    var _b = bullets[i];
    vertex_add_sprite_quad(
        bullet_vbuffer,
        _b.x, _b.y, _b.radius, _b.angle,
        bullet_uv_left, bullet_uv_top, bullet_uv_right, bullet_uv_bottom,
        c_white, 1.0
    );
}

vertex_end(bullet_vbuffer);

// Submit all geometry in 1 GPU Draw Call
vertex_submit(bullet_vbuffer, pr_trianglelist, bullet_texture);`,
    },
    {
      id: 'cleanup-memory',
      title: '4. Memory Cleanup',
      content: 'Vertex buffers and formats are allocated outside the GML garbage collector. Always release their memory when destroying the manager object or transitioning rooms.',
      code: `// obj_bullet_manager Clean Up Event:
if (bullet_vbuffer != -1) {
    vertex_delete_buffer(bullet_vbuffer);
    bullet_vbuffer = -1;
}

if (bullet_format != -1) {
    vertex_format_delete(bullet_format);
    bullet_format = -1;
}`,
    },
  ],
}

export default {
  "slug": "fog-of-war-surface-mask",
  "title": "Dynamic 2D Fog of War with Smooth Alpha Surface Punching",
  "description": "Build a performant RTS or stealth game Fog of War system using low-resolution alpha surfaces and additive blend modes.",
  "category": "Shaders & Graphics",
  "categoryColor": "text-gm-green",
  "readTime": "7 min read",
  "date": "April 2025",
  "tags": [
    "fog-of-war",
    "surfaces",
    "blend-modes",
    "stealth",
    "rts"
  ],
  "author": "GMS2Lab Team",
  "overview": "Simulating vision through walls and unexplored terrain is easily achieved by drawing darkness over the view and punching transparent circular holes around player units with gpu_set_blendmode(bm_subtract).",
  "sections": [
    {
      "id": "fog-surface-drawing",
      "title": "1. Punching Holes into Dark Surfaces",
      "content": "Clear the fog surface with black, then subtract alpha at unit vision origins.",
      "code": "// In obj_fog_controller Draw Event:\nif (!surface_exists(fog_surface)) {\n    fog_surface = surface_create(camera_get_view_width(view_camera[0]), camera_get_view_height(view_camera[0]));\n}\n\nsurface_set_target(fog_surface);\ndraw_clear_alpha(c_black, 0.95); // Deep fog opacity\n\n// Subtract vision cones and circles\ngpu_set_blendmode(bm_subtract);\n\nvar _cam_x = camera_get_view_x(view_camera[0]);\nvar _cam_y = camera_get_view_y(view_camera[0]);\n\nwith (par_friendly_unit) {\n    draw_sprite_ext(spr_light_cookie, 0, x - _cam_x, y - _cam_y, vision_radius / 128, vision_radius / 128, 0, c_white, 1.0);\n}\n\ngpu_set_blendmode(bm_normal);\nsurface_reset_target();\n\n// Render fog over room\ndraw_surface(fog_surface, _cam_x, _cam_y);"
    }
  ]
}

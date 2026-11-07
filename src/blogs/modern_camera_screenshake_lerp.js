export default {
  slug: 'modern-camera-screenshake-lerp',
  title: 'Modern Camera Controller: Deadzones, Clamping & Smooth Shake',
  description: 'Implement a professional 2D camera system in GameMaker with smooth interpolation (lerp), bounded rooms, lookahead, and decay screenshake.',
  category: 'Graphics & Camera',
  categoryColor: 'text-gm-green',
  readTime: '5 min read',
  date: 'January 2025',
  tags: ['camera', 'viewports', 'screenshake', 'lerp', 'math'],
  author: 'GMS2Lab Team',
  overview: 'A smooth camera gives your game immediate polish. Using GameMaker\'s view_camera[0] and camera_set_view_pos(), we build a camera controller with deadzones, position lerping, and trauma-based screenshake.',
  sections: [
    {
      id: 'camera-init',
      title: '1. Camera Initialization',
      content: 'Initialize tracking variables, target resolution, and screenshake values in the camera object.',
      code: `// obj_camera Create Event:
cam = view_camera[0];
follow = obj_player;
cam_w = camera_get_view_width(cam);
cam_h = camera_get_view_height(cam);

cam_x = x;
cam_y = y;
shake_magnitude = 0;
shake_decay = 0.9;
smooth_speed = 0.1;`,
    },
    {
      id: 'camera-step',
      title: '2. Smooth Follow and Clamping in End Step',
      content: 'Always update camera positions in the End Step Event to prevent jitter caused by targets moving after the camera updates.',
      code: `// obj_camera End Step Event:
if (instance_exists(follow)) {
    var _target_x = follow.x - (cam_w * 0.5);
    var _target_y = follow.y - (cam_h * 0.5);

    // Smooth interpolation
    cam_x = lerp(cam_x, _target_x, smooth_speed);
    cam_y = lerp(cam_y, _target_y, smooth_speed);
}

// Clamp to room bounds
cam_x = clamp(cam_x, 0, room_width - cam_w);
cam_y = clamp(cam_y, 0, room_height - cam_h);

// Screenshake calculation
var _shake_x = 0;
var _shake_y = 0;
if (shake_magnitude > 0.1) {
    _shake_x = random_range(-shake_magnitude, shake_magnitude);
    _shake_y = random_range(-shake_magnitude, shake_magnitude);
    shake_magnitude *= shake_decay;
} else {
    shake_magnitude = 0;
}

camera_set_view_pos(cam, round(cam_x + _shake_x), round(cam_y + _shake_y));`,
    },
    {
      id: 'shake-trigger',
      title: '3. Global Shake Trigger Function',
      content: 'Create a simple global function any event or explosion can call to trigger screenshake.',
      code: `/// @function screen_shake(amount)
function screen_shake(_amount) {
    if (instance_exists(obj_camera)) {
        obj_camera.shake_magnitude = max(obj_camera.shake_magnitude, _amount);
    }
}`,
    },
  ],
}

export default {
  slug: 'fixed-step-physics-accumulator',
  title: 'Fixed-Step Physics & Delta Accumulator: Decoupling Tickrate from FPS',
  description: 'Stop physics clipping and physics tied to monitor refresh rate. Implement a fixed 60Hz simulation accumulator loop with sub-frame render state interpolation in GMS 2.3+.',
  category: 'Engine & Physics',
  categoryColor: 'text-gm-blue',
  readTime: '8 min read',
  date: 'March 2025',
  tags: ['physics', 'game-loop', 'delta-time', 'accumulator', 'interpolation', 'math'],
  author: 'GMS2Lab Team',
  overview: 'Tying game logic directly to GameMaker\'s standard Step event causes physics to run faster or slower depending on display refresh rates (60Hz vs 144Hz vs 240Hz). Conversely, naive delta_time multiplication causes bullets and fast actors to tunnel through thin collision geometry when framerates drop. A fixed-step accumulator updates gameplay logic in discrete, deterministic time slices (e.g., exactly 1/60th of a second) and interpolates render positions in the Draw event.',
  sections: [
    {
      id: 'the-problem-with-naive-delta',
      title: '1. Why Naive Delta Time Fails',
      content: 'Multiplying speed by delta_time (x += vx * dt) causes variable movement steps. If a lag spike occurs, dt spikes, and an entity can teleport through a wall in a single frame. A fixed-timestep accumulator runs multiple discrete steps during a spike, ensuring collision detection checks every single intermediate slice.',
    },
    {
      id: 'accumulator-manager',
      title: '2. Implementing the Time Controller',
      content: 'Create a persistent controller object that measures real elapsed microsecond time, accumulates it, and executes fixed simulation steps.',
      code: `// In obj_time_controller Create Event:
fixed_dt = 1.0 / 60.0;            // 60Hz fixed simulation step (0.016667 seconds)
fixed_dt_micros = fixed_dt * 1000000;
accumulator = 0;
max_frame_time = 0.25;            // Panic limit (prevents spiral of death during huge lag)
alpha = 0.0;                      // Remainder ratio for Draw interpolation

// In obj_time_controller Step Event:
var _frame_time = delta_time / 1000000.0; // Convert microseconds to seconds
if (_frame_time > max_frame_time) {
    _frame_time = max_frame_time;
}

accumulator += _frame_time;

// Consume accumulator in discrete fixed slices
while (accumulator >= fixed_dt) {
    // 1. Record previous state for interpolation before simulating
    with (par_physics_entity) {
        prev_x = x;
        prev_y = y;
        fixed_step(); // Custom fixed physics simulation method
    }

    accumulator -= fixed_dt;
}

// Sub-step ratio for rendering interpolation: [0.0, 1.0)
alpha = accumulator / fixed_dt;`,
    },
    {
      id: 'entity-interpolation',
      title: '3. Entity Physics Step and Interpolated Draw',
      content: 'Separate your physics calculation from visual rendering. Update exact coordinates in fixed_step(), and render at the lerped sub-frame position in the Draw Event.',
      code: `// In par_physics_entity Create Event:
prev_x = x;
prev_y = y;
vx = 0;
vy = 0;
gravity_amt = 0.4;

fixed_step = function() {
    // Constant fixed physics step (runs at deterministic 60Hz)
    vy += gravity_amt;
    x += vx;
    y += vy;

    // Solid collision check
    if (place_meeting(x, y + 1, obj_solid)) {
        if (vy > 0) vy = 0;
    }
};

// In par_physics_entity Draw Event:
// Interpolate between prev_x/y and current x/y based on time controller's alpha
var _render_x = lerp(prev_x, x, obj_time_controller.alpha);
var _render_y = lerp(prev_y, y, obj_time_controller.alpha);

draw_sprite_ext(sprite_index, image_index, _render_x, _render_y, image_xscale, image_yscale, image_angle, image_blend, image_alpha);`,
      callout: {
        type: 'important',
        title: 'Spiral of Death Protection',
        text: 'The max_frame_time clamp prevents the game from executing an infinite while-loop if a single frame takes longer to compute than the fixed delta slice.',
      },
    },
  ],
}

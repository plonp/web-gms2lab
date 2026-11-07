export default {
  slug: 'projectile-function-script',
  title: 'Projectile Function Script: Target (x, y) Ballistic Trajectories',
  description: 'Calculate the exact launch velocity (vx, vy) in GameMaker to land a projectile on any target coordinate (x, y) using flight time, apex arc height, or fixed launch speed.',
  category: 'Physics & Math',
  categoryColor: 'text-gm-blue',
  readTime: '8 min read',
  date: 'November 2026',
  tags: ['projectile', 'physics', 'ballistics', 'math', 'gml', 'trajectory'],
  author: 'GMS2Lab Team',
  overview: 'When programming grenades, catapult rocks, mortar shells, or lobbed potions in GameMaker, setting a random speed and angle usually results in missed targets or awkward overshoots. Instead of guessing launch angles, you can solve the kinematic equations backwards: specify the launch origin (x0, y0), the destination landing point (x1, y1), and calculate the exact initial horizontal and vertical velocities (vx, vy) needed to hit the mark.',
  sections: [
    {
      id: 'discrete-euler-math',
      title: '1. The Mathematics: Continuous Physics vs Discrete Euler Steps',
      content: 'In textbook calculus, continuous projectile motion with downwards gravity g calculates vertical displacement as y(t) = y0 + vy * t + 0.5 * g * t^2. However, GameMaker executes discrete frame steps (x += vx; y += vy; vy += g). Over T discrete frames, gravity accumulates as g * (0 + 1 + 2 + ... + T - 1) = g * T * (T - 1) / 2.',
      steps: [
        'Horizontal velocity is constant across all frames: vx = (target_x - start_x) / T.',
        'Discrete vertical displacement sum: dy = (T * vy) + (g * T * (T - 1) / 2).',
        'Solving for initial vertical velocity: vy = (dy - (g * T * (T - 1) / 2)) / T.',
        'Using the discrete formula guarantees the projectile lands on the exact destination pixel at frame T with zero floating-point drift.',
      ],
      callout: {
        type: 'important',
        title: 'Watch the Frame Integration Order',
        text: 'The discrete formula assumes you update position first, then apply gravity (y += vy; vy += grav). If your game loop applies gravity before position, adjust the numerator offset accordingly.'
      }
    },
    {
      id: 'time-based-launch',
      title: '2. Method 1: Launch by Flight Duration (T Frames)',
      content: 'When you want grenades, mortar strikes, or artillery shells to land at a predictable, consistent cadence (e.g., exactly 60 frames / 1 second after firing), calculate vx and vy from total flight time.',
      code: `/// @function projectile_get_velocity_by_time
/// @param {Real} x0 Start X coordinate
/// @param {Real} y0 Start Y coordinate
/// @param {Real} x1 Target landing X coordinate
/// @param {Real} y1 Target landing Y coordinate
/// @param {Real} time_frames Total flight duration in steps (frames)
/// @param {Real} grav Downward gravity per frame (positive value)
/// @returns {Struct} Struct { vx: Real, vy: Real, time: Real }
function projectile_get_velocity_by_time(_x0, _y0, _x1, _y1, _time_frames, _grav) {
    var _t = max(1, round(_time_frames));
    var _dx = _x1 - _x0;
    var _dy = _y1 - _y0;

    // Horizontal speed
    var _vx = _dx / _t;

    // Discrete vertical speed accounting for Euler accumulation
    var _gravity_accumulation = _grav * _t * (_t - 1) * 0.5;
    var _vy = (_dy - _gravity_accumulation) / _t;

    return {
        vx: _vx,
        vy: _vy,
        time: _t
    };
}`
    },
    {
      id: 'height-based-launch',
      title: '3. Method 2: Launch by Arc Apex Height (Consistent Lob Arcs)',
      content: 'When launching arrows or lobbing potions over walls, you want the projectile to clear a specific peak height above the highest point. This method calculates total airtime dynamically from the arc height.',
      code: `/// @function projectile_get_velocity_by_height
/// @param {Real} x0 Start X coordinate
/// @param {Real} y0 Start Y coordinate
/// @param {Real} x1 Target landing X coordinate
/// @param {Real} y1 Target landing Y coordinate
/// @param {Real} arc_height Height in pixels above the highest point
/// @param {Real} grav Downward gravity per frame
/// @returns {Struct} Struct { vx: Real, vy: Real, time: Real }
function projectile_get_velocity_by_height(_x0, _y0, _x1, _y1, _arc_height, _grav) {
    // Peak Y is above the highest point (remember -y is up in GameMaker)
    var _peak_y = min(_y0, _y1) - abs(_arc_height);

    var _dist_up = _y0 - _peak_y;
    var _dist_down = _y1 - _peak_y;

    // Time to reach peak and time to fall from peak
    var _t_up = sqrt((2 * _dist_up) / _grav);
    var _t_down = sqrt((2 * _dist_down) / _grav);
    var _total_t = max(2, round(_t_up + _t_down));

    // Delegate to discrete time solver with calculated duration
    return projectile_get_velocity_by_time(_x0, _y0, _x1, _y1, _total_t, _grav);
}`
    },
    {
      id: 'speed-based-launch',
      title: '4. Method 3: Fixed Launch Speed & Ballistic Angle Solver',
      content: 'For cannons, catapults, or bow shots where projectile launch muzzle speed is constant, solve the quadratic trajectory equation to determine the launch angle. Supports both direct low-arc shots and lobbed high-arc mortar trajectories.',
      code: `/// @function projectile_get_velocity_by_speed
/// @param {Real} x0 Start X
/// @param {Real} y0 Start Y
/// @param {Real} x1 Target landing X
/// @param {Real} y1 Target landing Y
/// @param {Real} speed Fixed muzzle velocity
/// @param {Real} grav Downward gravity
/// @param {Bool} high_arc True for mortar lob, False for direct flat trajectory
/// @returns {Struct|Undefined} Struct { vx, vy, angle, time } or undefined if out of range
function projectile_get_velocity_by_speed(_x0, _y0, _x1, _y1, _speed, _grav, _high_arc) {
    var _dx = _x1 - _x0;
    var _dy = _y1 - _y0; // Positive dy means landing lower, negative means higher
    var _dist_x = abs(_dx);

    var _v2 = _speed * _speed;
    var _v4 = _v2 * _v2;
    var _term = _v4 - _grav * (_grav * _dist_x * _dist_x + 2 * _dy * _v2);

    // If term < 0, target is beyond maximum reachable range at this speed
    if (_term < 0) return undefined;

    var _root = sqrt(_term);
    var _tan_theta;

    if (_high_arc) {
        _tan_theta = (_v2 + _root) / (_grav * _dist_x);
    } else {
        _tan_theta = (_v2 - _root) / (_grav * _dist_x);
    }

    var _angle_rad = arctan(_tan_theta);
    var _vx = _speed * cos(_angle_rad) * sign(_dx);
    var _vy = -_speed * sin(_angle_rad); // Negative because up is -y in GM

    var _time_frames = max(1, round(_dist_x / abs(_vx)));

    return {
        vx: _vx,
        vy: _vy,
        angle: radtodeg(_angle_rad),
        time: _time_frames
    };
}`
    },
    {
      id: 'projectile-entity-example',
      title: '5. Complete Projectile Object Implementation',
      content: 'Here is how to wire the calculation into a grenade or catapult projectile instance in GameMaker.',
      code: `// obj_grenade Create Event:
vx = 0;
vy = 0;
grav = 0.35;
has_landed = false;

/// @function launch_towards
function launch_towards(_target_x, _target_y, _arc_height) {
    var _vel = projectile_get_velocity_by_height(x, y, _target_x, _target_y, _arc_height, grav);
    vx = _vel.vx;
    vy = _vel.vy;
}

// obj_grenade Step Event:
if (!has_landed) {
    x += vx;
    y += vy;
    vy += grav;

    // Check arrival at landing plane or obstacle collision
    if (y >= target_ground_y) {
        has_landed = true;
        y = target_ground_y;
        vx = 0;
        vy = 0;
        instance_create_layer(x, y, "VFX", obj_explosion);
        instance_destroy();
    }
}

// Spawning example from obj_player on mouse click:
if (mouse_check_button_pressed(mb_left)) {
    var _grenade = instance_create_layer(x, y, "Projectiles", obj_grenade);
    _grenade.target_ground_y = mouse_y;
    _grenade.launch_towards(mouse_x, mouse_y, 80); // 80px arc peak over obstacles
}`
    },
    {
      id: 'trajectory-preview-guide',
      title: '6. Drawing an In-Game Aim Trajectory Arc Preview',
      content: 'Allow players to see the arc prediction before firing by sampling the discrete Euler formula along the curve in the Draw event.',
      code: `/// @function draw_trajectory_arc
function draw_trajectory_arc(_x0, _y0, _vx, _vy, _grav, _steps) {
    draw_set_color(c_yellow);
    var _curr_x = _x0;
    var _curr_y = _y0;
    var _temp_vy = _vy;

    for (var i = 0; i < _steps; i++) {
        var _next_x = _curr_x + _vx;
        var _next_y = _curr_y + _temp_vy;
        _temp_vy += _grav;

        draw_line(_curr_x, _curr_y, _next_x, _next_y);
        _curr_x = _next_x;
        _curr_y = _next_y;
    }
    draw_set_color(c_white);
}`
    }
  ]
}

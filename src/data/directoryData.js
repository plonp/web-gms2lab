export const DIRECTORY_ITEMS = [
  {
    id: 'state-machine-finite',
    title: 'Hierarchical Finite State Machine (HFSM)',
    category: 'architecture',
    categoryLabel: 'Architecture & State',
    version: 'GMS 2.3+',
    description: 'A modular, constructor-based finite state machine implementation supporting state nesting, enter/exit callbacks, and transition conditions.',
    tags: ['structs', 'methods', 'fsm', 'player-controller'],
    snippet: `function StateMachine(_owner) constructor {
    owner = _owner;
    currentState = undefined;
    states = {};

    static add = function(_name, _state) {
        states[$ _name] = _state;
        _state.fsm = this;
        return this;
    };
}`,
    docsUrl: '#hfsm',
    type: 'Script Library'
  },
  {
    id: 'smooth-camera-follow',
    title: 'Smooth Target Follow & Screenshake Camera',
    category: 'camera',
    categoryLabel: 'Camera & Display',
    version: 'GMS 2.3+',
    description: 'A responsive camera controller with sub-pixel rounding, smooth lerp tracking, bounds clamping, and trauma-based directional screenshake.',
    tags: ['camera', 'viewports', 'screenshake', 'lerp', 'juicy'],
    snippet: `var _target_x = target.x - (cam_w * 0.5);
var _target_y = target.y - (cam_h * 0.5);
cam_x = lerp(cam_x, _target_x, 0.1);
cam_y = lerp(cam_y, _target_y, 0.1);

var _shake = power(shake_trauma, 2);
camera_set_view_pos(view_camera[0], cam_x + random_range(-_shake, _shake), cam_y + random_range(-_shake, _shake));`,
    docsUrl: '#camera-follow',
    type: 'GML Script'
  },
  {
    id: 'delta-timing-system',
    title: 'Delta Timing & Frame Independent Motion',
    category: 'math-physics',
    categoryLabel: 'Math & Physics',
    version: 'GMS 2.x',
    description: 'Standardized delta timing helpers to ensure physics, timers, and movement remain consistent across variable refresh rates and monitor syncs.',
    tags: ['delta_time', 'motion', 'physics', 'framerate-independent'],
    snippet: `// Global delta step calculation
global.dt = delta_time / 1000000;
global.time_scale = 1.0;

// Usage in movement:
x += (hsp * 60) * global.dt * global.time_scale;`,
    docsUrl: '#delta-timing',
    type: 'Utility Module'
  },
  {
    id: 'outline-shader-palette',
    title: 'Pixel-Perfect Outline & Palette Swap Shader',
    category: 'shaders',
    categoryLabel: 'Shaders & Effects',
    version: 'GLSL ES',
    description: 'Single-pass 2D fragment shader featuring adjustable outline thickness, outline color blending, and optional texture palette swaps.',
    tags: ['shaders', 'glsl-es', 'pixel-art', 'outline', 'vfx'],
    snippet: `varying vec2 v_vTexcoord;
varying vec4 v_vColour;
uniform vec2 u_texel_size;
uniform vec4 u_outline_color;

void main() {
    vec4 base = texture2D(gm_BaseTexture, v_vTexcoord);
    float alpha = base.a;
    alpha = max(alpha, texture2D(gm_BaseTexture, v_vTexcoord + vec2(u_texel_size.x, 0.0)).a);
    alpha = max(alpha, texture2D(gm_BaseTexture, v_vTexcoord - vec2(u_texel_size.x, 0.0)).a);
    gl_FragColor = mix(u_outline_color, base, base.a);
}`,
    docsUrl: '#outline-shader',
    type: 'Shader'
  },
  {
    id: 'gamepad-input-buffer',
    title: 'Action Input Buffer & Coyote Time Handler',
    category: 'input',
    categoryLabel: 'Input & Control',
    version: 'GMS 2.3+',
    description: 'Platformer input forgiveness toolkit featuring jump buffering, ledge coyote time windows, and dual keyboard/gamepad binding maps.',
    tags: ['input', 'gamepad', 'platformer', 'coyote-time', 'buffering'],
    snippet: `function InputBuffer() constructor {
    jump_buffer_timer = 0;
    coyote_timer = 0;

    static update = function(_on_ground, _jump_pressed) {
        if (_jump_pressed) jump_buffer_timer = 6;
        if (_on_ground) coyote_timer = 6;
        else coyote_timer = max(0, coyote_timer - 1);
        jump_buffer_timer = max(0, jump_buffer_timer - 1);
    };
}`,
    docsUrl: '#input-buffer',
    type: 'System Core'
  },
  {
    id: 'json-save-load-encryption',
    title: 'Safe JSON Serialization & Save File Encryption',
    category: 'data',
    categoryLabel: 'Data & Storage',
    version: 'GMS 2.3+',
    description: 'Robust save/load pipeline with JSON schema validation, automatic backup rotation, and lightweight XOR/Base64 obfuscation for user saves.',
    tags: ['json', 'file-io', 'encryption', 'serialization', 'save-system'],
    snippet: `function save_game_data(_filename, _data_struct) {
    var _json = json_stringify(_data_struct);
    var _buffer = buffer_create(string_byte_length(_json), buffer_fixed, 1);
    buffer_write(_buffer, buffer_text, _json);
    buffer_save(_buffer, _filename);
    buffer_delete(_buffer);
}`,
    docsUrl: '#save-system',
    type: 'Data Handler'
  },
  {
    id: 'spatial-hash-grid',
    title: 'Spatial Hash Grid for 2D Collision Culling',
    category: 'math-physics',
    categoryLabel: 'Math & Physics',
    version: 'GMS 2.3+',
    description: 'High-performance spatial partitioning grid designed to cull broadphase collision checks for hundreds of moving bullet or enemy instances.',
    tags: ['optimization', 'collisions', 'spatial-hashing', 'performance'],
    snippet: `function SpatialGrid(_cell_size) constructor {
    cell_size = _cell_size;
    cells = ds_map_create();
    
    static hash = function(_x, _y) {
        return string(floor(_x / cell_size)) + ":" + string(floor(_y / cell_size));
    };
}`,
    docsUrl: '#spatial-grid',
    type: 'Algorithm'
  },
  {
    id: 'event-bus-pubsub',
    title: 'Decoupled Event Bus & Pub/Sub Messenger',
    category: 'architecture',
    categoryLabel: 'Architecture & State',
    version: 'GMS 2.3+',
    description: 'Lightweight global event dispatcher allowing decoupled game objects to subscribe, unsubscribe, and broadcast custom events with payload data.',
    tags: ['events', 'pubsub', 'architecture', 'signals'],
    snippet: `function EventBus() constructor {
    listeners = {};

    static on = function(_event, _callback) {
        if (!variable_struct_exists(listeners, _event)) listeners[$ _event] = [];
        array_push(listeners[$ _event], _callback);
    };

    static emit = function(_event, _data) {
        if (!variable_struct_exists(listeners, _event)) return;
        var _list = listeners[$ _event];
        for (var i = 0; i < array_length(_list); i++) _list[i](_data);
    };
}`,
    docsUrl: '#event-bus',
    type: 'Architecture'
  }
]
export default {
  slug: 'ui-transition-state-machine-easing',
  title: 'Proper UI Transitions in GameMaker: State Machines, Easing & Input Gating',
  description: 'Avoid glitchy menus, sub-pixel text blur, and double-click softlocks. Build robust, frame-deterministic UI transitions in GML using lifecycle states, normalized easing curves, and input gating.',
  category: 'Architecture',
  categoryColor: 'text-gm-green',
  readTime: '9 min read',
  date: 'November 2026',
  tags: ['ui', 'transitions', 'easing', 'state-machine', 'architecture', 'gml'],
  author: 'GMS2Lab Team',
  overview: 'Most beginners animate menus using naive lerps (e.g. y = lerp(y, target, 0.1)) or linear frame offsets. This leads to three common production bugs: asymptotic tails that never mathematically reach the target, sub-pixel rendering blur on UI text, and race conditions where players click buttons during opening/closing animations. A professional UI transition system decouples normalized progress (0.0 to 1.0) through an explicit 4-state lifecycle, easing functions, and input gating.',
  sections: [
    {
      id: 'the-three-ui-traps',
      title: '1. The Three Traps of Naive UI Animation',
      content: 'Before writing the solution, understand why conventional shortcuts cause game-breaking edge cases in production:',
      steps: [
        'The Infinite Lerp Tail: Calling y = lerp(y, target, 0.1) produces an asymptotic curve that takes dozens of unnecessary frames to settle within 0.001 pixels. The UI element never truly finishes animating, continuously consuming draw cycles.',
        'Sub-Pixel Text Smearing: While lerping across floating-point coordinates, pixel fonts and 9-slice panel borders render at fractional pixels, resulting in blurry or distorted glyphs until rounded.',
        'Input Vulnerability Window: If players click or tap while a menu is fading out, buttons still receive input, causing double-purchases, duplicate sound triggers, or dialogue softlocks.',
      ],
      callout: {
        type: 'important',
        title: 'Rule of Thumb',
        text: 'Never animate UI elements by directly mutating their screen positions. Always animate a normalized progress variable t from 0.0 to 1.0, and derive position, scale, and alpha from that single value.',
      },
    },
    {
      id: 'state-machine-lifecycle',
      title: '2. The 4-State UI Transition Lifecycle',
      content: 'A clean UI controller must live in one of four mutually exclusive states. This eliminates ambiguous conditions and guarantees input safety.',
      code: `enum UI_STATE {
    CLOSED,   // Progress is 0.0, completely hidden, no draw or input calls
    ENTERING, // Progress is advancing 0.0 -> 1.0, drawing transition, inputs locked
    OPEN,     // Progress is locked at 1.0, fully interactive
    EXITING   // Progress is decaying 1.0 -> 0.0, drawing exit transition, inputs locked
}`,
    },
    {
      id: 'easing-curves-math',
      title: '3. Mathematical Easing Curves (No Math Libraries Needed)',
      content: 'Linear interpolation feels robotic. We apply mathematical easing functions over normalized time t [0.0 - 1.0]. Ease-Out Cubic provides a crisp deceleration, while Ease-Out Back provides a snappy, organic overshoot pop.',
      code: `/// @function ease_out_cubic
/// @param {Real} t Normalized progress [0.0 - 1.0]
function ease_out_cubic(_t) {
    var _f = _t - 1.0;
    return (_f * _f * _f) + 1.0;
}

/// @function ease_out_back
/// @param {Real} t Normalized progress [0.0 - 1.0]
/// @param {Real} [overshoot=1.70158] Amount of bounce past target
function ease_out_back(_t, _overshoot = 1.70158) {
    var _c1 = _overshoot;
    var _c3 = _c1 + 1.0;
    var _f = _t - 1.0;
    return 1.0 + _c3 * (_f * _f * _f) + _c1 * (_f * _f);
}

/// @function ease_in_cubic
/// @param {Real} t Normalized progress [0.0 - 1.0]
function ease_in_cubic(_t) {
    return _t * _t * _t;
}`,
    },
    {
      id: 'reusable-transition-controller',
      title: '4. Reusable UITransition Struct Component',
      content: 'Here is a standalone, object-oriented transition component that tracks lifecycle progression, automatically clamps endpoints, and reports interactivity status.',
      code: `/// @function UITransition
/// @param {Real} duration_frames Frame count for full animation
function UITransition(_duration_frames = 15) constructor {
    duration = max(1, _duration_frames);
    state = UI_STATE.CLOSED;
    progress = 0.0; // Raw linear progress [0.0 - 1.0]

    on_opened = undefined; // Optional callback
    on_closed = undefined; // Optional callback

    /// @function open
    static open = function() {
        if (state == UI_STATE.OPEN || state == UI_STATE.ENTERING) return;
        state = UI_STATE.ENTERING;
    };

    /// @function close
    static close = function() {
        if (state == UI_STATE.CLOSED || state == UI_STATE.EXITING) return;
        state = UI_STATE.EXITING;
    };

    /// @function toggle
    static toggle = function() {
        if (state == UI_STATE.OPEN || state == UI_STATE.ENTERING) {
            close();
        } else {
            open();
        }
    };

    /// @function update
    static update = function() {
        var _step = 1.0 / duration;

        if (state == UI_STATE.ENTERING) {
            progress += _step;
            if (progress >= 1.0) {
                progress = 1.0;
                state = UI_STATE.OPEN;
                if (!is_undefined(on_opened)) on_opened();
            }
        } else if (state == UI_STATE.EXITING) {
            progress -= _step;
            if (progress <= 0.0) {
                progress = 0.0;
                state = UI_STATE.CLOSED;
                if (!is_undefined(on_closed)) on_closed();
            }
        }
    };

    /// @function can_interact
    /// @returns {Bool} True ONLY when panel is fully open and settled
    static can_interact = function() {
        return (state == UI_STATE.OPEN);
    };

    /// @function is_visible
    /// @returns {Bool} True if panel requires rendering
    static is_visible = function() {
        return (state != UI_STATE.CLOSED);
    };

    /// @function get_eased
    /// @returns {Real} Progress filtered through ease-out (entering) or ease-in (exiting)
    static get_eased = function() {
        if (state == UI_STATE.EXITING) {
            return ease_in_cubic(progress);
        }
        return ease_out_back(progress, 1.2);
    };
}`,
    },
    {
      id: 'practical-menu-wiring',
      title: '5. Complete Menu Implementation Example',
      content: 'Wire the transition struct into an inventory or pause modal object. We handle keyboard toggling, step updates, input gating, and Draw GUI rendering.',
      code: `// In obj_pause_menu Create Event:
transition = new UITransition(14); // 14-frame smooth transition (~230ms at 60fps)

// Optional callbacks:
transition.on_opened = function() {
    show_debug_message("Menu opened - focus first button");
};

// In obj_pause_menu Step Event:
// Toggle on Escape press
if (keyboard_check_pressed(vk_escape)) {
    transition.toggle();
}

// Tick transition state machine
transition.update();

// CRITICAL: Gate player inputs so clicks are ignored while animating
if (transition.can_interact()) {
    if (keyboard_check_pressed(vk_enter) || mouse_check_button_pressed(mb_left)) {
        // Handle menu button activations safely here
    }
}

// In obj_pause_menu Draw GUI Event:
// Skip draw execution entirely if menu is closed
if (!transition.is_visible()) exit;

var _gui_w = display_get_gui_width();
var _gui_h = display_get_gui_height();
var _t_eased = transition.get_eased();

// 1. Draw darkening backdrop (linear fade with raw progress)
draw_set_color(c_black);
draw_set_alpha(transition.progress * 0.65);
draw_rectangle(0, 0, _gui_w, _gui_h, false);

// 2. Derive panel transforms from eased value
var _panel_w = 400;
var _panel_h = 300;
var _center_x = _gui_w * 0.5;

// Animate slide-up from bottom: start 80px below, settle at center
var _target_y = _gui_h * 0.5;
var _start_y  = _target_y + 80;
var _panel_y  = round(lerp(_start_y, _target_y, _t_eased));

// Animate scale pop: start at 90% scale, pop up to 100%
var _scale = lerp(0.90, 1.0, _t_eased);

// 3. Render modal panel with crisp integer coordinates
draw_set_alpha(transition.progress);
draw_sprite_ext(spr_menu_panel, 0, _center_x, _panel_y, _scale, _scale, 0, c_white, transition.progress);

// Reset draw states
draw_set_alpha(1.0);
draw_set_color(c_white);`,
      callout: {
        type: 'important',
        title: 'Always round() Destination Coordinates',
        text: 'Notice round(lerp(_start_y, _target_y, _t_eased)). Rounding ensures pixel-art sprites and font render targets never sit between sub-pixels, preventing shimmer and blur during the animation.',
      },
    },
  ],
}

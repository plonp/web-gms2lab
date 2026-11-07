export default {
  slug: 'ring-buffer-input-buffering',
  title: 'Implementing a Ring Buffer Action Queue for Frame-Perfect Input Buffering',
  description: 'Prevent dropped player inputs. Implement a circular array buffer (ring buffer) with timestamp expiration, priority consumption, and coyote time in modern GML.',
  category: 'Input & Controls',
  categoryColor: 'text-gm-orange',
  readTime: '7 min read',
  date: 'March 2025',
  tags: ['input-buffering', 'gameplay', 'coyote-time', 'ring-buffer', 'data-structures', 'controls'],
  author: 'GMS2Lab Team',
  overview: 'When a player taps the "Jump" or "Attack" key 2 frames before their character lands on the ground or finishes a weapon recovery animation, raw keyboard_check_pressed() fails to register the action. The player perceives this as unresponsive controls. A ring buffer action queue records input events along with their frame timestamp, allowing actions to be consumed within a configurable grace window.',
  sections: [
    {
      id: 'ring-buffer-concept',
      title: '1. Why a Ring Buffer?',
      content: 'A ring (circular) buffer uses a fixed-capacity array with read and write head pointers. When the write pointer reaches the end of the array, it wraps around to index 0 using modulo arithmetic. This eliminates the need to allocate or resize arrays each frame, avoiding memory allocations and garbage collection overhead.',
    },
    {
      id: 'ring-buffer-constructor',
      title: '2. The InputBuffer Constructor',
      content: 'Here is an object-oriented input buffer struct supporting push, query, and consume operations.',
      code: `/// @function InputBuffer
/// @param {Real} capacity Max inputs to store (e.g. 16)
function InputBuffer(_capacity) constructor {
    capacity = _capacity;
    buffer = array_create(capacity, undefined);
    head = 0; // Next insert index

    /// @function push
    /// @param {String} action Action name (e.g. "jump", "attack")
    /// @param {Real} current_frame The frame number (e.g. current_time or frame_count)
    static push = function(_action, _current_frame) {
        buffer[head] = {
            action: _action,
            timestamp: _current_frame,
            consumed: false
        };
        head = (head + 1) % capacity;
    };

    /// @function consume
    /// @param {String} action Action name to search for
    /// @param {Real} current_frame Current frame index
    /// @param {Real} max_age Max valid frames allowed
    /// @returns {Bool} True if action was present and consumed
    static consume = function(_action, _current_frame, _max_age) {
        // Iterate backward through stored inputs from newest to oldest
        for (var i = 0; i < capacity; i++) {
            var _idx = (head - 1 - i + capacity) % capacity;
            var _entry = buffer[_idx];
            if (is_undefined(_entry)) continue;

            if (!_entry.consumed && _entry.action == _action) {
                var _age = _current_frame - _entry.timestamp;
                if (_age >= 0 && _age <= _max_age) {
                    _entry.consumed = true; // Mark used
                    return true;
                }
            }
        }
        return false;
    };
}`,
    },
    {
      id: 'integration-example',
      title: '3. Integrating with Player State & Coyote Time',
      content: 'Push button presses into the buffer during Step, and consume buffered inputs when the player enters a valid state.',
      code: `// In obj_player Create Event:
input_queue = new InputBuffer(16);
current_frame = 0;
buffer_window = 6; // 6 frames (100ms at 60fps) of input leeway
coyote_timer = 0;
coyote_max = 5;

// In obj_player Step Event:
current_frame++;

// 1. Buffer physical button presses
if (keyboard_check_pressed(vk_space) || gamepad_button_check_pressed(0, gp_face1)) {
    input_queue.push("jump", current_frame);
}
if (keyboard_check_pressed(ord("Z")) || gamepad_button_check_pressed(0, gp_face3)) {
    input_queue.push("attack", current_frame);
}

// 2. Track ground contact for coyote time
var _on_ground = place_meeting(x, y + 1, obj_solid);
if (_on_ground) {
    coyote_timer = coyote_max;
} else if (coyote_timer > 0) {
    coyote_timer--;
}

// 3. Consume jump if buffered and allowed
if (coyote_timer > 0 && input_queue.consume("jump", current_frame, buffer_window)) {
    vy = -jump_speed;
    coyote_timer = 0; // Invalidate remaining coyote time
}

// 4. Consume attack if player is not currently in attack recovery
if (state != "recovering" && input_queue.consume("attack", current_frame, buffer_window)) {
    state = "attacking";
    image_index = 0;
}`,
    },
  ],
}

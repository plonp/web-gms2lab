export default {
  slug: 'lightweight-state-machines-structs-methods',
  title: 'Lightweight State Machines Using Structs and Methods',
  description: 'Ditch rigid 500-line switch statements. Learn how to architect modular, self-contained state machines using GML 2.3+ structs and method variables.',
  category: 'Core Systems',
  categoryColor: 'text-gm-orange',
  readTime: '5 min read',
  date: 'January 2025',
  tags: ['state-machine', 'structs', 'methods', 'gameplay', 'oop'],
  author: 'GMS2Lab Team',
  overview: 'Classic GameMaker state machines often rely on large switch statements in the Step Event or script asset indices. By using structs with bound method variables, each state owns its enter, step, draw, and leave logic cleanly.',
  sections: [
    {
      id: 'state-constructor',
      title: '1. Designing the State Struct',
      content: 'Define a constructor for states. Each state contains optional callbacks for entering, stepping, and leaving the state.',
      code: `function State(_name) constructor {
    name = _name;
    on_enter = undefined;
    on_step = undefined;
    on_leave = undefined;
    on_draw = undefined;

    static set_enter = function(_fn) { on_enter = _fn; return self; };
    static set_step = function(_fn) { on_step = _fn; return self; };
    static set_leave = function(_fn) { on_leave = _fn; return self; };
    static set_draw = function(_fn) { on_draw = _fn; return self; };
}`,
    },
    {
      id: 'machine-controller',
      title: '2. The State Machine Manager',
      content: 'Create a manager constructor to handle state transitions, history, and invoking step/draw loops.',
      code: `function StateMachine() constructor {
    states = {};
    current_state = undefined;

    static add = function(_name, _state) {
        states[$ _name] = _state;
        return self;
    };

    static change = function(_name) {
        if (!variable_struct_exists(states, _name)) return;
        if (current_state != undefined && current_state.on_leave != undefined) {
            current_state.on_leave();
        }
        current_state = states[$ _name];
        if (current_state.on_enter != undefined) {
            current_state.on_enter();
        }
    };

    static step = function() {
        if (current_state != undefined && current_state.on_step != undefined) {
            current_state.on_step();
        }
    };
}`,
    },
    {
      id: 'entity-usage',
      title: '3. Using It in an Entity Object',
      content: 'In your player or enemy object, construct states with method references tied directly to the entity.',
      code: `// obj_player Create Event:
sm = new StateMachine();

var _idle = new State("idle")
    .set_enter(method(self, function() { sprite_index = spr_player_idle; hsp = 0; }))
    .set_step(method(self, function() {
        if (key_left || key_right) sm.change("run");
        if (key_jump && on_ground) sm.change("jump");
    }));

var _run = new State("run")
    .set_enter(method(self, function() { sprite_index = spr_player_run; }))
    .set_step(method(self, function() {
        var _move = key_right - key_left;
        hsp = _move * move_speed;
        if (_move == 0) sm.change("idle");
        if (key_jump && on_ground) sm.change("jump");
    }));

sm.add("idle", _idle).add("run", _run);
sm.change("idle");

// obj_player Step Event:
sm.step();`,
    },
  ],
}

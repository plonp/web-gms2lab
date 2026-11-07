export default {
  name: 'keycontrols',
  category: 'Utility',
  explanation: 'Quick hotkey handler for game restart (Home), fullscreen toggle (End), quit (Esc), and debug overlay (F1).',
  code: `function keycontrols() {
    if (keyboard_check_pressed(vk_home)) { game_restart(); }
    else if (keyboard_check_pressed(vk_end)) { window_set_fullscreen(!window_get_fullscreen()); }
    else if (keyboard_check_pressed(vk_escape)) { game_end(); }
    if (keyboard_check_pressed(vk_f1)) {
        global.debug = (global.debug + 1) mod 2;
    }
}`
}
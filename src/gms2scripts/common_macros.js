export default {
  name: 'common_macros',
  category: 'Utility',
  explanation: 'Handy shorthand macros for mouse positions, mouse buttons, colors, and common screen dimensions.',
  code: `#macro FLIP_COIN choose(true, false)
#macro screenW 1920
#macro screenH 1080

// Mouse Shortcuts
#macro mx device_mouse_x(0)
#macro my device_mouse_y(0)
#macro mxGUI device_mouse_x_to_gui(0)
#macro myGUI device_mouse_y_to_gui(0)
#macro mbA device_mouse_check_button(0, mb_left)
#macro mbA_p device_mouse_check_button_pressed(0, mb_left)
#macro mbB device_mouse_check_button(0, mb_right)
#macro mbB_p device_mouse_check_button_pressed(0, mb_right)

// Custom Colors
#macro c_ltgreen #90EE90
#macro c_amber #FCCC00
#macro c_vermilion #F95300
#macro c_violet #7443FF`
}
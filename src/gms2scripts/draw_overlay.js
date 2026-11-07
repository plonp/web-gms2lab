export default {
  name: 'draw_overlay',
  category: 'Drawing',
  explanation: 'Draws a full-screen tinted overlay with custom color and alpha, with margin buffer for screen shakes.',
  code: `function draw_overlay(color = c_black, alpha = 0.7) {
    var externalMargin = 32;
    var cam = view_camera[0];
    var vw = camera_get_view_width(cam);
    var vh = camera_get_view_height(cam);
    draw_set_alpha(alpha);
    draw_rectangle_colour(-externalMargin, -externalMargin, vw + externalMargin, vh + externalMargin, color, color, color, color, false);
    draw_set_alpha(1);
}`
}
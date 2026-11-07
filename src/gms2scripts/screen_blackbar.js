export default {
  name: 'screen_blackbar',
  category: 'Camera',
  explanation: 'Automatically renders letterbox or pillarbox black bars in the Draw GUI event to maintain aspect ratios.',
  code: `function screen_blackbar(guiW, guiH) {
    var col = c_black;
    var a = application_get_position();
    var ww = a[2] - a[0], hh = a[3] - a[1];
    var scaleW = ((window_get_width() - ww) / ww) / 2;
    var scaleH = ((window_get_height() - hh) / hh) / 2;

    if (scaleW > 0) {
        draw_rectangle_colour(-(scaleW * guiW) - 1, guiH, -1, -1, col, col, col, col, false);
        draw_rectangle_colour(guiW, 0, guiW + (guiW * scaleW), guiH, col, col, col, col, false);
    }
    if (scaleH > 0) {
        draw_rectangle_colour(-1, -scaleH * guiH - 1, guiW, -1, col, col, col, col, false);
        draw_rectangle_colour(-1, guiH, guiW, guiH + guiH * scaleH, col, col, col, col, false);
    }
}`
}
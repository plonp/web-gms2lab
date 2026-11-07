export default {
  name: 'draw_set_text',
  category: 'Drawing',
  explanation: 'Sets text drawing font, horizontal alignment, vertical alignment, and color in a single function call.',
  code: `function draw_set_text(font, halign, valign, color = c_white) {
    draw_set_font(font);
    draw_set_halign(halign);
    draw_set_valign(valign);
    draw_set_colour(color);
}`
}
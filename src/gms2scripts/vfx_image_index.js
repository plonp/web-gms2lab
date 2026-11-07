export default {
  name: 'vfx_image_index',
  category: 'VFX',
  explanation: 'Normalizes an animation countdown timer against maximum sprite frame count for custom VFX timing.',
  code: `function vfx_image_index(_timer, _timerMax, _spr) {
    var maxFrames = sprite_get_number(_spr);
    var curFrame = (1 - (_timer / _timerMax)) * max(0, maxFrames - 1);
    return floor(curFrame);
}`
}
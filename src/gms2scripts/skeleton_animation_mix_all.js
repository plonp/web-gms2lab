export default {
  name: 'skeleton_animation_mix_all',
  category: 'Animation',
  explanation: 'Discovers all skeletal animation tracks in a Spine sprite and sets mutual cross-fade mixing times.',
  code: `function skeleton_animation_mix_all(sprite, interpolation) {
    var _list = ds_list_create();
    skeleton_animation_list(sprite, _list);
    var _total = ds_list_size(_list);
    for (var i = 0; i < _total; i++) {
        for (var k = 0; k < _total; k++) {
            if (i == k) continue;
            skeleton_animation_mix(_list[| i], _list[| k], interpolation);
        }
    }
    ds_list_destroy(_list);
}

function skeleton_set_anim(animName) {
    if (skeleton_animation_get() == animName) return;
    skeleton_animation_set(animName);
}

function skeleton_set_anim_ext(animName, track = 0) {
    if (skeleton_animation_get_ext(track) == animName) return;
    skeleton_animation_set_ext(animName, track);
}`
}
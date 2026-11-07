export default {
  name: 'asset_get_list_array',
  category: 'Utility',
  explanation: 'Compiles an array of string names for all existing sprites, objects, or sounds matching an optional prefix.',
  code: `function asset_get_list_array(type, _prefix = "") {
    var _arr = [], i = 0;
    switch (type) {
        default: return undefined;
        case asset_sprite:
            while (sprite_exists(i)) {
                var name = sprite_get_name(i);
                if (string_copy(name, 1, string_length(_prefix)) == _prefix) { _arr[i] = name; }
                i++;
            }
            break;
        case asset_object:
            while (object_exists(i)) {
                var name = object_get_name(i);
                if (string_copy(name, 1, string_length(_prefix)) == _prefix) { _arr[i] = name; }
                i++;
            }
            break;
        case asset_sound:
            while (audio_exists(i)) {
                var name = audio_get_name(i);
                if (string_copy(name, 1, string_length(_prefix)) == _prefix) { _arr[i] = name; }
                i++;
            }
            break;
    }
    return _arr;
}`
}
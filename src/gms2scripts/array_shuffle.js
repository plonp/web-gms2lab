export default {
  name: 'array_shuffle',
  category: 'Utility',
  explanation: 'Shuffles the elements of an array in place using an optimized Fisher-Yates random swap.',
  code: `function array_shuffle(_array) {
    var _len = array_length(_array), _last = 0, _i = 0;
    while (_len) {
        _i = irandom(--_len);
        _last = _array[_len];
        _array[_len] = _array[_i];
        _array[_i] = _last;
    }
    return _array;
}`
}
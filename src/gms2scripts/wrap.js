export default {
  name: 'wrap',
  category: 'Math',
  explanation: 'Wraps an integer or float value within a specified boundary range (e.g., screen wrapping).',
  code: `function wrap(value, min_val, max_val) {
    var _mod = (value - min_val) % (max_val - min_val);
    if (_mod < 0) _mod += (max_val - min_val);
    return min_val + _mod;
}`
}
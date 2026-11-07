export default {
  name: 'wave',
  category: 'Juice',
  explanation: 'Oscillates smoothly between two values using a sine wave, useful for floating UI or juicy animations.',
  code: `function wave(from, to, duration, offset) {
    var _a4 = (to - from) * 0.5;
    return from + _a4 + sin((((current_time * 0.001) + duration * offset) / duration) * (pi * 2)) * _a4;
}`
}
export default {
  name: 'chance',
  category: 'Math',
  explanation: 'Returns true with a given percentage probability (0 to 1).',
  code: `function chance(percent) {
    return random(1) < percent;
}`
}
export default {
  name: 'approach',
  category: 'Math',
  explanation: 'Shifts a value towards a target by a specified step amount without overshooting.',
  code: `function approach(current, target, amount) {
    if (current < target) {
        return min(current + amount, target);
    } else {
        return max(current - amount, target);
    }
}`
}
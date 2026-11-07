export default {
  name: 'array_choose',
  category: 'Utility',
  explanation: 'Returns a random element chosen from a given array.',
  code: `function array_choose(arr) {
    var _len = array_length(arr);
    if (_len == 0) return undefined;
    return arr[irandom(_len - 1)];
}`
}
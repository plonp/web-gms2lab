export default {
  name: 'chanceSplit',
  category: 'Math',
  explanation: 'Multi-outcome weighted probability generator for gacha, loot pools, and drop tables.',
  code: `function chanceSplit() {
    var argLength = argument_count;
    if (argLength <= 0) return undefined;
    var valTotal = 0;
    for (var i = 0; i < argLength; i++) {
        valTotal += argument[i];
    }
    var argVal = [];
    for (var i = 0; i < argLength; i++) {
        argVal[i] = (argument[i] / valTotal) * min(100, valTotal);
    }
    var chance = random(100);
    var startSuccess = 0;
    for (var i = 0; i < argLength; i++) {
        if (chance > startSuccess && chance <= startSuccess + argVal[i]) {
            return i;
        }
        startSuccess += argVal[i];
    }
    return undefined;
}`
}
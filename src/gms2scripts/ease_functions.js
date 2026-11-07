export default {
  name: 'ease_functions',
  category: 'Math',
  explanation: 'Quartic easing equations (ease_in, ease_out, ease_in_out) for smooth tweening without external libraries.',
  code: `function ease_in(inputVal, outputMin, outputMax, inputMax) {
    return outputMax * power(inputVal / inputMax, 4) + outputMin;
}

function ease_out(inputVal, outputMin, outputMax, inputMax) {
    return -outputMax * (power(inputVal / inputMax - 1, 4) - 1) + outputMin;
}

function ease_in_out(inputVal, outputMin, outputMax, inputMax) {
    inputVal /= inputMax * 0.5;
    if (inputVal < 1) return outputMax * 0.5 * power(inputVal, 4) + outputMin;
    return outputMax * -0.5 * (power(inputVal - 2, 4) - 2) + outputMin;
}`
}
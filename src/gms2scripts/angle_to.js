export default {
  name: 'angle_to',
  category: 'Movement',
  explanation: 'Smoothly rotates a direction angle towards a target angle using angle_difference and a speed ratio.',
  code: `function angle_to(dir, dirTo, spdRatio = 0.1) {
    var diff = angle_difference(dirTo, dir);
    dir += diff * spdRatio;
    return dir;
}`
}
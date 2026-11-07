export default {
  name: 'snapCenter',
  category: 'Math',
  explanation: 'Snaps a coordinate value directly to the center of a grid cell or bounding box.',
  code: `function snapCenter(val, boxSize) {
    return (floor(val / boxSize) * boxSize) + boxSize / 2;
}`
}
export default {
  name: 'instance_nearest_nth',
  category: 'Instance',
  explanation: 'Finds and returns the (n)th nearest instance ID of an object from a point (x, y) using a priority queue.',
  code: `function instance_nearest_nth(xx, yy, obj, nth) {
    var list = ds_priority_create(), nearest = noone;
    nth = min(max(1, nth), instance_number(obj));
    with (obj) {
        ds_priority_add(list, id, distance_to_point(xx, yy));
    }
    repeat (nth) {
        nearest = ds_priority_delete_min(list);
    }
    ds_priority_destroy(list);
    return nearest;
}`
}
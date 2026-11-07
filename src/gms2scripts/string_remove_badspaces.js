export default {
  name: 'string_remove_badspaces',
  category: 'Utility',
  explanation: 'Cleans up a string by removing leading, trailing, and duplicate consecutive spaces.',
  code: `function string_remove_badspaces(str) {
    while (string_char_at(str, 1) == " ") {
        str = string_delete(str, 1, 1);
    }
    while (string_char_at(str, string_length(str)) == " ") {
        str = string_delete(str, string_length(str), 1);
    }
    var badSpaceRemainsPos = string_pos("  ", str);
    while (badSpaceRemainsPos != 0) {
        str = string_delete(str, badSpaceRemainsPos, 1);
        badSpaceRemainsPos = string_pos("  ", str);
    }
    return str;
}`
}
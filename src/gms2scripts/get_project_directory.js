export default {
  name: 'get_project_directory',
  category: 'Utility',
  explanation: 'Extracts and returns the absolute root directory of the currently running GameMaker project.',
  code: `function get_project_directory() {
    var _directory = GM_project_filename;
    var _strPosLast = string_last_pos("\\", _directory);
    _directory = string_copy(_directory, 1, _strPosLast - 1);
    return _directory;
}`
}
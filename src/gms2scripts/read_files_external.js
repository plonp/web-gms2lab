export default {
  name: 'read_files_external',
  category: 'Data',
  explanation: 'Returns an array containing the filenames of all files in an external directory path using file_find.',
  code: `function read_files_external(path) {
    var files = [], i = 0;
    if (directory_exists(path)) {
        var file_name = file_find_first(path + "*", fa_directory);
        while (file_name != "") {
            files[i] = file_name;
            file_name = file_find_next();
            i++;
        }
    }
    file_find_close();
    return files;
}`
}
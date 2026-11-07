export default {
  name: 'game_save_json',
  category: 'Data',
  explanation: 'Serializes and deserializes struct data to and from a JSON file using fast binary buffers.',
  code: `function game_save_json(struct = undefined, fname = "savedata.json") {
    if (struct == undefined) return false;
    var data = json_stringify(struct, true);
    var _buffer = buffer_create(string_byte_length(data) + 1, buffer_fixed, 1);
    buffer_write(_buffer, buffer_string, data);
    buffer_save(_buffer, fname);
    buffer_delete(_buffer);
    return true;
}

function game_load_json(fname = "savedata.json") {
    if (!file_exists(fname)) return undefined;
    var buffer = buffer_load(fname);
    var data = buffer_read(buffer, buffer_string);
    buffer_delete(buffer);
    return json_parse(data);
}`
}
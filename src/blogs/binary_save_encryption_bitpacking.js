export default {
  slug: 'binary-save-encryption-bitpacking',
  title: 'Binary Save Systems in GML: Bit-Packing, Compression & Checksums',
  description: 'Ditch vulnerable JSON files. Learn how to pack flags into bitmasks, serialize inventory structs to buffer_grow, compress with buffer_compress, and verify file integrity with SHA-1 hashes.',
  category: 'Architecture & Storage',
  categoryColor: 'text-gm-purple',
  readTime: '9 min read',
  date: 'March 2025',
  tags: ['save-system', 'buffers', 'compression', 'checksum', 'bit-packing', 'security'],
  author: 'GMS2Lab Team',
  overview: 'Plaintext JSON saves are easily modified by players and generate substantial disk overhead on complex saves. By writing directly into a binary grow buffer, packing booleans into single-byte bitmasks, compressing via zlib (buffer_compress), and appending a cryptographic checksum, you produce compact, fast, and tamper-resistant save files.',
  sections: [
    {
      id: 'bitmask-flags',
      title: '1. Bit-Packing Boolean Flags',
      content: 'Instead of spending a full byte (or multiple bytes in JSON) for every quest flag, unlocked achievement, or collectible, pack up to 8 boolean flags into a single buffer_u8 using bitwise operations.',
      code: `// Define bitmask constants:
#macro FLAG_TUTORIAL_DONE   (1 << 0) // 00000001
#macro FLAG_BOSS_DEFEATED   (1 << 1) // 00000010
#macro FLAG_HAS_DOUBLEJUMP  (1 << 2) // 00000100
#macro FLAG_HARDMODE_ACTIVE (1 << 3) // 00001000

// Helper functions for bitflags:
function flag_set(_flags_u8, _bit) {
    return _flags_u8 | _bit;
}

function flag_clear(_flags_u8, _bit) {
    return _flags_u8 & ~_bit;
}

function flag_has(_flags_u8, _bit) {
    return (_flags_u8 & _bit) != 0;
}`,
    },
    {
      id: 'serialization-pipeline',
      title: '2. Writing the Binary Save Buffer',
      content: 'Write header metadata, player stats, bitpacked flags, dynamic inventory arrays, and close the payload.',
      code: `/// @function save_game_binary
/// @param {String} filename Path to save file
function save_game_binary(_filename) {
    var _buf = buffer_create(512, buffer_grow, 1);

    // 1. Magic Header & Version (4 bytes)
    buffer_write(_buf, buffer_string, "GMS2");
    buffer_write(_buf, buffer_u16, 1); // Save format version 1

    // 2. Player Coordinates & Stats
    buffer_write(_buf, buffer_f32, obj_player.x);
    buffer_write(_buf, buffer_f32, obj_player.y);
    buffer_write(_buf, buffer_u16, obj_player.hp);
    buffer_write(_buf, buffer_u32, global.gold);

    // 3. Packed Booleans (1 byte for 8 flags)
    var _flags = 0;
    if (global.tutorial_done)  _flags = flag_set(_flags, FLAG_TUTORIAL_DONE);
    if (global.boss_defeated)  _flags = flag_set(_flags, FLAG_BOSS_DEFEATED);
    if (global.has_doublejump) _flags = flag_set(_flags, FLAG_HAS_DOUBLEJUMP);
    buffer_write(_buf, buffer_u8, _flags);

    // 4. Dynamic Inventory Array
    var _inv_count = array_length(global.inventory);
    buffer_write(_buf, buffer_u16, _inv_count);
    for (var i = 0; i < _inv_count; i++) {
        var _item = global.inventory[i];
        buffer_write(_buf, buffer_u16, _item.id);
        buffer_write(_buf, buffer_u8, _item.quantity);
    }

    // 5. Compress Raw Payload with zlib
    var _uncompressed_size = buffer_tell(_buf);
    var _compressed = buffer_compress(_buf, 0, _uncompressed_size);
    buffer_delete(_buf); // Free raw buffer

    // 6. Generate SHA-1 Checksum & Final Wrap
    var _checksum = buffer_sha1(_compressed, 0, buffer_get_size(_compressed));
    
    var _final = buffer_create(64 + buffer_get_size(_compressed), buffer_grow, 1);
    buffer_write(_final, buffer_string, _checksum); // 40-char SHA1 string + null terminator
    buffer_copy(_compressed, 0, buffer_get_size(_compressed), _final, buffer_tell(_final));
    buffer_delete(_compressed);

    // 7. Write to Disk
    buffer_save(_final, _filename);
    buffer_delete(_final);
}`,
    },
    {
      id: 'deserialization-validation',
      title: '3. Reading and Checksum Verification',
      content: 'When loading, first verify that the checksum matches the file content. If the file was tampered with, reject it before decompressing.',
      code: `/// @function load_game_binary
/// @param {String} filename Path to save file
function load_game_binary(_filename) {
    if (!file_exists(_filename)) return false;

    var _file_buf = buffer_load(_filename);
    var _stored_checksum = buffer_read(_file_buf, buffer_string);

    var _payload_offset = buffer_tell(_file_buf);
    var _payload_size = buffer_get_size(_file_buf) - _payload_offset;

    // Verify Checksum Integrity
    var _computed_checksum = buffer_sha1(_file_buf, _payload_offset, _payload_size);
    if (_stored_checksum != _computed_checksum) {
        show_debug_message("Corrupt or tampered save file rejected!");
        buffer_delete(_file_buf);
        return false;
    }

    // Decompress payload
    var _decompressed = buffer_decompress(_file_buf, _payload_offset, _payload_size);
    buffer_delete(_file_buf);

    if (_decompressed == -1) {
        show_debug_message("Decompression failed.");
        return false;
    }

    // Verify Magic Header
    var _magic = buffer_read(_decompressed, buffer_string);
    var _version = buffer_read(_decompressed, buffer_u16);
    if (_magic != "GMS2") {
        buffer_delete(_decompressed);
        return false;
    }

    // Read Player Data
    obj_player.x = buffer_read(_decompressed, buffer_f32);
    obj_player.y = buffer_read(_decompressed, buffer_f32);
    obj_player.hp = buffer_read(_decompressed, buffer_u16);
    global.gold = buffer_read(_decompressed, buffer_u32);

    // Read Flags
    var _flags = buffer_read(_decompressed, buffer_u8);
    global.tutorial_done  = flag_has(_flags, FLAG_TUTORIAL_DONE);
    global.boss_defeated  = flag_has(_flags, FLAG_BOSS_DEFEATED);
    global.has_doublejump = flag_has(_flags, FLAG_HAS_DOUBLEJUMP);

    // Read Inventory
    var _inv_count = buffer_read(_decompressed, buffer_u16);
    global.inventory = array_create(_inv_count);
    for (var i = 0; i < _inv_count; i++) {
        var _item_id = buffer_read(_decompressed, buffer_u16);
        var _qty = buffer_read(_decompressed, buffer_u8);
        global.inventory[i] = { id: _item_id, quantity: _qty };
    }

    buffer_delete(_decompressed);
    return true;
}`,
    },
  ],
}

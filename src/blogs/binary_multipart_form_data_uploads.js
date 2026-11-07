export default {
  slug: 'binary-multipart-form-data-uploads',
  title: 'Binary multipart/form-data HTTP Uploads via Raw Buffers in GML',
  description: 'GameMaker\'s http_post_string only supports plaintext strings. Learn how to construct compliant multipart/form-data MIME byte payloads with boundaries, headers, and binary buffers to upload screenshots, save files, or crash logs to REST endpoints.',
  category: 'Networking & Web',
  categoryColor: 'text-gm-orange',
  readTime: '8 min read',
  date: 'March 2025',
  tags: ['networking', 'buffers', 'http', 'rest-api', 'multipart', 'async'],
  author: 'GMS2Lab Team',
  overview: 'When communicating with web APIs like Discord webhooks, AWS S3, or custom backends, uploading binary assets (such as PNG screenshots, minidumps, or compressed saves) requires a multipart/form-data MIME encoding. GameMaker provides http_post_string(), but passing binary data as a string corrupts null bytes (0x00) and multi-byte sequences. The solution is assembling the entire HTTP payload into a growable buffer and submitting it via http_request().',
  sections: [
    {
      id: 'mime-structure',
      title: '1. Anatomy of a Multipart/Form-Data Payload',
      content: 'A multipart payload is partitioned by a unique boundary string. Every field and file has its own mini-headers followed by a double CRLF (\\r\\n\\r\\n), the raw bytes, and another CRLF before the next boundary.',
      steps: [
        'Boundary definition: A random alphanumeric delimiter string (e.g., "---------------------------GMS2LAB987654321").',
        'Text Fields: Content-Disposition headers followed by the raw string values.',
        'Binary File Part: Content-Disposition with filename, Content-Type (e.g. image/png or application/octet-stream), followed directly by the unencoded binary bytes.',
        'Closing Delimiter: The boundary string with two trailing hyphens ("--boundary--\\r\\n").',
      ],
      callout: {
        type: 'important',
        title: 'Watch the CRLF Line Breaks',
        text: 'HTTP MIME standards strictly mandate Windows-style CRLF (\\r\\n or bytes 13 and 10). Emitting lone LF (\\n) characters will cause servers like Nginx or AWS API Gateway to reject your request with 400 Bad Request.',
      },
    },
    {
      id: 'buffer-builder-function',
      title: '2. The Multipart Buffer Builder Function',
      content: 'Here is a reusable function that takes a URL, an array of text fields, and a file descriptor struct, constructs the raw byte buffer, and dispatches the asynchronous HTTP request.',
      code: `/// @function http_post_multipart
/// @param {String} url The endpoint URL
/// @param {Array<Struct>} fields Array of { name: "key", value: "val" }
/// @param {Struct} file Struct { fieldName: "file", fileName: "dump.bin", mimeType: "application/octet-stream", buffer: buffer_id }
/// @returns {Id.AsyncRequest}
function http_post_multipart(_url, _fields, _file) {
    var _crlf = "\\r\\n";
    var _boundary = "------------------------GMS2LAB" + string(irandom_range(10000000, 99999999));

    // Allocate a growable buffer for the payload
    var _payload = buffer_create(1024, buffer_grow, 1);

    // 1. Write text fields
    var _field_count = array_length(_fields);
    for (var i = 0; i < _field_count; i++) {
        var _f = _fields[i];
        buffer_write(_payload, buffer_text, "--" + _boundary + _crlf);
        buffer_write(_payload, buffer_text, "Content-Disposition: form-data; name=\\"" + _f.name + "\\"" + _crlf + _crlf);
        buffer_write(_payload, buffer_text, string(_f.value) + _crlf);
    }

    // 2. Write binary file section
    if (!is_undefined(_file) && buffer_exists(_file.buffer)) {
        buffer_write(_payload, buffer_text, "--" + _boundary + _crlf);
        buffer_write(_payload, buffer_text, "Content-Disposition: form-data; name=\\"" + _file.fieldName + "\\"; filename=\\"" + _file.fileName + "\\"" + _crlf);
        buffer_write(_payload, buffer_text, "Content-Type: " + _file.mimeType + _crlf + _crlf);

        // Copy raw binary file bytes directly
        var _file_size = buffer_get_size(_file.buffer);
        buffer_copy(_file.buffer, 0, _file_size, _payload, buffer_tell(_payload));
        buffer_seek(_payload, buffer_seek_relative, _file_size);

        buffer_write(_payload, buffer_text, _crlf);
    }

    // 3. Write final closing boundary
    buffer_write(_payload, buffer_text, "--" + _boundary + "--" + _crlf);

    // 4. Setup HTTP headers map
    var _headers = ds_map_create();
    ds_map_add(_headers, "Content-Type", "multipart/form-data; boundary=" + _boundary);
    ds_map_add(_headers, "Content-Length", string(buffer_tell(_payload)));

    // 5. Fire async HTTP request
    var _req_id = http_request(_url, "POST", _headers, _payload);

    // Cleanup local headers and payload buffer
    ds_map_destroy(_headers);
    buffer_delete(_payload);

    return _req_id;
}`,
    },
    {
      id: 'practical-screenshot-upload',
      title: '3. Capturing and Uploading an In-Game Screenshot',
      content: 'A common use case is sending a player bug report with an automated screenshot attached. We save the application surface to an image buffer and send it using our multipart function.',
      code: `// In obj_bug_reporter Create Event or trigger method:
function submit_report_with_screenshot(_description, _user_id) {
    // 1. Capture screen surface into a buffer
    var _surf_w = surface_get_width(application_surface);
    var _surf_h = surface_get_height(application_surface);
    
    // Save PNG to temporary local file, then read to buffer
    var _temp_file = "temp_capture.png";
    surface_save(application_surface, _temp_file);

    var _png_buffer = buffer_load(_temp_file);
    file_delete(_temp_file); // Remove disk footprint

    // 2. Prepare metadata fields
    var _fields = [
        { name: "userId", value: _user_id },
        { name: "description", value: _description },
        { name: "buildVersion", value: GM_version },
        { name: "os", value: os_type }
    ];

    // 3. Prepare file descriptor
    var _file = {
        fieldName: "screenshot",
        fileName: "bug_capture.png",
        mimeType: "image/png",
        buffer: _png_buffer
    };

    // 4. Dispatch
    upload_request_id = http_post_multipart("https://api.yourgame.com/v1/bug-reports", _fields, _file);

    // Free file buffer
    buffer_delete(_png_buffer);
}`,
    },
    {
      id: 'async-http-handling',
      title: '4. Handling the Async HTTP Event',
      content: 'In the Async - HTTP event of obj_bug_reporter, listen for the response and handle network status codes cleanly.',
      code: `// In obj_bug_reporter Async - HTTP Event:
if (async_load[? "id"] == upload_request_id) {
    var _status = async_load[? "status"];

    // _status == 0 indicates completed request
    if (_status == 0) {
        var _http_code = async_load[? "http_status"];
        var _response = async_load[? "result"];

        if (_http_code >= 200 && _http_code < 300) {
            show_debug_message("Upload succeeded: " + string(_response));
        } else {
            show_debug_message("Upload failed with HTTP code " + string(_http_code) + ": " + string(_response));
        }
    } else if (_status < 0) {
        show_debug_message("Network error during multipart upload.");
    }
}`,
    },
  ],
}

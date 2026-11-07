export default {
  slug: 'automated-crash-reporting-telemetry',
  title: 'Building an In-Game Crash Reporter & Telemetry in GMS 2.3+',
  description: 'Intercept unhandled exceptions, extract callstacks, and automatically transmit diagnostic dumps to your server without crashing the player experience.',
  category: 'Architecture',
  categoryColor: 'text-gm-green',
  readTime: '6 min read',
  date: 'February 2025',
  tags: ['crash-reporter', 'exceptions', 'telemetry', 'debugging', 'architecture'],
  author: 'GMS2Lab Team',
  overview: 'Unhandled crashes frustrate players and leave developers guessing. Modern GameMaker includes exception_unhandled_handler(), allowing you to capture the fatal exception struct before termination. This tutorial covers how to parse stack traces, save local minidumps, and report telemetry asynchronously.',
  sections: [
    {
      id: 'exception-handler',
      title: '1. Registering the Unhandled Exception Handler',
      content: 'GameMaker allows setting a custom function that runs immediately when a fatal runtime error occurs. Define this at the very start of your game in the first room or Game Start event.',
      code: `// In obj_game_init Create Event:
exception_unhandled_handler(function(_ex) {
    // Save crash report locally
    var _report = {
        message: _ex.message,
        longMessage: _ex.longMessage,
        script: _ex.script,
        line: _ex.line,
        stacktrace: _ex.stacktrace,
        version: GM_version,
        os: os_type,
        timestamp: date_datetime_string(date_current_datetime())
    };

    var _file = file_text_open_write("crash_report.json");
    file_text_write_string(_file, json_stringify(_report, true));
    file_text_close(_file);

    show_message("The game encountered an unexpected error.\\nA crash log was saved to crash_report.json.");
    return 0; // Return 0 to allow default crash dialog or terminate cleanly
});`,
    },
    {
      id: 'telemetry-payload',
      title: '2. Formatting Clean Callstacks',
      content: 'The stacktrace member in the exception struct is an array of strings. You can iterate through it to format a clean, human-readable trace for logging.',
      code: `function format_callstack(_stacktrace_array) {
    var _out = "";
    var _count = array_length(_stacktrace_array);
    for (var i = 0; i < _count; i++) {
        _out += "  at " + _stacktrace_array[i] + "\\n";
    }
    return _out;
}`,
    },
    {
      id: 'async-reporting',
      title: '3. Transmitting Telemetry Asynchronously',
      content: 'If an error is non-fatal (captured in a try/catch block), you can fire an async HTTP POST request to your error monitoring endpoint without blocking gameplay.',
      code: `function log_non_fatal_error(_tag, _error_msg) {
    var _data = {
        tag: _tag,
        error: _error_msg,
        room: room_get_name(room),
        fps_real: fps_real
    };
    var _headers = ds_map_create();
    ds_map_add(_headers, "Content-Type", "application/json");
    http_request("https://api.yourdomain.com/telemetry", "POST", _headers, json_stringify(_data));
    ds_map_destroy(_headers);
}`,
    },
  ],
}

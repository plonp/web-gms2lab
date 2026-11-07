export default {
  name: 'scr_screenshot_desktop',
  category: 'Utility',
  explanation: 'Saves an auto-incrementing PNG screenshot directly into a desktop project folder.',
  code: `function scr_screenshot_desktop(imgFileName = "image") {
    if (os_type != os_windows) return false;
    var saved = false, count = 0;
    while (!saved) {
        var path = environment_get_variable("userprofile") + "/Desktop/screenshots/" + string(game_project_name) + "/";
        path += string(imgFileName) + "_" + string(count) + ".png";
        if (file_exists(path)) { count++; saved = false; } else { saved = true; }
    }
    screen_save(path);
    return true;
}`
}
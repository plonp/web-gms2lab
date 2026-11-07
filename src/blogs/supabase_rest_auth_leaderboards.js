export default {
  slug: 'supabase-rest-auth-leaderboards',
  title: 'Direct Supabase REST Integration: Player Auth & Cloud Leaderboards',
  description: 'Connect GameMaker directly to Supabase PostgREST. Handle user signup, login, JWT storage, automated token refresh on 401 Unauthorized, and filtered leaderboard queries.',
  category: 'Networking & Web',
  categoryColor: 'text-gm-orange',
  readTime: '9 min read',
  date: 'March 2025',
  tags: ['supabase', 'postgrest', 'leaderboards', 'auth', 'jwt', 'rest-api', 'networking'],
  author: 'GMS2Lab Team',
  overview: 'Setting up custom Node.js/Python servers just for high scores and player logins adds recurring hosting costs and maintenance. Supabase offers a hosted PostgreSQL database with an automatic REST interface (PostgREST) and Row-Level Security (RLS). This guide shows how to authenticate players and perform authenticated queries directly from GML without any custom backend.',
  sections: [
    {
      id: 'supabase-client-setup',
      title: '1. Initializing the Supabase Client Struct',
      content: 'Store your Supabase project URL, anonymous public key, and active session tokens in a dedicated manager struct.',
      code: `// In obj_supabase_manager Create Event:
supabase = {
    url: "https://xyzcompany.supabase.co",
    anon_key: "eyJhbGciOiJIUzI1NiIsIn...", // Your Supabase anon public API key
    access_token: "",
    refresh_token: "",
    user_id: "",

    /// @function get_headers
    get_headers: function(_auth_required) {
        var _h = ds_map_create();
        ds_map_add(_h, "Content-Type", "application/json");
        ds_map_add(_h, "apikey", anon_key);
        if (_auth_required && access_token != "") {
            ds_map_add(_h, "Authorization", "Bearer " + access_token);
        }
        return _h;
    }
};`,
    },
    {
      id: 'player-login',
      title: '2. Email & Password Authentication',
      content: 'Send a POST request to /auth/v1/token?grant_type=password with the player credentials.',
      code: `/// @function supabase_login
function supabase_login(_email, _password) {
    var _url = supabase.url + "/auth/v1/token?grant_type=password";
    var _headers = supabase.get_headers(false);

    var _body = json_stringify({
        email: _email,
        password: _password
    });

    req_login_id = http_request(_url, "POST", _headers, _body);
    ds_map_destroy(_headers);
}`,
    },
    {
      id: 'querying-leaderboard',
      title: '3. Fetching the Top 10 High Scores via PostgREST',
      content: 'PostgREST allows powerful filtering via URL query parameters. To fetch the top 10 scores with user nicknames, sort descending with ?select=username,score&order=score.desc&limit=10.',
      code: `/// @function supabase_get_top_scores
function supabase_get_top_scores() {
    var _url = supabase.url + "/rest/v1/leaderboard?select=username,score&order=score.desc&limit=10";
    var _headers = supabase.get_headers(true);

    req_leaderboard_id = http_request(_url, "GET", _headers, "");
    ds_map_destroy(_headers);
}`,
    },
    {
      id: 'async-http-parsing',
      title: '4. Processing Responses in Async HTTP Event',
      content: 'Parse tokens and save leaderboard rows in the Async HTTP event.',
      code: `// In obj_supabase_manager Async - HTTP Event:
var _req_id = async_load[? "id"];
var _status = async_load[? "status"];

if (_status == 0) {
    var _http_code = async_load[? "http_status"];
    var _result = async_load[? "result"];

    if (_req_id == req_login_id && _http_code == 200) {
        var _data = json_parse(_result);
        supabase.access_token = _data.access_token;
        supabase.refresh_token = _data.refresh_token;
        supabase.user_id = _data.user.id;
        show_debug_message("Logged in successfully as: " + supabase.user_id);
    } 
    else if (_req_id == req_leaderboard_id && _http_code == 200) {
        var _scores = json_parse(_result);
        global.leaderboard_data = _scores;
        show_debug_message("Loaded " + string(array_length(_scores)) + " leaderboard entries.");
    }
}`,
      callout: {
        type: 'important',
        title: 'Row Level Security (RLS)',
        text: 'Always enable Row Level Security on your Supabase tables. Use an RLS policy like (auth.uid() = user_id) on INSERT/UPDATE so players cannot overwrite another player\'s high score or modify unauthorized columns.',
      },
    },
  ],
}

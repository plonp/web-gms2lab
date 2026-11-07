export default {
  slug: 'direct-oauth2-token-auth-without-user',
  title: 'How to Implement Direct OAuth2 Token Authentication Without Requiring User Auth',
  description: 'Authenticate GameMaker with Google APIs, Discord, or backend cloud services in the background using server-to-server OAuth2 refresh tokens without annoying user login prompts.',
  category: 'Networking & Integrations',
  categoryColor: 'text-gm-orange',
  readTime: '8 min read',
  date: 'March 2025',
  tags: ['oauth2', 'authentication', 'networking', 'rest-api', 'http', 'security'],
  author: 'GMS2Lab Team',
  overview: 'In many game development scenarios—such as automated crash reporters, developer analytics dashboards, dedicated multiplayer servers, or Discord webhooks—you need GameMaker to communicate directly with an authenticated REST API without forcing players through a web browser OAuth consent screen. This guide shows how to implement direct, silent OAuth2 authentication in GameMaker Studio 2.3+ using unattended refresh token rotation and automated token lifetime management.',
  sections: [
    {
      id: 'the-problem',
      title: '1. Why Avoid Interactive User Login?',
      content: 'Standard 3-legged OAuth2 requires launching an external browser window, prompting the user to click "Allow", and capturing a redirect code via an HTTP callback listener. For player crash reports, analytics telemetry, or headless servers, this creates an intolerable user experience. Instead, we use a 2-legged flow: generating a pre-authorized offline Refresh Token once during setup, and having GameMaker exchange it programmatically for fresh Access Tokens whenever needed.',
      callout: {
        type: 'important',
        title: 'Use Cases & Production Advice',
        text: 'This technique is ideal for developer tools, internal playtest builds, closed betas, and dedicated servers. For public consumer commercial releases, never ship unencrypted administrative client secrets directly in client executables; instead, proxy through a lightweight backend endpoint.',
      },
    },
    {
      id: 'token-generation',
      title: '2. Obtaining the Initial Pre-Authorized Refresh Token',
      content: 'You only need to generate the refresh token once from your developer machine. In Google Cloud Console (or your OAuth provider):',
      steps: [
        'Under APIs & Services > Credentials, create an OAuth 2.0 Client ID (Application type: Desktop App).',
        'Enable the specific APIs your game needs (e.g., Gmail API, Google Sheets API, or Cloud Storage).',
        'Use Google OAuth 2.0 Playground (developers.google.com/oauthplayground) or a one-time curl script with your Client ID and Client Secret, requesting the scopes you need with access_type=offline.',
        'Authorize once on your browser to receive the long-lived refresh_token. Save this string securely.',
      ],
    },
    {
      id: 'gml-token-manager',
      title: '3. Building the OAuth2 Token Manager Struct in GML',
      content: 'In GameMaker 2.3+, we can encapsulate token expiration, renewal, and state inside a reusable GML constructor struct.',
      code: `/// @function OAuth2TokenManager(client_id, client_secret, refresh_token, token_endpoint)
function OAuth2TokenManager(_client_id, _client_secret, _refresh_token, _token_endpoint = "https://oauth2.googleapis.com/token") constructor {
    client_id = _client_id;
    client_secret = _client_secret;
    refresh_token = _refresh_token;
    token_endpoint = _token_endpoint;

    access_token = "";
    expires_at_ms = 0;
    is_fetching = false;
    active_req_id = -1;
    pending_callbacks = [];

    // Check if the current token is valid (with a 60-second safety cushion)
    static is_valid = function() {
        return (access_token != "") && (current_time < (expires_at_ms - 60000));
    };

    // Request a fresh access token from the OAuth2 endpoint
    static refresh_access_token = function(_on_success = undefined) {
        if (_on_success != undefined) array_push(pending_callbacks, _on_success);
        if (is_fetching) return;

        is_fetching = true;
        var _post_body = "client_id=" + client_id
            + "&client_secret=" + client_secret
            + "&refresh_token=" + refresh_token
            + "&grant_type=refresh_token";

        var _headers = ds_map_create();
        ds_map_add(_headers, "Content-Type", "application/x-www-form-urlencoded");

        active_req_id = http_request(token_endpoint, "POST", _headers, _post_body);
        ds_map_destroy(_headers);
    };

    // Call this inside obj_network Async - HTTP Event
    static handle_async_http = function(_async_map) {
        var _req_id = _async_map[? "id"];
        if (_req_id != active_req_id) return false;

        var _status = _async_map[? "status"];
        var _http_status = _async_map[? "http_status"];

        if (_status == 0 && _http_status == 200) {
            var _json_str = _async_map[? "result"];
            var _data = json_parse(_json_str);

            access_token = _data.access_token;
            // Token typically expires in 3600 seconds (1 hour)
            var _lifetime_sec = variable_struct_exists(_data, "expires_in") ? _data.expires_in : 3600;
            expires_at_ms = current_time + (_lifetime_sec * 1000);
            is_fetching = false;
            active_req_id = -1;

            show_debug_message("OAuth2 Token Manager: Acquired valid access token.");

            // Dispatch any queued operations
            while (array_length(pending_callbacks) > 0) {
                var _cb = array_shift(pending_callbacks);
                _cb(access_token);
            }
            return true;
        } else if (_status < 0 || (_status == 0 && _http_status != 200)) {
            is_fetching = false;
            active_req_id = -1;
            show_debug_message("OAuth2 Token Manager Error: HTTP " + string(_http_status));
            return true;
        }
        return false;
    };
}`,
    },
    {
      id: 'making-authenticated-requests',
      title: '4. Making Authenticated API Calls Seamlessly',
      content: 'Whenever your game wants to call an API (e.g. Gmail API, Google Sheets API, or custom backend), invoke the manager with a callback. If the token is valid, it executes immediately; if expired, it refreshes automatically first.',
      code: `/// @function api_execute_with_token(token_mgr, callback)
function api_execute_with_token(_mgr, _action) {
    if (_mgr.is_valid()) {
        _action(_mgr.access_token);
    } else {
        show_debug_message("OAuth2: Access token expired or empty. Refreshing in background...");
        _mgr.refresh_access_token(_action);
    }
}

// Example usage: Sending a bug report email via Gmail API
function send_developer_log(_mgr, _subject, _body) {
    api_execute_with_token(_mgr, function(_token) {
        var _headers = ds_map_create();
        ds_map_add(_headers, "Authorization", "Bearer " + _token);
        ds_map_add(_headers, "Content-Type", "application/json");

        var _payload = json_stringify({
            raw: base64url_encode_string(build_email_rfc2822("team@game.com", "bot@game.com", _subject, _body))
        });

        http_request("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", "POST", _headers, _payload);
        ds_map_destroy(_headers);
    });
}`,
    },
    {
      id: 'event-wiring',
      title: '5. Wiring into GameMaker Events',
      content: 'Instantiate the token manager in your persistent network controller object and forward the Async HTTP Event.',
      code: `// obj_network_manager Create Event:
token_mgr = new OAuth2TokenManager(
    "YOUR_CLIENT_ID.apps.googleusercontent.com",
    "GOCSPX-YourClientSecret",
    "1//YourLongLivedOfflineRefreshToken"
);

// Proactively fetch initial token on game boot
token_mgr.refresh_access_token();

// obj_network_manager Other -> Async - HTTP Event:
token_mgr.handle_async_http(async_load);`,
    },
    {
      id: 'security-hardening',
      title: '6. Security Hardening & Obfuscation Tips',
      content: 'Direct credentials in client binaries can be found using basic string inspection tools (like strings or Cheat Engine). Follow these rules to protect your credentials:',
      steps: [
        'Restrict OAuth Scope: Only grant the absolute minimal scope required (e.g. gmail.send instead of full mail.google.com access).',
        'Obfuscate Secrets: Never store plain strings. Use XOR masking or split token chunks across separate scripts and reconstruct them at runtime.',
        'IP / Origin Whitelisting: In Google Cloud Console, restrict API key / credential usage to authorized referrers or specific IP ranges if available.',
        'Production Architecture: For public Steam/commercial releases, pass telemetry through an intermediary serverless worker (e.g. Cloudflare Worker or Google Cloud Run) which holds the OAuth credentials safely away from client machines.',
      ],
      callout: {
        type: 'tip',
        title: 'Pro Tip: Token Expiry Buffer',
        text: 'Access tokens typically live for 3600 seconds. By deducting a 60-second cushion (expires_at_ms - 60000), your game will never accidentally dispatch an API call right as the token expires.',
      },
    },
  ],
}

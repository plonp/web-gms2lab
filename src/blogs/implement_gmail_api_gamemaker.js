export default {
  slug: 'implement-gmail-api-gamemaker',
  title: 'How to Implement Gmail API in GameMaker Studio (Step-by-Step)',
  description: 'Learn how to send automated emails, crash reports, and player feedback directly from GameMaker Studio using the Gmail REST API, OAuth2/webhooks, and base64url encoding.',
  category: 'Networking & Integrations',
  categoryColor: 'text-gm-orange',
  readTime: '7 min read',
  date: 'March 2025',
  tags: ['gmail-api', 'oauth2', 'http', 'networking', 'base64url'],
  author: 'GMS2Lab Team',
  overview: 'Sending emails directly from your GameMaker project is an invaluable capability—whether for automated crash reports from beta testers, feedback forms, or player account verification. This comprehensive guide walks you through authenticating with Google Cloud, constructing RFC 2822 MIME messages, encoding with base64url, and dispatching requests via GameMaker’s asynchronous HTTP pipeline.',
  sections: [
    {
      id: 'architecture',
      title: '1. Architecture & The Security Dilemma',
      content: 'The official Gmail API REST endpoint (`https://gmail.googleapis.com/gmail/v1/users/me/messages/send`) requires an authorized OAuth 2.0 Bearer token. In native desktop or mobile games, embedding Google Cloud Client Secrets directly into your compiled game binary is a severe security risk, as strings can easily be extracted by reverse-engineers.',
      callout: {
        type: 'important',
        title: 'Architectural Recommendation',
        text: 'For production games, use a lightweight proxy (such as a free Google Apps Script web app or Cloud Function) that relays sanitized requests from GameMaker to Gmail. For internal developer tools, debug builds, or headless servers, direct OAuth2 Bearer token authentication can be used directly.',
      },
    },
    {
      id: 'google-cloud-setup',
      title: '2. Google Cloud Platform Setup',
      content: 'Before writing any GML, you need to enable the Gmail API in Google Cloud Console:',
      steps: [
        'Visit the Google Cloud Console (console.cloud.google.com) and create a new project named "GameMaker-Mailer".',
        'Navigate to "APIs & Services" > "Library" and search for "Gmail API". Click Enable.',
        'Under "APIs & Services" > "Credentials", create an OAuth 2.0 Client ID (or Service Account if using server-to-server communication).',
        'Add the required scope: https://www.googleapis.com/auth/gmail.send (this scope allows only sending emails without read access to your inbox).',
        'If using a Google Apps Script relay (zero-secret client approach), open script.google.com, write a brief doPost handler using MailApp.sendEmail(), and deploy it as a Web App with access set to "Anyone".',
      ],
    },
    {
      id: 'email-formatting',
      title: '3. RFC 2822 Message & Base64URL Encoding',
      content: 'Google\'s Gmail API expects an email message formatted in compliance with RFC 2822, encoded as a URL-safe Base64 string (characters +, /, and = replaced or stripped). Here is how to format the raw payload in GML:',
      code: `// Function to construct a standard RFC 2822 email payload
function build_email_rfc2822(_to, _from, _subject, _body) {
    var _msg = "To: " + _to + "\\r\\n";
    _msg += "From: " + _from + "\\r\\n";
    _msg += "Subject: " + _subject + "\\r\\n";
    _msg += "Content-Type: text/plain; charset=UTF-8\\r\\n";
    _msg += "MIME-Version: 1.0\\r\\n\\r\\n";
    _msg += _body;
    return _msg;
}

// Convert RFC 2822 to Gmail-compliant URL-Safe Base64
function base64url_encode_string(_str) {
    var _b64 = base64_encode(_str);
    _b64 = string_replace_all(_b64, "+", "-");
    _b64 = string_replace_all(_b64, "/", "_");
    _b64 = string_replace_all(_b64, "=", "");
    return _b64;
}`,
    },
    {
      id: 'sending-request',
      title: '4. Dispatching the HTTP Request in GML',
      content: 'Now build the JSON body with the key "raw" and send it with http_request(). Make sure to store the returned request ID so you can track it in the Asynchronous HTTP Event.',
      code: `/// @function gmail_send_message(access_token, to, from, subject, body)
function gmail_send_message(_token, _to, _from, _subject, _body) {
    var _raw_rfc = build_email_rfc2822(_to, _from, _subject, _body);
    var _encoded_raw = base64url_encode_string(_raw_rfc);

    // Build JSON payload
    var _payload_struct = {
        raw: _encoded_raw
    };
    var _post_data = json_stringify(_payload_struct);

    // Build HTTP headers map
    var _headers = ds_map_create();
    ds_map_add(_headers, "Content-Type", "application/json");
    ds_map_add(_headers, "Authorization", "Bearer " + _token);

    var _url = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";
    var _req_id = http_request(_url, "POST", _headers, _post_data);

    ds_map_destroy(_headers);
    return _req_id;
}`,
    },
    {
      id: 'handling-response',
      title: '5. Handling the Async HTTP Event',
      content: 'GameMaker handles all network calls asynchronously. In your network manager object (e.g., obj_mailer), add an Asynchronous HTTP Event:',
      code: `/// In Other -> Async - HTTP Event:
var _id = async_load[? "id"];
var _status = async_load[? "status"];
var _http_status = async_load[? "http_status"];

if (_id == global.gmail_request_id) {
    if (_status == 0) { // Request completed
        if (_http_status == 200) {
            var _result = async_load[? "result"];
            show_debug_message("Gmail API Success: Email dispatched successfully!");
            show_debug_message("Response: " + string(_result));
        } else {
            show_debug_message("Gmail API Error: HTTP " + string(_http_status));
            show_debug_message("Details: " + string(async_load[? "result"]));
        }
    } else if (_status < 0) {
        show_debug_message("Network Failure: Could not reach Gmail API.");
    }
}`,
    },
    {
      id: 'relay-method',
      title: '6. The Recommended Zero-Secret Webhook Alternative',
      content: 'If you want to send crash logs or feedback from player machines without any risk of exposing OAuth tokens or requiring player sign-in, use a Google Apps Script webhook:',
      code: `// Google Apps Script deployed as Web App:
// function doPost(e) {
//   var data = JSON.parse(e.postData.contents);
//   MailApp.sendEmail("support@yourgame.com", data.subject, data.message);
//   return ContentService.createTextOutput(JSON.stringify({ status: "ok" }));
// }

// In GameMaker:
function send_crash_report_webhook(_webhook_url, _subject, _error_text) {
    var _payload = {
        subject: _subject,
        message: _error_text,
        game_version: GM_version,
        os: os_type
    };

    var _headers = ds_map_create();
    ds_map_add(_headers, "Content-Type", "application/json");

    var _req = http_request(_webhook_url, "POST", _headers, json_stringify(_payload));
    ds_map_destroy(_headers);
    return _req;
}`,
      callout: {
        type: 'tip',
        title: 'Tip',
        text: 'You can combine this with GameMaker\'s exception_unhandled_handler() to automatically email yourself the full stack trace when a player encounters a crash during playtesting.',
      },
    },
  ],
}

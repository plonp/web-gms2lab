export default {
  slug: 'google-cloud-service-account-auth',
  title: 'Implementing Google Cloud Service Account to Avoid 6-Month Inactivity Refresh Token Expiry',
  description: 'Tired of OAuth2 refresh tokens silently expiring after 6 months of inactivity or 7 days in test mode? Learn how to implement Google Cloud Service Accounts for permanent, uninterrupted background authentication in GameMaker.',
  category: 'Networking & Integrations',
  categoryColor: 'text-gm-orange',
  readTime: '9 min read',
  date: 'March 2025',
  tags: ['service-account', 'google-cloud', 'oauth2', 'jwt', 'networking', 'rest-api'],
  author: 'GMS2Lab Team',
  overview: 'One of the most frustrating traps developers face with standard Google OAuth2 refresh tokens is the expiration policy: tokens automatically expire after 6 months of inactivity, and within just 7 days if your Google Cloud consent screen is in "Testing" mode. When players launch a game after months away, or automated telemetry scripts wake up after a hiatus, API requests suddenly crash with invalid_grant errors. Google Cloud Service Accounts solve this permanently by using self-issued cryptographic JWT assertions that never expire from inactivity.',
  sections: [
    {
      id: 'the-expiry-trap',
      title: '1. The 6-Month & 7-Day Inactivity Expiration Trap',
      content: 'Standard OAuth2 refresh tokens are tied to human user identities. Google enforces strict expiration policies that disrupt game automation and crash reporting:',
      steps: [
        '7-Day Testing Window: If your Google Cloud project is not submitted and published to production, all issued refresh tokens automatically expire exactly 7 days after creation.',
        '6-Month Inactivity Rule: Even in production mode, if a refresh token is not exchanged for a new access token within 6 consecutive months, Google revokes it permanently.',
        'Token Caps: Each user account has a limit of 50 active refresh tokens per client ID; subsequent logins evict older tokens silently.',
      ],
      callout: {
        type: 'important',
        title: 'Why Service Accounts Are Immune',
        text: 'Service accounts represent the application itself rather than an end-user. Because authentication is driven by an asymmetric cryptographic private key (RSA 256), your game or server creates fresh 1-hour access tokens on-demand at any time, even after years of inactivity.',
      },
    },
    {
      id: 'service-account-setup',
      title: '2. Setting Up a Service Account in Google Cloud',
      content: 'Configuring a Service Account takes less than 3 minutes in the Google Cloud Console:',
      steps: [
        'Open Google Cloud Console (console.cloud.google.com) and navigate to "IAM & Admin" > "Service Accounts".',
        'Click "+ Create Service Account". Give it an identifier (e.g., "game-reporter-bot").',
        'Assign the required IAM roles (e.g., Cloud Storage Object Admin, BigQuery Data Editor, or specific API access).',
        'Click into your new Service Account, open the "Keys" tab, click "Add Key" > "Create new key", and select JSON format.',
        'Download the generated service-account.json. It contains your client_email and private_key.',
      ],
    },
    {
      id: 'jwt-assertion-anatomy',
      title: '3. Understanding the JWT Assertion Exchange (RFC 7523)',
      content: 'Instead of passing an old refresh token, your game prepares a short-lived JSON Web Token (JWT) signed with RS256 and exchanges it for a 1-hour access token at https://oauth2.googleapis.com/token.',
      code: `// Structure of the JWT Payload (Claims Set):
{
  "iss": "game-reporter-bot@project-id.iam.gserviceaccount.com", // Service Account Email
  "scope": "https://www.googleapis.com/auth/gmail.send",          // Requested OAuth Scope
  "aud": "https://oauth2.googleapis.com/token",                  // OAuth Token Endpoint
  "exp": 1741400000,                                             // Unix timestamp + 3600
  "iat": 1741396400                                              // Current Unix timestamp
}`,
    },
    {
      id: 'relay-architecture',
      title: '4. Best Practice Architecture for GameMaker Clients',
      content: 'RS256 signing requires RSA private-key cryptographic operations that are cumbersome in pure GML and dangerous to bundle directly in player game binaries (where data miners can extract your private key). The industry-standard approach is pairing GameMaker with a tiny serverless signer (Cloudflare Worker or Google Cloud Function):',
      code: `// Cloudflare Worker (Free tier: 100k requests/day) - The Token Signer
// Deploy this 10-line script to act as your secure token broker:
export default {
  async fetch(request, env) {
    // Authenticate the game client using a custom pre-shared secret header
    if (request.headers.get("X-Game-Key") !== env.GAME_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Exchange Service Account credentials securely in the cloud
    const token = await getServiceAccountAccessToken(env.SERVICE_ACCOUNT_KEY);
    return Response.json({ access_token: token, expires_in: 3600 });
  }
};`,
      callout: {
        type: 'tip',
        title: 'Zero Local Maintenance',
        text: 'This architecture guarantees that even if a player does not launch your game for 2 years, the serverless signer generates a valid token instantly on boot with 0% risk of 6-month inactivity expiration.',
      },
      accordion: {
        title: 'Walkthrough: Setting up Cloudflare Worker Secrets & Native WebCrypto Signer (Click to toggle)',
        content: 'Follow these steps to store your Google Service Account key securely in Cloudflare secrets and deploy a 100% dependency-free RS256 token mint using Web Crypto API:',
        steps: [
          'Install Wrangler CLI: Run "npm install -g wrangler" in your terminal and log in with "npx wrangler login".',
          'Create a project directory: Run "npx wrangler init gms-auth-relay --type=javascript".',
          'Store your Service Account Key as an encrypted secret: Run "npx wrangler secret put SERVICE_ACCOUNT_KEY" and paste the entire JSON text from your downloaded service-account.json.',
          'Store your game passcode: Run "npx wrangler secret put GAME_SECRET" and enter a passphrase (e.g. MySecretGamePasscode_9824).',
          'Paste the zero-dependency WebCrypto worker script below into worker.js / index.js.',
          'Deploy to Cloudflare\'s edge network: Run "npx wrangler deploy". Cloudflare will print your live URL (e.g., https://gms-auth-relay.youraccount.workers.dev).',
        ],
        code: `// Cloudflare Worker (worker.js) - Complete Zero-Dependency RS256 Token Mint
export default {
  async fetch(request, env) {
    // 1. Authenticate GameMaker client using custom header
    if (request.headers.get("X-Game-Key") !== env.GAME_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const sa = JSON.parse(env.SERVICE_ACCOUNT_KEY);

      // 2. Decode PEM RSA private key into WebCrypto binary format
      const pem = sa.private_key
        .replace(/-----BEGIN PRIVATE KEY-----/, "")
        .replace(/-----END PRIVATE KEY-----/, "")
        .replace(/\\s+/g, "");
      const binaryDer = Uint8Array.from(atob(pem), c => c.charCodeAt(0));

      const privateKey = await crypto.subtle.importKey(
        "pkcs8",
        binaryDer.buffer,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["sign"]
      );

      // 3. Construct JWT payload
      const now = Math.floor(Date.now() / 1000);
      const b64url = (str) => btoa(str).replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/, "");
      const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
      const claims = b64url(JSON.stringify({
        iss: sa.client_email,
        scope: "https://www.googleapis.com/auth/gmail.send",
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now
      }));
      const unsignedPayload = header + "." + claims;

      // 4. Sign JWT using RS256 (RSASSA-PKCS1-v1_5)
      const encoder = new TextEncoder();
      const sigBuffer = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, encoder.encode(unsignedPayload));
      const sigBytes = new Uint8Array(sigBuffer);
      let sigStr = "";
      for (let i = 0; i < sigBytes.byteLength; i++) sigStr += String.fromCharCode(sigBytes[i]);
      const signedJwt = unsignedPayload + "." + b64url(sigStr);

      // 5. Exchange signed assertion with Google
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: signedJwt
        })
      });

      const tokenData = await tokenRes.json();
      return Response.json({
        access_token: tokenData.access_token,
        expires_in: tokenData.expires_in || 3600
      });
    } catch (err) {
      return new Response("Internal Server Error: " + err.message, { status: 500 });
    }
  }
};`
      },
    },
    {
      id: 'gamemaker-implementation',
      title: '5. GameMaker Implementation: The Lifetime Token Broker',
      content: 'Here is the complete GML implementation for requesting and caching tokens with automatic proactive renewal.',
      code: `/// @function ServiceAccountTokenBroker(broker_url, client_key) constructor
function ServiceAccountTokenBroker(_url, _key) constructor {
    broker_url = _url;
    client_key = _key;

    access_token = "";
    expires_at_ms = 0;
    is_loading = false;
    pending_callbacks = [];
    active_req_id = -1;

    static get_token = function(_callback) {
        // If current token is valid and has at least 2 minutes remaining, use immediately
        if (access_token != "" && current_time < (expires_at_ms - 120000)) {
            _callback(access_token);
            return;
        }

        array_push(pending_callbacks, _callback);
        if (is_loading) return;

        is_loading = true;
        var _headers = ds_map_create();
        ds_map_add(_headers, "X-Game-Key", client_key);
        ds_map_add(_headers, "Content-Type", "application/json");

        active_req_id = http_request(broker_url, "GET", _headers, "");
        ds_map_destroy(_headers);
    };

    static on_async_http = function(_async_map) {
        if (_async_map[? "id"] != active_req_id) return false;

        var _status = _async_map[? "status"];
        var _http_status = _async_map[? "http_status"];

        if (_status == 0 && _http_status == 200) {
            var _resp = json_parse(_async_map[? "result"]);
            access_token = _resp.access_token;
            var _sec = variable_struct_exists(_resp, "expires_in") ? _resp.expires_in : 3600;
            expires_at_ms = current_time + (_sec * 1000);
            is_loading = false;
            active_req_id = -1;

            show_debug_message("Service Account Token acquired! Valid for: " + string(_sec) + "s");

            while (array_length(pending_callbacks) > 0) {
                var _cb = array_shift(pending_callbacks);
                _cb(access_token);
            }
            return true;
        } else if (_status < 0 || (_status == 0 && _http_status != 200)) {
            is_loading = false;
            active_req_id = -1;
            show_debug_message("Service Account Token Error: HTTP " + string(_http_status));
            return true;
        }
        return false;
    };
}`,
    },
    {
      id: 'dispatch-example',
      title: '6. Dispatching Long-Term Cloud Calls in Your Game',
      content: 'Now any game system can fire API requests without worrying about tokens ever dying:',
      code: `// In obj_telemetry Create Event:
global.auth_broker = new ServiceAccountTokenBroker(
    "https://auth-relay.yourgame.workers.dev",
    "SecretGamePasscode_9824"
);

// To send telemetry or crash logs:
function submit_cloud_telemetry(_event_type, _payload_struct) {
    global.auth_broker.get_token(function(_token) {
        var _headers = ds_map_create();
        ds_map_add(_headers, "Authorization", "Bearer " + _token);
        ds_map_add(_headers, "Content-Type", "application/json");

        var _body = json_stringify({
            event: _event_type,
            data: _payload_struct,
            timestamp: date_datetime_string(date_current_datetime())
        });

        http_request("https://your-cloud-api.googleapis.com/v1/events", "POST", _headers, _body);
        ds_map_destroy(_headers);
    });
}

// In obj_telemetry Other -> Async - HTTP Event:
global.auth_broker.on_async_http(async_load);`,
    },
  ],
}

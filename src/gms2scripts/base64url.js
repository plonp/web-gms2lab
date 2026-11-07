export default {
  name: 'base64url',
  category: 'Utility',
  explanation: 'URL-safe Base64 encoder and decoder (replaces /, +, and = for safe HTTP parameter usage).',
  code: `function base64url_encode(str) {
    str = base64_encode(string(str));
    str = string_replace_all(str, "/", "_");
    str = string_replace_all(str, "=", "");
    str = string_replace_all(str, "+", "-");
    return str;
}

function base64url_decode(str) {
    str = string(str);
    str = string_copy(str + "===", 0, string_length(str) + (string_length(str) % 4));
    str = string_replace_all(str, "_", "/");
    str = string_replace_all(str, "-", "+");
    return base64_decode(str);
}`
}
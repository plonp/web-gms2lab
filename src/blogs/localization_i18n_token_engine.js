export default {
  "slug": "localization-i18n-token-engine",
  "title": "Robust String Templating & CSV/JSON Localization Engine with Pluralization",
  "description": "Localize games into 10+ languages with dynamic variable token replacement (e.g. \"{player} found {count} coins\") and plural rule parsing.",
  "category": "Architecture",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "localization",
    "i18n",
    "strings",
    "templates",
    "rpg"
  ],
  "author": "GMS2Lab Team",
  "overview": "Concatenating translated strings directly breaks word order across different languages (e.g., German vs Japanese). A token substitution engine replaces named placeholder tags inside translation dictionaries.",
  "sections": [
    {
      "id": "string-token-replacer",
      "title": "1. Dynamic Token Replacement Function",
      "content": "Replace {tokens} with runtime values from a struct.",
      "code": "function loc_format(_key, _params) {\n    var _template = global.lang_dict[$ _key] ?? _key;\n    if (is_undefined(_params)) return _template;\n\n    var _names = struct_get_names(_params);\n    var _len = array_length(_names);\n    for (var i = 0; i < _len; i++) {\n        var _tag = \"{\" + _names[i] + \"}\";\n        var _val = string(_params[$ _names[i]]);\n        _template = string_replace_all(_template, _tag, _val);\n    }\n    return _template;\n}"
    }
  ]
}

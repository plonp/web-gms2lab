export default {
  "slug": "gml-unit-testing-assertion-framework",
  "title": "Test-Driven Development in GameMaker: Writing an In-Engine Test Runner",
  "description": "Write automated unit tests and assertion checks in GML to verify inventory math, damage formulas, and save deserialization on game startup.",
  "category": "Platform & Tooling",
  "categoryColor": "text-gm-orange",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "unit-testing",
    "tdd",
    "assertions",
    "qa",
    "debugging"
  ],
  "author": "GMS2Lab Team",
  "overview": "Game updates frequently cause subtle bugs in core formulas (e.g., armor damage reduction math). A lightweight unit testing runner executes assertions before loading the main menu, catching regressions immediately.",
  "sections": [
    {
      "id": "assert-framework-code",
      "title": "1. Assert Functions & Test Harness",
      "content": "Define assert_equal and assert_true functions that fail with clear debug messages.",
      "code": "function assert_equal(_expected, _actual, _msg) {\n    if (_expected != _actual) {\n        show_error(\"TEST FAILED: \" + _msg + \"\\nExpected: \" + string(_expected) + \"\\nGot: \" + string(_actual), true);\n    }\n}\n\nfunction run_all_unit_tests() {\n    // Test damage calculation\n    var _dmg = calculate_damage(100, 20); // 100 attack vs 20 defense\n    assert_equal(80, _dmg, \"Basic physical damage calculation mismatch\");\n\n    show_debug_message(\"All unit tests passed successfully!\");\n}"
    }
  ]
}

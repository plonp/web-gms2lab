export default {
  "slug": "hit-flash-and-silhouette-feedback",
  "title": "Hit Flashes, White Knuckles & Silhouettes: Communicating Target Impact",
  "description": "Why turning an enemy solid white for 1 to 2 frames provides instant confirmation of damage regardless of screen chaos or particle density.",
  "category": "Game Feel & Juice",
  "categoryColor": "text-gm-orange",
  "readTime": "6 min read",
  "date": "May 2025",
  "tags": [
    "hit-flash",
    "shaders",
    "combat",
    "feedback",
    "game-feel"
  ],
  "author": "GMS2Lab Team",
  "overview": "In dark or cluttered battlefields, health bars are hard to track. A 1-frame solid white hit flash utilizes the human eye's natural sensitivity to sudden luminance shifts, confirming damage instantly.",
  "sections": [
    {
      "id": "hit-flash-implementation",
      "title": "1. Solid Color Overlay Shader in GML",
      "content": "Draw sprite with uniform color override when hit_flash timer is active.",
      "code": "// Fragment shader logic:\n// gl_FragColor = vec4(1.0, 1.0, 1.0, base_color.a);\nif (hit_flash_timer > 0) {\n    shader_set(shd_white_flash);\n    draw_self();\n    shader_reset();\n    hit_flash_timer--;\n}"
    }
  ]
}

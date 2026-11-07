export default {
  "slug": "squash-and-stretch-animation-principles",
  "title": "Squash & Stretch Physics: Giving Dynamic Weight to 2D Sprites",
  "description": "Apply the fundamental Disney animation principle of volume preservation to 2D character sprites during jumps, landings, and weapon swings.",
  "category": "Game Feel & Juice",
  "categoryColor": "text-gm-orange",
  "readTime": "7 min read",
  "date": "May 2025",
  "tags": [
    "animation",
    "squash-stretch",
    "physics",
    "juice",
    "sprites"
  ],
  "author": "GMS2Lab Team",
  "overview": "Characters drawn as rigid rectangles feel robotic. Volume preservation dictates that when a character stretches vertically (yscale = 1.3), its width must compress proportionally (xscale = 1.0 / 1.3 ≈ 0.77).",
  "sections": [
    {
      "id": "volume-preservation-code",
      "title": "1. Volume Preservation Formula in GML",
      "content": "Modify sprite scale factors dynamically while maintaining consistent apparent mass.",
      "code": "function apply_squash_stretch(_y_scale_target) {\n    target_scale_y = _y_scale_target;\n    target_scale_x = 1.0 / _y_scale_target; // Maintain area volume\n}\n\n// In landing event:\nif (just_landed) {\n    apply_squash_stretch(0.6); // Flat squish on ground impact\n}"
    }
  ]
}

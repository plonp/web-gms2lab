export default {
  "slug": "simplex-perlin-noise-terrain",
  "title": "Endless 2D Procedural Terrain with Fractional Brownian Motion (fBm)",
  "description": "Generate continuous, non-repeating rolling hills, mountain peaks, and cave networks using octave-layered Perlin/Simplex noise in GML.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "noise",
    "perlin",
    "terrain",
    "fbm",
    "procedural-generation"
  ],
  "author": "GMS2Lab Team",
  "overview": "Layering multiple octaves of noise with decreasing amplitude and increasing frequency (Fractional Brownian Motion) transforms flat random numbers into realistic geographical heightmaps.",
  "sections": [
    {
      "id": "fbm-noise-math",
      "title": "1. Multi-Octave Fractal Noise Loop",
      "content": "Sum multiple octaves with persistence and lacunarity multipliers.",
      "code": "function fbm_2d(_x, _y, _octaves, _persistence, _lacunarity) {\n    var _total = 0;\n    var _frequency = 0.005;\n    var _amplitude = 1.0;\n    var _max_val = 0;\n\n    for (var i = 0; i < _octaves; i++) {\n        _total += perlin_noise_2d(_x * _frequency, _y * _frequency) * _amplitude;\n        _max_val += _amplitude;\n        _amplitude *= _persistence;\n        _frequency *= _lacunarity;\n    }\n\n    return _total / _max_val; // Normalized [0.0 - 1.0]\n}"
    }
  ]
}

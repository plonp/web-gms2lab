export default {
  "slug": "binaural-panning-and-headphone-immersion",
  "title": "Headphone Immersion: Simulating Head-Related Transfer Functions (HRTF) in 2D Space",
  "description": "Go beyond naive stereo volume panning. Filter high frequencies when sounds originate behind the player to simulate the acoustic shadow of human ears.",
  "category": "Sound Design",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "May 2025",
  "tags": [
    "binaural",
    "hrtf",
    "spatial-audio",
    "headphones",
    "immersion"
  ],
  "author": "GMS2Lab Team",
  "overview": "Panning a sound 100% to the left ear sounds artificial. Real ears hear sounds from both sides, with slight interaural time delays (ITD) and high-frequency filtering caused by head shadow.",
  "sections": [
    {
      "id": "head-shadow-filter",
      "title": "1. Low-Pass Filter on Rear Sounds",
      "content": "Apply a 5kHz low-pass filter to sound emitters positioned behind the player to emulate the pinna shadow of human ears."
    }
  ]
}

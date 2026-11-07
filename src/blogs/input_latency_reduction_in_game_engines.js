export default {
  "slug": "input-latency-reduction-in-game-engines",
  "title": "Shaving Milliseconds: Minimizing Input Lag Through Buffer Swaps and VSync Tuning",
  "description": "Why your game feels unresponsive despite running at 60 FPS. Diagnose double-buffering, VSync pipeline delays, and frame queue latency.",
  "category": "Accessibility & Polish",
  "categoryColor": "text-gm-green",
  "readTime": "8 min read",
  "date": "May 2025",
  "tags": [
    "input-lag",
    "vsync",
    "performance",
    "latency",
    "game-feel"
  ],
  "author": "GMS2Lab Team",
  "overview": "A game can render at a steady 60 FPS while suffering from 80ms of internal input latency due to triple-buffering and queued draw calls. Optimizing event polling drops input-to-pixel delays.",
  "sections": [
    {
      "id": "latency-pipeline-audit",
      "title": "1. The Input Latency Pipeline",
      "content": "Controller Polling (4ms) -> Step Event Simulation (16.6ms) -> Draw Event (16.6ms) -> Display Buffer Swap (16.6ms)."
    }
  ]
}

export default {
  "slug": "bvh-bounding-volume-hierarchy",
  "title": "Bounding Volume Hierarchy (BVH) for Complex Polygon Raycasting",
  "description": "Accelerate line-of-sight raycasts and bullet trajectories through thousands of complex polygon colliders using a dynamic BVH tree.",
  "category": "Algorithms & Data Structures",
  "categoryColor": "text-gm-blue",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "bvh",
    "raycasting",
    "collision",
    "math",
    "algorithms"
  ],
  "author": "GMS2Lab Team",
  "overview": "Raycasting line-of-sight against hundreds of complex polygon walls is slow. Grouping geometry into a tree of nested Axis-Aligned Bounding Boxes (AABB) allows rays to prune 90% of colliders with quick box intersections.",
  "sections": [
    {
      "id": "bvh-ray-box",
      "title": "1. Ray-AABB Intersection Test",
      "content": "Fast slab-based ray-box intersection check.",
      "code": "function ray_intersects_aabb(_rx, _ry, _rdx, _rdy, _box) {\n    var _t1 = (_box.x1 - _rx) / _rdx;\n    var _t2 = (_box.x2 - _rx) / _rdx;\n    var _t3 = (_box.y1 - _ry) / _rdy;\n    var _t4 = (_box.y2 - _ry) / _rdy;\n\n    var _tmin = max(min(_t1, _t2), min(_t3, _t4));\n    var _tmax = min(max(_t1, _t2), max(_t3, _t4));\n\n    return (_tmax >= max(_tmin, 0.0));\n}"
    }
  ]
}

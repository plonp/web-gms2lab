export default {
  "slug": "fast-matrix-transform-buffers",
  "title": "3D & 2D Transform Matrix Manipulation via matrix_build and Float Buffers",
  "description": "Construct 4x4 projection, view, and world transformation matrices for camera rotation, isometric projection, and custom vertex shaders using native GML float buffers.",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "matrix",
    "math",
    "transform",
    "camera",
    "buffers"
  ],
  "author": "GMS2Lab Team",
  "overview": "GameMaker handles coordinate transformations using 4x4 affine matrices (16 floating point values). Building matrices dynamically via matrix_build() and passing them to matrix_set() enables 3D billboard effects, camera rolling, and isometric transforms.",
  "sections": [
    {
      "id": "matrix-camera-roll",
      "title": "1. Camera Roll & Rotation Matrix",
      "content": "Rotate the camera around the Z axis using matrix_build_lookat and matrix_build_projection_ortho.",
      "code": "function apply_camera_roll(_cam_x, _cam_y, _width, _height, _roll_angle) {\n    var _view_mat = matrix_build_lookat(_cam_x + _width*0.5, _cam_y + _height*0.5, -100, _cam_x + _width*0.5, _cam_y + _height*0.5, 0, dsin(_roll_angle), -dcos(_roll_angle), 0);\n    var _proj_mat = matrix_build_projection_ortho(_width, _height, 1, 32000);\n\n    camera_set_view_mat(view_camera[0], _view_mat);\n    camera_set_proj_mat(view_camera[0], _proj_mat);\n}"
    }
  ]
}

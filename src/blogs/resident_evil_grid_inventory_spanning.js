export default {
  slug: 'resident-evil-grid-inventory-spanning',
  highlight: true,
  title: 'Resident Evil-Style Grid Inventory: Multi-Cell Spanning & Rotation in GameMaker',
  description: 'Build a spatial grid inventory container like Resident Evil’s attache case. Learn 2D multi-cell spanning, 90-degree item rotation, collision validation, and drag-and-drop UI with GML structs.',
  category: 'Game Systems',
  categoryColor: 'text-gm-green',
  readTime: '11 min read',
  date: 'November 2026',
  tags: ['inventory', 'resident-evil', 'grid', 'gml', 'game-systems', 'ui', 'structs'],
  author: 'GMS2Lab Team',
  overview: 'Most RPG inventories assign one item per slot in a 1D or 2D array. In survival horror classics like Resident Evil (the iconic "attache case"), Diablo, and Escape from Tarkov, items occupy variable rectangular footprints (e.g. 1x2 herbs, 2x2 handguns, 2x6 shotguns) and can be rotated 90 degrees to optimize spatial packing. In this guide, we build a clean, object-oriented grid inventory container in GameMaker using GML 2.3+ Structs, boundary checking, occupancy collision masks, item rotation, and smooth drag-and-drop feedback.',
  sections: [
    {
      id: 'spatial-grid-architecture',
      title: '1. Architecture: The Dual-Layer Grid Model',
      content: 'A multi-cell inventory system requires two synchronized layers of data:',
      steps: [
        'The 2D Occupancy Grid: A 2D array [row][col] where each cell holds a reference to the item occupying it, or undefined if empty. Since large items occupy multiple cells, multiple cells store references to the exact same item struct.',
        'The Active Item List: A flat array of distinct item instances currently inside the container. Each item tracks its root coordinate (top-left anchor grid_x, grid_y), dimensions (width, height), and rotation state.',
      ],
      callout: {
        type: 'important',
        title: 'Why Multiple References Matter',
        text: 'When a player clicks on cell (3, 4), having the 2D grid cell directly point to the parent ItemStruct gives you instant O(1) item selection without searching through all items.',
      },
    },
    {
      id: 'inventory-data-structures',
      title: '2. The Item & InventoryGrid Structs',
      content: 'We begin by defining two lightweight GML constructors: one for items with dimensions and sprites, and one for the grid container itself.',
      code: `/// @function InventoryItem
/// @param {String} name Display name
/// @param {Asset.GMSprite} sprite Item graphic
/// @param {Real} width Horizontal slot span
/// @param {Real} height Vertical slot span
function InventoryItem(_name, _sprite, _width = 1, _height = 1) constructor {
    name = _name;
    sprite = _sprite;
    width = _width;
    height = _height;
    
    // Placement state inside container
    grid_x = -1;
    grid_y = -1;
    rotated = false; // When true, width and height are swapped

    /// @function get_span_width
    static get_span_width = function() {
        return rotated ? height : width;
    };

    /// @function get_span_height
    static get_span_height = function() {
        return rotated ? width : height;
    };
}

/// @function InventoryGrid
/// @param {Real} cols Total column count (e.g. 10)
/// @param {Real} rows Total row count (e.g. 6)
/// @param {Real} cell_size Slot size in pixels (e.g. 48)
function InventoryGrid(_cols, _rows, _cell_size = 48) constructor {
    cols = _cols;
    rows = _rows;
    cell_size = _cell_size;
    items = []; // Flat list of placed items

    // Initialize 2D grid matrix: cells[y][x]
    cells = array_create(rows);
    for (var _y = 0; _y < rows; _y++) {
        cells[_y] = array_create(cols, undefined);
    }
}`,
    },
    {
      id: 'collision-and-boundary-checks',
      title: '3. Spatial Validation: Boundary & Overlap Checking',
      content: 'Before placing or dropping an item, we must verify that its rectangular footprint is fully within grid bounds and that none of its target cells are occupied by another item.',
      code: `/// @function can_place
/// @param {Struct.InventoryItem} item The item to test
/// @param {Real} gx Target grid column
/// @param {Real} gy Target grid row
/// @param {Bool} rotated Whether to test in rotated orientation
/// @param {Struct.InventoryItem} [ignore_item] Optional item to ignore (useful when moving)
static can_place = function(_item, _gx, _gy, _rotated = false, _ignore_item = undefined) {
    var _span_w = _rotated ? _item.height : _item.width;
    var _span_h = _rotated ? _item.width : _item.height;

    // 1. Boundary checking
    if (_gx < 0 || _gy < 0) return false;
    if (_gx + _span_w > cols || _gy + _span_h > rows) return false;

    // 2. Overlap / occupancy checking
    for (var _r = 0; _r < _span_h; _r++) {
        for (var _c = 0; _c < _span_w; _c++) {
            var _occupant = cells[_gy + _r][_gx + _c];
            if (_occupant != undefined && _occupant != _ignore_item) {
                return false; // Cell already taken by another item
            }
        }
    }

    return true;
};`,
    },
    {
      id: 'placement-removal-rotation',
      title: '4. Placement, Removal & 90-Degree Rotation',
      content: 'Here are the core container operations. When placing, all cells spanned by the item are set to the item struct. When removing, those cells are reset to undefined.',
      code: `/// @function place_item
static place_item = function(_item, _gx, _gy, _rotated = false) {
    if (!can_place(_item, _gx, _gy, _rotated)) return false;

    _item.grid_x = _gx;
    _item.grid_y = _gy;
    _item.rotated = _rotated;

    var _span_w = _item.get_span_width();
    var _span_h = _item.get_span_height();

    // Fill all covered cells with the item reference
    for (var _r = 0; _r < _span_h; _r++) {
        for (var _c = 0; _c < _span_w; _c++) {
            cells[_gy + _r][_gx + _c] = _item;
        }
    }

    if (array_get_index(items, _item) == -1) {
        array_push(items, _item);
    }
    return true;
};

/// @function remove_item
static remove_item = function(_item) {
    var _index = array_get_index(items, _item);
    if (_index == -1) return false;

    var _span_w = _item.get_span_width();
    var _span_h = _item.get_span_height();

    // Clear all cells occupied by this item
    for (var _r = 0; _r < _span_h; _r++) {
        for (var _c = 0; _c < _span_w; _c++) {
            var _cy = _item.grid_y + _r;
            var _cx = _item.grid_x + _c;
            if (_cy >= 0 && _cy < rows && _cx >= 0 && _cx < cols) {
                if (cells[_cy][_cx] == _item) {
                    cells[_cy][_cx] = undefined;
                }
            }
        }
    }

    array_delete(items, _index, 1);
    _item.grid_x = -1;
    _item.grid_y = -1;
    return true;
};

/// @function find_free_slot
/// @desc Scans top-to-bottom, left-to-right for the first slot that fits the item
static find_free_slot = function(_item, _rotated = false) {
    for (var _y = 0; _y < rows; _y++) {
        for (var _x = 0; _x < cols; _x++) {
            if (can_place(_item, _x, _y, _rotated)) {
                return { x: _x, y: _y };
            }
        }
    }
    return undefined; // Grid full or item doesn't fit
};`,
    },
    {
      id: 'mouse-interaction-and-dragging',
      title: '5. Drag-and-Drop Controller with Live Feedback',
      content: 'In Resident Evil, picking up an item lifts it from the attache case. As you hover over cells, the grid shows a real-time colored bounding box (green if valid, red if blocked). Pressing R rotates the dragged item.',
      code: `// Create Event of obj_inventory_ui
inv = new InventoryGrid(10, 6, 48);
origin_x = 120;
origin_y = 100;

dragged_item = undefined;
drag_origin_x = -1;
drag_origin_y = -1;
drag_origin_rot = false;
grab_cell_offset_x = 0;
grab_cell_offset_y = 0;

// Step Event
var _mx = device_mouse_x_to_gui(0);
var _my = device_mouse_y_to_gui(0);

// Calculate hover slot under mouse
var _hover_col = floor((_mx - origin_x) / inv.cell_size);
var _hover_row = floor((_my - origin_y) / inv.cell_size);

// 1. Mouse Pressed: Pick up item
if (mouse_check_button_pressed(mb_left)) {
    if (_hover_col >= 0 && _hover_col < inv.cols && _hover_row >= 0 && _hover_row < inv.rows) {
        var _clicked_item = inv.cells[_hover_row][_hover_col];
        if (_clicked_item != undefined) {
            dragged_item = _clicked_item;
            drag_origin_x = _clicked_item.grid_x;
            drag_origin_y = _clicked_item.grid_y;
            drag_origin_rot = _clicked_item.rotated;
            
            // Track cell offset from the item's top-left so it drags naturally
            grab_cell_offset_x = _hover_col - _clicked_item.grid_x;
            grab_cell_offset_y = _hover_row - _clicked_item.grid_y;

            // Remove temporarily while dragging so it doesn't block itself
            inv.remove_item(_clicked_item);
        }
    }
}

// 2. Rotate key while dragging
if (dragged_item != undefined && keyboard_check_pressed(ord("R"))) {
    dragged_item.rotated = !dragged_item.rotated;
    // Swap grab offset so pointer stays within the rotated item footprint
    var _temp = grab_cell_offset_x;
    grab_cell_offset_x = grab_cell_offset_y;
    grab_cell_offset_y = _temp;
}

// 3. Mouse Released: Commit placement or revert
if (mouse_check_button_released(mb_left) && dragged_item != undefined) {
    var _target_gx = _hover_col - grab_cell_offset_x;
    var _target_gy = _hover_row - grab_cell_offset_y;

    if (inv.can_place(dragged_item, _target_gx, _target_gy, dragged_item.rotated)) {
        // Valid drop
        inv.place_item(dragged_item, _target_gx, _target_gy, dragged_item.rotated);
    } else {
        // Blocked: Revert to original slot and rotation
        inv.place_item(dragged_item, drag_origin_x, drag_origin_y, drag_origin_rot);
    }
    dragged_item = undefined;
}`,
    },
    {
      id: 'rendering-the-grid-and-preview',
      title: '6. Draw GUI Pipeline: Slots, Items & Overlays',
      content: 'Draw the grid slots, placed items, and the hover preview with distinct valid (green) or blocked (red) outlines.',
      code: `// Draw GUI Event of obj_inventory_ui
var _cs = inv.cell_size;

// 1. Draw empty slot background grid
for (var _y = 0; _y < inv.rows; _y++) {
    for (var _x = 0; _x < inv.cols; _x++) {
        var _sx = origin_x + (_x * _cs);
        var _sy = origin_y + (_y * _cs);
        draw_set_color(c_dkgray);
        draw_rectangle(_sx, _sy, _sx + _cs, _sy + _cs, true);
    }
}

// 2. Draw placed items
for (var _i = 0; _i < array_length(inv.items); _i++) {
    var _item = inv.items[_i];
    var _ix = origin_x + (_item.grid_x * _cs);
    var _iy = origin_y + (_item.grid_y * _cs);
    var _iw = _item.get_span_width() * _cs;
    var _ih = _item.get_span_height() * _cs;

    // Draw item background panel
    draw_set_color(c_gray);
    draw_rectangle(_ix + 2, _iy + 2, _ix + _iw - 2, _iy + _ih - 2, false);

    // Draw item sprite and name
    if (sprite_exists(_item.sprite)) {
        var _ang = _item.rotated ? -90 : 0;
        draw_sprite_ext(_item.sprite, 0, _ix + (_iw / 2), _iy + (_ih / 2), 1, 1, _ang, c_white, 1);
    }
    draw_set_color(c_white);
    draw_text(_ix + 6, _iy + 6, _item.name);
}

// 3. Draw drag-and-drop preview
if (dragged_item != undefined) {
    var _mx = device_mouse_x_to_gui(0);
    var _my = device_mouse_y_to_gui(0);
    var _hover_col = floor((_mx - origin_x) / _cs);
    var _hover_row = floor((_my - origin_y) / _cs);
    var _target_gx = _hover_col - grab_cell_offset_x;
    var _target_gy = _hover_row - grab_cell_offset_y;

    var _pw = dragged_item.get_span_width() * _cs;
    var _ph = dragged_item.get_span_height() * _cs;
    var _px = origin_x + (_target_gx * _cs);
    var _py = origin_y + (_target_gy * _cs);

    var _valid = inv.can_place(dragged_item, _target_gx, _target_gy, dragged_item.rotated);
    var _color = _valid ? c_lime : c_red;

    // Semi-transparent indicator box
    draw_set_color(_color);
    draw_set_alpha(0.35);
    draw_rectangle(_px, _py, _px + _pw, _py + _ph, false);
    draw_set_alpha(1.0);
    draw_rectangle(_px, _py, _px + _pw, _py + _ph, true);
}`,
    },
    {
      id: 'best-practices-and-extensions',
      title: '7. Pro Tips & Advanced Extensions',
      content: 'Take your spatial inventory further with these production techniques:',
      steps: [
        'Tetris-Style Bitboard Optimization: For ultra-fast AI packing or auto-sorting algorithms, 64-bit integer masks can represent an 8x8 grid. A bitwise AND test ((grid_mask & item_mask) == 0) checks entire multi-cell footprints in a single CPU cycle.',
        'Audio Feedback on Rotate: Playing a mechanical metal latch sound whenever an item rotates (R key) gives the player physical feedback and matches Resident Evil’s visceral briefcase aesthetic.',
        'Item Stacking on Collision: When dropping an item onto a cell occupied by the same item type (e.g. 9mm Ammo on 9mm Ammo), check if the target item can accept a stack merge before rejecting the placement.',
        'Save / Load Serialization: Never serialize whole struct hierarchies with circular references. Save a lightweight JSON array of { id: item.id, gx: item.grid_x, gy: item.grid_y, rot: item.rotated }, and re-populate the container on load.',
      ],
    },
  ],
};

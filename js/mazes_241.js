var maze_db1 = [[], [], [], [], [], []];
var maze_db2 = [[], [], [], [], [], []];
var maze_populated = false;

// 4 bits to represent the walls
// 1   1    1     1
// up left down right

var wall_db = [
    {
        // 6x6 --> 36x1
        "walls": [
        12, 10, 9, 12, 10, 11,
        5, 12, 3, 6, 10, 9,
        5, 6, 9, 12, 10, 1,
        5, 14, 2, 3, 14, 1,
        4, 10, 9, 12, 11, 5,
        6, 11, 6, 3, 14, 3
        ]
    },
    {
        "walls": [
        14, 8, 11, 12, 8, 11,
        12, 3, 12, 3, 6, 9,
        5, 12, 3, 12, 10, 1,
        4, 3, 12, 3, 13, 5,
        5, 13, 5, 12, 3, 5,
        7, 6, 3, 6, 10, 3
        ]
    },
    {
        "walls": [
        12, 10, 9, 13, 12, 9,
        7, 13, 5, 6, 3, 5,
        12, 1, 5, 12, 9, 5,
        5, 5, 5, 5, 5, 5,
        5, 6, 3, 5, 5, 5,
        6, 10, 10, 3, 6, 3
        ]
    },
    {
        "walls": [
        12, 9, 14, 10, 10, 9,
        5, 5, 12, 10, 10, 1,
        5, 6, 3, 12, 11, 5,
        5, 14, 10, 2, 10, 1,
        4, 10, 10, 10, 9, 5,
        6, 10, 11, 14, 3, 7
        ],
    },
    {
        "walls": [
        14, 10, 10, 10, 8, 9,
        12, 10, 10, 8, 3, 7,
        4, 9, 14, 3, 12, 9,
        5, 6, 10, 9, 7, 5,
        5, 12, 10, 2, 11, 5,
        7, 6, 10, 10, 10, 3
        ]
    },
    {
        "walls": [
        13, 12, 9, 14, 8, 9,
        5, 5, 5, 12, 3, 5,
        4, 3, 7, 5, 12, 3,
        6, 9, 12, 1, 5, 13,
        12, 3, 7, 5, 6, 1,
        6, 10, 10, 3, 14, 3
        ]
    },
    {
        "walls": [
        12, 10, 10, 9, 12, 9,
        5, 12, 11, 6, 3, 5,
        6, 3, 12, 11, 12, 3,
        12, 9, 4, 10, 3, 13,
        5, 7, 6, 10, 9, 5,
        6, 10, 10, 10, 2, 3
        ]
    },
    {
        "walls": [
        13, 12, 10, 9, 12, 9,
        4, 2, 11, 6, 3, 5,
        5, 12, 10, 10, 9, 5,
        5, 6, 9, 14, 2, 3,
        5, 13, 6, 10, 10, 11,
        6, 2, 10, 10, 10, 11
        ]
    },
    {
        "walls": [
        13, 12, 10, 10, 8, 9,
        5, 5, 12, 11, 5, 5,
        4, 2, 3, 12, 3, 5,
        5, 13, 12, 3, 14, 1,
        5, 5, 5, 12, 9, 7,
        6, 3, 6, 3, 6, 11
        ]
    }
];

function populate_maze_db() {
    maze_db1[0][1] = 0;
    maze_db2[5][2] = 0;
    maze_db1[1][3] = 1;
    maze_db2[4][1] = 1;
    maze_db1[3][3] = 2;
    maze_db2[5][3] = 2;
    maze_db1[0][0] = 3;
    maze_db2[0][3] = 3;
    maze_db1[4][2] = 4;
    maze_db2[3][5] = 4;
    maze_db1[4][0] = 5;
    maze_db2[2][4] = 5;
    maze_db1[1][0] = 6;
    maze_db2[1][5] = 6;
    maze_db1[3][0] = 7;
    maze_db2[2][3] = 7;
    maze_db1[2][1] = 8;
    maze_db2[0][4] = 8;
}

var placed = {};
var lastPlacement = "-1";
var cur_maze = -1;
var start_marker = {x: -1, y: -1},
    stop_marker = {x: -1, y: -1};

function _object_count(obj) {
	var count = 0;
	for (var k in obj) {
		if (obj.hasOwnProperty(k)) {
		   ++count;
		}
	}
	return count;
}

function placements_made() {
	var placements = Array();
	for (var k in placed) {
		if (placed.hasOwnProperty(k)) {
			placements.push(k);
		}
	}
	return placements;
}

function _parse_placement(placestr) {
	var f = Object();
	f.x = parseInt(placestr[0]);
	f.y = parseInt(placestr[2]);
	return f;
}

function __circle_placement_callback(e) {
    var cell = e.currentTarget;
    var x = parseInt(cell.dataset.x), y = parseInt(cell.dataset.y);
    var placementString = "" + x + "_" + y;
    if (_object_count(placed) > 0 && lastPlacement != "-1" && placed[lastPlacement] !== undefined) {
        console.debug("Deleting last circle placement...");
        delete placed[lastPlacement];
        $("#mazeCell_" + lastPlacement).removeClass("placed");
        lastPlacement = "-1";
        reset_maze_walls();
    }
    placed[placementString] = 1;
    lastPlacement = placementString;
    $(cell).addClass("placed");

    if (_object_count(placed) > 0) {
        attempt_render_maze();
    }
}

// rotate mask right
function ror(dirmask) {
    return (dirmask == 8) ? 1 : (dirmask * 2);
}

// rotate mask left
function rol(dirmask) {
    return (dirmask == 1) ? 8 : (dirmask / 2);
}

function within_bounds(where, dirmask) {
    switch(dirmask) {
        case 1:
            return where[0] < 5;
        case 2:
            return where[1] < 5;
        case 4:
            return where[0] > 0;
        case 8:
            return where[1] > 0;
        default:
            alert('what');
    }
}

function _advance(dirmask) {
    return [
            ((dirmask & 5) > 0 ? 0 : 1),
            ((dirmask & 3) > 0 ? 1 : -1)
            ];
}

function _can_move_right(where, dirmask, maze_num) {
    return within_bounds(where, ror(dirmask)) && (wall_db[maze_num].walls[where[1]*6 + where[0]] & ror(dirmask)) == 0;
}

function _can_move_left(where, dirmask, maze_num) {
    return within_bounds(where, rol(dirmask)) && (wall_db[maze_num].walls[where[1]*6 + where[0]] & rol(dirmask)) == 0;
}

function _visited(where) {
    return $('#mazeCell_'+where[0]+'_'+where[1]).data('visited') != null;
}

function _can_move_forward(where, dirmask, maze_num) {
    return within_bounds(where, dirmask) && (wall_db[maze_num].walls[where[1]*6 + where[0]] & dirmask) == 0;
    }

function _build_path_segment(path_stack, dirmask, stop_marker, maze_num, level) {
    if (level > 36) {
        // we're doing something wrong if we go beyond 6x6 traversals
        console.log('recursion bugs ahoy');
        return null;
    }
    var head = path_stack[path_stack.length-1];
    console.debug('_build_path_segment -- ' + head);
    if (head[0] == stop_marker.x && head[1] == stop_marker.y) {
        return path_stack;
    }

    $('#mazeCell_'+head[0]+'_'+head[1]).data('visited', 1);

    var substack = clone(path_stack), target_node = null;
    head = substack[substack.length-1];
    if (_can_move_right(head, dirmask, maze_num)) {
        console.debug('\t wanna move right, dirmask: ' + dirmask);
        var d = _advance(ror(dirmask));
        target_node = head.slice(0, 2);
        target_node[d[0]] += d[1];
        if (!_visited(target_node)) {
            console.debug('\t moving right to ' + target_node);
            console.debug('\t new dirmask: ' + ror(dirmask));
            substack.push(target_node);
            substack = _build_path_segment(substack, ror(dirmask), stop_marker, maze_num, level+1);
            if (!substack) {
                substack = path_stack;
            } else {
                return substack;
            }
        } else {
            console.debug('\t already visited ' + target_node);
        }
    }
    if (_can_move_left(head, dirmask, maze_num)) {
        console.debug('\t wanna move left, dirmask: '+ dirmask);
        var d = _advance(rol(dirmask));
        console.debug('\t dimension: ' + d);
        target_node = head.slice(0, 2);
        target_node[d[0]] += d[1];
        if (!_visited(target_node)) {
            console.debug('\t moving left to ' + target_node);
            console.debug('\t new dirmask: ' + rol(dirmask));
            substack.push(target_node);
            substack = _build_path_segment(substack, rol(dirmask), stop_marker, maze_num, level+1);
            if (!substack) {
                substack = path_stack;
            } else {
                return substack;
            }
        } else {
            console.debug('\t already visited ' + target_node);
        }
    }
    if (_can_move_forward(head, dirmask, maze_num)) {
        console.debug('\t wanna move forward');
        var d = _advance(dirmask);
        target_node = head.slice(0, 2);
        target_node[d[0]] += d[1];
        if (!_visited(target_node)) {
            console.debug('\t moving forward to ' + target_node);
            substack.push(target_node);
            substack = _build_path_segment(substack, dirmask, stop_marker, maze_num, level+1);
            if (!substack) {
                substack = path_stack;
            } else {
                return substack;
            }
        }
    }
    var dirmask_180 = rol(rol(dirmask));
    if (_can_move_forward(head, dirmask_180, maze_num)) {
        console.debug('\t wanna move backward: dirmask = ' + dirmask_180);
        console.debug('\t current stack: ' + substack);
        var d = _advance(dirmask_180);
        target_node = head.slice(0, 2);
        target_node[d[0]] += d[1];
        if (!_visited(target_node)) {
            console.debug('\t moving backwards to ' + target_node);
            console.debug('\t new dirmask: ' + dirmask_180);
            substack.push(target_node);
            substack = _build_path_segment(substack, dirmask_180, stop_marker, maze_num, level+1);
            if (!substack) {
                substack = path_stack;
            } else {
                return substack;
            }
        }
    }

    return null;
}

function clone(arr) {
    var newarr = Array();
    arr.forEach(function(val, idx) {
        newarr.push(val);
    });
    return newarr;
}

function build_and_show_path() {
    console.debug("This is the part where I build out a maze at " +
        "(" + start_marker.x + ", " + start_marker.y + ") and " +
        "(" + stop_marker.x + ", " + stop_marker.y + ")");
    var path_stack = Array(), spoken_directions = Array();
    var previous_node = null;
    path_stack.push([start_marker.x, start_marker.y]);
    path_stack = _build_path_segment(path_stack, 1, stop_marker, cur_maze, 0);
    console.debug(path_stack);
    if (path_stack) {
        path_stack.forEach(function(val, idx) {
            $('#mazeCell_'+val[0]+'_'+val[1]).addClass('path-segment');
            if (previous_node) {
                switch([val[0]-previous_node[0], val[1]-previous_node[1]].toString()) {
                    case "-1,0":
                        spoken_directions.push("left");
                        break;
                    case "0,-1":
                        spoken_directions.push("up");
                        break;
                    case "1,0":
                        spoken_directions.push("right");
                        break;
                    case "0,1":
                        spoken_directions.push("down");
                        break;
                }
            }
            previous_node = val;
        });
        $('#mazeDirections').text(spoken_directions.join(', '));
    } else {
        console.log('we fail');
    }
    window.setTimeout(function() {
        $('td.mazeCell').unbind('click').click(reset_pane);
    }, 3000);
}

function place_start_marker(cell) {
    start_marker.x = parseInt(cell.dataset.x);
    start_marker.y = parseInt(cell.dataset.y);
    $(cell).addClass('start-marker');
}

function place_stop_marker(cell) {
    stop_marker.x = parseInt(cell.dataset.x);
    stop_marker.y = parseInt(cell.dataset.y);
    $(cell).addClass('stop-marker');
}

function __start_placement_callback(e) {
    place_start_marker(e.currentTarget);
    stop_placement_transition();
}

function __stop_placement_callback(e) {
    place_stop_marker(e.currentTarget);
    build_and_show_path();
}

function stop_placement_transition() {
    $('td.mazeCell').addClass('place-stop')
                    .unbind('click')
                    .click(__stop_placement_callback);
}

function start_placement_transition() {
    $('td.mazeCell').addClass('start-stop')
                    .unbind('click')
                    .click(__start_placement_callback);
}


function reset_maze_walls() {
    console.debug('resetting walls...');
    $('td.mazeCell').css("border-top", "none")
                    .css("border-left", "none")
                    .css("border-bottom", "none")
                    .css("border-right", "none")
                    .data('mask', null);
}

function build_walls(maze_number) {
    console.debug('building walls for #' + maze_number);
    $('td.mazeCell').each(function(idx, elem) {
        var x = parseInt(elem.dataset.x), y = parseInt(elem.dataset.y);
        var wall_mask = wall_db[maze_number].walls[y*6 + x];
        elem.dataset['mask'] = wall_mask;
        if (wall_mask & 8) {
            $(elem).css("border-top", "1px solid #fff");
        }
        if (wall_mask & 4) {
            $(elem).css("border-left", "1px solid #fff");
        }
        if (wall_mask & 2) {
            $(elem).css("border-bottom", "1px solid #fff");
        }
        if (wall_mask & 1) {
            $(elem).css("border-right", "1px solid #fff");
        }
    });
}

function attempt_render_maze() {
	var maze_scaffold = -1;
	var placements = placements_made();
	if (placements.length != 1) {
		return;
	}
	placements.forEach(function(c, i, arr) {
		var pcoords = _parse_placement(c);
		if (maze_db1[pcoords.x][pcoords.y] !== undefined) {
			maze_scaffold = maze_db1[pcoords.x][pcoords.y];
		} else if (maze_db2[pcoords.x][pcoords.y] !== undefined) {
			maze_scaffold = maze_db2[pcoords.x][pcoords.y];
		}
	});
	if (maze_scaffold != -1) {
		// we have a match, render it
        cur_maze = maze_scaffold;
        build_walls(parseInt(maze_scaffold));
        start_placement_transition();
	}
}

function reset_pane() {
    reset_maze_walls();
    placed = {};
    lastPlacement = "-1";
    cur_maze = -1;
    start_marker.x = start_marker.y = -1;
    stop_marker.x = stop_marker.y = -1;
    $('#mazeDirections').text('Place an indicator by clicking on one of the maze cells, followed by the begin and end markers.');
    $('td.mazeCell').removeClass('path-segment start-stop place-stop placed start-marker stop-marker')
                    .data('visited', null)
                    .unbind('click')
                    .click(__circle_placement_callback);
}

populate_maze_db();
reset_pane();
$("td.mazeCell").click(__circle_placement_callback);

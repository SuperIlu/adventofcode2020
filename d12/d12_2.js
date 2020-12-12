var lines;

function Setup() {
	var input = Read("d12/input.txt");
	lines = input.trim().split("\n");
}

function Loop() {
	// 0 == EAST, 1 = SOUTH, 2 = WEST, 3 = NORTH
	var heading = 0;

	// x-pos := east, neg := west
	// y-pos := south, neg := north
	var pos = [0, 0];
	var wp = [10, -1];

	for (var i = 0; i < lines.length; i++) {
		var l = lines[i].trim();
		var inst = lines[i].charAt(0);
		var num = parseInt(lines[i].substring(1));
		switch (inst) {
			case "N":
				wp[1] -= num;
				break;
			case "S":
				wp[1] += num;
				break;
			case "E":
				wp[0] += num;
				break;
			case "W":
				wp[0] -= num;
				break;
			case "L":
				for (var r = 0; r < num / 90; r++) {
					wp = [wp[1], -wp[0]];
				}
				break;
			case "R":
				for (var r = 0; r < num / 90; r++) {
					wp = [-wp[1], wp[0]];
				}
				break;
			case "F":
				pos[0] += wp[0] * num;
				pos[1] += wp[1] * num;
				break;
			default:
				throw "unknown instruction: " + inst;
		}
	}
	Println("x=" + pos[0] + ", y=" + pos[1] + ", mPos=" + (Math.abs(pos[0]) + Math.abs(pos[1])));

	Stop();
}


function Input(e) { }

/**
sin(90deg) = 1
cos(90deg) = 0

sin(-90deg) = -1
cos(-90deg) = 0

x' = x*cos - y*sin
y' = x*sin + y*cos

+90deg:
x = 0 - y
y = x + 0

-90deg:
x =  0 + y
y = -x + 0
*/
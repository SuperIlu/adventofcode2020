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

	for (var i = 0; i < lines.length; i++) {
		var inst = lines[i].charAt(0);
		var num = parseInt(lines[i].substring(1));
		switch (inst) {
			case "N":
				pos[1] -= num;
				break;
			case "S":
				pos[1] += num;
				break;
			case "E":
				pos[0] += num;
				break;
			case "W":
				pos[0] -= num;
				break;
			case "L":
				heading = (heading + 4 - (num / 90)) % 4;
				break;
			case "R":
				heading = (heading + (num / 90)) % 4;
				break;
			case "F":
				switch (heading) {
					case 0:
						pos[0] += num;
						break;
					case 1:
						pos[1] += num;
						break;
					case 2:
						pos[0] -= num;
						break;
					case 3:
						pos[1] -= num;
						break;
					default:
						throw "Unknown heading: " + heading;
				}
				break;
			default:
				throw "unknown instruction: " + inst;
		}
	}
	Println("x=" + pos[0] + ", y=" + pos[1] + ", mPos=" + (Math.abs(pos[0]) + Math.abs(pos[1])));

	Stop();
}


function Input(e) { }


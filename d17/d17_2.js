var startPocket;

var ACTIVE = '#';
var INACTIVE = '.';

function Setup() {
	startPocket = createPocket();

	var input = Read("d17/input.txt");
	lines = input.trim().split("\n");
	for (var y = 0; y < lines.length; y++) {
		var l = lines[y].trim();
		for (var x = 0; x < l.length; x++) {
			setCube(startPocket, x, y, 0, 0, l.charAt(x));
		}
	}
}

function createPocket() {
	return {
		'minW': 0,
		'minX': 0,
		'minY': 0,
		'minZ': 0,
		'maxW': 0,
		'maxX': 0,
		'maxY': 0,
		'maxZ': 0
	};
}

function setCube(pocket, x, y, z, w, v) {
	if (v != INACTIVE) {
		var key = x + "x" + y + "x" + z + "x" + w;
		pocket[key] = v;

		pocket['minW'] = Math.min(pocket['minW'], w);
		pocket['maxW'] = Math.max(pocket['maxW'], w);
		pocket['minX'] = Math.min(pocket['minX'], x);
		pocket['maxX'] = Math.max(pocket['maxX'], x);
		pocket['minY'] = Math.min(pocket['minY'], y);
		pocket['maxY'] = Math.max(pocket['maxY'], y);
		pocket['minZ'] = Math.min(pocket['minZ'], z);
		pocket['maxZ'] = Math.max(pocket['maxZ'], z);
	}
}

function getCube(pocket, x, y, z, w) {
	var key = x + "x" + y + "x" + z + "x" + w;
	if (key in pocket) {
		return pocket[key];
	} else {
		return INACTIVE;
	}
}

function activeNeighbors(pocket, x, y, z, w) {
	var numActive = 0;
	for (var Cw = w - 1; Cw <= w + 1; Cw++) {
		for (var Cx = x - 1; Cx <= x + 1; Cx++) {
			for (var Cy = y - 1; Cy <= y + 1; Cy++) {
				for (var Cz = z - 1; Cz <= z + 1; Cz++) {
					if (Cx == x && Cy == y && Cz == z && Cw == w) {
						continue;
					}
					if (getCube(pocket, Cx, Cy, Cz, Cw) == ACTIVE) {
						numActive++;
					}
				}
			}
		}
	}
	return numActive;
}

function countActive(pocket) {
	var count = 0;
	for (var z = pocket.minZ; z <= pocket.maxZ; z++) {
		for (var y = pocket.minY; y <= pocket.maxY; y++) {
			for (var x = pocket.minX; x <= pocket.maxX; x++) {
				for (var w = pocket.minW; w <= pocket.maxW; w++) {
					if (getCube(pocket, x, y, z, w) == ACTIVE) {
						count++;
					}
				}
			}
		}
	}
	return count;
}

function Loop() {
	var pocket = startPocket;


	for (var cycle = 0; cycle < 6; cycle++) {
		var newPocket = createPocket();
		// iterate over all cubes that possibly can be affected
		for (var w = pocket['minW'] - 1; w <= pocket['maxW'] + 1; w++) {
			for (var x = pocket['minX'] - 1; x <= pocket['maxX'] + 1; x++) {
				for (var y = pocket['minY'] - 1; y <= pocket['maxY'] + 1; y++) {
					for (var z = pocket['minZ'] - 1; z <= pocket['maxZ'] + 1; z++) {
						var num = activeNeighbors(pocket, x, y, z, w);
						var state = getCube(pocket, x, y, z, w);
						if (state == ACTIVE && num != 2 && num != 3) {
							setCube(newPocket, x, y, z, w, INACTIVE);
						} else if (state == INACTIVE && num == 3) {
							setCube(newPocket, x, y, z, w, ACTIVE);
						} else {
							setCube(newPocket, x, y, z, w, state);
						}
					}
				}
			}
		}
		pocket = newPocket;
	}

	Println("active=" + countActive(pocket));

	Stop();
}

function Input(e) { }


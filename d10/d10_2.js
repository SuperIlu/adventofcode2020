var lines;

var deviceJoltage;

function Setup() {
	var input = Read("d10/input.txt");
	lines = input.trim().split("\n");
	for (var i = 0; i < lines.length; i++) {
		lines[i] = parseInt(lines[i].trim());
	}
	deviceJoltage = Math.max.apply(null, lines) + 3;
}

// the idea on how to solve this is from https://github.com/elvinyhlee/advent-of-code-2020-python/blob/master/day10.py
// start from the beginning (or the end) and count the number of times each of the available joltages can be reached from there.
function Loop() {
	var qnd = lines.slice();
	qnd.push(deviceJoltage);
	qnd.sort(function (a, b) {
		return a - b;
	});

	var res = {};
	res[0] = 1;
	for (var i = 0; i < qnd.length; i++) {
		var joltage = qnd[i];
		var j1 = (joltage - 1).toString();
		var j2 = (joltage - 2).toString();
		var j3 = (joltage - 3).toString();

		var reachCount = 0;
		if (j1 in res) {
			reachCount += res[j1];
		}
		if (j2 in res) {
			reachCount += res[j2];
		}
		if (j3 in res) {
			reachCount += res[j3];
		}
		res[joltage] = reachCount;
	}
	Println(JSON.stringify(res[deviceJoltage]));
	Stop();
}

function Input(e) { }

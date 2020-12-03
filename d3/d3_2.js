var idx1 = 0;
var idx2 = 1;
var idx3 = 2;
var lines;
var width;

function Setup() {
	var input = Read("d3/input.txt");
	lines = input.trim().split("\n");
	for (var i = 0; i < lines.length; i++) {
		lines[i] = lines[i].trim();
	}
	width = lines[0].length;
	Println("width=" + width + " '" + lines[0] + "'");
}

function Loop() {
	var rules = [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2],
	];

	var product = 1;
	for (var i = 0; i < rules.length; i++) {
		var res = checkSlope(rules[i][0], rules[i][1]);
		Println("Trees(" + rules[i][0] + "," + rules[i][1] + ")=" + res);
		product *= res;
	}
	Println("Result=" + product);
	Stop();
}

function checkSlope(xInc, yInc) {
	var trees = 0;
	var y = 0;
	var x = 0;

	while (y < lines.length) {
		//Println(x + "," + y + " (" + (x % width) + ")");
		if (lines[y].charAt(x % width) == '#') {
			trees++;
		}
		x += xInc;
		y += yInc;
	}
	return trees;
}

function Input(e) { }


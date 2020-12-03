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
	var trees = 0;
	var y = 0;
	var x = 0;

	while (y < lines.length) {
		//Println(x + "," + y + " (" + (x % width) + ")");
		if (lines[y].charAt(x % width) == '#') {
			trees++;
		}
		x += 3;
		y += 1;
	}
	Println("Trees=" + trees);
	Stop();
}

function Input(e) { }


var lines;
var preSize;

function Setup() {
	var input = Read("d9/input.txt");
	lines = input.trim().split("\n");
	for (var i = 0; i < lines.length; i++) {
		lines[i] = parseFloat(lines[i].trim());
	}
	preSize = 25;
}

function Loop() {
	for (var i = preSize; i < lines.length; i++) {
		if (!checkBlock(lines[i], lines.slice(i - preSize, i))) {
			Println("FAIL " + i + " := " + lines[i]);
		}
	}

	Stop();
}

function checkBlock(sum, block) {
	for (var i = 0; i < block.length; i++) {
		for (var j = 1; j < block.length; j++) {
			if (block[i] + block[j] == sum) {
				return true;
			}
		}
	}
	return false;
}

function Input(e) { }


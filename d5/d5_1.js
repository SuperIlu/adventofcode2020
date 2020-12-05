function Setup() {
	var input = Read("d5/input.txt");
	lines = input.trim().split("\n");
}

function Loop() {
	var passes = [];
	for (var i = 0; i < lines.length; i++) {
		var rule = lines[i].trim();
		var seat = partRow(rule, 0, 127, 0, 7);
		// Println(rule + " := " + JSON.stringify(seat))
		passes.push(seat);
	}

	var max = passes.map(function (e) { return e[2]; }).reduce(function (a, b) {
		return Math.max(a, b);
	});

	Println("max ID = " + max);

	Stop();
}

function partRow(rule, rowStart, rowEnd, colStart, colEnd) {
	// Println("row=" + JSON.stringify([rule, rowStart, rowEnd, colStart, colEnd]));
	var first = rule.charAt(0);
	var rest = rule.substring(1);
	var size = Math.floor((rowEnd - rowStart) / 2);

	if (first == "F") {
		return partRow(rest, rowStart, rowStart + size, colStart, colEnd);
	} else if (first == "B") {
		return partRow(rest, rowEnd - size, rowEnd, colStart, colEnd);
	} else {
		return partCol(rule, rowStart, rowEnd, colStart, colEnd);
	}
}

function partCol(rule, rowStart, rowEnd, colStart, colEnd) {
	// Println("col=" + JSON.stringify([rule, rowStart, rowEnd, colStart, colEnd]));
	var first = rule.charAt(0);
	var rest = rule.substring(1);
	var size = Math.floor((colEnd - colStart) / 2);

	if (rule.length <= 0) {
		if ((rowStart != rowEnd) || (colStart != colEnd)) {
			throw "result error" + JSON.stringify([rule, rowStart, rowEnd, colStart, colEnd]);
		}
		return [rowStart, colStart, calculateId(rowStart, colStart)];
	} else if (first == "L") {
		return partCol(rest, rowStart, rowEnd, colStart, colStart + size);
	} else if (first == "R") {
		return partCol(rest, rowStart, rowEnd, colEnd - size, colEnd);
	} else {
		throw "Unknown rule: " + rule;
	}
}

function calculateId(row, col) {
	return row * 8 + col;
}

function Input(e) { }


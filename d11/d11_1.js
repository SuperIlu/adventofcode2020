var lines;
var lineLength;

function Setup() {
	var input = Read("d11/input.txt");
	lines = input.trim().split("\n");
	for (var i = 0; i < lines.length; i++) {
		lines[i] = lines[i].trim().split("");
	}
	lineLength = lines[0].length;
	Println("lineLength=" + lineLength);
}

function Loop() {
	var iterations = 0;
	var hasChanged = true;
	var last = lines;
	while (hasChanged) {
		//dump(last);
		var deepClone = JSON.parse(JSON.stringify(last));
		hasChanged = false;

		for (var l = 0; l < last.length; l++) {
			for (var c = 0; c < lineLength; c++) {
				switch (last[l][c]) {
					case "L": // empty seat
						if (countOcupied(last, l, c) == 0) {
							deepClone[l][c] = "#";
							hasChanged = true;
						}
						break;
					case "#": // occupied seat
						if (countOcupied(last, l, c) >= 4) {
							deepClone[l][c] = "L";
							hasChanged = true;
						}
						break;
					case ".": // floor
						break;
				}
			}
		}
		last = deepClone;
		iterations++;
	}

	var res = 0;
	for (var l = 0; l < last.length; l++) {
		for (var c = 0; c < lineLength; c++) {
			if (last[l][c] == "#") {
				res++;
			}
		}
	}
	Println("Interations = " + iterations);
	Println("Result = " + res);
	Stop();
}

function dump(data) {
	var res = "\n";
	for (var i = 0; i < data.length; i++) {
		res += data[i].join("") + "\n";
	}
	Println(res);
}

function countOcupied(data, l, c) {
	var res = 0;

	// left
	try {
		if (data[l - 1][c - 1] == "#") {
			res += 1;
		}
	} catch (e) { }
	try {
		if (data[l][c - 1] == "#") {
			res += 1;
		}
	} catch (e) { }
	try {
		if (data[l + 1][c - 1] == "#") {
			res += 1;
		}
	} catch (e) { }

	// right
	try {
		if (data[l - 1][c + 1] == "#") {
			res += 1;
		}
	} catch (e) { }
	try {
		if (data[l][c + 1] == "#") {
			res += 1;
		}
	} catch (e) { }
	try {
		if (data[l + 1][c + 1] == "#") {
			res += 1;
		}
	} catch (e) { }

	// above and below
	try {
		if (data[l - 1][c] == "#") {
			res += 1;
		}
	} catch (e) { }
	try {
		if (data[l + 1][c] == "#") {
			res += 1;
		}
	} catch (e) { }

	//Println(l + "x" + c + "=" + res);

	return res;
}

function Input(e) { }

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
						if (countOcupied(last, l, c) >= 5) {
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
	var cc = c;
	var ll = l;
	while (cc > 0) {
		cc--;
		if (data[ll][cc] == "#") {
			res++;
			break;
		} else if (data[ll][cc] == "L") {
			break;
		}
	}

	// right
	var cc = c;
	var ll = l;
	while (cc < lineLength - 1) {
		cc++;
		if (data[ll][cc] == "#") {
			res++;
			break;
		} else if (data[ll][cc] == "L") {
			break;
		}
	}

	// up
	var cc = c;
	var ll = l;
	while (ll > 0) {
		ll--;
		if (data[ll][cc] == "#") {
			res++;
			break;
		} else if (data[ll][cc] == "L") {
			break;
		}
	}

	// down
	var cc = c;
	var ll = l;
	while (ll < data.length - 1) {
		ll++;
		if (data[ll][cc] == "#") {
			res++;
			break;
		} else if (data[ll][cc] == "L") {
			break;
		}
	}


	// up-left
	var cc = c;
	var ll = l;
	while (ll > 0 && cc > 0) {
		ll--;
		cc--;
		if (data[ll][cc] == "#") {
			res++;
			break;
		} else if (data[ll][cc] == "L") {
			break;
		}
	}

	// down-left
	var cc = c;
	var ll = l;
	while (ll < data.length - 1 && cc > 0) {
		ll++;
		cc--;
		if (data[ll][cc] == "#") {
			res++;
			break;
		} else if (data[ll][cc] == "L") {
			break;
		}
	}

	// up-right
	var cc = c;
	var ll = l;
	while (ll > 0 && cc < lineLength - 1) {
		ll--;
		cc++;
		if (data[ll][cc] == "#") {
			res++;
			break;
		} else if (data[ll][cc] == "L") {
			break;
		}
	}

	// down-right
	var cc = c;
	var ll = l;
	while (ll < data.length - 1 && cc < lineLength - 1) {
		ll++;
		cc++;
		if (data[ll][cc] == "#") {
			res++;
			break;
		} else if (data[ll][cc] == "L") {
			break;
		}
	}

	return res;
}

function Input(e) { }

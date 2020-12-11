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

function Loop() {
	Println("deviceJoltage=" + deviceJoltage);
	Println("lines = " + JSON.stringify(lines));

	var qnd = lines.slice();
	qnd.push(0);
	qnd.push(deviceJoltage);
	qnd.sort(function (a, b) {
		return a - b;
	});

	var res = countDifferences(qnd);
	Println(JSON.stringify(res));

	Println("mul=" + res[1] * res[3]);


	Stop();
}

function countDifferences(chain) {
	var ret = [0, 0, 0, 0];
	for (var i = 0; i < chain.length - 1; i++) {
		var diff = chain[i + 1] - chain[i];
		ret[diff]++;
	}
	return ret;
}

function Input(e) { }


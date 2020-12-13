var start;
var busses;

var DEMO_INDEX = 1;

function Setup() {
	var input = Read("d13/input.txt");
	var lines = input.trim().split("\n");
	start = parseInt(lines[0]);
	busses = lines[DEMO_INDEX].split(",").map(function (e) {
		if (e == "x") {
			return null;
		} else {
			return parseInt(e);
		}
	});
}

// solution copied from C version of
// https://rosettacode.org/wiki/Chinese_remainder_theorem

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! the result calculated in JS is wrong due to limited number range !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function Loop() {
	a = [];
	n = [];
	for (var i = 0; i < busses.length; i++) {
		if (busses[i]) {
			a.push(busses[i]);
			n.push(busses[i] - i);
		}
	}
	Println(chinese_remainder(a, n));

	Stop();
}

// returns x where (a * x) % b == 1
function mul_inv(a, b) {
	var b0 = b, t, q;
	var x0 = 0, x1 = 1;
	if (b == 1) {
		return 1;
	}
	while (a > 1) {
		q = Math.floor(a / b);
		t = b, b = a % b, a = t;
		t = x0, x0 = x1 - q * x0, x1 = t;
	}
	if (x1 < 0) {
		x1 += b0;
	}
	return x1;
}

function chinese_remainder(n, a) {
	var p, i, prod = 1, sum = 0;

	for (i = 0; i < n.length; i++) {
		prod *= n[i];
	}

	for (i = 0; i < n.length; i++) {
		p = Math.floor(prod / n[i]);
		sum += a[i] * mul_inv(p, n[i]) * p;
	}

	return sum % prod;
}

function Input(e) { }

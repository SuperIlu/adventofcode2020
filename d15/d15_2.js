var input = [0, 3, 6];
//var input = [0, 13, 16, 17, 1, 10, 6];

var spoken = {};
var turn;

function Setup() {
	turn = 1;
	for (var t = 0; t < input.length; t++) {
		spoken[input[t]] = [turn, -1];
		turn++;
	}
	lastNum = input[input.length - 1];
}

function updateSpoken(turn, num) {
	var oldInfo = spoken[num];
	if (oldInfo) {
		spoken[num] = [turn, oldInfo[0]];
	} else {
		spoken[num] = [turn, -1];
	}
}

function wasSpoken(turn, num) {
	var info = spoken[num];
	return info && ((info[0] != turn - 1) || (info[1] != -1));
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! JS ran out of memory !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!
function Loop() {
	var spokenNum;
	var firstTime;

	while (true) {
		if (wasSpoken(turn, lastNum)) {
			var info = spoken[lastNum];
			spokenNum = (turn - 1) - info[1];
			firstTime = true;
		} else {
			firstTime = false;
			spokenNum = 0;
		}
		updateSpoken(turn, spokenNum);

		turn++;
		lastNum = spokenNum;

		if ((turn % 10000) == 0) {
			Println(turn)
		}

		if (turn == 30000000 + 1) { // we are interested in the 30000000th number
			break;
		}
	}

	Println("result=" + spokenNum);

	Stop();
}

function Input(e) { }


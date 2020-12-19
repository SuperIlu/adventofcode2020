//var input = [0, 3, 6]; // 438
//var input = [3, 1, 2]; // 1836
var input = [0, 13, 16, 17, 1, 10, 6];

var spoken = [];

function Setup() {
	spoken = spoken.concat(input);
}

function Loop() {
	while (true) {
		var turn = spoken.length + 1;
		var lastNum = spoken[spoken.length - 1];
		var lastIndex = -1;
		for (var i = spoken.length - 2; i >= 0; i--) {
			if (spoken[i] == lastNum) {
				lastIndex = i;
				break;
			}
		}

		if (lastIndex == -1) {
			spoken.push(0);
		} else {
			spoken.push(spoken.length - (lastIndex + 1));
		}


		if (turn == 2020) { // we are interested in the 2020th number
			break;
		}
	}

	Println(spoken[spoken.length - 1]);

	Stop();
}

function Input(e) { }


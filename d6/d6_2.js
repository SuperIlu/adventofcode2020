var lines;
var data = [];

var questions = "abcdefghijklmnopqrstuvwxyz".split("");

function Setup() {
	var input = Read("d6/input.txt");
	lines = input.trim().split("\n");
}

function Loop() {
	var current = { size: 0 };
	for (var i = 0; i < lines.length; i++) {
		var l = lines[i].trim();
		if (l) {
			current['size']++;
			var parts = l.split("");
			for (var j = 0; j < parts.length; j++) {
				if (parts[j] in current) {
					current[parts[j]]++;
				} else {
					current[parts[j]] = 1;
				}
			}
		} else {
			data.push(current);
			current = { size: 0 };
		}
	}
	data.push(current);

	Println("Groups=" + data.length);

	var sum = 0;
	for (var j = 0; j < data.length; j++) {
		var group = data[j];
		var q = 0;
		for (var i = 0; i < questions.length; i++) {
			if (questions[i] in group && group[questions[i]] == group['size']) {
				q++;
			}
		}
		//Println("Group #" + j + " := " + q);
		sum += q;
	}
	Println("result=" + sum);

	Stop();
}

function Input(e) { }


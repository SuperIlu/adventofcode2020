var lines;

function Setup() {
	var input = Read("d8/input.txt");
	lines = input.trim().split("\n");
	for (var i = 0; i < lines.length; i++) {
		lines[i] = lines[i].trim().split(" ");
	}
}

function Loop() {
	// Println(JSON.stringify(lines));

	var acc = 0;
	var pc = 0;
	var history = [];

	while (!(history.indexOf(pc) != -1)) {
		// Println("ACC=" + acc);
		// Println("PC=" + pc);
		// Println("history=" + JSON.stringify(history));
		history.push(pc);

		var inst = lines[pc][0];
		var arg = parseInt(lines[pc][1]);
		switch (inst) {
			case "nop":
				pc++;
				break;
			case "acc":
				acc += arg;
				pc++;
				break;
			case "jmp":
				pc += arg;
				break;
			default:
				throw "Unknown instruction: " + JSON.stringify(lines[pc]);
		}
	}
	Println("ACC=" + acc);

	Stop();
}

function Input(e) { }


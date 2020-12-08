var lines;

function Setup() {
	var input = Read("d8/input.txt");
	lines = input.trim().split("\n");
	for (var i = 0; i < lines.length; i++) {
		lines[i] = lines[i].trim().split(" ");
	}
}

function Loop() {
	for (var i = 0; i < lines.length; i++) {
		var ret = runCode(alterCode(lines, i));
		if (ret[0]) {
			Println(i + " success=" + ret[0] + ", ACC=" + ret[1]);
			break;
		}
	}

	Stop();
}

function alterCode(orig, i) {
	var ret = JSON.parse(JSON.stringify(orig));
	if (ret[i][0] == "nop") {
		ret[i][0] = "jmp";
	} else if (ret[i][0] == "jmp") {
		ret[i][0] = "nop";
	}
	return ret;
}

function runCode(code) {
	var acc = 0;
	var pc = 0;
	var history = [];
	var success = false;

	while (!(history.indexOf(pc) != -1)) {
		// Println("ACC=" + acc);
		// Println("PC=" + pc);
		// Println("history=" + JSON.stringify(history));
		history.push(pc);

		var inst = code[pc][0];
		var arg = parseInt(code[pc][1]);
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
				throw "Unknown instruction: " + JSON.stringify(code[pc]);
		}
		if (pc == code.length) {
			success = true;
			break;
		}
	}

	return [success, acc];
}

function Input(e) { }


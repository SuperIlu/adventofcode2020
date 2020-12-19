var lines;

function Setup() {
	var input = Read("d14/input.txt");
	lines = input.trim().split("\n");
	for (var i = 0; i < lines.length; i++) {
		lines[i] = lines[i].trim();
	}
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! the result calculated in JS is wrong due to limited number range !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function Loop() {
	var mem = {};
	var andMask = 0xFFFFFFFFF;
	var orMask = 0x000000000;

	for (var i = 0; i < lines.length; i++) {
		var inst = lines[i].trim().split("=");
		var cmd = inst[0].trim();
		var param = inst[1].trim();
		if (cmd == 'mask') {
			andMask = 0xFFFFFFFFF;
			orMask = 0x000000000;
			for (var b = 0; b < 36; b++) {
				var ch = param.charAt(35 - b);
				if (ch == '1') {
					orMask |= (1 << b);	// set bit in orMask at 1 positions
				} else if (ch == '0') {
					andMask &= ~(1 << b);	// clear bit in andMask at 0 positions
				} else if (ch != 'X') {
					throw "Illegal mask: " + inst;
				}
			}
		} else if (cmd.startsWith('mem')) {
			var match = cmd.match(/^mem\[(\d+)\]$/);
			if (!match) {
				throw "Illegal address: " + inst;
			}
			var addr = parseInt(match[1]);
			var val = parseInt(param);
			val &= andMask;
			val |= orMask;
			mem[addr] = val;
		} else {
			throw "Illegal instruction: " + inst;
		}
	}

	// Println(JSON.stringify(mem));
	var sum = 0;
	for (var k in mem) {
		sum += mem[k];
	}
	Println(sum);

	Stop();
}

function Input(e) { }


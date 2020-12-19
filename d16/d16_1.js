var rules = {};
var otherTickets = [];
var ownTicket = [];

function Setup() {
	var state = 0;
	var input = Read("d16/input.txt");
	lines = input.trim().split("\n");
	for (var i = 0; i < lines.length; i++) {
		var l = lines[i].trim();
		if (l.startsWith("your ticket:")) {
			state = 1;
		} else if (l.startsWith("nearby tickets:")) {
			state = 2;
		} else {
			if (l.length > 0) {
				switch (state) {
					case 0:// process rule
						var parts = l.split(": ");
						var name = parts[0];
						var ranges = parts[1].split(" or ");
						rules[name] = convertRanges(ranges);
						break;
					case 1:// process own ticket
						ownTicket = l.split(",");
						break;
					case 2:// process other tickets
						otherTickets.push(l.split(","));
						break;
				}
			}
		}
	}
}

function convertRanges(ranges) {
	var valid = {};
	for (var i = 0; i < ranges.length; i++) {
		var parts = ranges[i].split("-");
		var from = parseInt(parts[0]);
		var to = parseInt(parts[1]);
		for (var v = from; v <= to; v++) {
			valid[v] = true;
		}
	}
	return valid;
}

function Loop() {
	var sum = 0;
	for (var i = 0; i < otherTickets.length; i++) {
		var t = otherTickets[i];
		for (var j = 0; j < t.length; j++) {
			var num = parseInt(t[j]);
			var isIn = false;
			for (var rk in rules) {
				var rule = rules[rk];
				if (rule[num]) {
					isIn = true;
					break;
				}
			}
			if (!isIn) {
				sum += num;
			}
		}
	}
	Println(sum);

	Stop();
}

function Input(e) { }


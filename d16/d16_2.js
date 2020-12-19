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

function removeCandidate(candidates, num) {
	var changed = false;
	for (var c in candidates) {
		if (candidates[c].length > 1) {
			var idx = candidates[c].indexOf(num);
			if (idx != -1) {
				candidates[c].splice(idx, 1);
				changed = true;
			}
		}
	}
	return changed;
}

function Loop() {
	var validTickets = [];

	// filter out invalid tickets
	for (var i = 0; i < otherTickets.length; i++) {
		var t = otherTickets[i];
		var isValid = true;
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
				isValid = false;
			}
		}
		if (isValid) {
			validTickets.push(t);
		}
	}

	// apply rule to all fields on the valid tickets to find candidates
	var candidates = {};
	for (var rk in rules) {
		candidates[rk] = [];
		var rule = rules[rk];
		for (var idx = 0; idx < ownTicket.length; idx++) {
			var match = true;
			for (var i = 0; i < validTickets.length; i++) {
				if (!rule[validTickets[i][idx]]) {
					match = false;
					break;
				}
			}
			if (match) {
				candidates[rk].push(idx);
			}
		}
	}

	// eleminate candidates by finding entries left with only one viabel candidate
	var changed = true;
	while (changed) {
		changed = false;
		for (var c in candidates) {
			if (candidates[c].length == 1) {
				changed |= removeCandidate(candidates, candidates[c][0]);
			}
		}
	}

	// multiply fields from ticket
	var factor = 1;
	for (var c in candidates) {
		if (c.startsWith('departure')) {
			factor *= ownTicket[candidates[c][0]];
			Println(c + " (" + candidates[c][0] + ") = " + ownTicket[candidates[c][0]]);
		}
	}
	Println(factor);

	Stop();
}

function Input(e) { }


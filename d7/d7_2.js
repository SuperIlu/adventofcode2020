var lines;
var allRules = {};


function Setup() {
	var input = Read("d7/input.txt");
	lines = input.trim().split("\n");
}

function Loop() {
	var current = { 'rules': {} };
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i].trim();
		if (line.endsWith("no other bags.")) {
			// get name of the bag
			var regMatch = line.match(/^(\w+ \w+) bags contain no other bags.$/);
			if (!regMatch) {
				throw "1: RexEx does not match: " + line;
			}
			var name = regMatch[1];
			current['name'] = name;

		} else {
			// get name of the bag
			var regMatch = line.match(/^(\w+ \w+) bags contain (.+).$/);
			if (!regMatch) {
				throw "2: RexEx does not match: " + line;
			}
			var name = regMatch[1];
			current['name'] = name;

			// get rules
			var rules = regMatch[2];
			var parts = rules.split(", ");
			for (var r = 0; r < parts.length; r++) {
				var ruleMatch = parts[r].match(/^(\d+) (\w+ \w+) bags?$/);
				if (!ruleMatch) {
					throw "3: RexEx does not match: " + parts[r];
				}
				current.rules[ruleMatch[2]] = ruleMatch[1];
			}
		}
		allRules[current.name] = current;
		current = { 'rules': {} };
	}

	// pass in starter set
	var result = mustContain('shiny gold');
	Println("Result=" + (result - 1));

	Stop();
}

function canContain(bagList) {
	while (true) {
		var startSize = Object.keys(bagList).length;
		allRules.forEach(function (e) {
			Object.keys(bagList).forEach(function (b) {
				if (b in e.rules) {
					bagList[e.name] = true;
				}
			});
		});
		var endSize = Object.keys(bagList).length;
		if (startSize == endSize) {
			return endSize;
		}
	}
}

function mustContain(s) {
	var ruleKeys = Object.keys(allRules[s].rules);

	if (ruleKeys.length == 0) {
		return 1;
	} else {
		var count = 1;
		for (var i = 0; i < ruleKeys.length; i++) {
			count += mustContain(ruleKeys[i]) * parseInt(allRules[s].rules[ruleKeys[i]]);
		}
		return count;
	}
}

function Input(e) { }


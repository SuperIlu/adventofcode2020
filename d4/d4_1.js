var req = [
	"byr",	// (Birth Year)
	"iyr",	// (Issue Year)
	"eyr",	// (Expiration Year)
	"hgt",	// (Height)
	"hcl",	// (Hair Color)
	"ecl",	// (Eye Color)
	"pid",	// (Passport ID)
	//"cid",	// (Country ID)
];

var passports = [];

function Setup() {
	var input = Read("d4/input.txt");
	lines = input.trim().split("\n");
}

function Loop() {
	var current = {};
	for (var i = 0; i < lines.length; i++) {
		var l = lines[i].trim();
		if (l) {
			var parts = l.split(" ");
			for (var j = 0; j < parts.length; j++) {
				var k_v = parts[j].split(":");
				current[k_v[0]] = k_v[1];
			}
		} else {
			passports.push(current);
			current = {};
		}
	}
	passports.push(current);

	var valid = 0;
	passports.forEach(function (e) {
		//Println(JSON.stringify(e));
		var isValid = true;
		for (var k = 0; k < req.length; k++) {
			if (!(req[k] in e)) {
				//Println(req[k] + " is missing");
				isValid = false;
			}
		}
		if (isValid) {
			valid++;
		}
	});
	Println("valid = " + valid + " / " + passports.length);

	Stop();
}

function Input(e) { }


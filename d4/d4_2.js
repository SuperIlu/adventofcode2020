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
		isValid &= validateByr(e);
		isValid &= validateIyr(e);
		isValid &= validateEyr(e);
		isValid &= validateHgt(e);
		isValid &= validateHcl(e);
		isValid &= validateEcl(e);
		isValid &= validatePid(e);
		if (isValid) {
			valid++;
		}
	});
	Println("valid = " + valid + " / " + passports.length);

	Stop();
}

function validateByr(e) {
	if (!('byr' in e)) {
		return false;
	}
	var n = parseInt(e['byr']);
	return n >= 1920 && n <= 2002;
}

function validateIyr(e) {
	if (!('iyr' in e)) {
		return false;
	}
	var n = parseInt(e['iyr']);
	return n >= 2010 && n <= 2020;
}

function validateEyr(e) {
	if (!('eyr' in e)) {
		return false;
	}
	var n = parseInt(e['eyr']);
	return n >= 2020 && n <= 2030;
}

function validateHgt(e) {
	var v = e['hgt'];
	if (v) {
		if (v.endsWith("cm")) {
			var n = parseInt(v.substring(0, v.length - 2));

			return n >= 150 && n <= 193;
		} else if (v.endsWith("in")) {
			var n = parseInt(v.substring(0, v.length - 2));

			return n >= 59 && n <= 76;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function validateHcl(e) {
	var r = /^\#[0-9a-f]+$/;
	var v = e['hcl'];
	if (v) {
		return v.length == 7 && r.test(v);
	} else {
		return false;
	}
}

function validateEcl(e) {
	var v = e['ecl'];
	if (v) {
		return v == "amb" ||
			v == "blu" ||
			v == "brn" ||
			v == "gry" ||
			v == "grn" ||
			v == "hzl" ||
			v == "oth";
	} else {
		return false;
	}
}

function validatePid(e) {
	var r = /^[0-9]+$/;
	var v = e['pid'];
	if (v) {
		return v.length == 9 && r.test(v);
	} else {
		return false;
	}
}

function Input(e) { }


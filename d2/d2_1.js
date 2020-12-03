var idx1 = 0;
var idx2 = 1;
var idx3 = 2;
var lines;

function Setup() {
	var input = Read("d2/input.txt");
	lines = input.trim().split("\n");
}

function Loop() {
	var valid = 0;
	for (var i = 0; i < lines.length; i++) {
		var rule_pw = lines[i].trim().split(":");
		var rule = rule_pw[0].trim();
		var pw = rule_pw[1].trim();

		var from_to_char = rule.split(" ");
		var from_to = from_to_char[0].split("-");
		var ch = from_to_char[1];

		var from = parseInt(from_to[0]);
		var to = parseInt(from_to[1]);

		var num = 0;
		for (var c = 0; c < pw.length; c++) {
			var cmp = (pw.charAt(c) == ch);
			//Println("'" + pw.charAt(c) + "' == '" + ch + "' := " + cmp);
			if (cmp) {
				num++;
			}
		}

		if (num <= to && num >= from) {
			Println(lines[i] + ": " + num);
			valid++;
		}
	}
	Println("valid = " + valid + " / " + lines.length);
	Stop();
}

function Input(e) { }

var start;
var busses;

function Setup() {
	var input = Read("d13/input.txt");
	var lines = input.trim().split("\n");
	start = parseInt(lines[0]);
	busses = lines[1].split(",").filter(function (e) { return e != "x"; }).map(function (e) { return parseInt(e); });
}

function Loop() {
	Println(start);
	Println(JSON.stringify(busses));

	/*
	var departures = busses.map(function (b) {
		return start + (b - (start % b));
	});
	Println(JSON.stringify(departures));

	var idx = departures.indexOf(Math.min.apply(null, departures));
	Println(busses[idx] + " departs at " + departures[idx]);
*/

	var departures = busses.map(function (b) {
		return (b - (start % b));
	});
	Println(JSON.stringify(departures));

	var idx = departures.indexOf(Math.min.apply(null, departures));
	Println(busses[idx] + " departs in " + departures[idx]);

	Println("result=" + (busses[idx] * departures[idx]));

	Stop();
}

function Input(e) { }


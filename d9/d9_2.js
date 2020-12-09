var lines;
var preSize;

function Setup() {
	var input = Read("d9/input.txt");
	lines = input.trim().split("\n");
	for (var i = 0; i < lines.length; i++) {
		lines[i] = parseFloat(lines[i].trim());
	}
	preSize = 25;
}

function Loop() {
	var failNumber = null;
	for (var i = preSize; i < lines.length; i++) {
		if (!checkBlock(lines[i], lines.slice(i - preSize, i))) {
			Println("FAIL " + i + " := " + lines[i]);
			failNumber = lines[i];
		}
	}

	var res = findSum(failNumber);
	Println("Indices =" + JSON.stringify(res));

	var ar = lines.slice(res[0], res[1]);
	Println("Array   =" + JSON.stringify(ar));
	Println("Check   = " + failNumber + "==" + ar.reduce(function (a, b) { return a + b }, 0));

	var vMin = Math.min.apply(null, ar);
	var vMax = Math.max.apply(null, ar);
	var vSum = vMin + vMax;
	Println("min     =" + vMin);
	Println("max     =" + vMax);
	Println("sum     =" + vSum);

	Stop();
}

function checkBlock(sum, block) {
	for (var i = 0; i < block.length; i++) {
		for (var j = 1; j < block.length; j++) {
			if (block[i] + block[j] == sum) {
				return true;
			}
		}
	}
	return false;
}

function findSum(sum) {
	for (var i = 0; i < lines.length; i++) {
		var currentSum = lines[i];
		var currentIdx = i + 1;
		while ((currentSum < sum) && (currentIdx < lines.length)) {
			currentSum += lines[currentIdx];
			currentIdx++;
		}
		if (currentSum == sum) {
			return [i, currentIdx];
		}
	}
	return null;
}

function Input(e) { }


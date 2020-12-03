var idx1 = 0;
var idx2 = 1;
var idx3 = 2;
var lines;

function Setup() {
    var input = Read("d1/input.txt");
    lines = input.trim().split("\n");
}

function Loop() {
    for (var idx1 = 0; idx1 < lines.length; idx1++) {
        for (var idx2 = idx1 + 1; idx2 < lines.length; idx2++) {
            for (var idx3 = idx2 + 1; idx3 < lines.length; idx3++) {
                var v1 = parseInt(lines[idx1]);
                var v2 = parseInt(lines[idx2]);
                var v3 = parseInt(lines[idx3]);

                if ((v1 + v2 + v3) === 2020) {
                    Println("v1 = " + v1);
                    Println("v2 = " + v2);
                    Println("v3 = " + v3);
                    Println("v1 * v2 * v3 = " + (v1 * v2 * v3));
                    Stop();
                }
            }
        }
    }
}

function Input(e) { }

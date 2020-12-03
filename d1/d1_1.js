var idx1 = 0;
var idx2 = 1;
var lines;

function Setup() {
    var input = Read("d1/input.txt");
    lines = input.trim().split("\n");
}

function Loop() {
    var v1 = parseInt(lines[idx1]);
    var v2 = parseInt(lines[idx2]);

    if ((v1 + v2) == 2020) {
        Println("v1 = " + v1);
        Println("v2 = " + v2);
        Println("v1 * v2 = " + (v1 * v2));
        Stop();
    }

    idx2++;
    if (idx2 >= lines.length) {
        idx1++;
        if (idx1 >= lines.length) {
            throw "Error, not found!";
        }
        idx2 = idx1 + 1;
        Println("idx1 = " + idx1 + " / " + lines.length);
    }
}

function Input(e) { }

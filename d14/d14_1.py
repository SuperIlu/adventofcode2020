import re

lines = []
mem = {}

with open("d14/input.txt", "r") as f:
    for l in f:
        lines.append([x.strip() for x in l.strip().split("=")])

andMask = 0xFFFFFFFFF
orMask = 0x000000000

for inst in lines:
    if inst[0] == "mask":
        andMask = 0xFFFFFFFFF
        orMask = 0x000000000
        for b in range(36):
            ch = inst[1][35 - b]
            if ch == "1":
                orMask |= 1 << b
            elif ch == "0":
                andMask &= ~(1 << b)
            elif ch != "X":
                raise "Illegal mask: " + inst

    elif inst[0].startswith("mem"):
        addr = int(re.search("(\\d+)", inst[0]).group())
        val = int(inst[1])
        val &= andMask
        val |= orMask
        mem[addr] = val

sum = 0
for k, v in mem.items():
    sum += v

print(sum)

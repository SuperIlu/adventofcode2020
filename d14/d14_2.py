import re

lines = []
mem = {}

with open("d14/input.txt", "r") as f:
    for l in f:
        lines.append([x.strip() for x in l.strip().split("=")])

# generate a list of all possible addresses
def addr_list(addr, mask):
    ret = [addr]  # address to derive all other addresses from
    orMask = 0x000000000  # empty orMask

    for b in range(36):
        ch = mask[35 - b]
        if ch == "1":  # build up an orMask to apply last
            orMask |= 1 << b
        elif ch == "0":  # ignore '0' bits
            pass
        elif ch == "X":
            newRet = []
            for r in ret:
                newRet.append(r | (1 << b))  # append address with X set to 1
                newRet.append(r & ~(1 << b))  # append address with X set to 0
            ret = newRet
        else:
            raise "Illegal mask: " + mask
    return [x | orMask for x in ret]


mask = "000000000000000000000000000000000000"  # do nothing mask

for inst in lines:
    if inst[0] == "mask":
        mask = inst[1]  # update mask
    elif inst[0].startswith("mem"):
        addr = int(re.search("(\d+)", inst[0]).group())
        val = int(inst[1])
        for addr in addr_list(addr, mask):
            mem[addr] = val

sum = 0
for k, v in mem.items():
    sum += v

print(sum)

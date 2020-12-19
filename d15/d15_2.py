# input = [0, 3, 6]
input = [0, 13, 16, 17, 1, 10, 6]

spoken = {}

turn = 1
for num in input:
    spoken[num] = [turn, -1]
    turn += 1
lastNum = input[-1]


def updateSpoken(turn, num):
    if num in spoken:
        oldInfo = spoken[num]
        spoken[num] = [turn, oldInfo[0]]
    else:
        spoken[num] = [turn, -1]


def wasSpoken(turn, num):
    info = spoken[num]
    return info and ((info[0] != turn - 1) or (info[1] != -1))


while True:
    if wasSpoken(turn, lastNum):
        info = spoken[lastNum]
        spokenNum = (turn - 1) - info[1]
        firstTime = True
    else:
        firstTime = False
        spokenNum = 0
    updateSpoken(turn, spokenNum)
    turn += 1
    lastNum = spokenNum

    if turn == 30000000 + 1:
        break

print("result={}".format(spokenNum))

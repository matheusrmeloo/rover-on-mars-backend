const CONTROLLER = {
    N: {
        x: 0,
        y: 1
    },
    S: {
        x: 0,
        y: -1
    },
    W: {
        x: -1,
        y: 0
    },
    E: {
        x: 1,
        y: 0
    }
}

const ORIENTATION = [
    "N",
    "E",
    "S",
    "W"
];

class Rover {

    constructor(commands, initPosition, initOrientation) {
        this.commands = commands.split('');
        this.way = [initPosition.toString()];
        this.actualPosition = initPosition;
        this.actualOrientation = initOrientation;
    }
    isJustOnThisWay(wayToChack) {
        for (let way of wayToChack) {
            if (this.way.indexOf(way) != -1) {
                return false;
            }
        }
        return true;
    }

    _indexOrientation(command) {
        let index = (ORIENTATION.indexOf(this.actualOrientation) + (command == "L" ? -1 : 1));

        if (index > 3) {
            return 0
        }
        if (index < 0) {
            return 3
        }

        return index;
    }

    move() {

        for (let command of this.commands) {

            if (command == "M") {
                this.actualPosition = [this.actualPosition[0] + CONTROLLER[this.actualOrientation].x, this.actualPosition[1] + CONTROLLER[this.actualOrientation].y];
                this.way.push(this.actualPosition.toString());
            } else {
                this.actualOrientation = ORIENTATION[this._indexOrientation(command)];
            }
        }
    }
}


const test1 = new Rover("LMLMLMLMM", [1, 2], "N");
test1.move();

const test2 = new Rover("MMRMMRMRRM", [3, 3], "E");
test2.move();

if (test2.isJustOnThisWay(test1.way)) {
    console.log(`${test1.actualPosition[0]} ${test1.actualPosition[1]} ${test1.actualOrientation}`);
    console.log(`${test2.actualPosition[0]} ${test2.actualPosition[1]} ${test2.actualOrientation}`);
} else {
    console.log("erro")
}


var fs = require("fs");
var plateau, initPosition1, initOrientation1, commands1, initPosition2, initOrientation2, commands2;

fs.readFile("./instructions.txt", function (err, data) {
    data = data.toString();
    let dataArr = data.split('\n');
    plateau = dataArr[0].split('').map(Number);
    initPosition1 = dataArr[1].split('').splice(0, 2).map(Number);
    initOrientation1 = dataArr[1].split('').pop();
    commands1 = dataArr[2];
    initPosition2 = dataArr[3].split('').splice(0, 2).map(Number);
    initOrientation2 = dataArr[3].split('').pop();
    commands2 = dataArr[4];

    console.log({
        plateau,
        initPosition1,
        initOrientation1,
        commands1,
        initPosition2,
        initOrientation2,
        commands2
    })
});


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

    constructor(commands, initPosition, initOrientation, plateau) {
        console.log({
            commands, initPosition, initOrientation, plateau
        })
        this.commands = commands.split('');
        this.way = [initPosition.toString()];
        this.actualPosition = initPosition;
        this.actualOrientation = initOrientation;
        this.plateau = plateau
    }
    isJustOnThisWay(wayToCheck) {
        for (let way of wayToCheck) {
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

const test1 = new Rover(commands1, initPosition1, initOrientation1, plateau);
test1.move();

const test2 = new Rover(commands2, initPosition2, initOrientation2, plateau);
test2.move();

if (test2.isJustOnThisWay(test1.way)) {
    console.log(`${test1.actualPosition[0]} ${test1.actualPosition[1]} ${test1.actualOrientation}`);
    console.log(`${test2.actualPosition[0]} ${test2.actualPosition[1]} ${test2.actualOrientation}`);
} else {
    console.log("erro")
}


const CONTOLLERS = require("./const");

class Rover {

    constructor(commands, initPosition, initOrientation, plateau) {
        this.commands = commands.split('');
        this.way = [initPosition.toString()];
        this.actualPosition = initPosition;
        this.actualOrientation = initOrientation;
        this.plateau = plateau;
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
        let index = (CONTOLLERS.ORIENTATION.indexOf(this.actualOrientation) + (command == "L" ? -1 : 1));

        if (index > 3) {
            return 0
        }
        if (index < 0) {
            return 3
        }

        return index;
    }

    move() {
        try {
            for (let command of this.commands) {
                if (command == "M") {
                    this.actualPosition = [this.actualPosition[0] + CONTOLLERS.CONTROLLER[this.actualOrientation].x, this.actualPosition[1] + CONTOLLERS.CONTROLLER[this.actualOrientation].y];
                    this.way.push(this.actualPosition.toString());
                }
                else if ((command == "L") || (command == "R")) {
                    this.actualOrientation = CONTOLLERS.ORIENTATION[this._indexOrientation(command)];
                }
                else {
                    throw new Error("Invalid Command");
                }
            }
            if ((this.actualPosition[0] < 0 || this.actualPosition[1] < 0) || (this.actualPosition[0] > this.plateau[0] || this.actualPosition[1] > this.plateau[1])) {
                throw new Error("Rover crossed the limits of the plateau");
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Rover;
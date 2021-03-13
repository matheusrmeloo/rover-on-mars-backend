const fs = require("fs");
const Rover = require("./rover");

class IO {
    getResultRoverTrip(file) {
        return new Promise((resolve) => {
            var processFile = this.processFile;
            fs.readFile(`./${file}`, function (err, data) {
                data = data.toString();
                let res = '';
                for (let item of data.split(".")) {
                    const processedFile = processFile(item);
                    try {
                        const test1 = new Rover(processedFile.commandRover1, processedFile.initPositionRover1, processedFile.initOrientationRover1, processedFile.plateau);
                        test1.move();

                        const test2 = new Rover(processedFile.commandRover2, processedFile.initPositionRover2, processedFile.initOrientationRover2, processedFile.plateau);
                        test2.move();

                        if (test2.isJustOnThisWay(test1.way)) {
                            res += `${test1.actualPosition[0]} ${test1.actualPosition[1]} ${test1.actualOrientation}\n`;
                            res += `${test2.actualPosition[0]} ${test2.actualPosition[1]} ${test2.actualOrientation}\n`;
                        } else {
                            throw new Error("Second Rover collided with first Rover");
                        }
                    } catch (err) {
                        resolve(err.message);
                    }
                    res += "-----------\n";
                }
                resolve(res);
            });
        });
    }

    processFile(item) {
        item = item.trim().split("\n");
        const plateau = [parseInt(item[0].split("")[0]), parseInt(item[0].split("")[1])];

        const commandRover1 = item[2];
        const initPositionRover1 = [parseInt(item[1].split(" ")[0]), parseInt(item[1].split(" ")[1])];
        const initOrientationRover1 = item[1].split(" ")[2];

        const commandRover2 = item[4];
        const initPositionRover2 = [parseInt(item[3].split(" ")[0]), parseInt(item[3].split(" ")[1])];
        const initOrientationRover2 = item[3].split(" ")[2];

        return({
            plateau,
            commandRover1,
            initPositionRover1,
            initOrientationRover1,
            commandRover2,
            initPositionRover2,
            initOrientationRover2
        })
    }
}

module.exports = IO;
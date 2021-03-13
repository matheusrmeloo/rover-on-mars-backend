const fs = require('fs');
const assert = require('assert');
const IO = require("../src/io");

describe('Rover', async function () {
  it('should return success', function (done) {
    fs.writeFile(
      'mynewfile1.txt',
      `5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n.\n5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n.\n5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM`,
      async function (err) {
        if (err) assert.strictEqual(1, 0);
        const io = new IO();
        assert.strictEqual((await io.getResultRoverTrip('mynewfile1.txt')), `1 3 N\n5 1 E\n-----------\n1 3 N\n5 1 E\n-----------\n1 3 N\n5 1 E\n-----------\n`);
        done();
      }
    );
  });
  it('should return error of Rover outside from the plateau', function (done) {
    fs.writeFile(
      'mynewfile1.txt',
      `5 5\n0 0 N\nRRM\n3 3 E\nMMRMMRMRRM`,
      async function (err) {
        if (err) assert.strictEqual(1, 0);
        const io = new IO();
        console.log((await io.getResultRoverTrip('mynewfile1.txt')));
        assert.strictEqual((await io.getResultRoverTrip('mynewfile1.txt')), `Rover crossed the limits of the plateau`);
        done();
      }
    );
  });
  it('Rovers shouldnt collide', function (done) {
    fs.writeFile(
      'mynewfile1.txt',
      `5 5\n1 2 N\nLMLMLMLMM\n1 2 N\nLMLMLMLMM`,
      async function (err) {
        if (err) assert.strictEqual(1, 0);
        const io = new IO();
        console.log((await io.getResultRoverTrip('mynewfile1.txt')));
        assert.strictEqual((await io.getResultRoverTrip('mynewfile1.txt')), `Second Rover collided with first Rover`);
        done();
      }
    );
  });
  it('shouldnt pass invalid command', function (done) {
    fs.writeFile(
      'mynewfile1.txt',
      `5 5\n1 2 N\nLMLMDMLMM\n1 2 N\nLMLMLMLMM`,
      async function (err) {
        if (err) assert.strictEqual(1, 0);
        const io = new IO();
        console.log((await io.getResultRoverTrip('mynewfile1.txt')));
        assert.strictEqual((await io.getResultRoverTrip('mynewfile1.txt')), `Invalid Command`);
        done();
      }
    );
  });
});
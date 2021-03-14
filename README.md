# Rovers on Mars 🤖
An API in which it receives commands in a .txt file to move Rovers robots on a Mars plateau.

# Installation
First clone this project on your local machine. To clone use the command:
```console
$ git clone project_url
```
After that, to run the project, you first need to have Node.js installed. To install [Node.js](https://nodejs.org/en/) go to the link below in your browser and follow its step by step. `In the project I'm using version 10.13.0 of Node.`
```console
https://nodejs.org
```
After installing Node, open the terminal in the project and install the necessary dependencies, using the command:
```console
$ npm i
```
Or
```console
$ npm install
```
And then your project is ready to be used!
# Running Project
After you have done the entire installation process, you can run the project by running the command in the project terminal, the command:
```console
$ npm start
```
And this will make the code read the txt file present in the code and present the output corresponding to the final position of the Rover.
# Running Tests
The code is covered by unit tests, so if you want to run the project tests, you only need to open the project terminal and execute the command:
```console
$ npm test
```
# Architecture 
The project is divided into the `src and test folders`, and the `txt file is located in the project's root` with the name `instructions.txt`.

## `Src folder`
The src folder is made up of the following files:
- index.js
- io.js
- rover.js
- const.js

The `index.js` is responsible for starting the project, where it receives the path of the txt file and sends it to the io.js file, to be returned the final result of the rovers' trip on the Martian plateau.

In the `io.js` file, the IO class consists of two methods, `getResultRoverTrip()` and `processFile()`. The getResultRoverTrip() method is responsible for receiving the txt file that comes from index.js, and sending it to the processFile() method, to process the commands and return correctly, so that getResultRoverTrip() sends this information to rover.js and execute all necessary commands.

In `rover.js` you can find the `move(), _indexOrientation() and isJustOnThisWay()` methods. Move() is responsible for moving the Rover within the plateau and checking for possible errors, within it is also called the _indexOrientation() method that calculates the current position of the Rover. Finally, the isJustOnThisWay() method is responsible for checking if the position of the rovers is correct within io.js.

Finally, the `const.js` file is used as a utils file, where I keep the necessary calculation constants in the code.

## `Test folder`
The test folder, only has the file `test.js`, which is used to write the unit tests of the system, in it I used the `mocha test library`.

## `Txt File`

The `txt file`, represented here by the `instructions.txt` file, is responsible for keeping the necessary information and commands so that the rover can move on the Martian plateau. The file follows the following pattern:

```console
- Plateau size;
- Coordinates and direction of the Rover 1;
- Commands to be executed by the Rover 1;
- Coordinates and direction of the Rover 2;
- Commands to be executed by the Rover 2;
- (Optional) Point to indicate new instructions for the rovers, following the pattern above.
```

Example (Only one instruction for the rovers) :

```console
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMMRRM
```
Example (Two or more instructions for the rovers) :

```console
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMMRRM
.
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
.
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

## Now the Rovers can walk on Mars!

![Alt Text](https://media.giphy.com/media/2kWW31kf6yEmrGOCgJ/giphy.gif)
## Thanks! 🎉
![Alt Text](https://media.giphy.com/media/3o6gEdRfRc9JWHi3Cw/giphy.gif)


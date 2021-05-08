class mazeGenerator {
  constructor(size, cellProps) {
    this.sizeX = size.x;
    this.sizeY = size.y;
    this.cellHeight = cellProps.height;
    this.cellWidth = cellProps.width;
    this.cellOffset = cellProps.offset;
    this.maze = [];
    this.firstCell = null;

    this.randomizeLimit = Math.floor((size.x * size.y) / 5);
    this.randomizeDone = 0;

    this.xCrossChance = 8;
    this.tCrossChance = 2;
    this.lCrossChance = 8;

    this.straightCounter = 0;
  }

  generateEmptyMaze() {
    for (var i = 0; i < this.sizeY; i++) {
      this.maze.push([]);
      for (var j = 0; j < this.sizeX; j++) {
        this.maze[i][j] = new Room(
          [],
          this.cellHeight,
          this.cellWidth,
          this.cellOffset,
          [i, j],
          false,
          false
        );
      }
    }

    this.showMazeData();
    this.firstCell = this.maze[0][0];
    this.firstCell.setVisited(true);
    this.generateMaze(this.firstCell, true);

    while (this.randomizeDone < this.randomizeLimit) {
      this.randomizeMaze(this.firstCell);
    }

    this.addExit();

    return this.maze;
  }

  generateMaze(cell) {
    var posX = cell.pos.x;
    var posY = cell.pos.y;

    var randomDoorOnTheEnd = Math.floor(Math.random() * 6);

    var possibleMoves = [];

    if (posX + 1 < this.sizeX) {
      if (this.maze[posY][posX + 1].getVisited == false) {
        possibleMoves.push("right");
      }
    }

    if (posX - 1 >= 0) {
      if (this.maze[posY][posX - 1].getVisited == false) {
        possibleMoves.push("left");
      }
    }

    if (posY + 1 < this.sizeY) {
      if (this.maze[posY + 1][posX].getVisited == false) {
        possibleMoves.push("down");
      }
    }

    if (posY - 1 >= 0) {
      if (this.maze[posY - 1][posX].getVisited == false) {
        possibleMoves.push("up");
      }
    }

    var random = Math.floor(Math.random() * possibleMoves.length);

    if (possibleMoves[random] == "right") {
      this.maze[posY][posX + 1].setVisited(true);
      this.maze[posY][posX].addDoor("right");
      this.maze[posY][posX + 1].addDoor("left");
      this.removeElementFromArray(possibleMoves, "right");
      this.generateMaze(this.maze[posY][posX + 1]);
    } else if (possibleMoves[random] == "left") {
      this.maze[posY][posX - 1].setVisited(true);
      this.maze[posY][posX].addDoor("left");
      this.maze[posY][posX - 1].addDoor("right");
      this.removeElementFromArray(possibleMoves, "left");
      this.generateMaze(this.maze[posY][posX - 1]);
    } else if (possibleMoves[random] == "down") {
      this.maze[posY + 1][posX].setVisited(true);
      this.maze[posY][posX].addDoor("down");
      this.maze[posY + 1][posX].addDoor("up");
      this.removeElementFromArray(possibleMoves, "down");
      this.generateMaze(this.maze[posY + 1][posX]);
    } else if (possibleMoves[random] == "up") {
      this.maze[posY - 1][posX].setVisited(true);
      this.maze[posY][posX].addDoor("up");
      this.maze[posY - 1][posX].addDoor("down");
      this.removeElementFromArray(possibleMoves, "up");
      this.generateMaze(this.maze[posY - 1][posX]);
    }

    if (possibleMoves.length > 0) {
      if (randomDoorOnTheEnd == 0) {
        this.addRandomDoors(cell);
      }
      this.generateMaze(cell);
    }
  }

  // randomizeMaze(cell, prevMove){
  //     var posX = cell.pos.x;
  //     var posY = cell.pos.y;

  //     this.iterations += 1;

  //     console.log(this.iterations);

  //     var possibleMoves = [];

  //     if(posX+1 < this.sizeX){
  //         if(this.maze[posY][posX+1].doors.includes('right')){
  //             possibleMoves.push('right');
  //         }
  //     }

  //     if(posX-1 >= 0){
  //         if(this.maze[posY][posX-1].doors.includes('left')){
  //             possibleMoves.push('left');
  //         }
  //     }

  //     if(posY+1 < this.sizeY){
  //         if(this.maze[posY+1][posX].doors.includes('down')){
  //             possibleMoves.push('down');
  //         }
  //     }

  //     if(posY-1 >= 0){
  //         if(this.maze[posY-1][posX].doors.includes('up')){
  //             possibleMoves.push('up');
  //         }
  //     }

  //     if(possibleMoves.lenght == 1){
  //         this.addRandomDoors(cell);
  //     }else if(possibleMoves.length == 2){
  //         ++this.straightCounter;

  //         if(this.straightCounter == 4 || (posX == 0 && posY == 0)){
  //             if(possibleMoves[random] == 'right'){
  //                 console.log("Dodaje po prostej right");
  //                 this.maze[posY][posX].addDoor('right');
  //                 this.maze[posY][posX+1].addDoor('left');
  //             }else if(possibleMoves[random] == 'left'){
  //                 console.log("Dodaje po prostej left");
  //                 this.maze[posY][posX].addDoor('left');
  //                 this.maze[posY][posX-1].addDoor('right');
  //             }else if(possibleMoves[random] == 'down'){
  //                 console.log("Dodaje po prostej down");
  //                 this.maze[posY][posX].addDoor('down');
  //                 this.maze[posY+1][posX].addDoor('up');
  //             }else if(possibleMoves[random] == 'up'){
  //                 console.log("Dodaje po prostej up");
  //                 this.maze[posY][posX].addDoor('up');
  //                 this.maze[posY-1][posX].addDoor('down');
  //             }
  //             console.log("Moje miejsce: [" + cell.pos.x + "," + cell.pos.y + "]");
  //             console.log("=======================");
  //             this.straightCounter = 0;
  //             this.randomizeDone++;
  //         }
  //     }else{
  //         if(this.randomizeDone < this.randomizeLimit && this.iterations < this.limitIterations){
  //             if(possibleMoves.includes('right') && prevMove != 'right'){
  //                     this.removeElementFromArray(possibleMoves, 'right');
  //                     this.randomizeMaze(this.maze[posY][posX+1]);
  //             }else if(possibleMoves.includes('left') && prevMove != 'left'){
  //                     this.removeElementFromArray(possibleMoves, 'left');
  //                     this.randomizeMaze(this.maze[posY][posX-1]);
  //             }else if(possibleMoves.includes('down') && prevMove != 'down'){
  //                     this.removeElementFromArray(possibleMoves, 'down');
  //                     this.randomizeMaze(this.maze[posY+1][posX]);
  //             }else if(possibleMoves.includes('up') && prevMove == 'up'){
  //                     this.removeElementFromArray(possibleMoves, 'up');
  //                     this.randomizeMaze(this.maze[posY-1][posX]);
  //             }
  //         }
  //     }

  //     var random = Math.floor(Math.random() * possibleMoves.length)

  //     console.log(this.randomizeDone < this.randomizeLimit);

  //     if(this.randomizeDone < this.randomizeLimit && this.iterations < this.limitIterations){
  //         if(possibleMoves[random] == 'right'){
  //                 this.removeElementFromArray(possibleMoves, 'right');
  //                 this.randomizeMaze(this.maze[posY][posX+1]);
  //         }else if(possibleMoves[random] == 'left'){
  //                 this.removeElementFromArray(possibleMoves, 'left');
  //                 this.randomizeMaze(this.maze[posY][posX-1]);
  //         }else if(possibleMoves[random] == 'down'){
  //                 this.removeElementFromArray(possibleMoves, 'down');
  //                 this.randomizeMaze(this.maze[posY+1][posX]);
  //         }else if(possibleMoves[random] == 'up'){
  //                 this.removeElementFromArray(possibleMoves, 'up');
  //                 this.randomizeMaze(this.maze[posY-1][posX]);
  //         }
  //     }

  // }

  randomizeMaze() {
    for (var i = 0; i < this.sizeY; i++) {
      for (var j = 0; j < this.sizeX; j++) {
        if (this.randomizeDone < this.randomizeLimit) {
          var currentCell = this.maze[i][j];
          this.randomAddXCross(currentCell);
          this.randomAddTCross(currentCell);
          this.randomAddLCross(currentCell);
        }
      }
    }
  }

  randomAddXCross(cell) {
    var random = Math.floor(Math.random() * this.xCrossChance);
    var openWalls = cell.doors;
    if (openWalls.length == 3) {
      if (random == 1) {
        this.addRandomDoors(cell);
      }
    }
  }

  randomAddTCross(cell) {
    var random = Math.floor(Math.random() * this.tCrossChance);
    var openWalls = cell.doors;
    if (openWalls.length == 1) {
      if (random == 2) {
        this.addRandomDoors(cell);
      }
    }
  }

  randomAddLCross(cell) {
    var random = Math.floor(Math.random() * this.lCrossChance);
    var openWalls = cell.doors;
    if (openWalls.length == 1) {
      if (random == 3) {
        this.addRandomDoors(cell);
      }
    }
  }

  addRandomDoors(cell) {
    var openWalls = cell.doors;

    var posX = cell.pos.x;
    var posY = cell.pos.y;

    var possibleWays = [];
    var reversePossibleWays = [];
    var neighbors = [];
    if (!openWalls.includes("left") && cell.pos.x - 1 >= 0) {
      possibleWays.push("left");
      reversePossibleWays.push("right");
      neighbors.push(this.maze[posY][posX - 1]);
    } else if (!openWalls.includes("right") && cell.pos.x + 1 < this.sizeX) {
      possibleWays.push("right");
      reversePossibleWays.push("left");
      neighbors.push(this.maze[posY][posX + 1]);
    } else if (!openWalls.includes("up") && cell.pos.y - 1 >= 0) {
      possibleWays.push("up");
      reversePossibleWays.push("down");
      neighbors.push(this.maze[posY - 1][posX]);
    } else if (!openWalls.includes("down") && cell.pos.y + 1 < this.sizeY) {
      possibleWays.push("down");
      reversePossibleWays.push("up");
      neighbors.push(this.maze[posY + 1][posX]);
    }

    if (possibleWays.length > 0) {
      var whichWay = Math.floor(Math.random() * possibleWays.length);

      console.log("Dodaje: " + possibleWays[whichWay]);
      console.log("Moje miejsce: [" + cell.pos.x + "," + cell.pos.y + "]");
      console.log("================");

      cell.addDoor(possibleWays[whichWay]);
      neighbors[whichWay].addDoor(reversePossibleWays[whichWay]);
      this.randomizeDone++;
    }
  }

  addExit() {
    var posX = Math.floor(Math.random() * 3) + this.sizeX - 3;
    var posY = Math.floor(Math.random() * 3) + this.sizeY - 3;
    this.maze[posX][posY].setExit();
  }

  removeElementFromArray(array, element) {
    var index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  showMazeData() {
    for (var i = 0; i < this.sizeY; i++) {
      for (var j = 0; j < this.sizeX; j++) {
        // console.log(this.maze[i][j].getVisited);
      }
    }
  }
}

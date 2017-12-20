class GameOfLife {

  static startGame(cellsHorizontal=200, drawColour='#d7dde5', liveCellDensity=0.2) {
    var game = new GameOfLife(cellsHorizontal, drawColour, liveCellDensity);
    setInterval(function() {game.iterateGame();}, 150)
  }
  
  constructor(cellsHorizontal, drawColour, liveCellDensity) {
    this.grid = [];
    this.canvas = null;
    this.drawColour = drawColour;
    this.width = 0;
    this.height = 0;
    this.cellWidth = 0;
    this.initGrid(cellsHorizontal, liveCellDensity);
  }  

  initGrid(cellsHorizontal, liveCellDensity) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas = document.getElementById('gameOfLife');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.cellWidth = Math.ceil(this.width  / cellsHorizontal);

    var cellsVertical = Math.ceil(this.height / this.cellWidth);

    for (var row = 0; row < cellsVertical; row++) {
      this.grid[row] = new Array(cellsHorizontal).fill(0);
    }

    for (var row = 0; row < cellsVertical; row++) {
      for (var col = 0; col < cellsHorizontal; col++) {
        if (Math.random() < liveCellDensity) {
          this.grid[row][col] = 1;
        }
      }
    }
  }

  iterateGame() {
    this.drawGrid();
    this.updateGrid();
  }

  cellAlive(x, y) {
      return (this.grid[x] && this.grid[x][y]) ? 1 : 0;
  }

  numNeightbours(x, y) {
    var numNeightbours = 0;

    numNeightbours += this.cellAlive(x-1, y-1);
    numNeightbours += this.cellAlive(x-1, y);
    numNeightbours += this.cellAlive(x-1, y+1);
    numNeightbours += this.cellAlive(x, y-1);
    numNeightbours += this.cellAlive(x, y+1);
    numNeightbours += this.cellAlive(x+1, y-1);
    numNeightbours += this.cellAlive(x+1, y);
    numNeightbours += this.cellAlive(x+1, y+1);

    return numNeightbours;
  }

  updateGrid() {
    var newGrid = [];
    for (var row = 0; row < this.grid.length; row++) {
      newGrid[row] = [];
      for (var col = 0; col < this.grid[0].length; col++) {
        var currentlyAlive = this.grid[row][col];
        var numNeightbours = this.numNeightbours(row, col);

        if (numNeightbours == 3 || (numNeightbours == 2 && currentlyAlive)) {
          newGrid[row][col] = 1;
        } else {
          newGrid[row][col] = 0;
        }
      }
    }
    this.grid = newGrid;
  }

  drawGrid() {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = this.drawColour;
    ctx.clearRect(0, 0, this.width, this.height);

    for (var x = 0; x < this.grid.length; x++) {
      for (var y = 0; y < this.grid[0].length; y++) {
        if (this.grid[x][y]) {
          ctx.beginPath();
          ctx.fillRect(y*this.cellWidth, x*this.cellWidth, this.cellWidth, this.cellWidth);
        }
      }
    }
  } 
}
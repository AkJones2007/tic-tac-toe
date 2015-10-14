/*
 * --------------------------------------------------------
 * PLAYER OBJECT DEFINITIONS
 * --------------------------------------------------------
 */

// Define object constructor for a new player
// Take symbol as an argument ('x' or 'o') and whether the player
// is a human or a computer
var Player = function Player(symbol, isComputer) {
  // Set symbol
  this.symbol = symbol;
  // Set score
  this.score = 0;
  // Set turn
  this.turn = false;
  // Set AI
  this.computer = isComputer;
};

// Define Player prototype methods

// Set method for making a move. Takes a board index as an argument
Player.prototype.move = function(index) {
  // Check if it's the player's turn
  if (!this.turn) {
    // If not, do nothing. Return the function to stop the code.
    return false;
  }

  // Check if the player is a computer
  if (this.computer) {
    // If the player is a computer, set the index to a random number
    index = Math.floor(Math.random() * 9);
    // Keep generating a new index until an empty tile is found
    while(board.tiles[index]) {
      index = Math.floor(Math.random() * 9);
    }
  }

  // Invoke the mark board method, passing the symbol and index as arguments
  board.mark(index, this.symbol);

};




/*
 * --------------------------------------------------------
 * GAME OBJECT DEFINITIONS
 * --------------------------------------------------------
 */

// Define object constructor for a new game
  // Set player 1 (x)
  // Set player 2 (o)
  // Set new board
  // Set current round
  // Set max rounds

// Define the game object prototype

// Methdod to check for win
// Method to take action if there is a win




/*
 * --------------------------------------------------------
 * BOARD OBJECT CONSTRUCTOR DEFINITIONS
 * --------------------------------------------------------
 */

// Contructor function that creates a new tic-tac-toe board of the given width
var Board = function Board(width) {

  // Blank array to build the grid
  boardGrid = [];

  // Build the grid based on the given width
  for (var i = 0, max = width * width; i < max; i++) {
    boardGrid.push(null);
  }

  // Define attributes
  this.tiles = boardGrid;
  this.size = boardGrid.length;
  this.width = width;

};

// Method that returns a two-dimensional array containing each row
// FIX: This method has a bug when the grid is larger than 3 x 3
Board.prototype.rows = function() {

  var array = [];
  var row = [];

  // Traverse tiles and collect rows
  for(var i = 0; i < this.size; i++) {

    // Since 0 % 3 === 0, make sure 'i' is more than zero
    if(i > 0) {
      // Push and reset 'row' array every 3 spaces
      if(i % 3 === 0) {
        array.push(row);
        row = [];
      }
    }

    // Push tiles to build up row
    row.push(this.tiles[i]);

  }

  // Push row one more time, and return final array
  array.push(row);
  return array;

};

// Method that returns a two-dimensional array containing each column
Board.prototype.columns = function() {

  var array = [];
  var column = [];

  // Traverse tiles and collect columns
  // One iteration per column
  for (var i = 0; i < this.width; i++) {
    // Collect each tile in the column
    for (var j = i; j < this.size; j += this.width) {
      column.push(this.tiles[j]);
    }
    // Push and reset each iteration
    array.push(column);
    column = [];
  }

  return array;

};

// Method that returns a two-dimensional array containing each diagonal
Board.prototype.diagonals = function() {

  var array = [];
  var diagonal = [];

  // Collect top left to bottom right
  for (var i = 0; i < this.size; i += this.width + 1) {
    diagonal.push(this.tiles[i]);
  }

  // Push and clear
  array.push(diagonal);
  diagonal = [];

  // Collect top right to bottom left
  for (var j = this.width - 1; j < this.size - 1; j += this.width - 1) {
    diagonal.push(this.tiles[j]);
  }

  // Push and clear
  array.push(diagonal);
  return array;

};

// Method to mark board at given index with given symbol
Board.prototype.mark = function(index, symbol) {
  this.tiles[index] = symbol;
};


// DOM stuff will go down here


// TESTS
var board = new Board(3);
var player = new Player('x', false);
player.turn = true;

console.log(board.tiles);

player.move(1);
console.log(board.tiles);

player.move(5);
console.log(board.tiles);

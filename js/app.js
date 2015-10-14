/*
 * --------------------------------------------------------
 * PLAYER OBJECT DEFINITIONS
 * --------------------------------------------------------
 */

// Declare object for the human player
var player = {
  // Store the symbol 'x'
  symbol: 'x',

  // Store the amount of wins '0'
  score: 0,

  // Store a boolean for player's turn 'true'
  turn: true,

  // Move method
  move: function(square, index) {
    // Check to see if it's the player's turn
    if (turn) {
      // Check if square is empty
      if (!index) {
        // Fill the square
        square = this.symbol;
        board.square[index] = this.symbol;

        // Invoke check board method.
        board.check();

        // If false...invoke computer move method
        computer.move();

      }
    }
  }
}

// Object to handle the computer player
var computer = {
  // Store the symbol 'o'
  // Store the amount of wins '0'
  // Store a boolean for the computer's turn 'false'
  // Move method
    // Check to see if it's the computer's turn
      // If it is, collect vacant squares indexes in array
      // Generate a random number based on array length
      // Use random number as a reference to vacant space
      // array, and fill space at that index on the board
      // Invoke check board function
}


/*
 * --------------------------------------------------------
 * GAME OBJECT DEFINITIONS
 * --------------------------------------------------------
 */

// Game object to handle scoring and rounds
var game = {

  round: 1,

  // Method that checks for a win

  // Method that takes action if there is a win

}


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
var test;

test = new Board(3);

test.mark(0, 'x');
test.mark(4, 'x');
test.mark(8, 'x');

console.log(test.diagonals());

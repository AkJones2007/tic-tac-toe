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
    while(game.board.tiles[index]) {
      index = Math.floor(Math.random() * 9);
    }
    // Mark the board
    game.board.mark(index, this.symbol);
  }

  // If the player is a human being, mark the board
  game.board.mark(index, this.symbol);
  console.log(game.board.tiles);

};




/*
 * --------------------------------------------------------
 * GAME OBJECT DEFINITIONS
 * --------------------------------------------------------
 */

// Define object constructor to create a new game
var Game = function Game(rounds, boardWidth) {
  // Indicate whose turn it is
  this.currentTurn = 'playerx';
  // Set player 1 (x)
  this.playerx = new Player('x', false);
  // Set player 2 (o)
  this.playero = new Player('o', false);
  // Set new board
  this.board = new Board(boardWidth);
  // Set current round
  this.currentRound = 1;
  // Set max rounds
  this.maxRounds = rounds;
}

// Define the game object prototype

// Method to check for matching characters in a line
// Takes a character and an array as arguments, and returns a boolean
Game.prototype.match = function (character, array) {
  // Produce a string of values by repeating a character a number of times (based on board width)
  var toMatch = '';

  for (var i = 0; i < this.board.width; i++) {
    toMatch += character;
  }

  // Compare string of values with the joined array
  return array.join('') === toMatch;
};


// Method to check for win
// Takes a player symbol and evaluates board to check for a win
Game.prototype.check = function() {
  // Set player name for accessing the player in the game object
  var player = this.currentTurn;
  var symbol = this[player].symbol;

  // Iterate through rows, invoke match method on each iteration. If true value is thrown, invoke win method
  for (var i = 0; i < this.board.width; i++) {
    var rows = this.board.rows();
    if(this.match(symbol, rows[i])) {
      return this.win();
    }
  }

  // Iterate through columns, invoke match method on each iteration. If true value is thrown, invoke win method
  for (var i = 0; i < this.board.width; i++) {
    var columns = this.board.columns();
    if(this.match(symbol, columns[i])) {
      return this.win();
    }
  }

  // Iterate through diagonals, invoke match method on each iteration. If true value is thrown, invoke win method
  for (var i = 0; i < 2; i++) {
    var diagonals = this.board.diagonals();
    if(this.match(symbol, diagonals[i])) {
      return this.win();
    }
  }

  // Change turn state for both players
  return this.nextTurn();

};


// Method to take action if there is a win
// Takes the player number as an argument
Game.prototype.win = function() {
  var player = this.currentTurn;
  var symbol = this[player].symbol;
  // Increment player's score
  this[player].score++;
  // Check if the current round is equal to the defined maximum
  if(this.currentRound === this.maxRounds) {
    // If it is, declare a winner!
    if(this.playerx.score > this.playero.score) {
      alert('X is the champion!');
    }
    else {
      alert('O is the champion!');
    }
  }

  else {
    // If it isn't, increment current round
    this.currentRound++;
  }

  // Change turn states
  this.playerx.turn = true;
  this.playero.turn = false;

  this.currentTurn = 'playerx';

  // Reset the board
  this.board.reset();

  // Update the DOM
  game.update();

};

Game.prototype.nextTurn = function() {
  // Find out whose turn it is
  var player = this.currentTurn;

  // Set each player's turn status to the opposite
  this.playerx.turn = !this.playerx.turn;
  this.playero.turn = !this.playero.turn;

  // It is now the other player's turn!
  if(player === 'playerx') {
    this.currentTurn = 'playero';
  }
  else {
    this.currentTurn = 'playerx';
  }

}

// Method that updates all of the information in the DOM (score, rounds, board, etc.)
Game.prototype.update = function() {

  // Update scores
  $('#score-x').text(this.playerx.score);
  $('#score-o').text(this.playero.score);

  // Update rounds
  $('#rounds').text('Round ' + this.currentRound + ' out of ' + this.maxRounds);

};




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

  // If the tile is empty, mark the tile
  if(!this.tiles[index]) {
    this.tiles[index] = symbol;
    // Mark the tile in the DOM
    $(event.target).html('<h1>' + symbol + '</h1>');
  }

  // Check if there is a win
  game.check(symbol);

};

// Method to reset the board
Board.prototype.reset = function() {
  this.tiles = this.tiles.map(function(a) {
    return null;
  });

  $('.board-panel').each(function() {
    $(this).html('');
  });

};

// Create a variable to hold the Game() object
var game = new Game(3, 3);
game.playerx.turn = true;

// Initialize the DOM
$(function() {

  game.update();

  $('.board-panel').each(function(index) {
    $(this).on('click', function() {
      player = game.currentTurn;
      game[player].move(index);
    });
  });

});

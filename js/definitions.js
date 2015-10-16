/*
 * --------------------------------------------------------
 * This file defines the constructors used to create game objects.
 * --------------------------------------------------------
 */


/*
 * --------------------------------------------------------
 * PLAYER OBJECT DEFINITIONS
 * --------------------------------------------------------
 */

var Player = function Player(symbol, isComputer) {
  this.symbol = symbol;
  this.score = 0;
  this.turn = false;
  this.computer = isComputer;
};

// Method invoked when an empty space is clicked
Player.prototype.move = function(index) {

  // Check if it's the player's turn before doing anything
  if (!this.turn) {
    return;
  }

  // Check if the player is a computer
  // Keep generating a random index until an empty tile is found
  if (this.computer) {
    index = Math.floor(Math.random() * 9);
    while(game.board.tiles[index]) {
      index = Math.floor(Math.random() * 9);
    }
    game.board.mark(index, this.symbol);
  }

  // If the player is a human being, mark the board
  game.board.mark(index, this.symbol);

};


/*
 * --------------------------------------------------------
 * GAME OBJECT DEFINITIONS
 * --------------------------------------------------------
 */

var Game = function Game(rounds, boardWidth) {
  this.id = null;
  this.currentTurn = 'playerx';
  this.playerx = new Player('x', false);
  this.playero = new Player('o', false);
  this.board = new Board(boardWidth);
  this.currentRound = 1;
  this.maxRounds = rounds;
  this.over = false;
};

// Method to check a single row, column, or diagonal for a match
Game.prototype.match = function (character, array) {

  // Produce a string that repeats the given character a number of times
  var toMatch = '';

  for (var i = 0; i < this.board.width; i++) {
    toMatch += character;
  }

  // Convert the given array to a string and compare the two
  return array.join('') === toMatch;

};

// This method checks the entire board for a win
Game.prototype.check = function() {
  var player = this.currentTurn;
      symbol = this[player].symbol;

  // Iterate through each row, column, and diagonal
  // Invoke the win method if a match is found
  for (var i = 0; i < this.board.width; i++) {
    var rows = this.board.rows();
    if(this.match(symbol, rows[i])) {
      return this.win();
    }
  }

  for (var i = 0; i < this.board.width; i++) {
    var columns = this.board.columns();
    if(this.match(symbol, columns[i])) {
      return this.win();
    }
  }

  for (var i = 0; i < 2; i++) {
    var diagonals = this.board.diagonals();
    if(this.match(symbol, diagonals[i])) {
      return this.win();
    }
  }

  // Check for a tie. Join the board array, and check the length.
  var boardLength = this.board.tiles.join('').length;
  if(boardLength === this.board.size) {
    this.tie();
  }

  // If no match is found, change the turn state for both players
  return this.nextTurn();

};

// Method invoked when a player wins a round
Game.prototype.win = function() {
  var player = this.currentTurn;
  var symbol = this[player].symbol;

  // Increment the player's score
  this[player].score++;

  // If this was the last round, declare a champion, and set the game to 'over'
  if(this.currentRound === this.maxRounds) {
    if(this.playerx.score > this.playero.score) {
      alert('X is the champion!');
    }
    else if (this.playerx.score < this.player0.score) {
      alert('O is the champion!');
    }
    else {
      alert('Tis a tie!')
    }
    this.over = true;
  }

  // If this isn't the last round, increment the round
  else {
    this.currentRound++;
  }

  // Reset turn states
  this.playerx.turn = true;
  this.playero.turn = false;
  this.currentTurn = 'playerx';

  // Reset the board
  this.board.reset();

  // Update the DOM
  game.update();

};

Game.prototype.tie = function() {
  var player = this.currentTurn;
  var symbol = this[player].symbol;

  // If this was the last round, declare a champion, and set the game to 'over'
  if(this.currentRound === this.maxRounds) {
    if(this.playerx.score > this.playero.score) {
      alert('X is the champion!');
    }
    else if (this.playerx.score < this.player0.score) {
      alert('O is the champion!');
    }
    else {
      alert('Tis a tie!')
    }
    this.over = true;
  }

  // If this isn't the last round, increment the round
  else {
    this.currentRound++;
  }

  // Reset turn states
  this.playerx.turn = true;
  this.playero.turn = false;
  this.currentTurn = 'playerx';

  // Reset the board
  this.board.reset();

  // Update the DOM
  game.update();

}

// This method changes the turn states
Game.prototype.nextTurn = function() {
  var player = this.currentTurn;

  // Change turn states at the player level
  this.playerx.turn = !this.playerx.turn;
  this.playero.turn = !this.playero.turn;

  // Change turn state at the game level
  if(player === 'playerx') {
    this.currentTurn = 'playero';
  }
  else {
    this.currentTurn = 'playerx';
  }

}

// This method updates game states in the DOM as needed
Game.prototype.update = function() {

  // Update scores
  $('#score-x').text(this.playerx.score);
  $('#score-o').text(this.playero.score);

  // Update rounds
  $('#round').text('Round ' + this.currentRound + ' out of ' + this.maxRounds);

};


/*
 * --------------------------------------------------------
 * BOARD OBJECT DEFINITIONS
 * --------------------------------------------------------
 */

var Board = function Board(width) {
  boardGrid = [];

  // Build the grid based on the given width
  for (var i = 0, max = width * width; i < max; i++) {
    boardGrid.push(null);
  }

  this.tiles = boardGrid;
  this.size = boardGrid.length;
  this.width = width;

};

// Method that returns each row in a two-dimensional array
Board.prototype.rows = function() {
  var array = [];
  var row = [];

  // Traverse board and collect rows
  for(var i = 0; i < this.size; i++) {

    // Since 0 % 3 === 0, make sure 'i' is more than zero
    if(i > 0) {
      if(i % 3 === 0) {
        array.push(row);
        row = [];
      }
    }
    row.push(this.tiles[i]);
  }

  array.push(row);
  return array;
};

// Method that returns each column in a two-dimensional array
Board.prototype.columns = function() {
  var array = [];
  var column = [];

  for (var i = 0; i < this.width; i++) {
    for (var j = i; j < this.size; j += this.width) {
      column.push(this.tiles[j]);
    }
    array.push(column);
    column = [];
  }

  return array;
};

// Method that returns each column in a two-dimensional array
Board.prototype.diagonals = function() {
  var array = [];
  var diagonal = [];

  // Collect top left to bottom right
  for (var i = 0; i < this.size; i += this.width + 1) {
    diagonal.push(this.tiles[i]);
  }
  array.push(diagonal);
  diagonal = [];

  // Collect top right to bottom left
  for (var j = this.width - 1; j < this.size - 1; j += this.width - 1) {
    diagonal.push(this.tiles[j]);
  }
  array.push(diagonal);
  return array;

};

// Method to mark board at a given index with a given symbol
Board.prototype.mark = function(index, symbol) {

  // Fill the tile if empty
  if(!this.tiles[index]) {
    this.tiles[index] = symbol;
    // Mark the tile in the DOM
    $(event.target).html('<h1>' + symbol + '</h1>');
  }

  // Check for a win
  game.check(symbol);

};

// Method to clear the board
Board.prototype.reset = function() {
  this.tiles = this.tiles.map(function(a) {
    return null;
  });

  // Clear it in the DOM too!
  $('.board-panel').each(function() {
    $(this).html('');
  });

};

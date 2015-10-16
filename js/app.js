// Initialize the game, X's always go first
var game = new Game(3, 3);
game.playerx.turn = true;

// Store a user's token after login
var token = null;

// When the DOM is ready...
$(function() {

  // Update game states (score, rounds, turn, etc...)
  game.update();

  // Add a click handler to each square
  $('.board-panel').each(function(index) {
    $(this).on('click', function() {
      if(!game.over) {
        player = game.currentTurn;
        game[player].move(index);
      }
    });
  });

  // Click handlers to toggle between 'Register' and 'Login' on the landing page
  $('#login-button').on('click', function() {
    $('#login').css('display', 'block');
    $('#register').css('display', 'none');
  });

  $('#register-button').on('click', function() {
    $('#login').css('display', 'none');
    $('#register').css('display', 'block');
  });

  // Reset the game
  $('#new-game').on('click', function () {
    game = new Game(3, 3);
    game.playerx.turn = true;
    game.update();
  });

});


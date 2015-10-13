// Declare object for the human player
  // Store the symbol 'x'
  // Store the amount of wins '0'
  // Store a boolean for player's turn 'true'
  // Move method
    // Check to see if it's the player's turn
      // If it is, and square is empty, fill square
      // Invoke check board method.
        // If false...invoke computer move method

// Declare object for the computer player
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

// Declare object for the board
  // Initialize empty array representing the spaces
  // Initialize rounds '1'
  // Check row method
    // Loop through board rows with counter
    // If counter hits 3, return true
  // Check column method
    // Loop through board columns with counter
    // If counter hits 3, return true
  // Check diags method
    // Loop through board diags with coutner
    // If coutner hits 3, return true
  // Check for a win
    // Check rows, columns, and diags
      // If any return true, return and invoke win method
    // If no win...
      // Change turn status
      // return false
  // Win method
    // Increment score
    // Increment round
    // Reset turns
    // return true
  // Reset method
    // Loop through board array, clear each space
    // Reset scores
    // Reset rounds
    // Reset turns


// DOM load event listener
  // Iterate through squares, add click listener
  // invoke player move method on click

  // Add click listener to 'new game'
  // Invoke board reset method on click

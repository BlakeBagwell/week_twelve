const readline = require('readline');
const deepFreeze = require('deep-freeze');

module.exports = function(reducer, display) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function step(prevState, input) {
    let state = reducer(prevState, input);
    if (state != null) {
      // deep freeze the state object to ensure
      // you are not mutating any objects
      deepFreeze(state);
    }
    display(state);
    // if you return the state as the string 'end' at
    // any point, it exits the program
    if (state === 'end' || state.action === 'end') {
      process.exit();
    }
    // prompt user input and use the input in the next step
    rl.question('> ', function(input) {
      step(state, input);
    });
  }
  step(null, null);
}

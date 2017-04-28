const pureCli = require('./pure-cli');

function reducer(state, input) {
  // put your code here
}

module.exports = reducer;

function display(state) {
  console.log(state.stack.join(' '));
}

if (require.main === module) {
  pureCli(reducer, display);
}

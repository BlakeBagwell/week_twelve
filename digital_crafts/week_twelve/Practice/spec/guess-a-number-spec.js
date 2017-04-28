const reducer = require('../guess-a-number');
const df = require('deep-freeze');

describe('guess a number', () => {
  xit('initializes a random number', () => {
    // btw, we are violating purity here by generating
    // random numbers here. I will let this one slide though ;)
    expect(typeof reducer(null).number).toEqual('number');
    expect(reducer(null).guess).toEqual(null);
  });

  xit('enters incorrect guess', () => {
    const prevState = df({
      number: 5,
      guess: null,
      action: null
    });
    expect(reducer(prevState, '6')).toEqual(
      { number: 5,
        guess: 6,
        action: null
      });
  });

  xit('enters correct guess', () => {
    const prevState = df({
      number: 5,
      guess: null,
      action: null
    });
    expect(reducer(prevState, '5')).toEqual(
      { number: 5,
        guess: 5,
        action: 'end'
      });
  });
});

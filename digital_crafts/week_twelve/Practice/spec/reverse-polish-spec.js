const reducer = require('../reverse-polish');
const df = require('deep-freeze');

describe('reverse polish', () => {

  xit('initializes a stack', () => {
    expect(reducer(null)).toEqual({
      stack: []
    });
  });

  xit('enters a number to the stack', () => {
    expect(reducer(df({
      stack: []
    }), '4')).toEqual({stack: [4]});
  });

  xit('adds the top 2 numbers on stack', () => {
    expect(reducer(df({
      stack: [2, 3]
    }), '+')).toEqual({stack: [5]});
  });

  xit('subtracts the top 2 numbers on the stack', () => {
    expect(reducer(df({
      stack: [2, 3]
    }), '-')).toEqual({stack: [1]});
  });

  xit('multiplies the top 2 numbers on the stack', () => {
    expect(reducer(df({
      stack: [4, 5]
    }), '*')).toEqual({stack: [20]});
  });

  xit('divides the top 2 numbers on the stack', () => {
    expect(reducer(df({
      stack: [2, 6]
    }), '/')).toEqual({stack: [3]});
  });

  xit('keeps the unused part of the stack intact', () => {
    expect(reducer(df({
      stack: [1, 2, 3, 4, 5]
    }), '+')).toEqual({stack: [1, 2, 3, 9]});
  });

  xit('quits the problem when q is entered', () => {
    expect(reducer(df({
      stack: [1, 2, 3]
    }), 'q')).toEqual({stack: [1, 2, 3], action: 'end'});
  });

});

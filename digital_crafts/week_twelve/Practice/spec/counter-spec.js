const reducer = require('../counter');

describe('counter', () => {

  xit('initializes to 0', () => {
    expect(reducer(null)).toEqual(0);
  });

  xit('adds 1', () => {
    expect(reducer(2, '+')).toEqual(3);
  });

  xit('subtracts 1', () => {
    expect(reducer(2, '-')).toEqual(1);
  });

  xit('multiplies numbers', () => {
    expect(reducer(3, '3')).toEqual(9);
  });

  xit('quits', () => {
    expect(reducer(4, 'q')).toEqual('end');
  });

});

import addition from './../index';

const chai = require('chai');

const expect = chai.expect;

describe('This is a sample test for setup', () => {
  it('addition should return 3', () => {
    expect(addition()).to.equal(3);
  });
});

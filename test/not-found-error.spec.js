import chai from 'chai';
import NotFoundError from './../custom/not-found-error';

const expect = chai.expect;
let defaultErr;
let messageErr;

describe('NotFoundError', () => {
  before(() => {
    defaultErr = new NotFoundError();
    messageErr = new NotFoundError('Model not found');
  });

  it('should be of type Error', () => {
    expect(defaultErr).to.be.an('error');
    expect(messageErr).to.be.an('error');
  });

  it('error with message', () => {
    try {
      throw messageErr;
    } catch (err) {
      expect(err.message).to.equal('Model not found');
      expect(err.status).to.be.a('Number');
      expect(err.status).to.equal(404);
    }
  });

  it('error without message', () => {
    try {
      throw defaultErr;
    } catch (err) {
      expect(err.message).to.equal('Resource not found');
      expect(err.status).to.be.a('Number');
      expect(err.status).to.equal(404);
    }
  });
});

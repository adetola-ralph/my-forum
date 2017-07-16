import supertest from 'supertest';
import chai from 'chai';
import app from './../index';

const expect = chai.expect;
const api = supertest.agent(app.listen());

describe('User Controller', () => {
  xit('Should return all users', async () => {

  });

  it('test', async () => {
    const res = await api.get('/api/v1/')
      .expect(200);

    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(6);
  });
});

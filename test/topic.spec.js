import supertest from 'supertest';
import chai from 'chai';
import app from './../index';

const expect = chai.expect;
const api = supertest.agent(app.listen());

describe('Topics', () => {
  it('all topics should be available to all users', async () => {
    const res = await api.get('/api/v1/topics')
              .expect(200);

    expect(res.body.success).to.be.true;
    expect(res.body.data).to.be.an('array');
    expect(res.body.data).to.not.be.empty;
    expect(res.body.data).to.have.lengthOf(5);
  });

  describe('Topic creation', () => {
    it('should return 401 for unauthenticated creation of topics');
  });
});

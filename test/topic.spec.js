import supertest from 'supertest';
import chai from 'chai';
import app from './../index';

const expect = chai.expect;
const api = supertest.agent(app.listen());
let response, token;

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
    it('should return 401 for unauthenticated creation of topics', async () => {
      await api.post('/api/v1/topics')
      .send({
        topicName: 'Another 10 weird Stuff',
        userId: 2,
      })
      .expect(401);
    });

    before(async () => {
      response = await api.post('/api/v1/signin')
        .send({
          email: 'admin@my-forum.me',
          password: 'AdminPassword',
        });
      token = response.body.data.token;
    });

    it('should allow authenticated users to create topic', async () => {
      const res = await api.post('/api/v1/topics')
      .set('authorization', token)
      .send({
        topicName: 'Another 10 weird Stuff',
        userId: 2,
      })
      .expect(200);

      expect(res.body.data).to.have.property('id');
    });

    it('should allow throw error on incomplete details', async () => {
      await api.post('/api/v1/topics')
      .set('authorization', token)
      .send({
        topicName: 'Another 11 weird Stuff',
      })
      .expect(400);
    });
  });
});

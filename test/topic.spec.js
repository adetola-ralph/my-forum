import supertest from 'supertest';
import chai from 'chai';
import app from './../index';

const expect = chai.expect;
const api = supertest.agent(app.listen());
let response, token;

describe('Topics', () => {
  describe('Topic Access', () => {
    it('all topics should be available to all users', async () => {
      const res = await api.get('/api/v1/topics')
                  .expect(200);

      expect(res.body.success).to.be.true;
      expect(res.body.data).to.be.an('array');
      expect(res.body.data).to.not.be.empty;
      expect(res.body.data).to.have.lengthOf(5);
    });

    it('all  users can access a topic', async () => {
      const res = await api.get('/api/v1/topics/5')
                  .expect(200);

      expect(res.body.data).to.have.property('id', 5);
    });

    it('should throw error if topic doesn\'t exist', async () => {
      await api.get('/api/v1/topics/9')
      .expect(404);
    });
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
        userId: 1,
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

    // TODO: user id on the topic should be same as the user sending the request
  });

  describe('Topic update', () => {
    it('should throw error if non creator tries to update topic', async () => {
      await api.put('/api/v1/topics/4')
      .send({
        open: true,
      })
      .set('Authorization', token)
      .expect(403);
    });

    // this also doubles as a close topic test
    it('should allow creators to update their topic', async () => {
      const res = await api.put('/api/v1/topics/6')
      .send({
        open: false,
      })
      .set('Authorization', token)
      .expect(200);

      expect(res.body.data.open).to.be.false;
    });
  });

  it('should be able to get posts under a topic', async () => {
    const res = await api.get('/api/v1/topics/1/posts')
                  .expect(200);

    expect(res.body.data).to.be.an('array');
  });

  it('should be able to get tags under a topic', async () => {
    const res = await api.get('/api/v1/topics/1/tags')
                  .expect(200);

    expect(res.body.data).to.be.an('array');
  });

  it('should throw error if topic doesn\'t exist, tags', async () => {
    await api.get('/api/v1/topics/9/tags')
    .expect(404);
  });

  it('should throw error if topic doesn\'t exist, posts', async () => {
    await api.get('/api/v1/topics/9/posts')
    .expect(404);
  });
});

import supertest from 'supertest';
import chai from 'chai';
import app from './../index';

const expect = chai.expect;
const api = supertest.agent(app.listen());
let response, token;

describe('Posts', () => {
  it('no user should be able to get all posts  without a topic', async () => {
    await api.get('/api/v1/posts')
    .expect(501);
  });


  describe('creation', () => {
    it('unauthenicated users can\'t create posts', async () => {
      await api.post('/api/v1/posts')
      .send({
        content: 'This is a content under the Vinland Map Topic',
        topicId: 4,
        userId: 1,
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

    it('post must have a content', async () => {
      const res = await api.post('/api/v1/posts')
      .send({
        topicId: 4,
        userId: 1,
      })
      .set('authorization', token)
      .expect(400);

      expect(res.body.message).to.equal('All fields must be present');
    });

    it('content musn\'t be empty', async () => {
      const res = await api.post('/api/v1/posts')
      .send({
        content: '',
        topicId: 4,
        userId: 1,
      })
      .set('authorization', token)
      .expect(400);

      expect(res.body.message).to.equal('All fields must be present');
    });

    it('post must have a userId', async () => {
      const res = await api.post('/api/v1/posts')
      .send({
        content: 'you',
        topicId: 4,
      })
      .set('authorization', token)
      .expect(400);

      expect(res.body.message).to.equal('User id must be same as creator');
    });

    it('post must have a topicId', async () => {
      const res = await api.post('/api/v1/posts')
      .send({
        content: 'you',
        userId: 1,
      })
      .set('authorization', token)
      .expect(400);

      expect(res.body.message).to.equal('All fields must be present');
    });

    it('userId must be same as creator', async () => {
      const res = await api.post('/api/v1/posts')
      .send({
        content: 'some content',
        topicId: 4,
        userId: 2,
      })
      .set('authorization', token)
      .expect(400);

      expect(res.body.message).to.equal('User id must be same as creator');
    });

    it('should return 404 if topic doesn\'t exist', async () => {
      const res = await api.post('/api/v1/posts')
      .send({
        content: 'some content',
        topicId: 9,
        userId: 1,
      })
      .set('authorization', token)
      .expect(404);

      expect(res.body.message).to.equal('Topic doesn\'t exist');
    });

    it('authenticated users can create new posts', async () => {
      const res = await api.post('/api/v1/posts')
      .send({
        content: 'some content for topic 3',
        topicId: 3,
        userId: 1,
      })
      .set('authorization', token)
      .expect(200);

      expect(res.body.data).to.have.property('id');
    });
  });

  describe('update', () => {
    it('unauthenicated users can\'t edit posts', async () => {
      await api.put('/api/v1/posts/4')
      .send({
        content: 'This is a content under the Vinland Map Topic',
      })
      .expect(401);
    });

    it('cannot update post userId', async () => {
      const res = await api.put('/api/v1/posts/4')
      .send({
        content: 'you',
        userId: 2,
      })
      .set('authorization', token)
      .expect(400);

      expect(res.body.message).to.equal('You can\'t update the post user, topic or id');
    });

    it('cannot update post topicId', async () => {
      const res = await api.put('/api/v1/posts/4')
      .send({
        content: 'you',
        topicId: 2,
      })
      .set('authorization', token)
      .expect(400);

      expect(res.body.message).to.equal('You can\'t update the post user, topic or id');
    });

    it('posts can only be updated by creator', async () => {
      const res = await api.put('/api/v1/posts/4')
      .send({
        content: 'you',
      })
      .set('authorization', token)
      .expect(403);

      expect(res.body.message).to.equal('You\'re not allowed to perform this action');
    });


    it('cannot update a non existent post', async () => {
      const res = await api.put('/api/v1/posts/24')
      .send({
        content: 'you',
      })
      .set('authorization', token)
      .expect(404);

      expect(res.body.message).to.equal('Post doesn\'t exist');
    });

    it('owner of the post can update the post', async () => {
      const res = await api.put('/api/v1/posts/1')
      .send({
        content: 'you',
      })
      .set('authorization', token)
      .expect(200);

      expect(res.body.data).to.have.property('content', 'you');
    });
  });
});

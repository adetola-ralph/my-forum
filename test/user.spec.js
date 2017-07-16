import supertest from 'supertest';
import chai from 'chai';
import app from './../index';

// const expect = chai.expect;
const api = supertest.agent(app.listen());
let token;
let response;

describe('User Controller', () => {
  it('Should return 401 for unauthenticated access to any user', async () => {
    await api.get('/api/v1/users/1')
    .expect(401);
  });

  // move away from here
  it('Should return 401 for invalid token', async () => {
    await api.get('/api/v1/users/1')
    .set('Authorization', 'Bearer invalidtoken')
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
  it('should allow authenticated users get their profile', async () => {
    await api.get('/api/v1/users/1')
    .set('Authorization', token)
    .expect(200);
  });

  it('should not allow authenticated users get other user\'s profile', async () => {
    await api.get('/api/v1/users/2')
    .set('Authorization', token)
    .expect(403);
  });
});

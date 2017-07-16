import supertest from 'supertest';
import chai from 'chai';
import app from './../index';

const expect = chai.expect;
const api = supertest.agent(app.listen());

describe('Authentication', () => {
  describe('User signup', () => {
    it('Should return error for incomplete details on signup', async () => {
      const res = await api.post('/api/v1/signup')
      .send({
        name: 'Olutola Oreofe',
        email: 'oreofe.olutola@gmail.com',
      }).expect(400);

      expect(res.body).to.haveOwnProperty('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.be.false;
    });

    it('Should return error for duplicate user on signup', async () => {
      const res = await api.post('/api/v1/signup')
      .send({
        name: 'Olutola Oreofe',
        email: 'admin@my-forum.me',
        password: 'password',
      }).expect(409);

      expect(res.body).to.haveOwnProperty('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.be.false;
    });

    it('Should allow new users to signup', async () => {
      const res = await api.post('/api/v1/signup')
      .send({
        name: 'Olutola Oreofe',
        email: 'oreofe.olutola@gmail.com',
        password: 'password',
      }).expect(200);

      expect(res.body).to.haveOwnProperty('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.be.true;
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('token');
    });
  });

  describe('User signin', () => {
    it('Should reject wrong password be able to signin', async () => {
      const res = await api.post('/api/v1/signin')
      .send({
        email: 'admin@my-forum.me',
        password: 'WrongPassword',
      }).expect(401);

      expect(res.body).to.haveOwnProperty('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.be.false;
    });

    it('Should return error for incomplete details on signup', async () => {
      const res = await api.post('/api/v1/signin')
      .send({
        email: 'oreofe.olutola@gmail.com',
      }).expect(400);

      expect(res.body).to.haveOwnProperty('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.be.false;
    });

    it('Should return on error on wrong or non existent email', async () => {
      const res = await api.post('/api/v1/signin')
      .send({
        email: 'admin@my-foru.me',
        password: 'AdminPassword',
      }).expect(401);

      expect(res.body).to.haveOwnProperty('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.be.false;
    });

    it('Should allow registered users to signin', async () => {
      const res = await api.post('/api/v1/signin')
      .send({
        email: 'admin@my-forum.me',
        password: 'AdminPassword',
      }).expect(200);

      expect(res.body).to.haveOwnProperty('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.be.true;
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('token');
    });
  });
});

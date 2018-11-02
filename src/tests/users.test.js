import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const adminCredentials = {
  email: 'admin@mail.com',
  password: '111111'
}

const newAttendant = {
  email: 'user@mail.com',
  password: '111111',
  role: 'attendant'
}


chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;
describe('POST /auth', () => {
  it('should give a user access to system and create user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Login Successful');
        chai.request(server)
          .post('/api/v1/auth/signup')
          .set("token", res.body.token)
          .send(newAttendant)
          .end((err, res) => {
            res.should.have.status(201);
          });
        chai.request(server)
          .get('/api/v1/users')
          .set("token", res.body.token)
          .end((err, res) => {
            res.should.have.status(201);
          });
        done(err);
      });
  });
});


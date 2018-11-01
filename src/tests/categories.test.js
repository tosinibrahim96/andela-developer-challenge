import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';



const adminCredentials = {
  email: 'admin@mail.com',
  password: '111111'
}

const categeoryDetails = {
  name: 'categoryname'
}


chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;
describe('POST /auth', () => {
  it('should give a user access to system and create category', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Login Successful');
        chai.request(server)
          .get('/api/v1/categories')
          .set("token", res.body.token)
          .end((err, res) => {
            res.should.have.status(200);
          });
        chai.request(server)
          .post('/api/v1/categories')
          .send(categeoryDetails)
          .set("token", res.body.token)
          .end((err, res) => {
            res.should.have.status(201);
          });
        done(err);
      });
  });
});
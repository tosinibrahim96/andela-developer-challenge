import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';


const adminCredentials = {
  email: 'admin@mail.com',
  password: '111111'
}

const productDetails = {
  name: 'name',
  category_id: '2',
  price: '290',
  quantity: '12',
  description: 'description'
}


chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;
describe('/products', () => {
  it('add, edit and delete products', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Login Successful');
        done(err);
      });
  });
});

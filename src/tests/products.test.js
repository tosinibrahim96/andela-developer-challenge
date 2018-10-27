import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;
describe('GET /products', () => {
      it('should get all products', (done) => {
            chai.request(server)
                  .get('/api/v1/products/')
                  .end((err, res) => {
                        res.should.have.status(200);
                        done();
                  });
      });
});
describe('GET /products/:id', () => {
      it('should return 404 if an invalid id is passed', (done) => {
            chai.request(server)
                  .get('/api/v1/products/9')
                  .end((err, res) => {
                        res.should.have.status(404);
                        expect(res.body.message).to.equal('The Product With the Given ID Was not Found.');
                        done(err);
                  });
      });
      it('should return a product if id is valid', (done) => {
            chai.request(server)
                  .get('/api/v1/products/1')
                  .end((err, res) => {
                        expect(res.body).to.be.an('object');
                        expect(res.status).to.equal(200);
                        done(err);
                  });
      });
});
describe('POST /products', () => {
      it('should return 422(Unprocessable Entity) if empty input is passed', (done) => {
            chai.request(server)
                  .post('/api/v1/products')
                  .send({})
                  .end((err, res) => {
                        res.should.have.status(422);
                        done(err);
                  });
      });
      it('should return an object if valid input is passed', (done) => {
            chai.request(server)
                  .post('/api/v1/products')
                  .set('Content-Type', 'application/json')
                  .send({
                        name: 'product',
                        category: 'category',
                        quantity: 3,
                        size: 32,
                        price: 320
                  })
                  .end((err, res) => {
                        res.should.have.status(201);
                        done();
                  });
      });
});
describe('DELETE /products/:id', () => {
      it('should return 404 if an invalid id is passed', (done) => {
            chai.request(server)
                  .get('/api/v1/products/9')
                  .end((err, res) => {
                        res.should.have.status(404);
                        expect(res.body.message).to.equal('The Product With the Given ID Was not Found.');
                        done(err);
                  });
      });
      it('should return a product if id is valid', (done) => {
            chai.request(server)
                  .get('/api/v1/products/1')
                  .end((err, res) => {
                        expect(res.body).to.be.an('object');
                        expect(res.status).to.equal(200);
                        done(err);
                  });
      });
});
describe('PUT /products/:id', () => {
      it('should return 422(Unprocessable Entity) if empty input is passed', (done) => {
            chai.request(server)
                  .put('/api/v1/products/1')
                  .send({})
                  .end((err, res) => {
                        res.should.have.status(422);
                        done(err);
                  });
      });
      it('update product successfully', (done) => {
            chai.request(server)
                  .put('/api/v1/products/1')
                  .send({
                        name: 'updated product',
                        category: 'updated category',
                        quantity: 3,
                        size: 32,
                        price: 320
                  })
                  .end((err, res) => {
                        res.should.have.status(200);
                        done();
                  });
      });
});
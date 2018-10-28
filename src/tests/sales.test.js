import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;
describe('GET /sales', () => {
      it('should get all sales', (done) => {
            chai.request(server)
                  .get('/api/v1/sales/')
                  .end((err, res) => {
                        res.should.have.status(200);
                        done();
                  });
      });
});
describe('GET /sales/:id', () => {
      it('should return 404 if an invalid id is passed', (done) => {
            chai.request(server)
                  .get('/api/v1/sales/9')
                  .end((err, res) => {
                        res.should.have.status(404);
                        expect(res.body.message).to.equal('The Sale with the given ID was not found.');
                        done(err);
                  });
      });
      it('should return a sale if id is valid', (done) => {
            chai.request(server)
                  .get('/api/v1/sales/1')
                  .end((err, res) => {
                        expect(res.body).to.be.an('object');
                        expect(res.status).to.equal(200);
                        done(err);
                  });
      });
});
describe('POST /sales', () => {
      it('should return 422(Unprocessable Entity) if empty input is passed', (done) => {
            chai.request(server)
                  .post('/api/v1/sales')
                  .send({})
                  .end((err, res) => {
                        res.should.have.status(422);
                        done(err);
                  });
      });
      it('should return an object if valid input is passed', (done) => {
            chai.request(server)
                  .post('/api/v1/sales')
                  .set('Content-Type', 'application/json')
                  .send({
                        name: 'sale',
                        category: 'category',
                        quantity: 3,
                        size: 32,
                        price: 320,
                        userId: "3"
                  })
                  .end((err, res) => {
                        res.should.have.status(201);
                        done();
                  });
      });
});
describe('DELETE /sales/:id', () => {
      it('should return 404 if an invalid id is passed', (done) => {
            chai.request(server)
                  .get('/api/v1/sales/9')
                  .end((err, res) => {
                        res.should.have.status(404);
                        expect(res.body.message).to.equal('The Sale with the given ID was not found.');
                        done(err);
                  });
      });
      it('should return a sale if id is valid', (done) => {
            chai.request(server)
                  .get('/api/v1/sales/1')
                  .end((err, res) => {
                        expect(res.body).to.be.an('object');
                        expect(res.status).to.equal(200);
                        done(err);
                  });
      });
});
describe('PUT /sales/:id', () => {
      it('should return 422(Unprocessable Entity) if empty input is passed', (done) => {
            chai.request(server)
                  .put('/api/v1/sales/1')
                  .send({})
                  .end((err, res) => {
                        res.should.have.status(422);
                        done(err);
                  });
      });
      it('update sale successfully', (done) => {
            chai.request(server)
                  .put('/api/v1/sales/1')
                  .send({
                        name: 'updated sale',
                        category: 'updated category',
                        quantity: 3,
                        size: 32,
                        price: 320,
                        userId: "1"
                  })
                  .end((err, res) => {
                        res.should.have.status(200);
                        done();
                  });
      });
});
'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var should = _chai2.default.should();
var expect = _chai2.default.expect;

describe('GET /products', function () {
  it('should get all products', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/products/').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});
describe('GET /products/:id', function () {
  it('should return 404 if an invalid id is passed', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/products/9').end(function (err, res) {
      res.should.have.status(404);
      expect(res.body.message).to.equal('The Product With the Given ID Was not Found.');
      done(err);
    });
  });
  it('should return a product if id is valid', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/products/1').end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      done(err);
    });
  });
});
describe('POST /products', function () {
  it('should return 422(Unprocessable Entity) if empty input is passed', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/products').send({}).end(function (err, res) {
      res.should.have.status(422);
      done(err);
    });
  });
  it('should return an object if valid input is passed', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/products').send({
      name: 'product',
      category: 'category',
      quantity: 3,
      size: 32,
      price: 320
    }).end(function (err, res) {
      res.should.have.status(201);
      done();
    });
  });
  it('should return an invalid datatype', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/products').send({
      name: 2,
      category: 2,
      quantity: 3,
      size: 32,
      price: 320
    }).end(function (err, res) {
      res.should.have.status(422);
      done();
    });
  });
});
describe('PUT /products/:id', function () {
  it('should return 422(Unprocessable Entity) if empty input is passed', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/products/1').send({}).end(function (err, res) {
      res.should.have.status(422);
      done(err);
    });
  });
  it('update product successfully', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/products/1').send({
      name: 'updated product',
      category: 'updated category',
      quantity: 3,
      size: 32,
      price: 320
    }).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should return 404 if an invalid id is passed', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/products/9').end(function (err, res) {
      res.should.have.status(404);
      expect(res.body.message).to.equal('The Product With the Given ID Was not Found.');
      done(err);
    });
  });
});

describe('DELETE /products/:id', function () {
  it('should return 404 if an invalid id is passed', function (done) {
    _chai2.default.request(_server2.default).del('/api/v1/products/9').end(function (err, res) {
      res.should.have.status(404);
      expect(res.body.message).to.equal('The Product With the Given ID Was not Found.');
      done(err);
    });
  });
  it('should return a product if id is valid', function (done) {
    _chai2.default.request(_server2.default).del('/api/v1/products/1').end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      done(err);
    });
  });
});
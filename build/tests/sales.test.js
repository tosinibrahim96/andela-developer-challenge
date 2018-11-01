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

describe('GET /sales', function () {
  it('should get all sales', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/sales/').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});
describe('GET /sales/:id', function () {
  it('should return 404 if an invalid id is passed', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/sales/9').end(function (err, res) {
      res.should.have.status(404);
      expect(res.body.message).to.equal('The Sale with the given ID was not found.');
      done(err);
    });
  });
  it('should return a sale if id is valid', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/sales/1').end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      done(err);
    });
  });
});
describe('POST /sales', function () {
  it('should return 422(Unprocessable Entity) if empty input is passed', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/sales').send({}).end(function (err, res) {
      res.should.have.status(422);
      done(err);
    });
  });
  it('should return an object if valid input is passed', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/sales').set('Content-Type', 'application/json').send({
      name: 'sale',
      category: 'category',
      quantity: 3,
      size: 32,
      price: 320,
      userId: "3"
    }).end(function (err, res) {
      res.should.have.status(201);
      done();
    });
  });
});
describe('PUT /sales/:id', function () {
  it('should return 422(Unprocessable Entity) if empty input is passed', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/sales/1').send({}).end(function (err, res) {
      res.should.have.status(422);
      done(err);
    });
  });
  it('update sale successfully', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/sales/1').send({
      name: 'updated sale',
      category: 'updated category',
      quantity: 3,
      size: 32,
      price: 320,
      userId: "1"
    }).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});
it('should return 404 if an invalid id is passed', function (done) {
  _chai2.default.request(_server2.default).put('/api/v1/sales/9').end(function (err, res) {
    res.should.have.status(404);
    expect(res.body.message).to.equal('The Sale With the Given ID Was not Found.');
    done(err);
  });
});
describe('DELETE /sales/:id', function () {
  it('should return 404 if an invalid id is passed', function (done) {
    _chai2.default.request(_server2.default).del('/api/v1/sales/9').end(function (err, res) {
      res.should.have.status(404);
      expect(res.body.message).to.equal('The Sale with the given ID was not found.');
      done(err);
    });
  });
  it('should return a sale if id is valid', function (done) {
    _chai2.default.request(_server2.default).del('/api/v1/sales/1').end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(200);
      done(err);
    });
  });
});
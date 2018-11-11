'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const adminCredentials = {
  email: 'admin@mail.com',
  password: '111111'
};

const newAttendant = {
  email: 'user@mail.com',
  password: '111111',
  role: 'attendant'
};

_chai2.default.use(_chaiHttp2.default);
const should = _chai2.default.should();
const { expect } = _chai2.default;
describe('POST /auth', () => {
  it('should give a user access to system and create user', done => {
    _chai2.default.request(_server2.default).post('/api/v1/auth/login').send(adminCredentials).end((err, res) => {
      res.should.have.status(200);
      expect(res.body.message).to.equal('Login Successful');
      _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set("token", res.body.token).send(newAttendant).end((err, res) => {
        res.should.have.status(201);
      });
      _chai2.default.request(_server2.default).get('/api/v1/users').set("token", res.body.token).end((err, res) => {
        res.should.have.status(201);
      });
      done(err);
    });
  });
});
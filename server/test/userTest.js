import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';
// import Model from './../models';

process.env.NODE_ENV = 'test';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);
// variable details
let token;
// Test for sign up
describe('user validation', () => {
  it('it should signup user', (done) => {
    // variable detail
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fififi',
        email: faker.internet.email(),
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        role: 'user',
        confirmPassword: 'Opeyemi22',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.eql(true);
        res.body.should.have.property('message');
        res.body.message.should.eql('sign up successful');
        done();
      });
  });

  it('it should not signup user', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: '',
        email: faker.internet.email(),
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });

  it('it should not signup user with no email', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'hddhshdhdsss',
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });

  it('it should not signup user with invalid email', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'hddhshdhdsss',
        email: 'hsdhfjdsj',
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });

  it('it should not signup user with invalid email', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'hddhshdhdsss',
        email: 'dhfhffh@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Ope2',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });

  it('it should not signup user with an empty password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'hddhshdhdsss',
        email: faker.internet.email(),
        phoneNumber: '08095483746',
        password: '',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });


  it('it should not login with an incorrect email ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'tuwalase'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });

  it('it should login ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Ottilie.Turcotte@gmail.com',
        password: 'Opeyemi22'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        /* eslint-disable prefer-destructuring */
        token = res.body.token;
        done();
      });
  });

  it('should not login with an incorrect password ', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Buford24@hotmail.com',
        password: 'opemi1'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should not login with an no password ', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Buford24@hotmail.com'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('meal validation', () => {
  it('should not add meal already existing ', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/meals')
      .send({ mealName: 'beans and rice' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should not add meal with an empty field ', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/meals')
      .send({ mealName: '' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should not add meal with an empty field ', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/meals')
      .send({ mealName: '' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should not add meal with an empty amount field ', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        mealName: 'aba',
        amount: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should not add meal with an invalid usid ', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        mealName: 'aba',
        amount: '12000',
        userid: 'asb'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });
});

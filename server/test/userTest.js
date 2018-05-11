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
describe('', () => {
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
        res.body.should.have.property('error');
        res.body.error.should.eql('username is too short');
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
        res.body.should.have.property('error');
        res.body.error.should.eql('email is required');
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
        console.log(err, '>>>>>>>>>')
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('password is too short');
        done();
      });
  });

  // it('it should not signup user with an unconfirmed password', (done) => {
  //   // variable details
  //   chai.request(app)
  //     .post('/api/v1/auth/signup')
  //     .send({
  //       username: 'hddhshdhdsss',
  //       email: faker.internet.email(),
  //       phoneNumber: '08099900068',
  //       password: 'Opeyemi22',
  //       role: 'user',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       res.body.should.have.property('error');
  //       res.body.error.should.eql('valid phone number required');
  //       done();
  //     });
  // });

  it('it should not login with an incorrect email ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'tuwalase'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('email not found');
        done();
      });
  });

  it('it should login ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'toluwalase',
        password: 'opeyemi1'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        /* eslint-disable prefer-destructuring */
        token = res.body.data.token;
      });
  });

  it('should not login with an incorrect password ', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'toluwalase',
        password: 'opemi1'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(false);
        res.body.should.have.property('token');
        done();
      });
  });


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
        res.body.should.have.property('error');
        res.body.error.should.eql('username is too short');
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
        res.body.should.have.property('error');
        res.body.error.should.eql('email is required');
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
        res.body.should.have.property('error');
        res.body.error.should.eql('password is too short');
        done();
      });
  });

  it('it should not signup user with an unconfirmed password', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'hddhshdhdsss',
        email: faker.internet.email(),
        phoneNumber: '08099900068',
        password: 'Opeyemi22',
        role: 'user',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('valid phone number required');
        done();
      });
  });

  // test for login
  it('it should not login with an incorrect email ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'tuwalase'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('email not found');
        done();
      });
  });

  it('it should login ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'toluwalase',
        password: 'opeyemi1'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        /* eslint-disable prefer-destructuring */
        token = res.body.data.token;
      });
  });

  it('it should not login with an incorrect password ', (done) => {
    // variable details
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'toluwalase',
        password: 'opemi1'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(false);
        res.body.should.have.property('token');
        done();
      });
  });
});

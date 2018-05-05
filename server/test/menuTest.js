import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

// variable
const today = (new Date()).toLocaleDateString();

// POST a menu
describe('/POST a menu', () => {
  it('it should POST a menu', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        id: 1,
        date: today,
        meals: [
          1, 2
        ]
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('menu successfully added');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
        done();
      });
  });

  // Test for post with no Id
  it('it should not POST a menu with no date', (done) => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .send({
        meals: [
          {
            id: 1,
            meals: [1, 2]
          }
        ]
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('date is required');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });

  it('it should not POST a menu with an empty meal request', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        meals: [
        ]
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('meals can not be empty');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });

  it('it should not POST a menu with an existing date', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        date: '1-2-2015',
        meals: [
          {
            meals: [2]
          }
        ]
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('date is already existing');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });

  it('it should not POST a menu with no date', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        meals: [
          {
            id: 1,
            meals: [1]
          }
        ]
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('date is required');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });

  it('it should not POST a menu with an invalid meal request', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        date: '2-2-2015',
        meals: ['a']
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('invalid meal request');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });
  it('it should not POST a menu with an empty meal request', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        date: '1-2-2015',
        meals: []
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('meals can not be empty');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });
});

// get menu
describe('/get all menu', () => {
  it('it should get all menu', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('result');
        res.body.result.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
        done();
      });
  });
});


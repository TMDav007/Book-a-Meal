import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

// POST a menu
describe('/POST a menu', () => {
  // Test for post with an existing date
  it('it should not POST a menu with an existing id field', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        id: 1,
        date: '16-09-2018',
        meals: [
          {
            id: 1,
            food: 'Jollof-rice',
            quantity: 1,
            image: 'img.png',
            amount: '5000',
            category: 'local-dish'
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

  // Test for post with no Id
  it('it should not POST a menu without a date field', (done) => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .send({
        meals: [
          {
            id: 1
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

  // Test for to add a new menu.
  it('it should Add(post) a new meal', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        id: 5,
        date: '17-09-2018',
        meals: [
          {
            id: 1,
            food: 'Jollof-rice',
            quantity: 1,
            image: 'img.png',
            amount: '5000',
            category: 'local-dish'
          }
        ]
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('successfully added');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
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


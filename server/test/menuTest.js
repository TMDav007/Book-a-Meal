import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

// POST a menu
describe('/POST a menu', () => {
  // Test for post with an existing date
  it('it should POST a menu', (done) => {
    const today = new Date();
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
  it('it should not POST a menu with wrong date', (done) => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .send({
        meals: [
          {
            id: 1,
            date: '12-03-233',
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


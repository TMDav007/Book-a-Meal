import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

// meal
describe('/GET meal', () => {
  it('it should GET all the meal', (done) => {
    chai.request(app)
      .get('/api/v1/meals')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('result');
        res.body.result.should.be.a('array');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
        done();
      });
  });
});

// POST meal
describe('/POST a meal', () => {
  // Test for post with an existing Id
  it('it should not POST a meal with an existing id field', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        id: 1,
        food: 'Jollof-rice',
        quantity: 1,
        image: 'img.png',
        amount: '5000',
        category: 'local-dish'
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('id is already existing');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });

  // Test for post with no Id
  it('it should not POST a meal without an id field', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        food: 'Jollof-rice',
        quantity: 1,
        image: 'img.png',
        amount: '5000',
        category: 'local-dish'
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('id is required');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });

  // Test for post with to add a new meal.
  it('it should Add(post) a new meal', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        id: 10,
        food: 'Jollof-rice',
        quantity: 1,
        image: 'img.png',
        amount: '5000',
        category: 'local-dish'
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Success');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
        done();
      });
  });
});

// PUT(Update) a meal
describe('/Update a meal', () => {
  // PUT a meal
  it('it should update the meal', (done) => {
    chai.request(app)
      .put('/api/v1/meals/1')
      .send({
        id: 1,
        food: 'Jollof-rice'
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Update Successful');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
        done();
      });
  });

  // PUT a meal
  it('it should not update', (done) => {
    chai
      .request(app)
      .put('/api/v1/meals/20')
      .send({
        id: 20,
        food: 'Jollof-rice',
        quantity: 1,
        image: 'img.png',
        amount: '5000',
        category: 'local-dish'
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('not found');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });
});

// get a meal
describe('/get a meal', () => {
  it('it should get a meal', (done) => {
    chai.request(app)
      .get('/api/v1/meals/local-dish')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Success');
        res.body.should.have.property('result');
        done();
      });
  });

  it('it should not get a meal', (done) => {
    chai.request(app)
      .get('/api/v1/meals/local')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });
});

// Delete a meal
describe('/Delete a meal', () => {
  it('it should delete a meal', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Success');
        done();
      });
  });

  it('it should not delete a meal', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/20')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });
});


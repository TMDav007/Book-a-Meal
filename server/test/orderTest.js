import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);


describe('/GET welcome message', () => {
  // test for route
  it('it should GET a message', (done) => {
    chai.request(app)
      .get('')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('/GET api message', () => {
  // test for route
  it('it should GET get a message', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});

// Order
describe('/GET orders', () => {
  // test for Get all Orders
  it('it should GET all the orders', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('result');
        res.body.result.should.be.a('array');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
        done();
      });
  });
});

// POST meal
describe('/POST a order', () => {
  // Test for post with an existing Id
  it('it should not POST a order for an empty meal', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .send({
        id: 1,
        user: 'ade',
        meals: []
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('meals cannot be empty');
        done();
      });
  });

  // Test for post with to add a new order.
  it('it should Add(post) a new order', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .send({
        id: 6,
        user: 'Addde',
        meals: [
          1, 2
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

// PUT(Update) a order
describe('/Update a order', () => {
  // PUT a meal
  it('it should update the order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/2')
      .send({
        id: 2,
        user: 'ade',
        meals: [
          1, 3
        ]
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('update successfully');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
        done();
      });
  });

  // PUT a order
  it('it should not update', (done) => {
    const id = 20;
    chai
      .request(app)
      .put(`/api/v1/orders/${id}`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('id not found');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });
});


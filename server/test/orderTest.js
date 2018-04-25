import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

// Global
let order = {
  id: 6,
  user: 'Ade',
  qty: 1,
  food: 'Amala',
  amount: 12000
};


  // Order
describe('/GET orders', () => {
  // test for Get all Orders
  it('it should GET all the orders', (done) => {
    chai
      .request(app)
      .get('/api/v1/order')
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
describe('/POST a order', () => {
  // Test for post with an existing Id
  it('it should not POST a order with an existing id field', () => {
    chai
      .request(app)
      .post('/api/v1/order')
      .field('id', order.id)
      .field('user', order.user)
      .then((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('id is already existing');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
      });
  });

  // Test for post with no Id
  it('it should not POST a meal without an id field', (done) => {
    order = [
      {
        user: 'Ade',
        qty: 1,
        food: 'Amala',
        amount: 12000
      }
    ];
    chai
      .request(app)
      .post('/api/v1/order')
      .send(order)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('id is required');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
        done();
      });
  });

  // Test for post with to add a new order.
  it('it should Add(post) a new meal', () => {
    chai
      .request(app)
      .post('/api/v1/order')
      .send(order)
      .then((res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Success');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
      });
  });
});

// PUT(Update) a order
describe('/Update a order', () => {
  // PUT a meal
  it('it should update the order', () => {
    const id = 1;
    chai
      .request(app)
      .put(`/api/v1/order/${(order.id = 1)}`)
      .field('food', (order.food = 'amala'))
      .then((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Update Successful');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
      });
  });

  // PUT a order
  it('it should not update', (done) => {
    const id = 20;
    chai
      .request(app)
      .put(`/api/v1/order/${id}`)
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


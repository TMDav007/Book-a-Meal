import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

// Global
let meal = {
  id: 10,
  food: 'Jollof-rice',
  quantity: 1,
  image: 'img.png',
  amount: '5000',
  category: 'local-dish'
};

// Test for /Get meal
describe('/GET meal', () => {
  it('it should GET all the meal', (done) => {
    chai
      .request(app)
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
  it('it should not POST a meal with an existing id field', () => {
    chai
      .request(app)
      .post('/api/v1/meals')
      .field('id', meal.id)
      .field('food', meal.food)
      .field('quantity', meal.quantity)
      .field('image', meal.amount)
      .field('category', meal.category)
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
    meal = {
      food: 'Jollof-rice',
      quantity: 1,
      image: 'img.png',
      amount: '5000',
      category: 'local-dish'
    };
    chai
      .request(app)
      .post('/api/v1/meals')
      .send(meal)
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
  it('it should Add(post) a new meal', () => {
    chai
      .request(app)
      .post('/api/v1/meals')
      .send(meal)
      .then((res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Success');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
      });
  });
});

// PUT(Update) a meal
describe('/Update a meal', () => {
  // PUT a meal
  it('it should update the meal', () => {
    const id = 1;
    chai
      .request(app)
      .put(`/api/v1/meals/${(meal.id = 1)}`)
      .field('food', (meal.food = 'amala'))
      .then((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Update Successful');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
      });
  });

  // PUT a meal
  it('it should not update', (done) => {
    const id = 20;
    chai
      .request(app)
      .put(`/api/v1/meals/${id}`)
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
  it('it should get a meal', () => {
    chai
      .request(app)
      .get(`/api/v1/meals/${meal.category}`)
      .then((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Success');
        res.body.should.have.property('result');
      });
  });

  it('it should not get a meal', () => {
    chai
      .request(app)
      .get(`/api/v1/meals/${20}`)
      .then((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('not found');
      });
  });
});

// Delete a meal
describe('/Delete a meal', () => {
  // DELETE a meal
  it('it should delete a meal', () => {
    chai
      .request(app)
      .delete(`/api/v1/meals/${meal.id}`)
      .then((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Success');
      });
  });

  it('it should not delete a meal', () => {
    chai
      .request(app)
      .delete(`/api/v1/meals/${20}`)
      .then((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('not found');
      });
  });
});


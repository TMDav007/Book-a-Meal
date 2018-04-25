import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

// Global
let menu = [
  {
    id: 2,
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
  }
];


// Menu
// POST a menu
describe('/POST a menu', () => {
  // Test for post with an existing date
  it('it should not POST a menu with an existing date field', () => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .field('date', (menu.date = '16-09-2018'))
      .then((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('date is already existing');
        res.body.should.have.property('error');
        res.body.error.should.eql(true);
      });
  });

  // Test for post with no Id
  it('it should not POST a menu without an date field', (done) => {
    menu = [
      {
        id: 1,
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
      }
    ];
    chai
      .request(app)
      .post('/api/v1/menu')
      .send(menu)
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
  it('it should Add(post) a new meal', () => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .send(menu)
      .then((res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Success');
        res.body.should.have.property('error');
        res.body.error.should.eql(false);
      });
  });
});

// get a menu
describe('/get a menu', () => {
  it('it should get a menu', () => {
    chai
      .request(app)
      .get(`/api/v1/menu/${'16-09-2018'}`)
      .then((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Success');
        res.body.should.have.property('result');
      });
  });

  it('it should not get a menu', () => {
    chai
      .request(app)
      .get(`/api/v1/menu/${20}`)
      .then((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('not found');
      });
  });
});

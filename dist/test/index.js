'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('./../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint-disable no-unused-vars */
var should = _chai2['default'].should();

_chai2['default'].use(_chaiHttp2['default']);

// Global
var meal = {
  id: 10,
  food: 'Jollof-rice',
  quantity: 1,
  image: 'img.png',
  amount: '5000',
  category: 'local-dish'
};

var menu = [{
  id: 2,
  date: '17-09-2018',
  meals: [{
    id: 1,
    food: 'Jollof-rice',
    quantity: 1,
    image: 'img.png',
    amount: '5000',
    category: 'local-dish'
  }]
}];

var order = {
  id: 6,
  user: 'Ade',
  qty: 1,
  food: 'Amala',
  amount: 12000
};

// Test for /Get meal
describe('/GET meal', function () {
  it('it should GET all the meal', function (done) {
    _chai2['default'].request(_server2['default']).get('/api/v1/meals').end(function (err, res) {
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
describe('/POST a meal', function () {
  // Test for post with an existing Id
  it('it should not POST a meal with an existing id field', function () {
    _chai2['default'].request(_server2['default']).post('/api/v1/meals').field('id', meal.id).field('food', meal.food).field('quantity', meal.quantity).field('image', meal.amount).field('category', meal.category).then(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('id is already existing');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
    });
  });

  // Test for post with no Id
  it('it should not POST a meal without an id field', function (done) {
    meal = {
      food: 'Jollof-rice',
      quantity: 1,
      image: 'img.png',
      amount: '5000',
      category: 'local-dish'
    };
    _chai2['default'].request(_server2['default']).post('/api/v1/meals').send(meal).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('id is required');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });

  // Test for post with to add a new meal.
  it('it should Add(post) a new meal', function () {
    _chai2['default'].request(_server2['default']).post('/api/v1/meals').send(meal).then(function (res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
    });
  });
});

// PUT(Update) a meal
describe('/Update a meal', function () {
  // PUT a meal
  it('it should update the meal', function () {
    var id = 1;
    _chai2['default'].request(_server2['default']).put('/api/v1/meals/' + (meal.id = 1)).field('food', meal.food = 'amala').then(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Update Successful');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
    });
  });

  // PUT a meal
  it('it should not update', function (done) {
    var id = 20;
    _chai2['default'].request(_server2['default']).put('/api/v1/meals/' + id).end(function (err, res) {
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
describe('/get a meal', function () {
  it('it should get a meal', function () {
    _chai2['default'].request(_server2['default']).get('/api/v1/meals/' + String(meal.category)).then(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('result');
    });
  });

  it('it should not get a meal', function () {
    _chai2['default'].request(_server2['default']).get('/api/v1/meals/' + 20).then(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      res.body.error.should.eql('not found');
    });
  });
});

// Delete a meal
describe('/Delete a meal', function () {
  // DELETE a meal
  it('it should delete a meal', function () {
    _chai2['default'].request(_server2['default'])['delete']('/api/v1/meals/' + String(meal.id)).then(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
    });
  });

  it('it should not delete a meal', function () {
    _chai2['default'].request(_server2['default'])['delete']('/api/v1/meals/' + 20).then(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      res.body.error.should.eql('not found');
    });
  });
});

// Menu
// POST a menu
describe('/POST a menu', function () {
  // Test for post with an existing date
  it('it should not POST a menu with an existing date field', function () {
    _chai2['default'].request(_server2['default']).post('/api/v1/menu').field('date', menu.date = '16-09-2018').then(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('date is already existing');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
    });
  });

  // Test for post with no Id
  it('it should not POST a menu without an date field', function (done) {
    menu = [{
      id: 1,
      meals: [{
        id: 1,
        food: 'Jollof-rice',
        quantity: 1,
        image: 'img.png',
        amount: '5000',
        category: 'local-dish'
      }]
    }];
    _chai2['default'].request(_server2['default']).post('/api/v1/menu').send(menu).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('date is required');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });

  // Test for to add a new menu.
  it('it should Add(post) a new meal', function () {
    _chai2['default'].request(_server2['default']).post('/api/v1/menu').send(menu).then(function (res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
    });
  });
});

// get a menu
describe('/get a menu', function () {
  it('it should get a menu', function () {
    _chai2['default'].request(_server2['default']).get('/api/v1/menu/' + '16-09-2018').then(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('result');
    });
  });

  it('it should not get a menu', function () {
    _chai2['default'].request(_server2['default']).get('/api/v1/menu/' + 20).then(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      res.body.error.should.eql('not found');
    });
  });
});

// Order
describe('/GET orders', function () {
  // test for Get all Orders
  it('it should GET all the orders', function (done) {
    _chai2['default'].request(_server2['default']).get('/api/v1/order').end(function (err, res) {
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
describe('/POST a order', function () {
  // Test for post with an existing Id
  it('it should not POST a order with an existing id field', function () {
    _chai2['default'].request(_server2['default']).post('/api/v1/order').field('id', order.id).field('user', order.user).then(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('id is already existing');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
    });
  });

  // Test for post with no Id
  it('it should not POST a meal without an id field', function (done) {
    order = [{
      user: 'Ade',
      qty: 1,
      food: 'Amala',
      amount: 12000
    }];
    _chai2['default'].request(_server2['default']).post('/api/v1/order').send(order).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('id is required');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });

  // Test for post with to add a new order.
  it('it should Add(post) a new meal', function () {
    _chai2['default'].request(_server2['default']).post('/api/v1/order').send(order).then(function (res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
    });
  });
});

// PUT(Update) a order
describe('/Update a order', function () {
  // PUT a meal
  it('it should update the order', function () {
    var id = 1;
    _chai2['default'].request(_server2['default']).put('/api/v1/order/' + (order.id = 1)).field('food', order.food = 'amala').then(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Update Successful');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
    });
  });

  // PUT a order
  it('it should not update', function (done) {
    var id = 20;
    _chai2['default'].request(_server2['default']).put('/api/v1/order/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('not found');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });
});
//# sourceMappingURL=index.js.map
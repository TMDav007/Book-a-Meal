'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menuController = require('./../controllers/menuController');

var _menuController2 = _interopRequireDefault(_menuController);

var _mealsController = require('./../controllers/mealsController');

var _mealsController2 = _interopRequireDefault(_mealsController);

var _orderController = require('./../controllers/orderController');

var _orderController2 = _interopRequireDefault(_orderController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var routes = function routes(app) {
  app.get('/', function (req, res) {
    return res.status(200).send({
      message: 'Welcome to the Book-A-Meal, add "/api/v1/" to use the api'
    });
  });

  app.get('/api/v1/', function (req, res) {
    return res.status(200).send({
      message: 'to view api, add /menu, or /meal or /order'
    });
  });

  // Meals
  app.get('/api/v1/meals', _mealsController2['default'].getAllMeal).post('/api/v1/meals', _mealsController2['default'].addMeal);

  app.get('/api/v1/meals/:category', _mealsController2['default'].getMealByName);

  app.put('/api/v1/meals/:id', _mealsController2['default'].updateMeal)['delete']('/api/v1/meals/:id', _mealsController2['default'].removeMeal);

  // Menu
  app.get('/api/v1/menu', _menuController2['default'].getAllMenu).post('/api/v1/menu', _menuController2['default'].addMenu);

  app.get('/api/v1/menu/:date', _menuController2['default'].getMenu);

  // Order
  app.get('/api/v1/order', _orderController2['default'].getAllOrder).post('/api/v1/order', _orderController2['default'].addOrder);

  app.put('/api/v1/order/:id', _orderController2['default'].updateorder);
};

exports['default'] = routes;
//# sourceMappingURL=index.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _order = require('./../models/order');

var _order2 = _interopRequireDefault(_order);

var _controllerFunction = require('./controllerFunction');

var _controllerFunction2 = _interopRequireDefault(_controllerFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * it is a class that control all order api;
 */
var orderController = function () {
  function orderController() {
    _classCallCheck(this, orderController);
  }

  _createClass(orderController, null, [{
    key: 'getAllOrder',

    /**
     * it GET all order
     * @param {string} req
     * @param {string} res
     * @returns {object} all order
     */
    value: function () {
      function getAllOrder(req, res) {
        _controllerFunction2['default'].getAll(_order2['default'], req, res);
      }

      return getAllOrder;
    }()

    /**
     * it ADD an order
     * @param {string} req
     * @param {string} res
     * @returns {object} add order
     */

  }, {
    key: 'addOrder',
    value: function () {
      function addOrder(req, res) {
        _controllerFunction2['default'].add(_order2['default'], req, res);
      }

      return addOrder;
    }()

    /**
     * it PUT(update) an order
     * @param {string} req
     * @param {string} res
     * @returns {object} PUT(update) an order
     */

  }, {
    key: 'updateorder',
    value: function () {
      function updateorder(req, res) {
        for (var j = 0; j < _order2['default'].length; j += 1) {
          if (_order2['default'][j].id === parseInt(req.body.id, 10)) {
            _order2['default'][j].user = req.body.user;
            _order2['default'][j].qty = req.body.qty;
            _order2['default'][j].food = req.body.food;
            _order2['default'][j].amount = req.body.amount;
            return res.json({
              order: _order2['default'][j],
              message: 'Update Successful',
              error: false
            });
          }
        }
        return res.status(404).json({
          message: 'not found',
          error: true
        });
      }

      return updateorder;
    }()
  }]);

  return orderController;
}();

exports['default'] = orderController;
//# sourceMappingURL=orderController.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _menu = require('./../models/menu');

var _menu2 = _interopRequireDefault(_menu);

var _controllerFunction = require('./controllerFunction');

var _controllerFunction2 = _interopRequireDefault(_controllerFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * it is a class that control all meal api;
 */
var mealController = function () {
  function mealController() {
    _classCallCheck(this, mealController);
  }

  _createClass(mealController, null, [{
    key: 'getAllMeal',

    /**
         * it GET all meal
         * @param {string} req
         * @param {string} res
         * @returns {object} all meal
         */
    value: function () {
      function getAllMeal(req, res) {
        _controllerFunction2['default'].getAll(_menu2['default'][0].meals, req, res);
      }

      return getAllMeal;
    }()

    /**
         * it ADD a meal
         * @param {string} req
         * @param {string} res
         * @returns {object} add meal
         */

  }, {
    key: 'addMeal',
    value: function () {
      function addMeal(req, res) {
        for (var i = 0; i < _menu2['default'][0].meals.length; i += 1) {
          if (req.body.id === _menu2['default'][0].meals[i].id) {
            return res.json({
              message: 'id is already existing',
              error: true
            });
          } else if (!req.body.id) {
            return res.json({
              message: 'id is required',
              error: true
            });
          }
        }
        _menu2['default'][0].meals.push(req.body);
        return res.json({
          meals: _menu2['default'][0].meals,
          message: 'Success',
          error: false
        });
      }

      return addMeal;
    }()

    /**
         * it PUT(update) a meal
         * @param {string} req
         * @param {string} res
         * @returns {object} PUT(update) a meal
         */

  }, {
    key: 'updateMeal',
    value: function () {
      function updateMeal(req, res) {
        for (var j = 0; j < _menu2['default'][0].meals.length; j += 1) {
          if (_menu2['default'][0].meals[j].id === parseInt(req.body.id, 10)) {
            _menu2['default'][0].meals[j].food = req.body.food;
            _menu2['default'][0].meals[j].quantity = req.body.quantity;
            _menu2['default'][0].meals[j].image = req.body.image;
            _menu2['default'][0].meals[j].amount = req.body.amount;
            _menu2['default'][0].meals[j].category = req.body.category;
            return res.json({
              meals: _menu2['default'][0].meals[j],
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

      return updateMeal;
    }()

    /**
         * it DELETE meal
         * @param {string} req
         * @param {string} res
         * @returns {object} remove an meal
         */

  }, {
    key: 'removeMeal',
    value: function () {
      function removeMeal(req, res) {
        _controllerFunction2['default'].remove(_menu2['default'][0].meals, req, res);
      }

      return removeMeal;
    }()

    /**
         * it GET meals
         * @param {string} req
         * @param {string} res
         * @param {string} category
         * @returns {object} meals
         */

  }, {
    key: 'getMealByName',
    value: function () {
      function getMealByName(req, res, category) {
        _controllerFunction2['default'].getByGroup(_menu2['default'][0].meals, req, res, category);
      }

      return getMealByName;
    }()
  }]);

  return mealController;
}();

exports['default'] = mealController;
//# sourceMappingURL=mealsController.js.map
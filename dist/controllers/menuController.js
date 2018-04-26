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
 * it is a class that control all menu api;
 */
var menuController = function () {
  function menuController() {
    _classCallCheck(this, menuController);
  }

  _createClass(menuController, null, [{
    key: 'addMenu',

    /**
     * it ADD a menu
     * @param {string} req
     * @param {string} res
     * @returns {object} add menu
     */
    value: function () {
      function addMenu(req, res) {
        _controllerFunction2['default'].add(_menu2['default'], req, res);
      }

      return addMenu;
    }()

    /**
     * it GET a menu
     * @param {string} req
     * @param {string} res
     * @returns {object} a menu
     */

  }, {
    key: 'getMenu',
    value: function () {
      function getMenu(req, res) {
        _controllerFunction2['default'].getById(_menu2['default'], req, res);
      }

      return getMenu;
    }()
  }]);

  return menuController;
}();

exports['default'] = menuController;
//# sourceMappingURL=menuController.js.map
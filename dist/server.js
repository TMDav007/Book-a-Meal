'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./route/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var app = (0, _express2['default'])();

app.use(_bodyParser2['default'].json());
app.use(_bodyParser2['default'].urlencoded({ extended: false }));
app.use(_bodyParser2['default'].text());
app.use(_bodyParser2['default'].json({ type: 'application/json' }));

(0, _index2['default'])(app);

var port = parseInt(process.env.PORT, 10) || 3030;
app.set('port', port);

app.listen(port, function () {
  console.log('we are running live');
});

exports['default'] = app;
//# sourceMappingURL=server.js.map
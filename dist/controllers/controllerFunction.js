'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorStatus = function errorStatus(statusCode, errorMessage, res) {
  res.status(statusCode).json({ message: errorMessage, error: true });
};

var getAll = function getAll(element, req, res) {
  if (element.length > 0) {
    return res.json({
      result: element,
      error: false
    });
  }
  return errorStatus(400, 'not found, it is empty', res);
};

var add = function add(model, req, res) {
  for (var i = 0; i < model.length; i += 1) {
    if (model[i].id === req.body.id) {
      return errorStatus(400, 'id is already existing', res);
    } else if (!req.body.id) {
      return errorStatus(400, 'id is required', res);
    }
  }
  model.push(req.body);
  return res.json({
    model: model,
    message: 'Success',
    error: false
  });
};

var remove = function remove(element, req, res) {
  for (var i = 0; i < element.length; i += 1) {
    if (element[i].id === parseInt(req.params.id, 10)) {
      element.splice(i, 1);
      return res.status(200).json({
        message: 'Success',
        error: false
      });
    }
  }
  return res.status(404).json({
    message: 'not found',
    error: true
  });
};

var getById = function getById(element, req, res) {
  for (var i = 0; i < element.length; i += 1) {
    if (element[i].id === parseInt(req.params.id, 10) || element[i].date === req.params.date) {
      return res.status(200).json({
        result: element[i],
        message: 'Success',
        error: false
      });
    }
  }
  return res.status(404).json({
    message: 'not found',
    error: true
  });
};

var getByGroup = function getByGroup(element, req, res) {
  var result = [];
  for (var i = 0; i < element.length; i += 1) {
    if (element[i].category === req.params.category) {
      result.push(element[i]);
    }
  }
  if (result.length > 1) {
    return res.status(200).json({
      result: result,
      message: 'Success',
      error: false
    });
  }
  return res.status(404).json({
    message: 'not found',
    error: true
  });
};

exports['default'] = {
  getAll: getAll,
  remove: remove,
  getById: getById,
  getByGroup: getByGroup,
  add: add
};
//# sourceMappingURL=controllerFunction.js.map
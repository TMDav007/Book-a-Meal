"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getAll = function getAll(element, req, res) {
  if (element.length > 0) {
    return res.json({
      result: element,
      error: false
    });
  }
  return res.json({
    message: 'not found, it is empty',
    error: true
  });
};

var add = function add(element, req, res) {
  for (var i = 0; i < element.length; i += 1) {
    if (req.body.id === element[i].id) {
      return res.json({
        message: "the 'id' already existing",
        error: true
      });
    } else if (!req.body.id) {
      return res.json({
        message: "the 'id' is required",
        error: true
      });
    }
  }
  element.push(req.body);
  return res.json({
    message: 'Success',
    error: false
  });
};

var update = function update(element, req, res) {
  for (var i = 0; i < element.length; i += 1) {
    if (element[i].id === parseInt(req.params.id, 10)) {
      element[i].name = req.body.name;
      element[i].cost = req.body.cost;
      return res.json({
        message: 'Update Successful',
        error: false
      });
    }
  }
  return res.status(404).json({
    message: 'not found',
    error: true
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

exports["default"] = {
  getAll: getAll, add: add, update: update, remove: remove, getById: getById, getByGroup: getByGroup
};
//# sourceMappingURL=controllerFunction.js.map
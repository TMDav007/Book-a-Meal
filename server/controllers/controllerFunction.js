
const getAll = (element, req, res) => {
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

const add = (element, req, res) => {
  for (let i = 0; i < element.length; i += 1) {
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

const update = (element, req, res) => {
  for (let i = 0; i < element.length; i += 1) {
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

const remove = (element, req, res) => {
  for (let i = 0; i < element.length; i += 1) {
    if (element[i].id === parseInt(req.params.id, 10)) {
      element.splice(i, 1);
      return res.json({
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

const getById = (element, req, res) => {
  for (let i = 0; i < element.length; i += 1) {
    if (element[i].id === parseInt(req.params.id, 10) || (element[i].date === req.params.date)) {
      return res.json({
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

const getByGroup = (element, req, res) => {
  const result = [];
  for (let i = 0; i < element.length; i += 1) {
    if (element[i].category === req.params.category) {
      result.push(element[i]);
    }
  }
  if (result.length > 1) {
    return res.json({
      result,
      message: 'Success',
      error: false
    });
  }
  return res.status(404).json({
    message: 'not found',
    error: true
  });
};


export default {
  getAll, add, update, remove, getById, getByGroup
};

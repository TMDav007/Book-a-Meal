const errorStatus = (statusCode, errorMessage, res) => {
  res.status(statusCode).json({ message: errorMessage, error: true });
};

const getAll = (element, req, res) => {
  if (element.length > 0) {
    return res.status(200).json({
      result: element,
      error: false
    });
  }
  return errorStatus(400, 'not found, it is empty', res);
};

const add = (model, req, res) => {
  for (let i = 0; i < model.length; i += 1) {
    if (model[i].id === req.body.id) {
      return errorStatus(400, 'id is already existing', res);
    } else if (!req.body.id) {
      return errorStatus(400, 'id is required', res);
    }
  }
  model.push(req.body);
  return res.json({
    model,
    message: 'Success',
    error: false
  });
};

const remove = (element, req, res) => {
  for (let i = 0; i < element.length; i += 1) {
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

const getById = (element, req, res) => {
  for (let i = 0; i < element.length; i += 1) {
    if (
      element[i].id === parseInt(req.params.id, 10) ||
      element[i].date === req.params.date
    ) {
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

const getByGroup = (element, req, res) => {
  const result = [];
  for (let i = 0; i < element.length; i += 1) {
    if (element[i].category === req.params.category) {
      result.push(element[i]);
    }
  }
  if (result.length > 1) {
    return res.status(200).json({
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
  getAll,
  remove,
  getById,
  getByGroup,
  add
};

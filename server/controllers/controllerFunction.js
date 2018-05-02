const errorStatus = (statusCode, errorMessage, res) => {
  res.status(statusCode).json({ message: errorMessage, error: true });
};

const getAll = (element, req, res) => {
  if (element.length > 0) {
    return res.status(200).json({
      message: 'Success',
      result: element,
      error: false
    });
  }
  // return errorStatus(400, 'not found, it is empty', res);
};

const add = (models, req, res) => {
  models.forEach((model) => {
    if (model.id === req.body.id) {
      return errorStatus(400, 'id is already existing', res);
    } else if (!req.body.id) {
      return errorStatus(404, 'id is required', res);
    }
  });
};

const remove = (element, req, res) => {
  for (let i = 0; i < element.length; i += 1) {
    if (element[i].id === parseInt(req.params.id, 10)) {
      element.splice(i, 1);
      return res.status(200).json({
        message: 'successfully deleted',
        error: false
      });
    }
  }
  return errorStatus(404, 'id not found', res);
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
      message: 'success',
      error: false,
      result
    });
  }
  return errorStatus(404, 'id not found', res);
};

const orderTotal = (model) => {
  // variable declaration.
  let total = 0;
  for (let j = 0; j < model.length; j += 1) {
    // loop through meals , find the total of (amount * quantity)
    total += parseInt(model[j].amount, 10) * model[j].quantity;
  }
  return total;
};

export default {
  getAll,
  remove,
  getByGroup,
  errorStatus,
  orderTotal,
  add
};

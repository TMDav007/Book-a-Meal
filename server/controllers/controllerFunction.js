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
  errorStatus(404, 'id not found', res);
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
    // loop through model, find the total of (amount * quantity)
    total += parseInt(model[j].amount, 10) * model[j].quantity;
  }
  return total;
};

const orderSuccessMessage = (code, message, total, db, res) => {
  res.status(code).json({
    message,
    error: false,
    total,
    result: db
  });
};

const updateMeal = (models, req, res, food, quantity, image, amount, category) => {
  models.forEach((model) => {
    if (model.food === req.body.food) {
      errorStatus(400, 'food is already existing', res);
    }
    if (model.id === parseInt(req.params.id, 10)) {
      model.food = food || model.food;
      model.quantity = quantity || model.quantity;
      model.image = image || model.image;
      model.amount = amount || model.amount;
      model.category = category || model.category;
      return res.status(200).json({
        models: model,
        message: 'update successful',
        error: false
      });
    }
  });
};

const checkForDate = (models, req, res) => {
  models.forEach((model) => {
    if (model.date === req.body.date) {
      errorStatus(400, 'date is already existing', res);
    } else if (!req.body.date) {
      errorStatus(400, 'date is required', res);
    }
  });
};

export default {
  getAll,
  remove,
  getByGroup,
  errorStatus,
  orderTotal,
  orderSuccessMessage,
  updateMeal,
  checkForDate
};

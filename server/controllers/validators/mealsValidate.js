import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validMeals = (data) => {
  const errors = {};

  if (validator.isEmpty(data.food)) {
    errors.food = 'food field is required';
  }
  if (data.quantity === '' || data.quantity === undefined) {
    errors.quantity = 'quantity is required';
  }
  if (validator.isEmpty(data.amount)) {
    errors.amount = 'amount is required';
  }

  if (validator.isEmpty(data.category)) {
    errors.phoneNo = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateMeals = (req, res, next) => {
  const { errors, isValid } = validMeals(req.body);
  if (!isValid) {
    res.status(400).json({
      message: errors,
      error: true
    });
  }
  return next();
};

export default { validateMeals };

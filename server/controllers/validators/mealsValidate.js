import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validMeals = (data) => {
  const errors = {};

  if (validator.isEmpty(data.food)) {
    errors.food = 'food field is required';
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
      errors,
    });
  }
  return next();
};

export default { validateMeals };

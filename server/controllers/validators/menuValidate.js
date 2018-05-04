import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validMenu = (data) => {
  const errors = {};

  if (validator.isEmpty(data.date) || data.date === undefined) {
    errors.food = 'date field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateMenu = (req, res, next) => {
  const { errors, isValid } = validMenu(req.body);
  if (!isValid) {
    res.status(400).json({
      message: errors,
      error: true
    });
  }
  return next();
};

export default { validateMenu };

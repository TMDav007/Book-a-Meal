import jwt from 'jsonwebtoken';
import middlewareFunction from './middlewareFunc';

// number can start with a + or not, only digit, !< 10 digits
const number = /^\+?[0-9]{10,}$/;
// passowrd must have 1 digit,1 lowercase,1 uppercase,!< 8 char, must be alphanumeric
const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;


const authenicateUser = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token;

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Forbidden to non user' });
    }
    req.userId = decoded.id;
    return next();
  });
};

const validateSignUp = (req, res, next) => {
  middlewareFunction.checkField(req.body.username, 'username', res);
  middlewareFunction.checkField(req.body.email, 'email', res);
  middlewareFunction.checkField(req.body.phoneNo, 'phone number', res);
  if (!number.test(req.body.phoneNo)) {
    return middlewareFunction.errorStatus(400, 'valid phone number required', res);
  }
  middlewareFunction.checkField(req.body.password, 'password', res);
  if (!(password.test(req.body.password))) {
    return middlewareFunction.errorStatus(400, 'password should be a combination of uppercase,lowercase and numbers', res);
  } else if (req.body.password !== req.body.confirmPassword) {
    middlewareFunction.errorStatus(400, 'password not confirmed', res);
  }
  return next();
};

const validateLogIn = (req, res, next) => {
  middlewareFunction.checkField(req.body.email, 'email', res);
  middlewareFunction.checkField(req.body.password, 'password', res);
  next();
};

export default {
  validateSignUp, validateLogIn, authenicateUser
};


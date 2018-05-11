import validator from 'validator';
import jwt from 'jsonwebtoken';

require('dotenv').config();


/** middleware class */
class middleware {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} next
   */
  static authenicateAdmin(req, res, next) {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Forbidden to non admin' });
      }
      req.id = decoded.id;
      req.role = decoded.role;
      if (req.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Forbidden to non admin' });
      }
      return next();
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} next
   */
  static authenicateUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Forbidden to non user' });
      }
      req.id = decoded.id;
      req.role = decoded.role;
      if (req.role !== 'user') {
        return res.status(403).json({ success: false, message: 'Forbidden to non user' });
      }
      return next();
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} next
   */
  static validateSignup(req, res, next) {
    const errors = [];
    if (!req.body.username || req.body.username === undefined) {
      errors.push('username is required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    if (req.body.username === '') {
      errors.push('username cannot be empty');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    if (req.body.username.length <= 1) {
      errors.push('username should be greater than 1 character');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (!req.body.email || req.body.email === undefined) {
      errors.push('email is required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    if (!validator.isEmail(req.body.email.toString())) {
      errors.push('Valid email required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (req.body.phoneNumber === undefined) {
      errors.push('valid phone number is required');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (req.body.phoneNumber.length <= 8) {
      errors.push('phone number must exceed 8 characters');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (!req.body.password || req.body.password === undefined) {
      errors.push('valid password required');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (req.body.password.length <= 6) {
      errors.push('Password must exceed 6 characters');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (validator.isEmpty(req.body.confirmPassword)) {
      errors.push('you need to confirm your password');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (!validator.equals(req.body.password, req.body.confirmPassword)) {
      errors.push('Passwords must match');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (errors.length > 0) {
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    return next();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} next
   */
  static validateLogin(req, res, next) {
    const errors = [];
    if (req.body.email === undefined) {
      errors.push('Email is required');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (!validator.isEmail(req.body.email.toString())) {
      errors.push('Valid email required');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (req.body.password === undefined) {
      errors.push('Valid password required');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (req.body.password.length <= 6) {
      errors.push('Password must exceed 6 characters');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (errors.length > 0) {
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    return next();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} next
   */
  static validateMeal(req, res, next) {
    const errors = [];
    if (!req.body.mealName || req.body.mealName === undefined) {
      errors.push('mealName is required');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (req.body.amount === undefined) {
      errors.push('amount is required');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (!Number.isInteger(req.body.userid)) {
      errors.push('user id must be an integer');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }

    if (errors.length > 0) {
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    return next();
  }
}

export default middleware;

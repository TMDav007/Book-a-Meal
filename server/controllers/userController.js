import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Model from './../models';
import middlewareFunction from './../middleware/middlewareFunc';

const { errorStatus } = middlewareFunction;
const { User } = Model;

// class eventController class
/**
 * it is a class that control all event method;
 */
class userController {
  /**
 * it create a new user
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static signUp(req, res) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        User.findOne({ where: { email: req.body.email.trim().toLowerCase() } })
          .then((existingUser) => {
            if (existingUser) {
              return res.status(409).json({ error: 'email already existing' });
            }
            User.create({
              username: req.body.username,
              email: req.body.email,
              phoneNo: req.body.phoneNo,
              password: hash,
              role: req.body.role,
            })
              .then((user) => {
                const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: 86400 });
                return res.status(201).json({
                  authentication: true,
                  message: 'sign up successful',
                  data: {
                    token,
                    user: {
                      id: user.id,
                      username: user.username,
                      email: user.email,
                      phoneno: user.phoneNo,
                    },
                  },
                });
              }).catch(() => res.status(500).send({
                error: true,
                message: 'server error'
              }));
          });
      });
    });
  }

  /**
 * login user
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static logIn(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return errorStatus(404, 'email not found', res);
        }
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
          return res.status(401).send({ authentication: false, message: 'login failed , incorrect password', token: null });
        }
        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: 86400 });
        return res.status(200).send({ authentication: true, message: 'login successful', token });
      });
  }
}

export default userController;

import userController from './../controllers/userController';
import middleware from './../middleware/middleware';

const { signUp, logIn } = userController;
const { validateSignUp, validateLogIn } = middleware;

const routes = (app) => {
  app.get('', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Book-A-Meal, add "/api/v1/" to use the api'
    }));

  app.get('/api/v1/', (req, res) =>
    res.status(200).send({
      message: 'to view api, add /menu, or /meals or /orders'
    }));

  // User
  app.post('/api/v1/auth/signup', validateSignUp, signUp);

  app.post('/api/v1/auth/login', validateLogIn, logIn);
};

export default routes;

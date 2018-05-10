import userController from './../controllers/userController';
import middleware from './../middleware/middleware';
import mealController from './../controllers/mealController';
import menuController from '../controllers/menuController';
import orderController from './../controllers/orderController';

const { signUp, logIn } = userController;
const {
  addMeal, getMeals, updateMeal, removeMeal
} = mealController;
const { postOrder } = orderController;


const { setMenu, getMenu } = menuController;

const {
  validateSignUp, validateLogIn, authenicateAdmin, authenicateUser
} = middleware;


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
  app.post('/api/v1/auth/signin', validateLogIn, logIn);

  // Meal
  app.post('/api/v1/meals', authenicateAdmin, addMeal)
    .get('/api/v1/meals', authenicateAdmin, getMeals);

  app.put('/api/v1/meals/:id', authenicateAdmin, updateMeal)
    .delete('/api/v1/meals/:id', authenicateAdmin, removeMeal);

  // menu
  app.post('/api/v1/menu', authenicateAdmin, setMenu)
    .get('/api/v1/menu', authenicateUser, getMenu);

  // order
  app.post('/api/v1/orders', postOrder);
};

export default routes;

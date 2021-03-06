import userController from './../controllers/userController';
import middleware from './../middleware/middleware';
import mealController from './../controllers/mealController';
import menuController from '../controllers/menuController';

const { signUp, logIn } = userController;
const {
  addMeal, getMeals, updateMeal, removeMeal
} = mealController;


const { setMenu, getMenu } = menuController;

const {
  validateSignup, validateLogin, authenicateAdmin, authenicateUser, validateMeal
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
  app.post('/api/v1/auth/signup', validateSignup, signUp);
  app.post('/api/v1/auth/login', validateLogin, logIn);

  // Meal
  app.post('/api/v1/meals', authenicateAdmin, validateMeal, addMeal)
    .get('/api/v1/meals', authenicateAdmin, getMeals);

  app.put('/api/v1/meals/:id', authenicateAdmin, updateMeal)
    .delete('/api/v1/meals/:id', authenicateAdmin, removeMeal);

  // menu
  app.post('/api/v1/menu', authenicateAdmin, setMenu)
    .get('/api/v1/menu', authenicateUser, getMenu);
};

export default routes;

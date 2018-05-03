import menuController from './../controllers/menuController';
import mealsController from './../controllers/mealsController';
import orderController from './../controllers/orderController';

const routes = (app) => {
  app.get('', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Book-A-Meal, add "/api/v1/" to use the api'
    }));

  app.get('/api/v1/', (req, res) =>
    res.status(200).send({
      message: 'to view api, add /menu, or /meal or /order'
    }));

  // Meals
  app.get('/api/v1/meals', mealsController.getAllMeals)
    .post('/api/v1/meals', mealsController.addMeal);

  app.get('/api/v1/meals/:category', mealsController.getMealByName);

  app.put('/api/v1/meals/:id', mealsController.updateMeal)
    .delete('/api/v1/meals/:id', mealsController.removeMeal);

  // Menu
  app.post('/api/v1/menu', menuController.addMenu)
    .get('/api/v1/menu', menuController.getMenu);

  // Order
  app.get('/api/v1/orders', orderController.getAllOrders)
    .post('/api/v1/orders', orderController.addOrder);

  app.put('/api/v1/orders/:id', orderController.updateorder);
};

export default routes;

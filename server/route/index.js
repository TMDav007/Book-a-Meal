import menuController from "./../controllers/menuController";

const routes = (app) => {
    app.get('/', (req, res) => res.status(200).send({
      message: 'Welcome to the Book-A-Meal, add "/api/v1/" to use the api',
    }));
  
    app.get('/api/v1/', (req, res) => res.status(200).send({
      message: 'to view api, add /menu, or /meal or /order',
    }));
  
    app.get('/api/v1/menu', menuController.getAllMenu);
  
  };
  
  export default routes;
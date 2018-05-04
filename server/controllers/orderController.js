import orderDB from './../models/order';
import menuDB from './../models/menu';
import controlFunction from './controllerFunction';

const {
  errorStatus, orderTotal
} = controlFunction;

/**
 * it is a class that control all order api;
 */
class orderController {
  /**
   * it GET all order
   * @param {string} req
   * @param {string} res
   * @returns {object} all order
   */
  static getAllOrders(req, res) {
    // variables
    let total = 0;
    // loop through the db
    orderDB.forEach(((order) => {
      total += orderTotal(order.meals); // calcuate amount of all orders
    }));

    if (orderDB.length > 0) {
      return res.status(200).json({
        result: orderDB,
        total,
        message: 'Success',
        error: false
      });
    }
    errorStatus(404, 'order not available', res);
  }

  /**
   * it ADD an order
   * @param {string} req
   * @param {string} res
   * @returns {object} add order
   */
  static addOrder(req, res) {
    // variable declaration
    const id = orderDB.length + 1;
    const ordersList = req.body.meals;
    const orderedMeal = [];

    orderDB.forEach((order) => {
      if (order.user === req.body.user) {
        errorStatus(400, 'user name already existing', res);
      }
    });

    if (ordersList.length === 0 || ordersList === undefined) {
      errorStatus(400, 'meals cannot be empty', res);
    }
    // loop through and check for meals on menuDb
    ordersList.forEach((order) => {
      orderedMeal.push(...menuDB[0].meals.filter(meal => meal.id === order));
    });
    // add to the db
    orderDB.push({
      id,
      user: req.body.user,
      meals: orderedMeal
    });

    // calculate  total of amount
    const total = orderTotal(orderDB[orderDB.length - 1].meals);

    // return response
    return res.json({
      message: 'successfully added',
      error: false,
      total,
      result: orderDB[orderDB.length - 1]
    });
  }

  /**
   * it PUT(update) an order
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) an order
   */
  static updateorder(req, res) {
    // variable declaration
    const updatedOrdersList = req.body.meals;
    const updatedOrders = [];

    // loop through the orderDB
    for (let i = 0; i < orderDB.length; i += 1) {
      if (orderDB[i].id === parseInt(req.params.id, 10)) {
        updatedOrdersList.forEach((updatedOrder) => {
          updatedOrders.push(...menuDB[0].meals.filter(meal => meal.id === updatedOrder));
        });

        // add to the db
        orderDB.push({
          id: req.body.id,
          user: req.body.user,
          meals: updatedOrders
        });

        // get total
        const total = orderTotal(orderDB[orderDB.length - 1].meals);

        // return response
        return res.json({
          message: 'update successfully',
          error: false,
          total,
          result: orderDB[orderDB.length - 1]
        });
      }
    }
    return errorStatus(404, 'id not found', res);
  }
}

export default orderController;


import orders from './../models/order';
import controlFunction from './controllerFunction';

const {
  errorStatus, orderTotal, add
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
    let total = 0;
    orders.forEach(((order) => {
      total += orderTotal(order.meals);
    }));
    if (orders.length > 0) {
      return res.status(200).json({
        result: orders,
        total,
        message: 'Success',
        error: false
      });
    }
  }

  /**
   * it ADD an order
   * @param {string} req
   * @param {string} res
   * @returns {object} add order
   */
  static addOrder(req, res) {
    const order = [];
    add(orders, req, res);
    orders.push(req.body);
    order.push(req.body);
    const total = orderTotal(order[0].meals);
    return res.json({
      message: 'successfully added',
      error: false,
      total,
      result: order
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
    let updateOrder = [];
    // loop through the orders
    orders.forEach((order) => {
      if (order.id === parseInt(req.params.id, 10)) {
      /*eslint-disable*/
      // map req.body.meals to order meals
        order.meals = order.meals.map(meal => (meal = req.body.meals));
        // remove duplicate arrays and flatten to make the array one length
       order.meals = order.meals.splice(1).flatten();
       updateOrder = order;
       // get total amount of orders
        const total = orderTotal(updateOrder.meals);
        return res.json({
          order: updateOrder,
          total,
          message: 'update successful',
          error: false
        });
      }
    });
    return errorStatus(404, 'id not found', res);
  }
}

export default orderController;


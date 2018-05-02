import orders from './../models/order';
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
  static getAllOrder(req, res) {
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
    for (let i = 0; i < orders.length; i += 1) {
      if (orders[i].id === req.body.id) {
        return errorStatus(400, 'id is already existing', res);
      } else if (!req.body.id) {
        return errorStatus(400, 'id is required', res);
      }
    }

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
    let updateOrder = [];
    orders.forEach(((order) => {
      if (order.id === parseInt(req.params.id, 10)) {
      /*eslint-disable*/
        order.meals = order.meals.map(meal => (meal = req.body.meals[0]));
        updateOrder = order;
      }
    }));
    
    if (updateOrder.length !== 0) {
      const total = orderTotal(updateOrder.meals);
      return res.json({
        order: updateOrder,
        total,
        message: 'update successful',
        error: false
      });
    }
    return res.status(404).json({
      message: 'id not found',
      error: true
    });
  }
}

export default orderController;


import order from './../models/order';
import controlFunction from './controllerFunction';

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
    controlFunction.getAll(order, req, res);
  }

  /**
   * it ADD an order
   * @param {string} req
   * @param {string} res
   * @returns {object} add order
   */
  static addOrder(req, res) {
    controlFunction.add(order, req, res);
  }

  /**
   * it PUT(update) an order
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) an order
   */
  static updateorder(req, res) {
    for (let j = 0; j < order.length; j += 1) {
      if (order[j].id === parseInt(req.body.id, 10)) {
        order[j].user = req.body.user;
        order[j].qty = req.body.qty;
        order[j].food = req.body.food;
        order[j].amount = req.body.amount;
        return res.json({
          order: order[j],
          message: 'Update Successful',
          error: false
        });
      }
    }
    return res.status(404).json({
      message: 'not found',
      error: true
    });
  }
}

export default orderController;

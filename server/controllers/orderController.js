import Model from './../models';
import middlewareFunction from './../middleware/middlewareFunction';

const { errorStatus } = middlewareFunction;
const { order, orderdetails } = Model;
/**
 * it is a class that control all meal method;
 */
class orderController {
  /**
   * it post a menu
   * @param {string} req
   * @param {string} res
   * @return {object} an object
   */
  static postOrder(req, res) {
    const {
      mealId, userId
    } = req.body;
    if (mealId === '' || userId === '') {
      return errorStatus(400, 'This cannot be empty', res);
    }
    order.create({
      mealId,
    }).then((orderCreated) => {
      orderCreated.addMeal(mealId);
      return res.status(200).json({
        status: true,
        message: 'order added successfully'
      }).catch(error => res.status(500).send(error));
    });
  }

  /**
   * it Update a order
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) order
   */
  static updateOrder(req, res) {
    const {
      mealId
    } = req.body;

    orderdetails.findAll({ where: { id: req.params.id } })
      .then((foundOrder) => {
        if (!foundOrder) {
          return middlewareFunction.errorStatus(404, 'order not found', res);
        }
        foundOrder.update({
          mealId: mealId || foundOrder.mealId,
        }).then((setMenu) => {
          if (setMenu) {
            res.status(200).json({ message: 'update successful', res });
          }
        })
          .catch(error => res.status(500).send(error));
      });
  }
}

export default orderController;

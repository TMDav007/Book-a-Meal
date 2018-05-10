import Model from './../models';
import middlewareFunction from './../middleware/middlewareFunction';

const { errorStatus } = middlewareFunction;
const { Order, User } = Model;
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
    const { userId, mealIds } = req.body;
    Order.findOne({
      where: { userId },
      include: [{
        model: User,
      }],
    }).then((existedName) => {
      if (existedName) {
        errorStatus(409, 'user name is already existing', res);
      }
      Order.create({
        userId
      })
        .then((setOrder) => {
          setOrder.addMeal(mealIds);
          return res.status(201).json({ success: true, message: 'order is successfuly placed' });
        })
        .catch(error => res.status(500).send(error));
    });
  }
}

export default orderController;

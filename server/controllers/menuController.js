import Model from './../models';
import middlewareFunction from './../middleware/middlewareFunction';

const { Menu, Meal, menuDetails } = Model;


/**
 * it is a class that control all meal method;
 */
class mealController {
  /**
   * it post all meal
   * @param {string} req
   * @param {string} res
   * @return {object} an object
   */
  static setMenu(req, res) {
    Menu.findOne({
      where: { date: req.body.date }
    }).then((existedMenuDate) => {
      if (existedMenuDate) {
        return middlewareFunction.errorStatus(409, 'Date is already existing', res);
      }
      Meal.create({
        mealName: req.body.mealName,
        image: req.body.image,
        amount: req.body.amount,
        userId: req.body.userId
      })
        .then((meal) => {
          if (!meal) {
            return res.status(401).send({
              message: 'Server error. Meals not created'
            });
          }
          return res.status(201).send({ success: true, meal });
        }).catch(e => res.status(500).send(e));
    });
  }
}

import Model from './../models';
import middlewareFunction from './../middleware/middlewareFunction';

const { errorStatus } = middlewareFunction;
const { Menu, Meal } = Model;
/**
 * it is a class that control all meal method;
 */
class menuController {
  /**
   * it post a menu
   * @param {string} req
   * @param {string} res
   * @return {object} an object
   */
  static setMenu(req, res) {
    const { date, mealIds } = req.body;

    Menu.findOne({
      where: { date }
    }).then((existedMenuDate) => {
      if (existedMenuDate) {
        return errorStatus(409, 'Date is already existing', res);
      }
      Menu.create({
        date
      })
        .then((setMenu) => {
          setMenu.addMeal(mealIds);
          return res.status(201).json({ success: true, message: 'Menu for the day has been set' });
        })
        .catch(error => res.status(500).send(error));
    });
  }

  /**
   * it post a menu
   * @param {string} req
   * @param {string} res
   * @return {object} an object
   */
  static getMenu(req, res) {
    const todayDate = (new Date()).toLocaleDateString(); // 2018-8-9;
    return Menu.findOne({
      where: { date: todayDate },
      include: [{
        model: Meal,
        through: {
          foreignKey: 'mealId',
          attributes: ['mealName', 'image', 'amount']
        }
      }]
    })
      .then((menu) => {
        if (!menu) {
          errorStatus(404, 'menu not set for this date', res);
        }
        return res.status(200).json({ success: true, menu });
      }).catch(error => res.status(500).send(error));
  }
}

export default menuController;

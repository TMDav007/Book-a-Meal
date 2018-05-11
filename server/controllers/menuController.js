import Model from './../models';
import middlewareFunction from './../middleware/middlewareFunction';

const { errorStatus } = middlewareFunction;
const { menu, meal } = Model;
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

    menu.findOne({
      where: { date }
    }).then((existedMenuDate) => {
      if (existedMenuDate) {
        return errorStatus(409, 'Date is already existing', res);
      }
      menu.create({
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
   * it get menu
   * @param {string} req
   * @param {string} res
   * @return {object} an object
   */
  static getMenu(req, res) {
    const todayDate = (new Date()).toLocaleDateString(); // 2018-8-9;
    return menu.findOne({
      where: { date: todayDate },
      include: [{
        model: meal,
        through: {
          foreignKey: 'mealId',
          attributes: ['mealName', 'image', 'amount']
        }
      }]
    })
      .then((foundMenu) => {
        if (!foundMenu) {
          errorStatus(404, 'menu not set for this date', res);
        }
        return res.status(200).json({ success: true, foundMenu });
      }).catch(error => res.status(500).send(error));
  }
}

export default menuController;

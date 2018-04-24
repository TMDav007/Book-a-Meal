import menu from './../models/menu';
import controlFunction from './controllerFunction';

/**
 * it is a class that control all menu api;
 */
class menuController {
/**
   * it GET all menu
   * @param {string} req
   * @param {string} res
   * @param {string} date
   * @returns {object} all menu
   */
  static getAllMenu(req, res) {
    controlFunction.getAll(menu, req, res);
  }

  /**
   * it ADD a menu
   * @param {string} req
   * @param {string} res
   * @returns {object} add menu
   */
  static addMenu(req, res) {
    for (let i = 0; i < menu.length; i += 1) {
      if (req.body.date === menu[i].date) {
        return res.json({
          message: 'date is already existing',
          error: true
        });
      } else if (!req.body.date) {
        return res.json({
          message: 'date is required',
          error: true
        });
      }
    }
    menu.push(req.body);
    return res.json({
      menu,
      message: 'Success',
      error: false
    });
  }

  /**
   * it PUT(update) a menu
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) a menu
   */
  static update(req, res) {
    for (let i = 0; i < menu.length; i += 1) {
      if (menu[i].date === req.params.date) {
        for (let j = 0; j < menu[i].meals.length; j += 1) {
          if (menu[i].meals[j].id === parseInt(req.body.meals.eventId, 10)) {
            menu[i].meals[j].food = req.body.meals.food;
            menu[i].meals[j].quantity = req.body.meals.quantity;
            menu[i].meals[j].image = req.body.meals.image;
            menu[i].meals[j].amount = req.body.meals.amount;
            menu[i].meals[j].category = req.body.meals.category;
            return res.json({
              message: 'Update Successful',
              error: false
            });
          }
        }
      }
    }
    return res.status(404).json({
      message: 'not found',
      error: true
    });
  }


  /**
   * it GET a menu
   * @param {string} req
   * @param {string} res
   * @param {string} date
   * @returns {object} a menu
   */
  static getMenu(req, res, date) {
    controlFunction.getById(menu, req, res, date);
  }
}

export default menuController;

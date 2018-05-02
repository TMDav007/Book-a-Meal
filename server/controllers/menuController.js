import menu from './../models/menu';
import controllerFunction from './controllerFunction';

const { errorStatus } = controllerFunction;
/**
 * it is a class that control all menu api;
 */
class menuController {
  /**
   * it ADD a menu
   * @param {string} req
   * @param {string} res
   * @returns {object} add menu
   */
  static addMenu(req, res) {
    // controlFunction.add(menu, req, res);
    const newMenu = [];
    for (let i = 0; i < menu.length; i += 1) {
      if (menu[i].date === req.body.date) {
        return errorStatus(400, 'date is already existing', res);
      } else if (!req.body.date) {
        return errorStatus(400, 'date is required', res);
      }
    }
    menu.push(req.body);

    newMenu.push(req.body);
    return res.json({
      message: 'successfully added',
      error: false,
      result: newMenu
    });
  }

  /**
   * it GET a menu
   * @param {string} req
   * @param {string} res
   * @returns {object} a menu
   */
  static getMenu(req, res) {
    for (let i = 0; i < menu.length; i += 1) {
      // get the latest menu based on the recent date
      if (menu[i].date === menu[menu.length - 1].date) {
        return res.status(200).json({
          message: 'success',
          error: false,
          result: menu[i]
        });
      }
    }
    // return errorStatus(404, 'menu not found', res);
  }
}

export default menuController;

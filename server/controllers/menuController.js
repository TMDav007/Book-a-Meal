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

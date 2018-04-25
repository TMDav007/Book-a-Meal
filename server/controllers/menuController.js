import menu from './../models/menu';
import controlFunction from './controllerFunction';

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
    controlFunction.add(menu, req, res);
  }

  /**
   * it GET a menu
   * @param {string} req
   * @param {string} res
   * @returns {object} a menu
   */
  static getMenu(req, res) {
    controlFunction.getById(menu, req, res);
  }
}

export default menuController;

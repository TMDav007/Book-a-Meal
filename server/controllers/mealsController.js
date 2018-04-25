import menu from './../models/menu';
import controlFunction from './controllerFunction';

/**
 * it is a class that control all meal api;
 */
class mealController {
  /**
   * it GET all meal
   * @param {string} req
   * @param {string} res
   * @returns {object} all meal
   */
  static getAllMeal(req, res) {
    controlFunction.getAll(menu[0].meals, req, res);
  }

  /**
   * it ADD a meal
   * @param {string} req
   * @param {string} res
   * @returns {object} add meal
   */
  static addMeal(req, res) {
    for (let i = 0; i < menu[0].meals.length; i += 1) {
      if (req.body.id === menu[0].meals[i].id) {
        return res.json({
          message: 'id is already existing',
          error: true
        });
      } else if (!req.body.id) {
        return res.json({
          message: 'id is required',
          error: true
        });
      }
    }
    menu[0].meals.push(req.body);
    return res.json({
      meals: menu[0].meals,
      message: 'Success',
      error: false
    });
  }

  /**
   * it PUT(update) a meal
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) a meal
   */
  static updateMeal(req, res) {
    for (let j = 0; j < menu[0].meals.length; j += 1) {
      if (menu[0].meals[j].id === parseInt(req.body.id, 10)) {
        menu[0].meals[j].food = req.body.food;
        menu[0].meals[j].quantity = req.body.quantity;
        menu[0].meals[j].image = req.body.image;
        menu[0].meals[j].amount = req.body.amount;
        menu[0].meals[j].category = req.body.category;
        return res.json({
          meals: menu[0].meals[j],
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

  /**
   * it DELETE meal
   * @param {string} req
   * @param {string} res
   * @returns {object} remove an meal
   */
  static removeMeal(req, res) {
    controlFunction.remove(menu[0].meals, req, res);
  }

  /**
   * it GET meals
   * @param {string} req
   * @param {string} res
   * @returns {object} meals
   */
  static getMealByName(req, res) {
    controlFunction.getByGroup(menu[0].meals, req, res);
  }
}

export default mealController;

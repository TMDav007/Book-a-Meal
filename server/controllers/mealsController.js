import meals from './../models/meals';
import controllerFunction from './controllerFunction';

const {
  getAll, remove, getByGroup, errorStatus
} = controllerFunction;
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
    getAll(meals, req, res);
  }

  /**
   * it ADD a meal
   * @param {string} req
   * @param {string} res
   * @returns {object} add meal
   */
  static addMeal(req, res) {
    for (let i = 0; i < meals.length; i += 1) {
      if (req.body.id === meals[i].id) {
        return errorStatus(404, 'id is already existing', res);
      } else if (!req.body.id) {
        return errorStatus(404, 'id is required', res);
      }
    }
    meals.push(req.body);
    return res.json({
      meals,
      message: 'successfully added',
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
    for (let j = 0; j < meals.length; j += 1) {
      if (meals[j].id === parseInt(req.params.id, 10)) {
        meals[j].food = req.body.food;
        meals[j].quantity = req.body.quantity;
        meals[j].image = req.body.image;
        meals[j].amount = req.body.amount;
        meals[j].category = req.body.category;
        return res.json({
          meals: meals[j],
          message: 'update successful',
          error: false
        });
      }
    }
    return errorStatus(404, 'id not found', res);
  }

  /**
   * it DELETE meal
   * @param {string} req
   * @param {string} res
   * @returns {object} remove an meal
   */
  static removeMeal(req, res) {
    remove(meals, req, res);
  }

  /**
   * it GET meals
   * @param {string} req
   * @param {string} res
   * @returns {object} meals
   */
  static getMealByName(req, res) {
    getByGroup(meals, req, res);
  }
}

export default mealController;

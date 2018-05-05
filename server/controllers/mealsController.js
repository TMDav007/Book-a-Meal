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
   * @param {string} meal
   * @returns {object} all meal
   */
  static getAllMeals(req, res, meal) {
    getAll(meals, req, res, meal);
  }

  /**
   * it ADD a meal
   * @param {string} req
   * @param {string} res
   * @param {string} food
   * @returns {object} add meal
   */
  static addMeal(req, res) {
    const id = meals.length + 1;
    const {
      food, quantity, image, category
    } = req.body;

    for (let i = 0; i < meals.length; i += 1) {
      if (meals[i].food === req.body.food) {
        return errorStatus(400, 'food is already existing', res);
      }
    }
    meals.push({
      id, food, quantity, image, category
    });
    return res.status(201).json({
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
    const {
      food, quantity, image, amount, category
    } = req.body;

    for (let j = 0; j < meals.length; j += 1) {
      if (meals[j].id !== parseInt(req.params.id, 10)) {
        return errorStatus(404, 'id not found', res);
      } else if (meals[j].food === req.body.food) {
        return errorStatus(400, 'food is already existing', res);
      }
      meals[j].food = food || meals[j].food;
      meals[j].quantity = quantity || meals[j].quantity;
      meals[j].image = image || meals[j].image;
      meals[j].amount = amount || meals[j].amount;
      meals[j].category = category || meals[j].category;
      return res.json({
        meals: meals[j],
        message: 'update successful',
        error: false
      });
    }
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
   * it GET a meal
   * @param {string} req
   * @param {string} res
   * @returns {object} meals
   */
  static getMealByName(req, res) {
    getByGroup(meals, req, res);
  }
}

export default mealController;

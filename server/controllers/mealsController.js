import meals from './../models/meals';
import controllerFunction from './controllerFunction';


const {
  getAll, remove, getByGroup, errorStatus, updateMeal
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
   * @returns {obiect} all meal
   */
  static getAllMeals(req, res, meal) {
    getAll(meals, req, res, meal);
  }

  /**
   * it ADD a meal
   * @param {string} req
   * @param {string} res
   * @param {string} food
   * @returns {obiect} add meal
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
   * @returns {obiect} PUT(update) a meal
   */
  static updateMeal(req, res) {
    const {
      food, quantity, image, amount, category
    } = req.body;
    const idCheck = meals.every(meal => meal.id !== parseInt(req.params.id, 10));
    if (idCheck) {
      errorStatus(400, 'id not found', res);
    }
    updateMeal(meals, req, res, food, quantity, image, amount, category);
  }

  /**
   * it DELETE meal
   * @param {string} req
   * @param {string} res
   * @returns {obiect} remove an meal
   */
  static removeMeal(req, res) {
    remove(meals, req, res);
  }

  /**
   * it GET a meal
   * @param {string} req
   * @param {string} res
   * @returns {obiect} meals
   */
  static getMealByName(req, res) {
    getByGroup(meals, req, res);
  }
}

export default mealController;

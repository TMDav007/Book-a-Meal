import menuDb from './../models/menu';
import Meals from './../models/meals';
import controllerFunction from './controllerFunction';

const { errorStatus } = controllerFunction;
/**
 * it is a class that control all menuDb api;
 */
class menuDbController {
  /**
   * it ADD a menuDb
   * @param {string} req
   * @param {string} res
   * @returns {object} add menuDb
   */
  static addMenu(req, res) {
    // variable declaration
    const id = menuDb.length + 1;
    const menuMeal = req.body.meals; // meals to be added by Admin or caterer
    const selectedMeals = [];

    if (menuMeal.length < 1) {
      return errorStatus(400, 'meals can not be empty', res);
    }
    // loop through the MenuDb
    for (let i = 0; i < menuDb.length; i += 1) {
      // check if date is existing or null
      if (menuDb[i].date === req.body.date) {
        return errorStatus(400, 'date is already existing', res);
      } else if (!req.body.date) {
        return errorStatus(400, 'date is required', res);
      }
    }

    // loop through and check for meals on Meal Db
    menuMeal.forEach((menu) => {
      if (!Number.isInteger(menu)) {
        return errorStatus(400, 'meal Id should be an integer', res);
      }
      selectedMeals.push(...Meals.filter(meal => meal.id === menu));
    });

    // if meal selected is not on the mealDB, it should send a message
    selectedMeals.forEach((meal) => {
      if (meal.length === 0) {
        meal.push('meal is not available');
      }
    });

    // add to the db
    menuDb.push({
      id,
      date: req.body.date,
      meals: selectedMeals
    });
    // return response
    return res.json({
      message: 'menu successfully added',
      error: false,
      result: menuDb[menuDb.length - 1] // get the last element one the db.
    });
  }

  /**
   * it GET a menuDb
   * @param {string} req
   * @param {string} res
   * @returns {object} a menuDb
   */
  static getMenu(req, res) {
    // variables
    const today = new Date();

    for (let i = 0; i < menuDb.length; i += 1) {
      // get the latest menuDb based on the recent date
      if (menuDb[i].date === today) {
        return res.status(200).json({
          message: 'success',
          error: false,
          result: menuDb[i]
        });
      }
      return errorStatus(400, 'menuDb is not set for this day', res);
    }
  }
}

export default menuDbController;

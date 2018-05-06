import menuDb from './../models/menu';
import Meals from './../models/meals';
import controllerFunction from './controllerFunction';

const { errorStatus, checkForDate } = controllerFunction;

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
      errorStatus(400, 'meals can not be empty', res);
    }
    // loop through the MenuDb
    checkForDate(menuDb, req, res);

    // loop through and check for meals on Meal Db
    menuMeal.forEach((menu) => {
      if (!Number.isInteger(menu)) {
        errorStatus(409, 'invalid meal request', res);
      }
      selectedMeals.push(...Meals.filter(meal => meal.id === menu));
    });

    // if all meals selected is not available
    const noMeals = selectedMeals.every(meal => meal.length === 0);
    if (noMeals) {
      errorStatus(409, 'None of the meals selected is available', res);
    }

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
    return res.status(201).json({
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
    const todayDate = (new Date()).toLocaleDateString();
    const todayMenu = menuDb.find(menu => menu.date === todayDate);

    // get the latest menuDb based on the recent date
    if (todayMenu) {
      return res.status(200).json({
        message: 'success',
        error: false,
        result: todayMenu
      });
    }
    return errorStatus(400, 'menu for today not available', res);
  }
}

export default menuDbController;

import Model from './../models';
import middlewareFunction from './../middleware/middlewareFunction';

const { meal, user } = Model;


/**
 * it is a class that control all meal method;
 */
class mealController {
  /**
 * it post all meal
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static addMeal(req, res) {
    meal.findOne({
      where: { mealName: req.body.mealName },
      include: [{
        model: user,
      }],
    }).then((existedMealName) => {
      if (existedMealName) {
        middlewareFunction.errorStatus(409, 'Meal Name is already existing', res);
      }
      meal.create({
        mealName: req.body.mealName,
        image: req.body.image,
        amount: req.body.amount,
        userId: req.body.userId
      })
        .then((mealCreated) => {
          if (!mealCreated) {
            return res.status(401).send({
              message: 'Server error. Meals not created'
            });
          }
          return res.status(201).send({ success: true, mealCreated });
        }).catch(error => res.status(500).send(error));
    });
  }

  /**
 * it get a Meal
 * @param {string} req
 * @param {string} res
 * @returns {object} a Meal
 */
  static getMeals(req, res) {
    return meal.findAll()
      .then((meals) => {
        if (!meals) {
          return middlewareFunction.errorStatus(400, 'unable to get all meals, try again', res);
        }
        return res.status(200).send({ success: true, meals });
      })
      .catch(error => res.status(500).send(error));
  }

  /**
   * it Update a Meals
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) Meal
   */
  static updateMeal(req, res) {
    meal.findOne({
      where: {
        $or: [
          {
            id: req.params.id,
          },
          {
            mealName: req.body.mealName
          }
        ]
      }
    })
      .then((foundMeal) => {
        if (!foundMeal.id) {
          return middlewareFunction.errorStatus(404, 'meal id not found', res);
        }
        if (foundMeal.mealName === req.body.mealName) {
          return middlewareFunction.errorStatus(409, 'meal name is already existing', res);
        }
        foundMeal.update({
          id: req.body.id || foundMeal.id,
          mealName: req.body.mealName || foundMeal.mealName,
          image: req.body.image || foundMeal.image,
          amount: req.body.amount || foundMeal.amount,
          userId: req.body.userId || foundMeal.userId
        }, {
          where: {
            id: req.params.id,
          },
          include: [{
            model: user,
          }],
        }).then((updatedMeals) => {
          if (!updatedMeals) {
            return middlewareFunction.errorStatus(400, 'Meals could not be updated, try again', res);
          }
          return res.status(200).json({ success: true, updatedMeals });
        }).catch(error => res.status(500).send(error));
      });
  }

  /**
 * it DELETE all a Meal
 * @param {string} req
 * @param {string} res
 * @returns {object} delete a Meal
 */
  static removeMeal(req, res) {
    meal.findOne({ where: { id: req.params.id } })
      .then((foundMeal) => {
        if (!foundMeal) {
          return middlewareFunction.errorStatus(404, 'Meal not found', res);
        }
        foundMeal.destroy({
          where: {
            mealName: req.params.mealName,
          }
        })
          .then((deletedMeals) => {
            if (!deletedMeals) {
              return middlewareFunction.errorStatus(500, 'Meal unable to delete, try again', res);
            }
            return res.status(200).json({ message: 'Meal deleted' });
          }).catch(error => res.status(500).send(error));
      });
  }
}

export default mealController;

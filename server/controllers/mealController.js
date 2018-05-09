import Model from './../models';
import middlewareFunction from './../middleware/middlewareFunc';

const { Meal, User } = Model;


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
    Meal.findOne({
      where: { mealName: req.body.mealName },
      include: [{
        model: User,
      }],
    }).then((existedMealName) => {
      if (existedMealName) {
        return middlewareFunction.errorStatus(409, 'Meal Name is already existing', res);
      }
      Meal.create({
        mealName: req.body.mealName,
        image: req.body.image,
        amount: req.body.amount,
        userId: req.body.userId
      })
        .then((meal) => {
          if (!meal) {
            return res.status(401).send({
              message: 'Server error. Meals not created'
            });
          }
          return res.status(201).send({ success: true, meal });
        }).catch(e => res.status(500).send(e));
    });
  }

  /**
 * it get a Meal
 * @param {string} req
 * @param {string} res
 * @returns {object} a Meal
 */
  static getMeals(req, res) {
    // jwt.verify(req.headers['x-access-token'], 'secretKey');
    return Meal.findAll()
      .then((meals) => {
        if (!meals) {
          return middlewareFunction.errorStatus(400, 'unable to get all meals, try again', res);
        }
        return res.status(200).send({ success: true, meals });
      })
      .catch(e => res.status(500).send(e));
  }

  /**
   * it Update a Meals
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) Meal
   */
  static updateMeal(req, res) {
    Meal.findOne({
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
      .then((meal) => {
        if (!meal.id) {
          return middlewareFunction.errorStatus(404, 'meal id not found', res);
        }
        if (meal.mealName === req.body.mealName) {
          return middlewareFunction.errorStatus(409, 'meal name is already existing', res);
        }
        meal.update({
          id: req.body.id || meal.id,
          mealName: req.body.mealName || meal.mealName,
          image: req.body.image || meal.image,
          amount: req.body.amount || meal.amount,
          userId: req.body.userId || meal.userId
        }, {
          where: {
            id: req.params.id,
          },
          include: [{
            model: User,
          }],
        }).then((updatedMeals) => {
          if (!updatedMeals) {
            return middlewareFunction.errorStatus(400, 'Meals could not be updated, try again', res);
          }
          return res.status(200).json({ success: true, updatedMeals });
        }).catch(e => res.status(500).send(e));
      });
  }

  /**
 * it DELETE all a Meal
 * @param {string} req
 * @param {string} res
 * @returns {object} delete a Meal
 */
  static removeMeal(req, res) {
    Meal.findOne({ where: { id: req.params.id } })
      .then((meal) => {
        if (!meal) {
          return middlewareFunction.errorStatus(404, 'Meal not found', res);
        }
        meal.destroy({
          where: {
            mealName: req.params.mealName,
          }
        })
          .then((deletedMeals) => {
            if (!deletedMeals) {
              return middlewareFunction.errorStatus(500, 'Meal unable to delete, try again', res);
            }
            return res.status(200).json({ message: 'Meal deleted' });
          }).catch(e => res.status(500).send(e));
      });
  }
}

export default mealController;

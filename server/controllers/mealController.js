import Model from './../models';
import middlewareFunction from './../middleware/middlewareFunc';

const { Meal } = Model;


// class eventController class
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
    Meal.findOne({ where: { mealName: req.body.mealName } })
      .then((existedMealName) => {
        if (existedMealName) {
          return middlewareFunction.errorStatus(409, 'Meal Name is already existing', res);
        }
        Meal.create({
          mealName: req.body.mealName,
          image: req.body.image,
          amount: req.body.amount
        })
          .then((meal) => {
            if (!meal) {
              return res.status(401).send({
                message: 'Server error. Meals not created'
              });
            }
            return res.status(201).send({ message: 'success', meal });
          }).catch(e => res.status(500).send(e));
      });
  }
}

export default mealController;

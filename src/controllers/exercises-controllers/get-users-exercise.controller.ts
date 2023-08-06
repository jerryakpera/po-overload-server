import { Request, Response } from 'express';

import Service from '@src/Service';
import * as utils from '@src/utils';
import * as aggregations from '@src/aggregations';

const exerciseService = Service('Exercise');
const workoutService = Service('Workout');

export const getUsersExercise = async (req: Request, res: Response) => {
  const { exerciseId, uid } = req.params;
  const _id = utils.getMongooseID(exerciseId);

  const query = { exerciseId: _id, uid };

  const workoutsAggregation = aggregations.Workout(query);
  const exercise = await workoutService.aggregateOne(workoutsAggregation);

  // const exercisesQuery = { _id };
  // const exercisesWorkoutsAggregation = aggregations.ExercisesWorkout(exercisesQuery, uid);

  // const exercise = await exerciseService.aggregateOne(exercisesWorkoutsAggregation);

  return res.json({
    message: 'OK',
    data: {
      exercise,
    },
  });
};

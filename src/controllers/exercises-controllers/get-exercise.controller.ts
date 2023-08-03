import { Request, Response } from 'express';

import Service from '@src/Service';
import * as utils from '@src/utils';
import * as aggregations from '@src/aggregations';

const exerciseService = Service('Exercise');

export const getExercise = async (req: Request, res: Response) => {
  const { exerciseId, uid } = req.params;
  const _id = utils.getMongooseID(exerciseId);

  const exercisesQuery = { _id };
  const exercisesWorkoutsAggregation = aggregations.ExercisesWorkout(exercisesQuery, uid);

  const exercise = await exerciseService.aggregateOne(exercisesWorkoutsAggregation);

  return res.json({
    message: 'OK',
    data: {
      exercise,
    },
  });
};

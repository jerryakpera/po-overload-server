import { Request, Response } from 'express';

import Service from '@src/Service';
import * as aggregations from '@src/aggregations';
import { getMongooseID } from '@src/utils';

const workoutService = Service('Workout');

export const getUsersExerciseWorkouts = async (req: Request, res: Response) => {
  const { exerciseId: id, uid } = req.params;
  const exerciseId = getMongooseID(id);

  const workoutAggregation = aggregations.Workout({ uid, exerciseId });
  const exercise = await workoutService.aggregateOne(workoutAggregation);

  return res.json({
    message: 'OK',
    data: {
      exercise,
    },
  });
};

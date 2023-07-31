import { Request, Response } from 'express';

import Service from '@src/Service';
import * as aggregations from '@src/aggregations';

const workoutService = Service('Workout');

export const getUsersWorkouts = async (req: Request, res: Response) => {
  const { uid } = req.params;

  const workoutsAggregation = aggregations.Workout({ uid });
  const workouts = await workoutService.aggregateMany(workoutsAggregation);

  return res.json({
    message: 'OK',
    data: {
      workouts,
    },
  });
};

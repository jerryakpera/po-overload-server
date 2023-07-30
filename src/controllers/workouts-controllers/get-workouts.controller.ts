import { Request, Response } from 'express';

import Service from '@src/Service';
import * as aggregations from '@src/aggregations';

const workoutService = Service('Workout');

export const getWorkouts = async (req: Request, res: Response) => {
  const workoutsAggregation = aggregations.Workout({});
  const workouts = await workoutService.aggregateMany(workoutsAggregation);

  return res.json({
    message: 'OK',
    data: {
      workouts,
    },
  });
};

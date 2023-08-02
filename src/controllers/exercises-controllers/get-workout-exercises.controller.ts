import { Request, Response } from 'express';

import Service from '@src/Service';
import { EWorkout } from '@src/models';
import { getUsersWorkouts } from '@src/utils';
import * as aggregations from '@src/aggregations';

const workoutService = Service('Workout');
const exerciseService = Service('Exercise');

export const getWorkoutExercises = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const exercises = await getUsersWorkouts(uid);

  return res.json({
    message: 'OK',
    data: {
      exercises,
    },
  });
};

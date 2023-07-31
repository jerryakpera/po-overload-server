import { Request, Response } from 'express';

import Service from '@src/Service';
import * as aggregations from '@src/aggregations';

const workoutService = Service('Workout');
const exerciseService = Service('Exercise');

export const getWorkoutExercises = async (req: Request, res: Response) => {
  const workouts = await workoutService.getMany({});
  const workoutsExercises = workouts.map(workout => workout.exerciseId);
  const exercisesWithWorkoutsAggregation = aggregations.Exercise({
    _id: { $in: workoutsExercises },
  });
  const exercises = await exerciseService.aggregateMany(exercisesWithWorkoutsAggregation);

  return res.json({
    message: 'OK',
    data: {
      exercises,
    },
  });
};

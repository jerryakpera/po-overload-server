import { Request, Response } from 'express';

import Service from '@src/Service';
import * as aggregations from '@src/aggregations';

const workoutService = Service('Workout');
const exerciseService = Service('Exercise');

export const getWorkoutExercises = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const usersWorkouts = await workoutService.getAll({ uid });
  const workoutExercises = usersWorkouts.map(workout => workout.exerciseId);

  const exercisesQuery = {
    _id: {
      $in: workoutExercises,
    },
  };

  const exercisesWorkoutsAggregation = aggregations.ExercisesWorkout(exercisesQuery, uid);
  const exercises = await exerciseService.aggregateMany(exercisesWorkoutsAggregation);

  return res.json({
    message: 'OK',
    data: {
      exercises,
    },
  });
};

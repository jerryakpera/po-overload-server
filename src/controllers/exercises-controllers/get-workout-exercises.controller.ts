import { Request, Response } from 'express';

import Service from '@src/Service';
import { EWorkout } from '@src/models';
import { getUsersWorkouts } from '@src/utils';
import * as aggregations from '@src/aggregations';

const workoutService = Service('Workout');
const exerciseService = Service('Exercise');

const workoutsQuery = (uid: string = '') => {
  return {
    _id: 1,
    name: 1,
    id: 1,
    demonstration: 1,
    target: 1,
    bodyPart: 1,
    equipment: 1,
    workouts: {
      $filter: {
        input: '$workouts',
        as: 'workout',
        cond: { $eq: ['$$workout.uid', uid] },
      },
    },
  };
};

export const getWorkoutExercises = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const usersWorkouts = await workoutService.getMany({ uid });
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

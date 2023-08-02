import Service from '@src/Service';
import { EWorkout } from '@src/models';
import * as aggregations from '@src/aggregations';

const workoutService = Service('Workout');
const exerciseService = Service('Exercise');

export const getUsersWorkouts = async (uid: string) => {
  const workouts = await workoutService.getMany({ uid });
  const workoutsExercises = workouts.map(workout => workout.exerciseId);
  const exercisesWithWorkoutsAggregation = aggregations.Exercise({
    _id: { $in: workoutsExercises },
  });

  return await exerciseService.aggregateMany(exercisesWithWorkoutsAggregation);
};

export const getExerciseWithWorkouts = async (query: {} = {}) => {
  const workouts = await workoutService.getMany(query);
  const workoutsExercises = workouts.map(workout => workout.exerciseId);
  const exerciseWithWorkoutsAggregation = aggregations.Exercise({
    _id: { $in: workoutsExercises },
  });

  return await exerciseService.aggregateOne(exerciseWithWorkoutsAggregation);
};

export const getTotalProgressiveOverloadFromWorkout = (workouts: EWorkout[]) => {
  return workouts.reduce((total: number, workout: EWorkout) => {
    return total + workout.progressive_overload;
  }, 0);
};

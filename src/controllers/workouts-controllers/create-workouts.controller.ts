import { Request, Response } from 'express';

import Service from '@src/Service';
import { IWorkout } from '@src/models';
import * as aggregations from '@src/aggregations';
import {
  getExerciseWithWorkouts,
  getMongooseID,
  getTotalProgressiveOverloadFromWorkout,
  getPercentageDiff,
  getAveragePO,
} from '@src/utils';

const workoutService = Service('Workout');
const exerciseService = Service('Exercise');

export const createWorkout = async (req: Request, res: Response) => {
  const { sets, exerciseId, uid } = req.body;
  const exercise_id = getMongooseID(exerciseId);

  let progressive_overload = 0;

  for (let i = 0; i < Object.keys(sets).length; i++) {
    const set = Object.keys(sets)[i];
    const { weight, reps, type } = sets[set];

    if (!weight || !reps) continue;

    const weightValue = type === 'text' ? 1 : Number(weight);
    const total = weightValue * Number(reps);
    progressive_overload += total;
  }

  let workout: IWorkout = {
    uid,
    sets,
    exerciseId,
    progressive_overload,
    stats: {
      differenceWithLastPO: 0,
      differenceWithAveragePO: 0,
      percentageDifferenceWithLastPO: '',
      percentageDifferenceWithAveragePO: '',
    },
  };

  const exercise = await getExerciseWithWorkouts({ uid, exerciseId });
  const lastWorkout = await workoutService.getMostRecent({ uid, exerciseId });

  const lastPO = lastWorkout?.progressive_overload || 0;
  const averagePO = getAveragePO(exercise?.workouts || []);

  const currentPO = workout.progressive_overload;
  const differenceWithLastPO: number = currentPO - lastPO;
  const percentageDifferenceWithLastPO: string = getPercentageDiff(currentPO, lastPO);
  const differenceWithAveragePO: number = currentPO - averagePO;
  const percentageDifferenceWithAveragePO: string = getPercentageDiff(currentPO, averagePO);

  const stats: any = {
    differenceWithLastPO,
    differenceWithAveragePO,
    percentageDifferenceWithLastPO,
    percentageDifferenceWithAveragePO,
  };

  workout.stats = stats;

  await workoutService.create(workout);

  return res.status(201).json({
    message: 'OK',
    data: {},
  });
};

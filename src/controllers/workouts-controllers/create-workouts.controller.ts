import { Request, Response } from 'express';

import Service from '@src/Service';
import { IWorkout } from '@src/models';

const workoutService = Service('Workout');

export const createWorkout = async (req: Request, res: Response) => {
  const { sets, exerciseId, uid } = req.body;

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
    progression: {
      percent: 0,
      amount: 0,
    },
  };

  const lastWorkout = await workoutService.getMostRecent({});
  const lastProgressiveOverload = lastWorkout?.progressive_overload || 0;

  const progressionAmount = workout.progressive_overload - lastProgressiveOverload;
  console.log(progressionAmount);
  const progressionPercent = (progressionAmount / workout.progressive_overload) * 100;

  workout.progression = {
    amount: progressionAmount,
    percent: progressionPercent,
  };

  await workoutService.create(workout);

  return res.status(201).json({
    message: 'OK',
    data: {},
  });
};

import { Request, Response } from 'express';

import Service from '@src/Service';

const workoutService = Service('Workout');

export const createWorkout = async (req: Request, res: Response) => {
  const { sets, exerciseId, uid } = req.body;

  let progressive_overload = 0;

  for (let i = 0; i < Object.keys(sets).length; i++) {
    const set = Object.keys(sets)[i];
    const { weight, reps } = sets[set];

    if (!weight || !reps) continue;

    const total = weight * reps;
    progressive_overload += total;
  }

  let workout = {
    uid,
    sets,
    exerciseId,
    progressive_overload,
    progression: 0,
  };

  const lastWorkout = await workoutService.getMostRecent({});
  const lastProgressiveOverload = lastWorkout?.progressive_overload || 0;
  const progression = workout.progressive_overload - lastProgressiveOverload;

  workout.progression = progression;

  await workoutService.create(workout);

  return res.status(201).json({
    message: 'OK',
    data: {},
  });
};

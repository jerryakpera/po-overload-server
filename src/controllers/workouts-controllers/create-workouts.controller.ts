import { Request, Response } from 'express';

import Service from '@src/Service';

const workoutService = Service('Workout');

export const createWorkout = async (req: Request, res: Response) => {
  const { sets, exerciseId } = req.body;

  let progressive_overload = 0;

  for (let i = 0; i < Object.keys(sets).length; i++) {
    const set = Object.keys(sets)[i];
    const { weight, reps } = sets[set];

    if (!weight || !reps) continue;

    const total = weight * reps;
    progressive_overload += total;
  }

  const workout = {
    sets,
    exerciseId,
    progressive_overload,
  };

  await workoutService.create(workout);

  return res.status(201).json({
    message: 'OK',
    data: {},
  });
};

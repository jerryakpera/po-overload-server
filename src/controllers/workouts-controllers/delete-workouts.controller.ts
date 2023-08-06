import { Request, Response } from 'express';

import Service from '@src/Service';

const workoutService = Service('Workout');

export const deleteWorkout = async (req: Request, res: Response) => {
  const { workoutId } = req.params;

  await workoutService.deleteOne({ _id: workoutId });

  return res.status(201).json({
    message: 'OK',
    data: {},
  });
};

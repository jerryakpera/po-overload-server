import { Request, Response } from 'express';

import Service from '@src/Service';
import * as aggregations from '@src/aggregations';

const exerciseService = Service('Exercise');

export const getAllExercises = async (req: Request, res: Response) => {
  const q = req.query.q || '';

  const qRegex = new RegExp(`${q}`, 'gi');
  const query = {
    $or: [
      {
        name: qRegex,
      },
      {
        bodyPart: qRegex,
      },
      {
        target: qRegex,
      },
    ],
  };
  const exercisesAggregation = aggregations.Exercise(query);
  const exercises = await exerciseService.aggregateAll(exercisesAggregation);

  return res.json({
    message: 'OK',
    data: {
      exercises,
    },
  });
};

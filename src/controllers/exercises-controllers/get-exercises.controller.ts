import { Request, Response } from 'express';

import Service from '@src/Service';
import * as aggregations from '@src/aggregations';

const exerciseService = Service('Exercise');

export const getExercises = async (req: Request, res: Response) => {
  const limit = 12;
  const q = req.query.q || '';
  const page = Number(req.query.page || 0);

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
  const exercises = await exerciseService.aggregateMany(exercisesAggregation, page, limit);

  return res.json({
    message: 'OK',
    data: {
      exercises,
    },
  });
};

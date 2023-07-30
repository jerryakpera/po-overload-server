import { Request, Response } from 'express';

import Service from '@src/Service';
import * as aggregations from '@src/aggregations';

const exerciseService = Service('Exercise');

export const getExercises = async (req: Request, res: Response) => {
  const q = req.query.q || '';
  const page = Number(req.query.page || 0);
  const limit = 12;

  const qRegex = new RegExp(`${q}`, 'gi');

  const query = {
    $or: [
      {
        Category: qRegex,
      },
      {
        exercise_name: qRegex,
      },
      {
        'target.Primary': qRegex,
      },
      {
        'target.Secondary': qRegex,
      },
      {
        'target.Tertiary': qRegex,
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

import { Request, Response } from 'express';

import Service from '@src/Service';
import * as utils from '@src/utils';
import * as aggregations from '@src/aggregations';

const exerciseService = Service('Exercise');

export const getExercise = async (req: Request, res: Response) => {
  const { exerciseId } = req.params;
  const _id = utils.getMongooseID(exerciseId);

  const exerciseAggregation = aggregations.Exercise({ _id });
  const exercise = await exerciseService.aggregateOne(exerciseAggregation);

  return res.json({
    message: 'OK',
    data: {
      exercise,
    },
  });
};

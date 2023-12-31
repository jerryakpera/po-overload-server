import express from 'express';

import * as utils from '@src/utils';
import { exercisesControllers } from '@src/controllers';

const router = express.Router();

router.get('/all', utils.use(exercisesControllers.getAllExercises));
router.get('/workouts/:uid', utils.use(exercisesControllers.getWorkoutExercises));
router.get('/:exerciseId/:uid', utils.use(exercisesControllers.getUsersExercise));
router.get('/:exerciseId', utils.use(exercisesControllers.getExercise));
router.get('/', utils.use(exercisesControllers.getExercises));

export default router;

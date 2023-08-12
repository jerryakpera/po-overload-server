import express from 'express';

import * as utils from '@src/utils';
import { workoutsControllers } from '@src/controllers';

const router = express.Router();

router.get('/:exerciseId/:uid', utils.use(workoutsControllers.getUsersExerciseWorkouts));
router.get('/:uid', utils.use(workoutsControllers.getUsersWorkouts));
router.get('/', utils.use(workoutsControllers.getWorkouts));
router.post('/', utils.use(workoutsControllers.createWorkout));
router.delete('/:workoutId', utils.use(workoutsControllers.deleteWorkout));

export default router;

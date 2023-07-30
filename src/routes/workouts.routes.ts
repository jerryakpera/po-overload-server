import express from 'express';

import * as utils from '@src/utils';
import { workoutsControllers } from '@src/controllers';

const router = express.Router();

router.get('/', utils.use(workoutsControllers.getWorkouts));
router.post('/', utils.use(workoutsControllers.createWorkout));

export default router;

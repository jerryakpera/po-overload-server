import express, { Request, Response } from 'express';

import workoutsRoutes from './workouts.routes';
import exercisesRoutes from './exercises.routes';

const router = express.Router();

router.get('/health', async (req: Request, res: Response) => {
  return res.send('UP');
});

router.use('/workouts', workoutsRoutes);
router.use('/exercises', exercisesRoutes);

export default router;

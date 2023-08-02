import { EWorkout } from '@src/models';
import mongoose from 'mongoose';

export * from './workout-utils';
export * from './global-try-catch';

export const getMongooseID = (id: string) => new mongoose.Types.ObjectId(id);

export const getPercentageDiff = (newNumber: number, originalNumber: number): string => {
  if (!originalNumber) return '100';
  const increase: number = newNumber - originalNumber;
  const fraction: number = increase / originalNumber;

  const percentDiff = fraction * 100;

  return percentDiff.toFixed(2);
};

export const getAveragePO = (workouts: EWorkout[]): number => {
  if (!workouts.length) return 0;

  const total = workouts.reduce((total, workout) => {
    return total + workout.progressive_overload;
  }, 0);

  return Math.floor(total / workouts.length);
};

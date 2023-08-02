import { Document, ObjectId, Schema, models, model } from 'mongoose';

import { EExercise } from './Exercise.Model';

type Sets = {
  [key: string]: {
    weight: number;
    reps: number;
  };
};

type Stats = {
  differenceWithLastPO: number;
  differenceWithAveragePO: number;
  percentageDifferenceWithLastPO: string;
  percentageDifferenceWithAveragePO: string;
};

export interface IWorkout {
  sets: Sets;
  uid: string;
  exerciseId: ObjectId;
  stats: Stats;
  progressive_overload: number;
}

export interface EWorkout extends Document {
  sets: Sets;
  uid: string;
  _id: ObjectId;
  exercise: EExercise;
  exerciseId: ObjectId;
  stats: Stats;
  progressive_overload: number;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },

    uid: {
      type: String,
      required: true,
    },

    sets: {
      type: Object,
      trim: true,
    },

    stats: {
      type: Object,
    },

    progressive_overload: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Workout = models['Workout'] || model('Workout', WorkoutSchema);

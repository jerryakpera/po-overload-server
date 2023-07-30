import { Document, ObjectId, Schema, models, model } from 'mongoose';

import { EExercise } from './Exercise.Model';

type Sets = {
  [key: string]: {
    weight: number;
    reps: number;
  };
};

export interface IWorkout {
  exerciseId: ObjectId;
  sets: Sets;
  progression: number;
  progressive_overload: number;
}

export interface EWorkout extends Document {
  _id: ObjectId;
  exerciseId: ObjectId;
  exercise: EExercise;
  sets: Sets;
  progression: number;
  progressive_overload: number;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },

    sets: {
      type: Object,
      trim: true,
    },

    progression: {
      type: Number,
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

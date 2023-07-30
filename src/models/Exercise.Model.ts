import { Document, ObjectId, Schema, models, model } from 'mongoose';

type ExerciseTarget = {
  Primary: string[];
};

export interface IExercise {
  id: number;
  Category: string;
  Difficulty: string;
  exercise_name: string;
  steps: string[];
  target: ExerciseTarget;
  youtubeURL: string;
}

export interface EExercise extends Document {
  id: number;
  _id: ObjectId;
  Category: string;
  Difficulty: string;
  exercise_name: string;
  steps: string[];
  target: ExerciseTarget;
  youtubeURL: string[];
}

const ExerciseSchema = new Schema<IExercise>(
  {
    Category: {
      type: String,
      trim: true,
    },

    Difficulty: {
      type: String,
      trim: true,
    },

    id: {
      type: Number,
      trim: true,
    },

    exercise_name: {
      type: String,
      trim: true,
    },

    steps: [
      {
        type: String,
        trim: true,
      },
    ],

    target: {
      type: Object,
    },

    youtubeURL: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Exercise = models['Exercise'] || model('Exercise', ExerciseSchema);

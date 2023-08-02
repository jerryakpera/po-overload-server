import { Document, ObjectId, Schema, models, model } from 'mongoose';

export interface IExercise {
  id: string;
  name: string;
  gifUrl: string;
  target: string;
  bodyPart: string;
  equipment: string;
  demonstration: string;
}

export interface EExercise extends Document {
  id: number;
  _id: ObjectId;
  name: string;
  gifUrl: string;
  target: string;
  bodyPart: string;
  equipment: string;
  demonstration: string;
}

const ExerciseSchema = new Schema<IExercise>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    id: {
      type: String,
      trim: true,
    },

    gifUrl: {
      type: String,
      trim: true,
    },

    target: {
      type: String,
      trim: true,
    },

    bodyPart: {
      type: String,
    },

    equipment: {
      type: String,
      trim: true,
    },

    demonstration: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Exercise = models['Exercise'] || model('Exercise', ExerciseSchema);

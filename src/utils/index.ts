import mongoose from 'mongoose';

export * from './global-try-catch';

export const getMongooseID = (id: string) => new mongoose.Types.ObjectId(id);

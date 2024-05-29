import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../../../domain/entities/User';

interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export default mongoose.model<IUserDocument>('User',UserSchema)







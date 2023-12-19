import { Schema, model } from 'mongoose';
import { UserInterface } from '../../util/interfaces';


const UserSchema = new Schema<UserInterface>({
    userID: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        required: false
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    }
});

export const userModel = model<UserInterface>('User', UserSchema);

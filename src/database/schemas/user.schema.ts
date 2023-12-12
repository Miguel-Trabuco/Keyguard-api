import { Schema, model } from 'mongoose';
import { UserInteface } from '../../util/interfaces';


const UserSchema = new Schema<UserInteface>({
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
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    }
});

export const userModel = model<UserInteface>('User', UserSchema);

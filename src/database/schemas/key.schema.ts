import { Schema, model } from 'mongoose';

const KeySchema = new Schema({
    name: String,
    email: String,
    password: String,
    description: String,
    userID: String,
    keyID: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

export const keyModel = model('Key', KeySchema);

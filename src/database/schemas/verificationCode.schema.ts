import { Schema, model } from 'mongoose';

interface VerificationCodeInterface {
    email: string;
    code: string;
    createdAt: Date;
};

const VerificationCodeSchema = new Schema<VerificationCodeInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

export const verificationCodeModel = model<VerificationCodeInterface>('Code', VerificationCodeSchema);

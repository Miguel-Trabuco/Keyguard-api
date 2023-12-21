import { Schema, model } from 'mongoose';
import { VerificationCodeInterface } from '../../util/interfaces';

const VerificationCodeSchema = new Schema<VerificationCodeInterface>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export const verificationCodeModel = model<VerificationCodeInterface>('Verification Codes', VerificationCodeSchema);

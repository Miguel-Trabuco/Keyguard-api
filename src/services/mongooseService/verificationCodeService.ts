import { verificationCodeModel } from "../../database/schemas/verificationCode.schema";
import { VerificationCodeInterface } from "../../util/interfaces";

class VerificationCodeService {

    async createCode(codeData: VerificationCodeInterface) {
        try {
            await verificationCodeModel.create(codeData);
            return true;

        } catch (err) {
            return false;
        }
    }

    async findCode(email: object) {
        try {
            return await verificationCodeModel.findOne(email);

        } catch (err) {
            return false;
        }
    }

    async deleteCode(email: object) {
        try {
            await verificationCodeModel.deleteOne(email);
            return true;

        } catch (err) {
            return false;
        }
    }
}

export const verificationCodeMongooseService = new VerificationCodeService();

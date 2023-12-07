import { userModel } from "../../database/schemas/user.schema";
import { UserInteface } from "../../util/interfaces";

class MongooseService {

    async createUser(userData: UserInteface) {
        await userModel.create(userData);
    }

    async findUser(findKey: object) {
        const userDocument = await userModel.findOne({ findKey });
        if (!userDocument) {
            return null;
        };
        return userDocument;
    }

    async updateUser(userID: object, update: object) {
        await userModel.findOneAndUpdate({ userID }, update);
    }

    async deleteUser(userID: object) {
        await userModel.findOneAndDelete({ userID });
    }
}

export const mongooseService = new MongooseService();

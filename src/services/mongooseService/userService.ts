import { userModel } from "../../database/schemas/user.schema";
import { UserInteface } from "../../util/interfaces";

class UserMongooseService {

    async createUser(userData: UserInteface) {
        const isCreated = await userModel.create(userData);
        if (!isCreated) {
            return false;
        }
        return true;
    }

    async findUser(findKey: object) {
        const userDocument = await userModel.findOne(findKey);
        if (!userDocument) {
            return false;
        };
        return userDocument;
    }

    async updateUser(userID: object, update: object) {
        const isUpdated = await userModel.updateOne( userID, update);
        if (!isUpdated) {
            return false;
        }
        return true;
    }

    async deleteUser(userID: object) {
        const isDeleted = await userModel.deleteOne(userID);
        if (!isDeleted) {
            return false;
        }
        return true;
    }
}

export const userMongooseService = new UserMongooseService();

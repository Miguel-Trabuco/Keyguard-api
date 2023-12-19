import {userModel} from "../../database/schemas/user.schema";
import {UserInterface} from "../../util/interfaces";

class UserMongooseService {

    async createUser(userData: UserInterface) {
        try {
            await userModel.create(userData);
            return true;
        } catch (err) {
            return false;
        }
    }

    async findUser(findKey: object) {
        try {
            return await userModel.findOne(findKey);
        } catch (err) {
            return false;
        }
    }

    async updateUser(userID: object, update: object) {
        try {
            await userModel.updateOne(userID, update);
            return true;
        } catch (err) {
            return false;
        }
    }

    async deleteUser(userID: object) {
        try {
            await userModel.deleteOne(userID);
            return true;
        } catch (err) {
            return false
        }
    }
}

export const userMongooseService = new UserMongooseService();

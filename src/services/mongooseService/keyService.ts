import { keyModel } from "../../database/schemas/key.schema";

class KeyMongooseService {

    async createKey(keyData: object) {
        try {
            await keyModel.create(keyData);
            return true;

        } catch (err) {
            return false;
        }
    }

    async findKeys(userID: object) {
        try {
            return await keyModel.find(userID);

        } catch (err) {
            return false;
        }
    }

    async updateKey(keyID: object, update: object) {
        try {
            await keyModel.updateOne(keyID, update);
            return true;

        } catch (err) {
            return false;
        }
    }

    async deleteKey(keyID: object) {
        try {
            await keyModel.deleteOne(keyID);
            return true;

        } catch (err) {
            return false
        }
    }

    async deleteKeys(userID: object) {
        try {
            await keyModel.deleteMany(userID);
            return true;

        } catch (err) {
            return false
        }
    }
}

export const keyMongooseService = new KeyMongooseService();

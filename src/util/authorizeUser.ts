import { bcryptService } from "../services/bcryptService/bcryptService";
import { userMongooseService } from "../services/mongooseService/userService";
import { jwtService } from "../services/jwtService/jwtService";
import { Response } from "express";

export const authorizeUser = async (token: string | undefined, password: string | undefined, res: Response) => {
    if (!password || !token) {
        return false;
    }

    const userID = await jwtService.verifyToken(token);

    if (!userID) {
        return false;
    }

    const userDoc = await userMongooseService.findUser({userID});

    if (!userDoc) {
        return false;
    }

    const isPasswordValid = await bcryptService.comparePassword(password, userDoc.passwordHash);

    if (!isPasswordValid) {
        return 'Wrong password.';
    }

    return userDoc;
}

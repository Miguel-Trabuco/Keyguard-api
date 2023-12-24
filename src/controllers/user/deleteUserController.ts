import { Request, Response } from "express";
import { userMongooseService } from "../../services/mongooseService/userService";
import { keyMongooseService } from "../../services/mongooseService/keyService";
import { jwtService } from "../../services/jwtService/jwtService";
import { bcryptService } from "../../services/bcryptService/bcryptService";

export const deleteUserController = async (req: Request, res: Response) => {
    const password = req.body.password;
    const token = req.cookies.token || undefined

    const userID = jwtService.verifyToken(token);

    if (userID === '') {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const userDocument = await userMongooseService.findUser({userID});

    if (!userDocument) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

    const isPasswordMatch = await bcryptService.comparePassword(password, userDocument.passwordHash);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Wrong password' });
    }

    const isDeletedUser = await userMongooseService.deleteUser({userID});
    const isDeletedKeys = await keyMongooseService.deleteKeys({userID});

    if (!isDeletedUser || !isDeletedKeys){
        return res.status(500).json({ message: 'Internal server error.' });
    }

    return res.status(200).clearCookie('token').send();
}

import { userMongooseService } from "../../services/mongooseService/userService";
import { authorizeUser } from "../../util/authorizeUser";
import { bcryptService } from "../../services/bcryptService/bcryptService";
import { Request, Response } from "express";

export const updateUserController = async (req: Request, res: Response) => {
    const { email, username, newPassword, password, token}: {email: string, username: string, newPassword: string, password: string, token: string} = req.body;

    const userDoc: any = await authorizeUser(token, password, res);

    if (!userDoc) {
        return res.status(401).json({ message: "unauthorized" });
    }

    if (userDoc == 'wrong password') {
        return res.status(401).json({ message: userDoc });
    }

    const userID = userDoc.userID

    if (username) {
        await userMongooseService.updateUser({userID}, {username});
    }

    if (newPassword) {
        const hashedPassword = await bcryptService.hashPassword(newPassword);
        await userMongooseService.updateUser({userID}, {passwordHash: hashedPassword});
    }

    if(email) {
        await userMongooseService.updateUser({userID}, {email});
    }

    return res.status(200).json({message: "User updated"});
}

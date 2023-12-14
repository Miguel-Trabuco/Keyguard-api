import { Request, Response } from "express";
import { authorizeUser } from "../../util/authorizeUser";
import { userMongooseService } from "../../services/mongooseService/userService";

export const deleteUserController = async (req: Request, res: Response) => {
    const password: string | undefined = req.get('password');
    const token: string | undefined = req.get('token');

    const userDoc: any = await authorizeUser(token, password, res);

    if (!userDoc) {
        return res.status(401).json({ message: "unauthorized" });
    }

    if (userDoc == 'wrong password') {
        return res.status(401).json({ message: userDoc });
    }

    const userID = userDoc.userID

    const isDeleted = await userMongooseService.deleteUser({userID});

    if (!isDeleted) {
        return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ message: "deleted"});
}

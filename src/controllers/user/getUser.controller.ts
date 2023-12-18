import { Request, Response } from "express";
import { authorizeUser } from "../../util/authorizeUser";
import { UserInteface } from "../../util/interfaces";

export const getUserController = async (req: Request, res: Response) => {
    const password: string | undefined = req.get('password');
    const token: string | undefined = req.get('token');

    const userDoc: any = await authorizeUser(token, password, res);

    if (!userDoc) {
        return res.status(401).json({ message: "unauthorized" });
    }

    if (userDoc == 'Wrong password.') {
        return res.status(401).json({ message: userDoc });
    }
    
    const userInformation = {
        email: userDoc.email,
        name: userDoc.username,
    };

    res.status(200).json(userInformation);
}

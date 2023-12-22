import { Request, Response } from "express";
import { jwtService } from "../../services/jwtService/jwtService";
import { userMongooseService } from "../../services/mongooseService/userService";

export const getUserController = async (req: Request, res: Response) => {
    const token = req.cookies.token || undefined

    const userID = jwtService.verifyToken(token);

    if (userID === '') {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const userDocument = await userMongooseService.findUser({userID});

    if (!userDocument) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
    
    const userInformation = {
        email: userDocument.email,
        name: userDocument.username,
        verified: userDocument.verified
    };

    res.status(200).json(userInformation);
}

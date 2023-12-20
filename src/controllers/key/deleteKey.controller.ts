import {keyMongooseService} from "../../services/mongooseService/keyService";
import {jwtService} from "../../services/jwtService/jwtService";
import {Request, Response} from "express";

export const deleteKeyController = async (req: Request, res: Response) => {
    const { keyID } = req.body;
    const token = req.cookies.token || undefined

    const userID = jwtService.verifyToken(token);

    if (userID === '') {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const isDeleted = await keyMongooseService.deleteKey({keyID});

    if (!isDeleted) {
        return res.status(500).json({message: 'Internal server error.'});
    }

    return res.status(200);
}

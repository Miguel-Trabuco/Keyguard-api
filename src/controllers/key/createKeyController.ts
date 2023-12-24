import { keyMongooseService } from "../../services/mongooseService/keyService";
import { jwtService } from "../../services/jwtService/jwtService";
import { v4 as uuid } from 'uuid';
import { Request, Response } from "express";

export const createKeyController = async (req: Request, res: Response) => {
    const { name, email, password, description } = req.body;
    const token = req.cookies.token || undefined

    const userID = jwtService.verifyToken(token);

    if (userID === '') {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const keyID = uuid();

    const keyData = {
        name,
        email,
        password,
        description,
        userID,
        keyID
    }

    const isCreated = await keyMongooseService.createKey(keyData);

    if (!isCreated) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

    return res.status(201).send();
}
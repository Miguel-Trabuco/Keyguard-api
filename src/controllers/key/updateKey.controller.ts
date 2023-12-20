import {keyMongooseService} from "../../services/mongooseService/keyService";
import {jwtService} from "../../services/jwtService/jwtService";
import {Request, Response} from "express";

export const updateKeyController = async (req: Request, res: Response) => {
    const {name, email, password, description, keyID} = req.body;
    const token = req.cookies.token || undefined

    const userID = jwtService.verifyToken(token);

    if (userID === '') {
        return res.status(401).json({message: 'Unauthorized'})
    }

    if (name) {
        const isUpdated = await keyMongooseService.updateKey({keyID}, {name});

        if (!isUpdated) {
            return res.status(500).json({message: 'Internal server error.'});
        }
    }

    if (email) {
        const isUpdated = await keyMongooseService.updateKey({keyID}, {email});

        if (!isUpdated) {
            return res.status(500).json({message: 'Internal server error.'});
        }
    }

    if (password) {
        const isUpdated = await keyMongooseService.updateKey({keyID}, {password});

        if (!isUpdated) {
            return res.status(500).json({message: 'Internal server error.'});
        }
    }

    if (description) {
        const isUpdated = await keyMongooseService.updateKey({keyID}, {description});

        if (!isUpdated) {
            return res.status(500).json({message: 'Internal server error.'});
        }
    }

    const isUpdated = await keyMongooseService.updateKey({keyID}, {updatedAt: new Date()});

    if (!isUpdated) {
        return res.status(500).json({message: 'Internal server error.'});
    }

    return res.status(200);
}

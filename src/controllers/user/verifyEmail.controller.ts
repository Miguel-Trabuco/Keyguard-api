import {verificationCodeMongooseService} from "../../services/mongooseService/verificationCodeService";
import {userMongooseService} from "../../services/mongooseService/userService";
import {jwtService} from "../../services/jwtService/jwtService";
import {Request, Response} from "express";

export const verifyEmailController = async (req: Request, res: Response) => {
    const code = req.body.code;
    const token = req.cookies.token || undefined

    const userID = jwtService.verifyToken(token);

    if (userID === '') {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const userDocument = await userMongooseService.findUser({userID});

    if (!userDocument) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

    const email = userDocument.email;

    const verificationCodeDocument = await verificationCodeMongooseService.findCode({email});

    if (!verificationCodeDocument) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

    if (verificationCodeDocument.code !== code) {
        return res.status(400).json({ message: 'Wrong code' });
    }

    const isUpdated = await userMongooseService.updateUser({userID}, {verified: true});

    if (!isUpdated) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

    const isDeleted = await verificationCodeMongooseService.deleteCode({email});

    if (!isDeleted) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

    return res.status(200);
}

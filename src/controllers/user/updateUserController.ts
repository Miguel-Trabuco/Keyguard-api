import { userMongooseService } from "../../services/mongooseService/userService";
import { jwtService } from "../../services/jwtService/jwtService";
import { bcryptService } from "../../services/bcryptService/bcryptService";
import { sendCodeToEmail } from "../../util/sendCodeToEmail";
import { Request, Response } from "express";


export const updateUserController = async (req: Request, res: Response) => {
    const {email, username, password, newPassword} = req.body;
    const token = req.cookies.token || undefined

    const userID = jwtService.verifyToken(token);

    if (userID === '') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userDocument = await userMongooseService.findUser({userID});

    if (!userDocument) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

    if (!email && !username && !newPassword) {
        return res.status(400).json({ message: 'email, password or username is required' });
    }

    if (email) {
        if (email == userDocument.email) {
            return res.status(400).json({ message: "the email cannot be the same as the previous one" });
        }

        const isUpdated = await userMongooseService.updateUser({userID}, {email, verified: false});

        if(!isUpdated) {
            return res.status(500).json({ message: 'Internal server error.' });
        }

        const isSent = await sendCodeToEmail(email);

        if (!isSent) {
            return res.status(500).json({message: 'Internal server error.'});
        }

    }

    if (username) {

        if (username == userDocument.username) {
            return res.status(400).json({ message: "the username cannot be the same as the previous one" });
        }

        const isUpdated = await userMongooseService.updateUser({userID}, {username});

        if(!isUpdated) {
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }

    if (newPassword) {
        const isPasswordMatch = await bcryptService.comparePassword(password, userDocument.passwordHash);

        if(!isPasswordMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        const passwordHash = await bcryptService.hashPassword(newPassword);

        if(passwordHash == userDocument.passwordHash) {
            return res.status(400).json({ message: "the password cannot be the same as the previous one" });
        }

        const isUpdated = await userMongooseService.updateUser({userID}, {passwordHash});

        if(!isUpdated) {
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }

    const isUpdated = await userMongooseService.updateUser({userID}, {updatedAt: new Date()});

    if(!isUpdated) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

    return res.status(200).send();
}

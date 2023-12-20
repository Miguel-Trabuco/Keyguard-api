import { jwtService } from "../../services/jwtService/jwtService";
import { userMongooseService } from "../../services/mongooseService/userService";
import { bcryptService } from "../../services/bcryptService/bcryptService";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const token = req.cookies.token || undefined

    const userID = jwtService.verifyToken(token);

    if (userID) {
        return res.status(400).json({ message: 'Already logged' });
    }

    const userDocument = await userMongooseService.findUser({email});

    if (!userDocument) {
        return res.status(400).json({ message: "User doesn't exist" });
    }

    const isPasswordMatch = await bcryptService.comparePassword(password, userDocument.passwordHash);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Wrong password' });
    }

    const newToken = jwtService.createToken(userDocument.userID);

    return res.status(200).cookie('token', newToken, {httpOnly: true, secure: false});
}

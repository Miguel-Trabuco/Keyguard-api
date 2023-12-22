import { userMongooseService } from "../../services/mongooseService/userService";
import { jwtService } from "../../services/jwtService/jwtService";
import { bcryptService } from "../../services/bcryptService/bcryptService";
import { v4 as uuid } from 'uuid';
import { Request, Response } from "express";
import { UserInterface } from "../../util/interfaces";
//import { sendCodeToEmail } from "../../util/sendCodeToEmail";

export const createUserController = async (req: Request, res: Response) => {
    const { email, username, password}: {email: string, username: string, password: string} = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: "Email, username and password are required." });
    }

    const userDocument = await userMongooseService.findUser({email});

    if(userDocument) {
        return res.status(400).json({ message: "Email already used." });
    }

    if(password.length < 8 || password.length > 20) {
        return res.status(400).json({ message: 'Password must be between 8 and 20 characters.' });
    }

    const passwordHash: string = await bcryptService.hashPassword(password);

    const userID: string = uuid();

    const token = jwtService.createToken(userID);

    const userData: UserInterface = {
        userID,
        email,
        username,
        verified: false,
        passwordHash
    };

    const isCreated: boolean = await userMongooseService.createUser(userData);

    if (!isCreated) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

    //const isSent: boolean = await sendCodeToEmail(email);

    //if(!isSent) {
    //    return res.status(500).json({ message: 'Internal server error.' });
    //}

    return res.status(201).cookie('token', token, { httpOnly: true, secure: false }).send();
}

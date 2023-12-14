import { userMongooseService } from "../../services/mongooseService/userService";
import { jwtService } from "../../services/jwtService/jwtService";
import { bcryptService } from "../../services/bcryptService/bcryptService";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";
import { UserInteface } from "../../util/interfaces";

export const createUserController = async (req: Request, res: Response) => {
    const { email, username, password}: {email: string, username: string, password: string} = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, password are required' });
    }

    const userDocument: any = await userMongooseService.findUser({email});

    if (userDocument) {
        return res.status(400).json({ message: 'Email arealdy used' });
    }

    if(password.length < 8 || password.length > 20) {
        return res.status(400).json({ message: 'Password must be between 8 and 20 characters' });
    }

    const hashedPassword: string = await bcryptService.hashPassword(password);

    const userID: string = uuidv4();

    const token = jwtService.createToken(userID);

    const userData: UserInteface = {
        userID,
        email,
        username,
        passwordHash: hashedPassword,
    };

    const isCreated: boolean = await userMongooseService.createUser(userData);

    if (!isCreated) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    return res.status(201).json({token});

}

import { mongooseService } from "../services/mongooseService/userService";
import { jwtService } from "../services/jwtService/jwtService";
import { bcryptService } from "../services/bcryptService/bcryptService";
import { Request, Response } from "express";

const createUserController = async (req: Request, res: Response) => {
    const { email = null, username = null, newPassword = null, password} = req.body;
    const token: string = req.cookies.token;

    const decoded = await jwtService.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!email || !username || !password || !newPassword) {
        return res.status(400).json({ message: 'Email, username or password are required' });
    }

    

}